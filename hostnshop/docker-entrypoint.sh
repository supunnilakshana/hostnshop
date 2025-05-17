#!/bin/sh
set -e

# Run Prisma migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Generate Prisma client to ensure it's available at runtime
echo "Generating Prisma client..."
npx prisma generate

# Check if admin user needs to be created
if [ -n "$ADMIN_EMAIL" ] && [ -n "$ADMIN_PASSWORD" ]; then
  echo "Creating/updating admin user..."
  node ./scripts/create-admin-user.js
fi

# Apply branding configuration
if [ -n "$NEXT_PUBLIC_APP_NAME" ] || [ -n "$NEXT_PUBLIC_APP_DESCRIPTION" ] || [ -n "$NEXT_PUBLIC_CONTACT_EMAIL" ] || [ -n "$NEXT_PUBLIC_CONTACT_PHONE" ]; then
  echo "Applying branding configuration..."
  node ./scripts/configure-branding.js
fi

# Start the Next.js application
echo "Starting HostNShop application..."
exec node server.js