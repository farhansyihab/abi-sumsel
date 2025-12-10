# home/views.py
from django.http import JsonResponse, HttpResponse
from django.core.paginator import Paginator
from home.models import ArticlePage, ArticleIndexPage

def debug_articles(request):
    """View untuk debugging artikel"""
    data = {
        'total_articles': ArticlePage.objects.live().count(),
        'articles': list(ArticlePage.objects.live().values('id', 'title', 'date_published', 'category')),
        'index_pages': list(ArticleIndexPage.objects.live().values('id', 'title')),
    }
    
    # Cek jika ada index page
    try:
        index = ArticleIndexPage.objects.live().first()
        if index:
            data['index_articles'] = list(index.get_articles().values('id', 'title'))
            data['index_url'] = index.url
    except Exception as e:
        data['index_error'] = str(e)
    
    return JsonResponse(data)

def debug_article_detail(request, article_id):
    """Debug detail artikel"""
    try:
        article = ArticlePage.objects.get(id=article_id)
        context = article.get_context(request)
        
        return HttpResponse(f"""
        <h1>Debug Article: {article.title}</h1>
        <p>ID: {article.id}</p>
        <p>Published: {article.date_published}</p>
        <p>Category: {article.category}</p>
        <p>Live: {article.live}</p>
        <p>URL: {article.url}</p>
        <p>Parent: {article.get_parent().title}</p>
        
        <h2>Context Keys:</h2>
        <pre>{list(context.keys())}</pre>
        
        <h2>Latest Articles:</h2>
        <pre>{list(context.get('latest_articles', []).values_list('title', flat=True))}</pre>
        
        <a href="{article.url}">View Article</a>
        """)
    except Exception as e:
        return HttpResponse(f"Error: {str(e)}")
    
# home/views.py
def test_basic_view(request, article_id):
    """View paling dasar tanpa template"""
    from home.models import ArticlePage
    
    article = ArticlePage.objects.get(id=article_id)
    
    # Langsung return string
    return HttpResponse(f"""
    <html>
    <body>
        <h1>Basic View Test</h1>
        <p>Title: {article.title}</p>
        <p>Body exists: {bool(article.body)}</p>
        <p>Body type: {type(article.body)}</p>
        <p>Body length: {len(article.body) if article.body else 0}</p>
        
        <h2>Render body directly:</h2>
        <div style="border:1px solid red; padding:10px;">
            {str(article.body)[:500]}
        </div>
    </body>
    </html>
    """)    