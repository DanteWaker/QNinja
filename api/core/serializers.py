from rest_framework import serializers
from rest_framework.authtoken.models import Token

from djoser.serializers import TokenSerializer as DjoserTokenSerializer

from core.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name"]


class CurrentUserSerializer(serializers.ModelSerializer):
    groups = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = User
        exclude = ("password", "user_permissions")
        read_only_fields = (
            "id",
            "email",
            "is_superuser",
            "is_active",
            "is_admin",
            "date_joined",
            "last_login",
        )


class TokenSerializer(DjoserTokenSerializer):
    user = CurrentUserSerializer(read_only=True, many=False)

    class Meta:
        model = Token
        fields = ("auth_token", "user")
