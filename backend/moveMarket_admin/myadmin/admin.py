import os

from django.http import HttpRequest
import django.contrib.auth.admin
import django.contrib.auth.models
from django.contrib import auth
from django.utils.html import format_html

from myadmin.inlines import *
from utils.files import save_image, get_path_to_static

admin.site.unregister(auth.models.User)
admin.site.unregister(auth.models.Group)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    fields = ["email", "display_name", "phone_number", "avatar"]
    form = UserForm
    inlines = [AddressInline, FavoritesInline]
    search_fields = ["email", "display_name"]
    list_display = ["email", "get_avatar"]

    def save_model(self, request: HttpRequest, obj: User, form: UserForm, change):
        obj.normalized_email = obj.email.upper()
        obj.normalized_username = obj.username.upper()
        avatar = form.cleaned_data["avatar"]
        if avatar is not None:
            obj.avatar_path = save_image(avatar)
        super().save_model(request, obj, form, change)

    @staticmethod
    @admin.display(description="Аватар", empty_value="Не установлено")
    def get_avatar(obj):
        if obj.avatar_path is None:
            return None
        path = get_path_to_static(obj.avatar_path)
        return format_html('<img src="{}" style="max-width:100px; max-height:100px"/>'.format(path))


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    exclude = ["id", "image_path"]
    form = ItemForm
    inlines = [ItemPropertyInline, KitItemInline]
    search_fields = ["name"]
    list_display = ["name", "price", "get_image"]

    def save_model(self, request: HttpRequest, obj: User, form: UserForm, change):
        image = form.cleaned_data["image"]
        if image is not None:
            obj.image_path = save_image(image)
        super().save_model(request, obj, form, change)

    @staticmethod
    @admin.display(description="Изображение", empty_value="Не установлено")
    def get_image(obj):
        if obj.image_path is None:
            return None
        path = get_path_to_static(obj.image_path)
        return format_html('<img src="{}" style="max-width:100px; max-height:100px"/>'.format(path))


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    exclude = ["id"]
    inlines = [ItemPropertyInline]
    search_fields = ["name"]


@admin.register(ItemProperty)
class ItemPropertyAdmin(admin.ModelAdmin):
    exclude = ["id"]
    inlines = [ItemPropertyOptionInline]
    search_fields = ["item__name", "property__name"]
    autocomplete_fields = ["item", "property"]

    def save_formset(self, request: HttpRequest, form: forms.ModelForm, formset, change: bool):
        formset.save(commit=False)
        for obj in formset.deleted_objects:
            obj.delete()
        for sf in formset.saved_forms:
            instance = sf.instance
            if "image" in sf.changed_data:
                image = sf.cleaned_data["image"]
                if image is not None:
                    instance.image_path = save_image(image)
            instance.save()
        formset.save_m2m()


@admin.register(Carts)
class CartAdmin(admin.ModelAdmin):
    exclude = ["id"]
    search_fields = ["user__email"]
    autocomplete_fields = ["user"]
    inlines = [CartKitInline]

    def save_formset(self, request: HttpRequest, form: forms.ModelForm, formset, change: bool):
        if change:
            super().save_formset(request, form, formset, change)
            return
        instances = formset.save(commit=False)
        for obj in formset.deleted_objects:
            obj.delete()
        for instance in instances:
            items = [CartKitItem(kit_item=item, cart_kit=instance, quantity=1) for item in instance.kit.kit_items.all()]
            instance.save()
            instance.cart_kit_items.set(items, bulk=False)


@admin.register(CartKit)
class CartKitAdmin(admin.ModelAdmin):
    exclude = ["id"]
    search_fields = ["kit__name", "cart__user__email"]

    def save_model(self, request: HttpRequest, obj: CartKit, form, change: bool):
        super().save_model(request, obj, form, change)
        if not change:
            items = [CartKitItem(kit_item=item, cart_kit=obj, quantity=1) for item in obj.kit.kit_items.all()]
            obj.cart_kit_items.set(items, bulk=False)

    def get_inlines(self, request, obj):
        if obj is not None:
            return [CartKitItemInline]
        return []


@admin.register(Kit)
class KitAdmin(admin.ModelAdmin):
    exclude = ["id", "image_path"]
    form = KitForm
    search_fields = ["name"]
    autocomplete_fields = ["category"]
    inlines = [KitItemInline]
    list_display = ["name", "get_image"]

    def save_model(self, request: HttpRequest, obj: User, form: UserForm, change):
        image = form.cleaned_data["image"]
        if image is not None:
            obj.image_path = save_image(image)
        super().save_model(request, obj, form, change)

    @staticmethod
    @admin.display(description="Изображение", empty_value="Не установлено")
    def get_image(obj):
        if obj.image_path is None:
            return None
        path = get_path_to_static(obj.image_path)
        return format_html('<img src="{}" style="max-width:100px; max-height:100px"/>'.format(path))


@admin.register(Category)
class Category(admin.ModelAdmin):
    exclude = ["id"]
    search_fields = ["name"]


@admin.register(KitItem)
class KitItemAdmin(admin.ModelAdmin):
    exclude = ["id"]
    search_fields = ["item__name", "kit__name"]


@admin.register(CartKitItem)
class CartKitItemAdmin(admin.ModelAdmin):
    exclude = ["id", "quantity"]
    autocomplete_fields = ["cart_kit", "kit_item"]
    search_fields = ["kit_item__kit__name", "kit_item__item__name", "cart_kit__cart__user__email"]
    form = CartKitItemForm
    inlines = [CartKitItemSelectedPropertyOptionInline]

    def save_model(self, request: HttpRequest, obj: CartKitItem, form, change):
        obj.quantity = form.cleaned_data["kit_item"].quantity
        super().save_model(request, obj, form, change)


@admin.register(CartKitItemSelectedPropertyOption)
class CartKitItemSelectedPropertyOptionAdmin(admin.ModelAdmin):
    exclude = ["id"]
    autocomplete_fields = ["cart_kit_item", "item_property", "item_property_option"]
    search_fields = ["cart_kit_item__kit_item__kit__name", "cart_kit_item__kit_item__item__name",
                     "cart_kit_item__cart_kit__cart__user__email", "item_property__property__name",
                     "item_property_option__value"]
    form = CartKitItemSelectedPropertyOptionForm


@admin.register(ItemPropertyOption)
class ItemPropertyOptionAdmin(admin.ModelAdmin):
    exclude = ["id", "image_path"]
    search_fields = ["value", "item_property__property__name", "item_property__item__name"]
    autocomplete_fields = ["item_property"]
    list_display = ["value", "item_property", "get_image"]
    form = ItemPropertyOptionForm

    def save_model(self, request: HttpRequest, obj: User, form: UserForm, change):
        image = form.cleaned_data["image"]
        if image is not None:
            obj.image_path = save_image(image)
        super().save_model(request, obj, form, change)

    @staticmethod
    @admin.display(description="Изображение", empty_value="Не установлено")
    def get_image(obj):
        if obj.image_path is None:
            return None
        path = get_path_to_static(obj.image_path)
        return format_html('<img src="{}" style="max-width:100px; max-height:100px"/>'.format(path))



