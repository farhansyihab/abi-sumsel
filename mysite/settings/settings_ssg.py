from .base import * # Import semua konfigurasi dari base.py

# Override untuk SSG
BUILD_DIR = os.path.join(BASE_DIR, 'public')
BAKERY_MULTISITE = False
BAKERY_VIEWS = (
'wagtailbakery.views.AllPublishedPagesView',
)
# STATIC_ROOT diubah untuk build
STATIC_ROOT = os.path.join(BUILD_DIR, 'static') # /path/to/project/public/static

# Anda mungkin juga ingin menonaktifkan fitur yang tidak relevan untuk build
DEBUG = os.environ.get('DEBUG').lower().strip() == 'true'
# LOGGING = {...} # Sesuaikan logging jika perlu