# mysite/settings/settings_ssg.py

from .base import *
import os

BUILD_DIR = os.path.join(BASE_DIR, 'public')
BAKERY_MULTISITE = False
BAKERY_VIEWS = (
    'wagtailbakery.views.AllPublishedPagesView',
)

# Hanya gunakan FileSystemFinder — jangan ambil static dari app (admin, dll)
STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    # 'django.contrib.staticfiles.finders.AppDirectoriesFinder',  <-- DIHAPUS
]

# Tidak ada direktori static tambahan
STATICFILES_DIRS = []

# Tetap definisikan STATIC_ROOT (diperlukan oleh collectstatic)
STATIC_ROOT = os.path.join(BUILD_DIR, 'static')

DEBUG = False