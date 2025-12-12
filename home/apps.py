from django.apps import AppConfig
from django.db.backends.signals import connection_created
from django.dispatch import receiver


class HomeConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "home"

    def ready(self):
        @receiver(connection_created)
        def setup_postgres_connection(sender, connection, **kwargs):
            if connection.vendor == 'postgresql':
                with connection.cursor() as cursor:
                    cursor.execute("SET search_path TO public;")    
