from django.conf import settings
from django.urls import include, path
from django.contrib import admin

from wagtail.admin import urls as wagtailadmin_urls
from wagtail import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls

from search import views as search_views

# Import debug views
from home.views import debug_articles, debug_article_detail, test_basic_view

urlpatterns = [
    path("django-admin/", admin.site.urls),
    path("admin/", include(wagtailadmin_urls)),
    path("documents/", include(wagtaildocs_urls)),
    path("search/", search_views.search, name="search"),
    
    # Debug URLs - HARUS diletakkan SEBELUM wagtail_urls
    path("debug/articles/", debug_articles, name="debug_articles"),
    path("debug/article/<int:article_id>/", debug_article_detail, name="debug_article_detail"),
    path("test/basic/<int:article_id>/", test_basic_view, name="test_basic"),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Wagtail catch-all harus yang TERAKHIR
urlpatterns = urlpatterns + [
    path("", include(wagtail_urls)),
]