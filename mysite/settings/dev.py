from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG', '').lower().strip() == 'true'

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-lbw3h)u8a)b+tuz3td%(b4+9d4826i$0jmnf1@)zhyqpb0pp)-"

# SECURITY WARNING: define the correct hosts in production!
ALLOWED_HOSTS  = [
    'abi-sumsel.my.id',
    'abi-sumsel-1016790426168.asia-southeast2.run.app',
    'abi-ssr.onrender.com',
    'shrill-butterfly-d4ea.agiptek.workers.dev',
    'abisumselorg.web.app',
    'localhost',
    '127.0.0.1', 
]

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"


try:
    from .local import *
except ImportError:
    pass
