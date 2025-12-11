# Procfile
# File ini untuk menginstruksikan platform PaaS bagaimana menjalankan aplikasi.
# Isi ini bergantung pada target deployment Anda.

web: gunicorn --bind 0.0.0.0:$PORT --workers 2 --threads 4 --timeout 120 mysite.wsgi:application
release: python manage.py migrate --noinput
# Jika Anda punya task lain seperti collectstatic, bisa tambah di sini.
# Contoh: release: python manage.py migrate && python manage.py collectstatic --noinput