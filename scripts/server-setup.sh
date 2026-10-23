#!/bin/bash
# ============================================================
# Server setup script for nszbd.uz VDS (Ubuntu)
# Run once as root or with sudo
# ============================================================
set -e

REPO="https://github.com/Istamjon/nszbd.uz.git"
APP_DIR="/home/xushnudbek712x/nszbd.uz"
DOMAIN_FRONTEND="nszbd.uz"
DOMAIN_ADMIN="admin.nszbd.uz"

echo "══════════════════════════════════════"
echo " nszbd.uz — Server Setup Script"
echo "══════════════════════════════════════"

# ── 1. Update system ────────────────────────────────────────
echo "[1/9] Updating system packages..."
apt-get update -q && apt-get upgrade -yq

# ── 2. Install Docker ───────────────────────────────────────
echo "[2/9] Installing Docker..."
if ! command -v docker &>/dev/null; then
    curl -fsSL https://get.docker.com | bash
    systemctl enable docker
    systemctl start docker
fi

# ── 3. Install Docker Compose ───────────────────────────────
echo "[3/9] Installing Docker Compose plugin..."
apt-get install -yq docker-compose-plugin

# ── 4. Install Git ──────────────────────────────────────────
echo "[4/9] Installing Git..."
apt-get install -yq git

# ── 5. Clone repository ─────────────────────────────────────
echo "[5/9] Cloning repository..."
if [ -d "$APP_DIR" ]; then
    echo "  Directory already exists — pulling latest..."
    cd "$APP_DIR" && git pull
else
    git clone "$REPO" "$APP_DIR"
fi
cd "$APP_DIR"

# ── 6. Create .env from example ─────────────────────────────
echo "[6/9] Setting up .env file..."
if [ ! -f ".env" ]; then
    cp .env.production.example .env
    echo ""
    echo "⚠️  IMPORTANT: Edit .env file with your actual secrets!"
    echo "   nano $APP_DIR/.env"
    echo ""
    echo "   Then run this script again with --skip-setup flag"
    echo "   or manually run: docker compose up -d"
    echo ""
    read -p "Press ENTER after editing .env to continue, or Ctrl+C to exit..."
fi

# ── 7. Configure Nginx for SSL (host nginx for certbot) ─────
echo "[7/9] Configuring Nginx for SSL certificate..."
# Nginx must already be installed (as stated by user)
# Create temporary HTTP-only config for certbot challenge
cat > /etc/nginx/sites-available/nszbd << 'NGINX_CONF'
server {
    listen 80;
    server_name nszbd.uz www.nszbd.uz admin.nszbd.uz;

    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
    location / {
        return 200 "OK";
    }
}
NGINX_CONF

ln -sf /etc/nginx/sites-available/nszbd /etc/nginx/sites-enabled/nszbd
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# ── 8. Obtain SSL certificates ──────────────────────────────
echo "[8/9] Obtaining SSL certificates via Certbot..."
if [ ! -f "/etc/letsencrypt/live/$DOMAIN_FRONTEND/fullchain.pem" ]; then
    certbot --nginx \
        -d "$DOMAIN_FRONTEND" \
        -d "www.$DOMAIN_FRONTEND" \
        -d "$DOMAIN_ADMIN" \
        --non-interactive \
        --agree-tos \
        --email admin@nszbd.uz \
        --redirect
    echo "✅ SSL certificates obtained!"
else
    echo "✅ SSL certificates already exist — skipping."
fi

# ── 9. Stop host nginx, start Docker stack ──────────────────
echo "[9/9] Starting Docker services..."
# Stop host nginx — Docker container nginx takes over ports 80/443
systemctl stop nginx
systemctl disable nginx

docker compose up -d --build

echo ""
echo "══════════════════════════════════════"
echo " ✅ Setup complete!"
echo "══════════════════════════════════════"
echo " Frontend : https://$DOMAIN_FRONTEND"
echo " Admin CMS: https://$DOMAIN_ADMIN"
echo ""
echo " Useful commands:"
echo "   docker compose ps           — service status"
echo "   docker compose logs -f      — live logs"
echo "   docker compose restart      — restart all"
echo "   docker compose exec elmapi php artisan migrate"
echo "══════════════════════════════════════"
