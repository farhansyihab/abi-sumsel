# mysite/views/incremental.py
from wagtailbakery.views import AllPublishedPagesView
from wagtail.models import Page
from django.http import HttpResponse

class LastThreePagesView(AllPublishedPagesView):
    """
    View untuk baking hanya 3 halaman terakhir yang dipublikasi
    """
    def get_queryset(self):
        # Panggil parent queryset terlebih dahulu untuk memastikan query dasar benar
        # Kemambil ambil hanya 3 halaman terakhir
        return super().get_queryset().order_by('-last_published_at')[:3]
    
    def get_pages(self):
        """Override untuk mengambil halaman spesifik"""
        return self.get_queryset()