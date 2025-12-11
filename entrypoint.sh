#!/bin/bash
# entrypoint.sh
# Script ini akan dijalankan saat container 'web' dimulai.
# Utamanya untuk menunggu koneksi ke database eksternal siap (opsional).

set -e

echo "🚀 Starting Wagtail App Container..."

# Jika Anda ingin menambahkan health check untuk DB Supabase (opsional, bisa di-comment)
# echo "Checking database connection..."
# UNTUK SUPABASE/POSTGRES EKSTERNAL:
# Anda bisa menambahkan logika untuk test koneksi database di sini jika perlu.
# Contoh: python -c "import psycopg2; psycopg2.connect(host='${DB_HOST}', dbname='${DB_NAME}', user='${DB_USER}', password='${DB_PASSWORD}')"
# echo "Database is ready."

# Jalankan perintah yang diberikan ke container (CMD dari Dockerfile)
exec "$@"