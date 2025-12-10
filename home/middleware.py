# home/middleware.py
import traceback
from django.http import HttpResponse

class DebugMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            response = self.get_response(request)
            return response
        except Exception as e:
            # Tangkap semua exception dan tampilkan
            error_html = f"""
            <!DOCTYPE html>
            <html>
            <head><title>Error Debug</title></head>
            <body style="font-family: Arial; padding: 20px; background: #f8d7da;">
                <h1>💥 ERROR: {type(e).__name__}</h1>
                <h2>{str(e)}</h2>
                <h3>Traceback:</h3>
                <pre style="background: white; padding: 15px; border: 1px solid red;">
                {traceback.format_exc()}
                </pre>
                <h3>Request Info:</h3>
                <p>Path: {request.path}</p>
                <p>Method: {request.method}</p>
            </body>
            </html>
            """
            return HttpResponse(error_html, status=500)