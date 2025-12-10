# home/views.py
from wagtail.views import serve
from django.http import HttpResponse

def custom_article_serve(request, path):
    """Custom serve untuk debug"""
    try:
        # Panggil original serve
        return serve(request, path)
    except Exception as e:
        import traceback
        return HttpResponse(f"""
        <h1>Wagtail Serve Error</h1>
        <pre>{traceback.format_exc()}</pre>
        <p>Path: {path}</p>
        """, status=500)

def direct_article_view(request, article_id):
    """View langsung tanpa Wagtail routing"""
    from home.models import ArticlePage
    from django.template.loader import render_to_string
    import traceback
    
    article = ArticlePage.objects.get(id=article_id)
    
    # Coba berbagai template
    templates = [
        'home/article_detail_test.html',
        'home/article_detail_simple.html',
        'home/article_detail.html'
    ]
    
    for template in templates:
        try:
            html = render_to_string(template, {'page': article, 'request': request})
            return HttpResponse(f"""
            <h2>Template: {template}</h2>
            <div style="border:2px solid green; padding:10px;">
                {html}
            </div>
            """)
        except Exception as e:
            return HttpResponse(f"""
            <h2>Error in {template}</h2>
            <pre>{traceback.format_exc()}</pre>
            """)