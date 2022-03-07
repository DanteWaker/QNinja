from django.contrib import admin

from essay.models import (
    EssayTheme,
    Essay,
    EssayCorrection,
)


class EssayThemeAdmin(admin.ModelAdmin):
    pass


class EssayAdmin(admin.ModelAdmin):
    pass


class EssayCorrectionAdmin(admin.ModelAdmin):
    pass


admin.site.register(EssayTheme, EssayThemeAdmin)
admin.site.register(Essay, EssayAdmin)
admin.site.register(EssayCorrection, EssayCorrectionAdmin)
