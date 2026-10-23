#!/bin/bash
set -e

echo "==> Running Laravel setup..."

# Cache config/routes/views for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations (safe — will skip if up-to-date)
php artisan migrate --force

# Create storage symlink if not exists
php artisan storage:link 2>/dev/null || true

# Start queue worker in background
php artisan queue:work --sleep=3 --tries=3 --daemon &

echo "==> Starting PHP-FPM..."
exec "$@"
