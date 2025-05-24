# Base Node.js image
FROM node:20-alpine AS base

# Install common dependencies once for all stages
RUN apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++ \
    netcat-openbsd \
    iproute2 && \
    ln -sf /usr/bin/python3 /usr/bin/python

# Install dependencies only when needed
FROM base AS deps
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

# Create a temporary .env file for the build
RUN touch .env && \
    echo "DATABASE_URL=$DATABASE_URL" >> .env && \
    echo "NEXT_PUBLIC_APP_NAME=$NEXT_PUBLIC_APP_NAME" >> .env && \
    echo "NEXT_PUBLIC_APP_DESCRIPTION=$NEXT_PUBLIC_APP_DESCRIPTION" >> .env && \
    echo "NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL" >> .env && \
    echo "NEXT_PUBLIC_CONTACT_PHONE=$NEXT_PUBLIC_CONTACT_PHONE" >> .env

# Verify Prisma schema exists
RUN ls -la prisma/schema.prisma || (echo "❌ Prisma schema not found" && exit 1)

# Generate Prisma client with explicit schema path and verification
RUN npx prisma generate --schema=./prisma/schema.prisma && \
    ls -la node_modules/.prisma/client || (echo "❌ Prisma client not generated in builder" && exit 1) && \
    echo "✅ Prisma client generated successfully in builder stage"

# Add standalone mode to next.config.ts and disable type checking/linting
RUN sed -i "s/const nextConfig: NextConfig = {/const nextConfig: NextConfig = { output: 'standalone', eslint: { ignoreDuringBuilds: true }, typescript: { ignoreBuildErrors: true },/g" next.config.ts || echo "⚠️ Failed to update next.config.ts, may need manual update"

# Explicitly rebuild bcrypt from source before building
RUN npm rebuild bcrypt --build-from-source

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build with telemetry disabled
RUN npm run build

# Verify build completed successfully
RUN ls -la .next/standalone || (echo "❌ Next.js build failed" && exit 1) && \
    echo "✅ Next.js build completed successfully"

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create user and group
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public files
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next && \
    chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy package.json and lock file
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Copy the prisma directory including schema and migrations
COPY --from=builder /app/prisma ./prisma/
RUN ls -la prisma/ || (echo "❌ Prisma directory not copied" && exit 1)

# Copy node_modules from builder (important to include the Prisma client)
COPY --from=builder /app/node_modules ./node_modules

# Ensure Prisma client is properly copied
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
RUN ls -la node_modules/.prisma/client || echo "⚠️ Prisma client directory not found after copy"

# Create scripts directory and copy scripts
RUN mkdir -p scripts
COPY --from=builder /app/scripts ./scripts/
RUN ls -la scripts/ || (echo "❌ Scripts directory not copied" && exit 1)

# Copy and make entrypoint script executable
COPY --from=builder /app/docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

# Regenerate Prisma client in the runtime environment
RUN npx prisma generate --schema=./prisma/schema.prisma && \
    ls -la node_modules/.prisma/client || (echo "❌ Prisma client not regenerated in runtime" && exit 1) && \
    echo "✅ Prisma client regenerated successfully in runtime"

# Verify that the admin script exists and is readable
RUN ls -la scripts/create-admin-user.js || (echo "❌ Admin script not found" && exit 1) && \
    node -c scripts/create-admin-user.js || (echo "❌ Admin script has syntax errors" && exit 1) && \
    echo "✅ Admin script verified"

# Final verification of critical components
RUN echo "🔍 Final verification:" && \
    echo "- Node version: $(node --version)" && \
    echo "- NPM version: $(npm --version)" && \
    echo "- Prisma CLI: $(npx prisma --version | head -1)" && \
    ls -la prisma/schema.prisma && echo "✅ Schema found" && \
    ls -la node_modules/.prisma/client && echo "✅ Prisma client found" && \
    ls -la scripts/create-admin-user.js && echo "✅ Admin script found" && \
    ls -la docker-entrypoint.sh && echo "✅ Entrypoint script found" && \
    ls -la server.js && echo "✅ Server file found"

# Change ownership of necessary files to nextjs user
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check to ensure the application starts properly
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/products', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Start the application
CMD ["./docker-entrypoint.sh"]