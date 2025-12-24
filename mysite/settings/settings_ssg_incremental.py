# mysite/settings/settings_ssg_incremental.py
from .base import *
import os

BUILD_DIR = os.path.join(BASE_DIR, 'public')
BAKERY_MULTISITE = False

# Custom view untuk 3 halaman terakhir
BAKERY_VIEWS = (
    'mysite.views.incremental.LastThreePagesView',  # Akan kita buat
)

STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
]

STATICFILES_DIRS = []
STATIC_ROOT = os.path.join(BUILD_DIR, 'static')

DEBUG = False