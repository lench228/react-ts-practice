from django.contrib import admin
from django import forms
from myadmin.models import *
from myadmin.forms import *


class ItemPropertyInline(admin.StackedInline):
    model = ItemProperty
    extra = 1
    autocomplete_fields = ["item", "property"]


class AddressInline(admin.StackedInline):
    model = Address
    formfield_overrides = {models.TextField: {"widget": forms.TextInput}}


class ItemPropertyOptionInline(admin.StackedInline):
    model = ItemPropertyOption
    extra = 2
    formfield_overrides = {models.TextField: {"widget": forms.TextInput}}
    exclude = ["image_path"]
    form = ItemPropertyOptionForm


class CartKitInline(admin.StackedInline):
    model = CartKit
    autocomplete_fields = ["cart", "kit"]


class KitItemInline(admin.StackedInline):
    model = KitItem
    autocomplete_fields = ["kit", "item"]


class CartKitItemInline(admin.StackedInline):
    model = CartKitItem
    autocomplete_fields = ["kit_item", "cart_kit"]
    form = CartKitItemForm


class CartKitItemSelectedPropertyOptionInline(admin.StackedInline):
    model = CartKitItemSelectedPropertyOption
    autocomplete_fields = ["cart_kit_item", "item_property", "item_property_option"]
    form = CartKitItemSelectedPropertyOptionForm


class FavoritesInline(admin.StackedInline):
    model = Favorite
    autocomplete_fields = ["user", "kit"]





