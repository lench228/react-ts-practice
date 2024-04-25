import uuid

from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


def get_new_uuid():
    return uuid.uuid4()


class Address(models.Model):
    id = models.UUIDField(db_column='Id', primary_key=True, default=get_new_uuid, editable=False)  # Field name made lowercase.
    city = models.TextField(db_column='City', blank=True, null=True, verbose_name="Город")  # Field name made lowercase.
    street = models.TextField(db_column='Street', blank=True, null=True, verbose_name="Улица")  # Field name made lowercase.
    building = models.TextField(db_column='Building', blank=True, null=True, verbose_name="Здание")  # Field name made lowercase.
    apartment = models.IntegerField(db_column='Apartment', blank=True, null=True, verbose_name="Квартира/комната")  # Field name made lowercase.
    user = models.OneToOneField('User', models.CASCADE, db_column='UserId', verbose_name="Пользователь")  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Address'
        verbose_name = 'Адрес (Address)'
        verbose_name_plural = 'Адреса (Address)'

    def __str__(self):
        return f"{', '.join([str(x) if x else '-' for x in [self.city, self.street, self.building, self.apartment]])}"


class RoleClaims(models.Model):
    id = models.AutoField(db_column='Id', primary_key=True)  # Field name made lowercase.
    role = models.ForeignKey('Roles', models.CASCADE, db_column='RoleId')  # Field name made lowercase.
    claim_type = models.TextField(db_column='ClaimType', blank=True, null=True)  # Field name made lowercase.
    claim_value = models.TextField(db_column='ClaimValue', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'AspNetRoleClaims'
        verbose_name = 'Role claim'
        verbose_name_plural = 'Role claims'


class Roles(models.Model):
    id = models.UUIDField(db_column='Id', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=256, blank=True, null=True)  # Field name made lowercase.
    normalized_name = models.CharField(db_column='NormalizedName', unique=True, max_length=256, blank=True, null=True)  # Field name made lowercase.
    concurrency_stamp = models.TextField(db_column='ConcurrencyStamp', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'AspNetRoles'
        verbose_name = 'Role'
        verbose_name_plural = 'Roles'


class UserClaims(models.Model):
    id = models.AutoField(db_column='Id', primary_key=True)  # Field name made lowercase.
    user = models.ForeignKey('User', models.CASCADE, db_column='UserId')  # Field name made lowercase.
    claim_type = models.TextField(db_column='ClaimType', blank=True, null=True)  # Field name made lowercase.
    claim_value = models.TextField(db_column='ClaimValue', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'AspNetUserClaims'
        verbose_name = 'User claim'
        verbose_name_plural = 'User claims'


class UserLogins(models.Model):
    login_provider = models.TextField(db_column='LoginProvider', primary_key=True)  # Field name made lowercase. The composite primary key (LoginProvider, ProviderKey) found, that is not supported. The first column is selected.
    provider_key = models.TextField(db_column='ProviderKey')  # Field name made lowercase.
    provider_display_name = models.TextField(db_column='ProviderDisplayName', blank=True, null=True)  # Field name made lowercase.
    user = models.ForeignKey('User', models.CASCADE, db_column='UserId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'AspNetUserLogins'
        unique_together = (('login_provider', 'provider_key'),)
        verbose_name = 'User login'
        verbose_name_plural = 'User logins'


class UserRoles(models.Model):
    user = models.OneToOneField('User', models.CASCADE, db_column='UserId', primary_key=True)  # Field name made lowercase. The composite primary key (UserId, RoleId) found, that is not supported. The first column is selected.
    role = models.ForeignKey(Roles, models.CASCADE, db_column='RoleId') # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'AspNetUserRoles'
        unique_together = (('user', 'role'),)
        verbose_name = 'User role'
        verbose_name_plural = 'User roles'


class UserTokens(models.Model):
    user = models.OneToOneField('User', models.CASCADE, db_column='UserId', primary_key=True)  # Field name made lowercase. The composite primary key (UserId, LoginProvider, Name) found, that is not supported. The first column is selected.
    login_provider = models.TextField(db_column='LoginProvider')  # Field name made lowercase.
    name = models.TextField(db_column='Name')  # Field name made lowercase.
    value = models.TextField(db_column='Value', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'AspNetUserTokens'
        unique_together = (('user', 'login_provider', 'name'),)
        verbose_name = 'User token'
        verbose_name_plural = 'User tokens'


class CartKit(models.Model):
    id = models.UUIDField(db_column='Id', primary_key=True, default=get_new_uuid, editable=False)  # Field name made lowercase.
    cart = models.ForeignKey('Carts', models.CASCADE, db_column='CartId', verbose_name="Корзина")  # Field name made lowercase.
    kit = models.ForeignKey('Kit', models.CASCADE, db_column='KitId', verbose_name="Набор")  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'CartKit'
        unique_together = (('kit', 'cart'),)
        verbose_name = 'Корзинный набор (CartKit)'
        verbose_name_plural = 'Корзинные наборы (CartKits)'

    def __str__(self):
        return f"{self.kit} в {self.cart}"


class CartKitItem(models.Model):
    id = models.UUIDField(db_column='Id', primary_key=True, default=get_new_uuid, editable=False)  # Field name made lowercase.
    quantity = models.BigIntegerField(db_column='Quantity', default=1, verbose_name="Количество")  # Field name made lowercase.
    kit_item = models.ForeignKey('KitItem', models.CASCADE, db_column='KitItemId', verbose_name="Товар в наборе")  # Field name made lowercase.
    cart_kit = models.ForeignKey(CartKit, models.CASCADE, db_column='CartKitId', related_name="cart_kit_items", verbose_name="Корзинный набор")  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'CartKitItem'
        unique_together = (('kit_item', 'cart_kit'),)
        verbose_name = 'Товар в корзинном наборе (CartKitItem)'
        verbose_name_plural = 'Товары в корзинном наборе (CartKitItems)'

    def __str__(self):
        return f"{self.kit_item.item} в {self.cart_kit}"


class CartKitItemSelectedPropertyOption(models.Model):
    id = models.UUIDField(db_column='Id', primary_key=True, default=get_new_uuid, editable=False)  # Field name made lowercase.
    cart_kit_item = models.ForeignKey(CartKitItem, models.CASCADE, db_column='CartKitItemId', verbose_name="Товар в корзинном наборе")  # Field name made lowercase.
    item_property = models.ForeignKey('ItemProperty', models.CASCADE, db_column='ItemPropertyId', verbose_name="Свойство товара")  # Field name made lowercase.
    item_property_option = models.ForeignKey('ItemPropertyOption', models.CASCADE, db_column='ItemPropertyOptionId', verbose_name="Опция свойства товара")  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'CartKitItemSelectedPropertyOption'
        unique_together = (('cart_kit_item', 'item_property'),)
        verbose_name = 'Выбранная опция корзинного товара (CartKitItemSelectedPropertyOption)'
        verbose_name_plural = 'Выбранные опции корзинного товара (CartKitItemSelectedPropertyOptions)'

    def __str__(self):
        return f"Опция {self.item_property_option} на свойстве {self.item_property}"


class Carts(models.Model):
    id = models.UUIDField(db_column='Id', primary_key=True, default=get_new_uuid, editable=False)  # Field name made lowercase.
    user = models.OneToOneField('User', models.CASCADE, db_column='UserId', verbose_name="Пользователь")  # Field name made lowercase.
    kits = models.ManyToManyField("Kit", through="CartKit", verbose_name="Наборы")

    class Meta:
        managed = False
        db_table = 'Carts'
        verbose_name = 'Корзина (Cart)'
        verbose_name_plural = 'Корзины (Carts)'

    def __str__(self):
        return f"Корзина {self.user}"


class Category(models.Model):
    id = models.UUIDField(db_column='Id', primary_key=True, default=get_new_uuid, editable=False)  # Field name made lowercase.
    name = models.TextField(db_column='Name', verbose_name="Название")  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Category'
        verbose_name = 'Категория (Category)'
        verbose_name_plural = 'Категории (Categories)'

    def __str__(self):
        return f"\"{self.name}\""


class Favorite(models.Model):
    id = models.UUIDField(db_column='Id', primary_key=True, default=get_new_uuid, editable=False)  # Field name made lowercase.
    user = models.ForeignKey('User', models.CASCADE, db_column='UserId', verbose_name="Пользователь")  # Field name made lowercase.
    kit = models.ForeignKey('Kit', models.CASCADE, db_column='KitId', verbose_name="Набор")  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Favorite'
        unique_together = (('user', 'kit'),)
        verbose_name = 'Избранное (Favorite)'
        verbose_name_plural = 'Избранное (Favorites)'

    def __str__(self):
        return f"{self.kit} в избранном {self.user}"


class Item(models.Model):
    id = models.UUIDField(db_column='Id', primary_key=True, default=get_new_uuid, editable=False)  # Field name made lowercase.
    name = models.TextField(db_column='Name', verbose_name="Название")  # Field name made lowercase.
    description = models.TextField(db_column='Description', blank=True, null=True, verbose_name="Описание")  # Field name made lowercase.
    price = models.FloatField(db_column='Price', verbose_name="Цена за штуку", validators=[MinValueValidator(0)])  # Field name made lowercase.
    image_path = models.TextField(db_column='ImagePath', blank=True, null=True)  # Field name made lowercase.
    properties = models.ManyToManyField("Property", through="ItemProperty", verbose_name="Свойства")

    class Meta:
        managed = False
        db_table = 'Item'
        verbose_name = 'Товар (Item)'
        verbose_name_plural = 'Товар (Items)'

    def __str__(self):
        return f"\"{self.name}\""


class ItemProperty(models.Model):
    id = models.UUIDField(db_column='Id', primary_key=True, default=get_new_uuid, editable=False)  # Field name made lowercase.
    item = models.ForeignKey(Item, models.CASCADE, db_column='ItemId', verbose_name="Товар")  # Field name made lowercase.
    property = models.ForeignKey('Property', models.CASCADE, db_column='PropertyId', verbose_name="Свойство")  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ItemProperty'
        unique_together = (('property', 'item'),)
        verbose_name = 'Свойство товара (ItemProperty)'
        verbose_name_plural = 'Свойства товара (ItemProperties)'

    def __str__(self):
        return f"Свойство {self.property} товара {self.item}"


class ItemPropertyOption(models.Model):
    id = models.UUIDField(db_column='Id', primary_key=True, default=get_new_uuid, editable=False)  # Field name made lowercase.
    value = models.TextField(db_column='Value', verbose_name="Значение опции")  # Field name made lowercase.
    price_multiplier = models.FloatField(db_column='PriceMultiplier', verbose_name="Множитель стоимости",
                                         validators=[MinValueValidator(1), MaxValueValidator(20)],
                                         default=1)  # Field name made lowercase.
    is_available = models.BooleanField(db_column='IsAvailable', default=True, verbose_name="Есть в наличии")  # Field name made lowercase.
    is_default = models.BooleanField(db_column='IsDefault', default=False, verbose_name="Является опцией по умолчанию")  # Field name made lowercase.
    image_path = models.TextField(db_column='RelatedImagePath', blank=True, null=True)  # Field name made lowercase.
    item_property = models.ForeignKey(ItemProperty, models.CASCADE, related_name="options", db_column='ItemPropertyId', verbose_name="Свойство товара")  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ItemPropertyOption'
        verbose_name = 'Опция свойства товара (ItemPropertyOption)'
        verbose_name_plural = 'Опции свойств товаров (ItemPropertyOptions)'

    def __str__(self):
        return f"Опция \"{self.value}\" - {self.item_property}"


class Kit(models.Model):
    id = models.UUIDField(db_column='Id', primary_key=True, default=get_new_uuid, editable=False)  # Field name made lowercase.
    name = models.TextField(db_column='Name', verbose_name="Название")  # Field name made lowercase.
    description = models.TextField(db_column='Description', verbose_name="Описание")  # Field name made lowercase.
    discount = models.FloatField(db_column='Discount', verbose_name="Скидка (от 0 до 1)", default=0,
                                 validators=[MinValueValidator(0), MaxValueValidator(1)])  # Field name made lowercase.
    popularity = models.BigIntegerField(db_column='Popularity', validators=[MinValueValidator(0)], verbose_name="Популярность (сколько раз купили)")  # Field name made lowercase.
    image_path = models.TextField(db_column='ImagePath', blank=True, null=True)  # Field name made lowercase.
    category = models.ForeignKey(Category, models.CASCADE, db_column='CategoryId', verbose_name="Категория")  # Field name made lowercase.
    items = models.ManyToManyField("Item", through="KitItem", verbose_name="Товары")

    class Meta:
        managed = False
        db_table = 'Kit'
        verbose_name = 'Набор (Kit)'
        verbose_name_plural = 'Наборы (Kits)'

    def __str__(self):
        return f"\"{self.name}\""


class KitItem(models.Model):
    id = models.UUIDField(db_column='Id', primary_key=True, default=get_new_uuid, editable=False)  # Field name made lowercase.
    quantity = models.BigIntegerField(db_column='Quantity', verbose_name="Количество", validators=[MinValueValidator(0)])  # Field name made lowercase.
    item = models.ForeignKey(Item, models.CASCADE, db_column='ItemId', verbose_name="Товар")  # Field name made lowercase.
    kit = models.ForeignKey(Kit, models.CASCADE, db_column='KitId', related_name="kit_items", verbose_name="Наборы")  # Field name made lowercase.
    cart_kits = models.ManyToManyField("CartKit", through=CartKitItem)

    class Meta:
        managed = False
        db_table = 'KitItem'
        unique_together = (('kit', 'item'),)
        verbose_name = 'Товар в наборе (KitItem)'
        verbose_name_plural = 'Товары в наборах (KitItems)'

    def __str__(self):
        return f"Товар {self.item} в наборе {self.kit}"


class Property(models.Model):
    id = models.UUIDField(db_column='Id', primary_key=True, default=get_new_uuid)  # Field name made lowercase.
    name = models.TextField(db_column='Name', verbose_name="Название")  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Property'
        verbose_name = 'Свойство (Property)'
        verbose_name_plural = 'Свойства (Properties)'

    def __str__(self):
        return f"\"{self.name}\""


class User(models.Model):
    id = models.UUIDField(db_column='Id', primary_key=True, default=get_new_uuid)  # Field name made lowercase.
    avatar_path = models.TextField(db_column='AvatarPath', blank=True, null=True)  # Field name made lowercase.
    refresh_token = models.TextField(db_column='RefreshToken', blank=True, null=True)  # Field name made lowercase.
    username = models.CharField(db_column='UserName', max_length=256, blank=True, null=True)
    display_name = models.CharField(db_column='DisplayName', max_length=256, blank=True, null=True, verbose_name="Имя пользователя")# Field name made lowercase.
    normalized_username = models.CharField(db_column='NormalizedUserName', max_length=256, blank=True, null=True)  # Field name made lowercase.
    email = models.CharField(db_column='Email', max_length=256, verbose_name="Почта")  # Field name made lowercase.
    normalized_email = models.CharField(db_column='NormalizedEmail', unique=True, max_length=256)  # Field name made lowercase.
    email_confirmed = models.BooleanField(db_column='EmailConfirmed')  # Field name made lowercase.
    password_hash = models.TextField(db_column='PasswordHash', blank=True, null=True)  # Field name made lowercase.
    security_stamp = models.TextField(db_column='SecurityStamp', blank=True, null=True)  # Field name made lowercase.
    concurrency_stamp = models.TextField(db_column='ConcurrencyStamp', blank=True, null=True)  # Field name made lowercase.
    phone_number = models.TextField(db_column='PhoneNumber', blank=True, null=True, verbose_name="Номер телефона")  # Field name made lowercase.
    phone_number_confirmed = models.BooleanField(db_column='PhoneNumberConfirmed')  # Field name made lowercase.
    two_factor_enabled = models.BooleanField(db_column='TwoFactorEnabled')  # Field name made lowercase.
    lockout_end = models.DateTimeField(db_column='LockoutEnd', blank=True, null=True)  # Field name made lowercase.
    lockout_enabled = models.BooleanField(db_column='LockoutEnabled')  # Field name made lowercase.
    access_failed_count = models.IntegerField(db_column='AccessFailedCount')  # Field name made lowercase.
    favorites = models.ManyToManyField(to=Kit, through=Favorite, verbose_name="Избранное")

    class Meta:
        managed = False
        db_table = 'User'
        verbose_name = 'Пользователь (User)'
        verbose_name_plural = 'Пользователи (Users)'

    def __str__(self):
        return f"{self.email}"
