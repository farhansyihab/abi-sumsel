from django.conf import settings
from django.urls import include, path
from django.contrib import admin
from django.http import JsonResponse

from wagtail.admin import urls as wagtailadmin_urls
from wagtail import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls

from search import views as search_views
from home.views import debug_articles, debug_article_detail, test_basic_view, health_check

from wagtail.api.v2.views import PagesAPIViewSet
from wagtail.api.v2.router import WagtailAPIRouter
from wagtail.images.api.v2.views import ImagesAPIViewSet
from wagtail.documents.api.v2.views import DocumentsAPIViewSet

# ========== API CONFIGURATION ==========
# Buat router API
api_router = WagtailAPIRouter('wagtailapi')

# Register endpoints
api_router.register_endpoint('pages', PagesAPIViewSet)
api_router.register_endpoint('images', ImagesAPIViewSet)
api_router.register_endpoint('documents', DocumentsAPIViewSet)

# View untuk root API
def api_root(request):
    """Root endpoint untuk API v2"""
    return JsonResponse({
        'message': 'Wagtail API v2',
        'endpoints': {
            'pages': '/api/v2/pages/',
            'images': '/api/v2/images/',
            'documents': '/api/v2/documents/',
        },
        'documentation': 'https://docs.wagtail.org/en/stable/advanced_topics/api/v2/'
    })

# ========== URL PATTERNS ==========
urlpatterns = [
    # ===== ADMIN =====
    path("django-admin/", admin.site.urls),
    path("admin/", include(wagtailadmin_urls)),
    path("documents/", include(wagtaildocs_urls)),
    path('health/', health_check, name='health_check'), # Tambahkan baris ini
    
    # ===== SEARCH =====
    path("search/", search_views.search, name="search"),
    
    # ===== DEBUG ENDPOINTS =====
    path("debug/articles/", debug_articles, name="debug_articles"),
    path("debug/article/<int:article_id>/", debug_article_detail, name="debug_article_detail"),
    path("test/basic/<int:article_id>/", test_basic_view, name="test_basic"),

    # ===== API ENDPOINTS =====
    # Root API endpoint
    path("api/v2/", api_root, name='api_v2_root'),
    
    # Wagtail API endpoints - SOLUSI 2: Langsung tanpa include()
    path("api/v2/", api_router.urls),
    
    # Django REST Framework browsable API auth
    path('api-auth/', include('rest_framework.urls')),
]

# ========== DEVELOPMENT STATIC/MEDIA FILES ==========
if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static files
    urlpatterns += staticfiles_urlpatterns()
    
    # Serve media files
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# ========== WAGTAIL CATCH-ALL (MUST BE LAST!) ==========
# Ini harus selalu di akhir karena menangkap semua URL
urlpatterns = urlpatterns + [
    path("", include(wagtail_urls)),
]