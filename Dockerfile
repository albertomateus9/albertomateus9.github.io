# syntax=docker/dockerfile:1.7

ARG NODE_IMAGE=node:22-alpine3.23@sha256:8516dce0483394d5708d4b2ee6cacb79fb1d617ea4e2787c2120bcca92ce372e

FROM ${NODE_IMAGE} AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

FROM base AS dependencies
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
LABEL org.opencontainers.image.source="https://github.com/albertomateus9/albertomateus9.github.io" \
      org.opencontainers.image.title="Alberto Mateus Portfolio" \
      org.opencontainers.image.description="Next.js standalone portfolio runtime"

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 --ingroup nodejs nextjs \
  && mkdir -p /app/.next/cache \
  && chown -R nextjs:nodejs /app \
  && rm -rf /usr/local/lib/node_modules/npm /opt/yarn-* \
  && rm -f /usr/local/bin/npm /usr/local/bin/npx \
    /usr/local/bin/yarn /usr/local/bin/yarnpkg \
    /usr/local/bin/corepack

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER 1001:1001
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:3000/api/health').then((response)=>{if(!response.ok)process.exit(1)}).catch(()=>process.exit(1))"]

CMD ["node", "server.js"]
