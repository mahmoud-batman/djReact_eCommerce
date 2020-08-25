from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils.text import slugify
from django.contrib.auth import get_user_model

import uuid

CATEGORY_CHOICES = (
    ('S', 'Shirt'),
    ('SW', 'Sport wear'),
    ('OW', 'Outwear')
)

LABEL_CHOICES = (
    ('P', 'primary'),
    ('S', 'secondary'),
    ('D', 'danger')
)

GENDER_CHOICES = (
    ('M', 'Male'),
    ('F', 'Female'),
    ('C', 'Children')
)


def content_file_name(instance, filename):
    return '/'.join(['Items', instance.get_gender_display(),
                     instance.get_category_display(),
                     filename])


class Item(models.Model):

    id = models.UUIDField(primary_key=True,
                          default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    price = models.FloatField(validators=[MinValueValidator(1)])
    discount_price = models.FloatField(
        blank=True, null=True, validators=[MinValueValidator(1)])  # discount less than price
    category = models.CharField(choices=CATEGORY_CHOICES,
                                max_length=2)
    gender = models.CharField(choices=GENDER_CHOICES,
                              max_length=1)
    label = models.CharField(choices=LABEL_CHOICES,
                             max_length=1)
    slug = models.SlugField(unique=True, default='',
                            editable=False, null=True, blank=True)
    description = models.TextField()
    image = models.ImageField(upload_to=content_file_name)
    rate = models.IntegerField(default=0, validators=[
        MaxValueValidator(5),
        MinValueValidator(0)
    ])

    def __str__(self):
        return self.title

    def _get_unique_slug(self):
        unique_slug = slugify(self.title)
        num = 1
        while Item.objects.filter(slug=unique_slug).exists():
            unique_slug = '{}-{}'.format(unique_slug, num)
            num += 1
        return unique_slug

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self._get_unique_slug()
        super(Item, self).save(*args, **kwargs)


class OrderItem(models.Model):
    user = models.ForeignKey(get_user_model(),
                             on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.item.title}"


class Order(models.Model):
    user = models.ForeignKey(get_user_model(),
                             on_delete=models.CASCADE)
    items = models.ManyToManyField(OrderItem)
    ordered = models.BooleanField(default=False)

    def __str__(self):
        return f"order of {self.user.email}"
