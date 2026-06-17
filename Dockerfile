# syntax=docker/dockerfile:1

# Debian-slim (glibc) base — matches the native binaries that the lockfile
# resolves on most CI/dev hosts, avoiding musl/WASM optional-dep drift that
# breaks `npm ci` on Alpine (lightningcss, @tailwindcss/oxide, rolldown).

# ---- Dependencies ----
FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# Align npm with the version that authored the lockfile (node:22-slim ships
# npm 10) so `npm ci` reads it consistently.
RUN npm install -g npm@11.6.1 && npm ci

# ---- Builder ----
FROM node:22-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- Runner ----
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

# Standalone output bundles the server + only the needed node_modules.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
