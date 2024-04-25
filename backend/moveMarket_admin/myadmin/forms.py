from django import forms
from django.core.exceptions import ValidationError


class ItemPropertyOptionForm(forms.ModelForm):
    image = forms.ImageField(required=False, label="Изображение")

    def clean(self):
        data = super().clean()
        prop = self.instance.item_property
        if "is_default" in self.changed_data and data["is_default"] and prop.options.filter(is_default=True).exists():
            raise ValidationError(f"На свойстве %(prop)s уже существует опция по умолчанию", code="invalid",
                                  params={"prop": prop})


class UserForm(forms.ModelForm):
    avatar = forms.ImageField(required=False, label="Изображение")


class ItemForm(forms.ModelForm):
    image = forms.ImageField(required=False, label="Изображение")


class KitForm(forms.ModelForm):
    image = forms.ImageField(required=False, label="Изображение")


class CartKitItemForm(forms.ModelForm):
    def clean(self):
        data = super().clean()
        if data["cart_kit"].kit.id != data["kit_item"].kit.id:
            raise ValidationError("Связки %(cart_kit)s и %(kit_item)s относятся к разным наборам",
                                  code="invalid", params={"cart_kit": data["cart_kit"], "kit_item": data["kit_item"]})
        return data


class CartKitItemSelectedPropertyOptionForm(forms.ModelForm):
    def clean(self):
        data = super().clean()
        if data["cart_kit_item"].kit_item.item.id != data["item_property"].item.id:
            raise ValidationError("Выбранный предмет %(item)s не имеет свойства %(prop)s",
                                  code="invalid", params={"item": data["cart_kit_item"], "prop": data["item_property"]})
        if data["item_property_option"].item_property.id != data["item_property"].id:
            raise ValidationError("Выбранная опция %(option)s не относится к выбранному свойству %(prop)s",
                                  code="invalid", params={"option": data["item_property_option"],
                                                          "prop": data["item_property"]})
        return data

