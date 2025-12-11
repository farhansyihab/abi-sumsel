# Gunakan base image Python yang stabil dan ringan
FROM python:3.11-slim-bookworm

# Cegah Python menulis file .pyc dan buffer output
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
# Setel workdir untuk aplikasi
WORKDIR /app

# Install dependencies sistem yang diperlukan oleh Wagtail, Django, dan PostgreSQL client
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    libjpeg-dev \
    libwebp-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

# Salin dan install dependensi Python terlebih dahulu (untuk caching)
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Salin sisa kode proyek
COPY . .

# Salin script entrypoint untuk check database
COPY entrypoint.sh /app/
RUN sed -i 's/\r$//g' /app/entrypoint.sh && chmod +x /app/entrypoint.sh

# Expose port aplikasi Django
EXPOSE 8000

# Jalankan entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]