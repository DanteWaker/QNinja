from rest_framework import routers

from .views import EssayCorrectionViewSet, EssayViewSet, EssayThemeViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register("essay", EssayViewSet)
router.register("correction", EssayCorrectionViewSet)
router.register("theme", EssayThemeViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
