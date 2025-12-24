from .base import *

DEBUG = False
SECURE_CONTENT_TYPE_NOSNIFF = False

# # Wagtail versioning
# WAGTAILADMIN_STATIC_FILE_VERSION_STRINGS = False  # ← HARUS False

# # Untuk kompatibilitas dengan versi Wagtail berbeda
# WAGTAIL_STATIC_FILES_VERSION = None
# WAGTAIL_STATIC_FILES_CACHE_BUSTER = None
# ManifestStaticFilesStorage is recommended in production, to prevent
# outdated JavaScript / CSS assets being served from cache
# (e.g. after a Wagtail upgrade).
# See https://docs.djangoproject.com/en/6.0/ref/contrib/staticfiles/#manifeststaticfilesstorage
# DEBUG = os.environ.get('DEBUG', '').lower().strip() == 'true'
# STORAGES["staticfiles"]["BACKEND"] = "django.contrib.staticfiles.storage.ManifestStaticFilesStorage"
# STORAGES["staticfiles"]["BACKEND"] = "django.contrib.staticfiles.storage.StaticFilesStorage"
STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
        # "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",  # ← INI!
    },
}

try:
    from .local import *
except ImportError:
    pass
