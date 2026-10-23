# ============================================================
# ElmapiCMS — Production Dockerfile (PHP 8.4 + Nginx unit/FPM)
# ============================================================
FROM php:8.4-fpm-alpine AS base

# System dependencies
RUN apk add --no-cache \
    bash curl git unzip libpng-dev libjpeg-turbo-dev freetype-dev \
    libzip-dev oniguruma-dev icu-dev linux-headers \
    nodejs npm

# PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
 && docker-php-ext-install -j$(nproc) \
    pdo_mysql mysqli bcmath gd intl zip opcache pcntl

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# ── PHP config optimizations ──────────────────
RUN { \
    echo "opcache.enable=1"; \
    echo "opcache.memory_consumption=256"; \
    echo "opcache.max_accelerated_files=20000"; \
    echo "opcache.validate_timestamps=0"; \
    echo "opcache.revalidate_freq=0"; \
} > /usr/local/etc/php/conf.d/opcache.ini

# ── Dependencies ──────────────────────────────
FROM base AS vendor

COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --no-scripts \
    --no-autoloader \
    --prefer-dist \
    --quiet

COPY . .
RUN composer dump-autoload --optimize --no-dev

# ── Build frontend assets ─────────────────────
FROM vendor AS assets
RUN npm ci && npm run build

# ── Final runner ─────────────────────────────
FROM base AS runner

COPY --from=assets /var/www/html /var/www/html

RUN chown -R www-data:www-data storage bootstrap/cache \
 && chmod -R 775 storage bootstrap/cache

# Create storage symlink placeholder (run artisan storage:link after first boot)
RUN mkdir -p public/uploads

# Entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 9000
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]
