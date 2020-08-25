from rest_framework import serializers

from django.contrib.auth import get_user_model

"""change the default User serializer used by rest-auth"""


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ['id', 'email']
