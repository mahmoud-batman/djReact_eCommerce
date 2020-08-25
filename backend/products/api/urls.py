from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('', ItemView.as_view(), name="item-list"),
    path('<uuid:pk>/', ItemDetailView.as_view(), name='product-detail'),
    path('add-to-cart/', AddToCart.as_view(), name='add-to-cart'),
]
