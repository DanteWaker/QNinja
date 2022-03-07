from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from rest_framework.schemas import get_schema_view

schema_view = get_schema_view(
    title="Questões Ninja",
    description="API do sistema Questões Ninja.",
    version="1.0.0",
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("essay.urls")),
    path("api/openapi/", schema_view, name="openapi-schema"),
    path(
        "api/schema/",
        TemplateView.as_view(template_name="swagger-ui.html"),
        name="api-schema",
    ),
]

# djoser urls
urlpatterns += [
    url(r"^api/", include("djoser.urls")),
    url(r"^api/", include("djoser.urls.authtoken")),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
    )  # Not for production
