# Base Node.js image
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Install dependencies needed for bcrypt and other native modules
RUN apk add --no-cache libc6-compat python3 make g++ && \
    ln -sf /usr/bin/python3 /usr/bin/python
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables from build args
ARG APP_NAME
ARG APP_DESCRIPTION
ARG CONTACT_EMAIL
ARG CONTACT_PHONE
ARG ADMIN_EMAIL
ARG ADMIN_PASSWORD
ARG DATABASE_URL

ENV NEXT_PUBLIC_APP_NAME=$APP_NAME
ENV NEXT_PUBLIC_APP_DESCRIPTION=$APP_DESCRIPTION
ENV NEXT_PUBLIC_CONTACT_EMAIL=$CONTACT_EMAIL
ENV NEXT_PUBLIC_CONTACT_PHONE=$CONTACT_PHONE
ENV ADMIN_EMAIL=$ADMIN_EMAIL
ENV ADMIN_PASSWORD=$ADMIN_PASSWORD
ENV DATABASE_URL=$DATABASE_URL

# Install Python and create symlink
RUN apk add --no-cache python3 make g++ && \
    ln -sf /usr/bin/python3 /usr/bin/python

# Generate Prisma client
RUN npx prisma generate

# Create a temporary .env file for the build
RUN touch .env 
RUN echo "DATABASE_URL=$DATABASE_URL" >> .env
RUN echo "NEXT_PUBLIC_APP_NAME=$NEXT_PUBLIC_APP_NAME" >> .env
RUN echo "NEXT_PUBLIC_APP_DESCRIPTION=$NEXT_PUBLIC_APP_DESCRIPTION" >> .env
RUN echo "NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL" >> .env
RUN echo "NEXT_PUBLIC_CONTACT_PHONE=$NEXT_PUBLIC_CONTACT_PHONE" >> .env

# Add standalone mode to next.config.ts and disable type checking/linting
RUN sed -i "s/const nextConfig: NextConfig = {/const nextConfig: NextConfig = { output: 'standalone', eslint: { ignoreDuringBuilds: true }, typescript: { ignoreBuildErrors: true },/g" next.config.ts || echo "Failed to update next.config.ts, may need manual update"

# Explicitly rebuild bcrypt from source before building
RUN npm rebuild bcrypt --build-from-source

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build with telemetry disabled
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Install build dependencies for rebuilding bcrypt
RUN apk add --no-cache python3 make g++ && \
    ln -sf /usr/bin/python3 /usr/bin/python

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public files
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy package.json for reinstalling bcrypt
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Create scripts directory
RUN mkdir -p scripts

# Copy scripts and entrypoint script
COPY --from=builder /app/scripts ./scripts/
COPY --from=builder /app/docker-entrypoint.sh ./docker-entrypoint.sh

# Install only production deps and rebuild bcrypt specifically for the running architecture
RUN npm ci --omit=dev && npm rebuild bcrypt --build-from-source

# Copy prisma schema and migrations
COPY --from=builder /app/prisma ./prisma/

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# Start the application
CMD ["./docker-entrypoint.sh"]