#!/bin/sh
set -e

echo "🚀 Starting HostNShop application setup..."
echo "Current directory: $(pwd)"
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

# Debug environment variables
echo "🔍 Environment check:"
echo "DATABASE_URL: ${DATABASE_URL}"
echo "NODE_ENV: ${NODE_ENV}"

# Check if required files exist
echo "📋 Checking required files..."
if [ ! -f "prisma/schema.prisma" ]; then
    echo "❌ Prisma schema not found!"
    exit 1
fi

if [ ! -f "package.json" ]; then
    echo "❌ package.json not found!"
    exit 1
fi

echo "✅ Required files found"

# Extract database connection details for testing
DB_HOST=$(echo $DATABASE_URL | sed -n 's/.*@\([^:]*\):.*/\1/p')
DB_PORT=$(echo $DATABASE_URL | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')

echo "🔍 Database connection details:"
echo "Host: $DB_HOST"
echo "Port: $DB_PORT"

# Test basic network connectivity first
echo "🌐 Testing network connectivity to database..."
timeout=60
counter=0

while ! nc -z "$DB_HOST" "$DB_PORT" 2>/dev/null; do
    counter=$((counter + 1))
    if [ $counter -ge $timeout ]; then
        echo "❌ Cannot reach database host $DB_HOST:$DB_PORT after ${timeout} seconds"
        echo "🔍 Network debugging:"
        echo "Available hosts:"
        getent hosts || echo "getent not available"
        echo "Network interfaces:"
        ip addr show || ifconfig || echo "No network tools available"
        exit 1
    fi
    echo "⏳ Waiting for network connectivity... (${counter}/${timeout})"
    sleep 1
done

echo "✅ Network connectivity to database established"

# Test Prisma connection specifically
echo "🔍 Testing Prisma database connection..."
counter=0
while ! npx prisma db pull --force 2>/dev/null; do
    counter=$((counter + 1))
    if [ $counter -ge 30 ]; then
        echo "❌ Prisma cannot connect to database after 30 attempts"
        echo "🔍 Debugging Prisma connection:"
        echo "Trying manual connection test..."
        npx prisma db pull --force || echo "Manual test also failed"
        
        # Try alternative connection test
        echo "Trying alternative connection method..."
        node -e "
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient();
        prisma.\$connect()
          .then(() => { console.log('✅ Direct Prisma connection successful'); process.exit(0); })
          .catch(err => { console.log('❌ Direct Prisma connection failed:', err.message); process.exit(1); })
        " || echo "Direct connection failed"
        
        exit 1
    fi
    echo "⏳ Testing Prisma connection... (${counter}/30)"
    sleep 2
done

echo "✅ Prisma database connection successful"

# Run Prisma migrations
echo "🔄 Running database migrations..."
npx prisma migrate deploy || {
    echo "⚠️ Migration failed, attempting to push schema..."
    npx prisma db push --accept-data-loss || {
        echo "❌ Both migration and push failed"
        exit 1
    }
}

echo "✅ Database schema is ready"

# Generate Prisma client with verification
echo "⚙️ Generating Prisma client..."
npx prisma generate --schema=./prisma/schema.prisma

# Verify client was generated
if [ ! -d "node_modules/.prisma/client" ]; then
    echo "❌ Prisma client was not generated properly"
    exit 1
fi

echo "✅ Prisma client generated successfully"

# Wait a moment for file system to catch up
sleep 2

# Final connection test before proceeding
echo "🔍 Final database connection verification..."
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.\$connect()
  .then(() => { 
    console.log('✅ Final connection test successful'); 
    return prisma.\$disconnect(); 
  })
  .then(() => process.exit(0))
  .catch(err => { 
    console.log('❌ Final connection test failed:', err.message); 
    process.exit(1); 
  })
" || {
    echo "❌ Final connection test failed"
    exit 1
}

# Create admin user if environment variables are provided
if [ -n "$ADMIN_EMAIL" ] && [ -n "$ADMIN_PASSWORD" ]; then
    echo "👤 Creating/updating admin user..."
    node scripts/create-admin-user.js || {
        echo "❌ Failed to create admin user"
        exit 1
    }
    echo "✅ Admin user setup completed"
else
    echo "⚠️ Admin credentials not provided, skipping admin user creation"
fi

# Apply branding configuration
if [ -n "$NEXT_PUBLIC_APP_NAME" ] || [ -n "$NEXT_PUBLIC_APP_DESCRIPTION" ] || [ -n "$NEXT_PUBLIC_CONTACT_EMAIL" ] || [ -n "$NEXT_PUBLIC_CONTACT_PHONE" ]; then
    echo "🎨 Applying branding configuration..."
    node scripts/configure-branding.js || {
        echo "⚠️ Branding configuration failed, continuing anyway..."
    }
    echo "✅ Branding configuration completed"
fi

# Final verification
echo "🔍 Final system verification..."
echo "Prisma client status:"
ls -la node_modules/.prisma/client/ || echo "❌ Prisma client directory not found"

# Start the Next.js application
echo "🚀 Starting HostNShop application..."
exec node server.js