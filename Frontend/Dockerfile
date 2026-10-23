# ============================================================
# Stage 1: Dependencies
# ============================================================
FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# ============================================================
# Stage 2: Builder
# ============================================================
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time env (public vars only — secrets injected at runtime)
ARG NEXT_PUBLIC_SITE_URL=https://nszbd.uz
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# Server-side vars needed at build time for Next.js static analysis
# These are placeholder values — real values injected at runtime via docker-compose
ARG ELMAPI_BASE_URL=http://placeholder-build-only/api
ARG ELMAPI_PROJECT_ID=placeholder
ARG ELMAPI_API_KEY=placeholder
ENV ELMAPI_BASE_URL=$ELMAPI_BASE_URL
ENV ELMAPI_PROJECT_ID=$ELMAPI_PROJECT_ID
ENV ELMAPI_API_KEY=$ELMAPI_API_KEY

RUN npm run build

# ============================================================
# Stage 3: Runner (production image)
# ============================================================
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Add non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copy only what's needed to run
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
