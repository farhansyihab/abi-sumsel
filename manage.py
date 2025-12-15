#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from pathlib import Path # Import pathlib untuk membantu manipulasi path

# --- TAMBAHKAN BAGIAN INI UNTUK MEMUAT .ENV.DEV ---
# Cek apakah file .env.dev ada di direktori yang sama dengan manage.py
env_dev_path = Path(__file__).parent / ".env.dev" # Mencari .env.dev di direktori yang sama dengan manage.py

if env_dev_path.exists():
    print(f"Memuat konfigurasi dari file: {env_dev_path}") # Log opsional
    # Gunakan python-dotenv untuk memuat file ke environment proses
    try:
        from dotenv import load_dotenv
        load_dotenv(dotenv_path=str(env_dev_path)) # Konversi Path ke string
        print("File .env.dev berhasil dimuat ke environment.")
    except ImportError:
        print("python-dotenv tidak ditemukan. Instal dengan 'pip install python-dotenv'")
        # Jika python-dotenv tidak ada, Anda bisa memberikan pesan error
        # atau melanjutkan (meskipun kemungkinan besar konfigurasi akan gagal)
        # raise
    except Exception as e:
        print(f"Error saat memuat .env.dev: {e}")
        # Tangani error lain saat memuat file
        raise
else:
    print("File .env.dev tidak ditemukan di direktori proyek.")

# --------------------------------------------------

def main():
    """Run administrative tasks."""
    # os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings.production")
    # Kita tetap gunakan setdefault agar tidak ditimpa jika sudah diset di shell
    # Tetapi sekarang nilai-nilai yang dibutuhkan oleh settings.py
    # seharusnya sudah ada di environment proses karena load_dotenv di atas.
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings.production")

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()