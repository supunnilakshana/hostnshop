Project Path: hostnshop

Source Tree:

```
hostnshop
├── postcss.config.mjs
├── prisma
│   ├── migrations
│   │   ├── migration_lock.toml
│   │   ├── 20250203144713_init
│   │   │   └── migration.sql
│   │   └── 20250311114621_add_promo_banner_models
│   │       └── migration.sql
│   └── schema.prisma
├── README.md
├── tailwind.config.ts
├── package.json
├── components.json
├── tsconfig.json
├── eslint.config.mjs
├── next.config.ts
└── src
    ├── app
    │   ├── favicon.ico
    │   ├── products
    │   │   ├── [id]
    │   │   │   └── page.tsx
    │   │   └── page.tsx
    │   ├── about-us
    │   │   └── page.tsx
    │   ├── auth
    │   │   ├── register
    │   │   │   └── page.tsx
    │   │   └── login
    │   │       └── page.tsx
    │   ├── admin
    │   │   ├── home
    │   │   │   └── page.tsx
    │   │   ├── products
    │   │   │   └── page.tsx
    │   │   ├── category
    │   │   │   └── page.tsx
    │   │   ├── orders
    │   │   │   └── page.tsx
    │   │   └── login
    │   │       └── page.tsx
    │   ├── checkout
    │   │   └── page.tsx
    │   ├── profile
    │   │   └── page.tsx
    │   ├── layout.tsx
    │   ├── contact-us
    │   │   └── page.tsx
    │   ├── cart
    │   │   └── page.tsx
    │   ├── api
    │   │   ├── products
    │   │   │   └── route.ts
    │   │   ├── auth
    │   │   │   ├── signup
    │   │   │   │   └── route.ts
    │   │   │   └── signin
    │   │   │       └── route.ts
    │   │   └── categories
    │   │       └── route.ts
    │   ├── page.tsx
    │   └── globals.css
    ├── data_access
    │   ├── db_client
    │   │   └── prisma_client.ts
    │   ├── repositories
    │   │   ├── iorder_item.repository.ts
    │   │   ├── product.repository.ts
    │   │   ├── ireview.repository.ts
    │   │   ├── order_item.repository.ts
    │   │   ├── iemail_sub.repository.ts
    │   │   ├── category.repository.ts
    │   │   ├── payment.repository.ts
    │   │   ├── review.repository.ts
    │   │   ├── inotification.repository.ts
    │   │   ├── iuser.repository.ts
    │   │   ├── iproduct.repository.ts
    │   │   ├── icategory.repository.ts
    │   │   ├── user.repository.ts
    │   │   ├── notification.repository.ts
    │   │   ├── promo.repository.ts
    │   │   ├── email_sub.repository.ts
    │   │   ├── shipping_address.repository.ts
    │   │   ├── order.repository.ts
    │   │   ├── ipromo.repository.ts
    │   │   ├── ishipping_address.repository.ts
    │   │   ├── ipayment.repository.ts
    │   │   └── iorder.repository.ts
    │   ├── models
    │   └── mappers
    │       └── prisma
    │           ├── order.mapper.ts
    │           ├── shipping_address.mapper.ts
    │           ├── order_item.mapper.ts
    │           ├── review.mapper.ts
    │           ├── notification.mapper.ts
    │           ├── promo_code.mapper.ts
    │           ├── product.mapper.ts
    │           ├── user.mapper.ts
    │           ├── email_subscription.mapper.ts
    │           ├── payment.mapper.ts
    │           ├── category.mapper.ts
    │           └── index.ts
    ├── shared
    │   ├── middleware
    │   │   └── auth.middleware.ts
    │   ├── types
    │   │   ├── api.types.ts
    │   │   ├── product.ts
    │   │   ├── orders.ts
    │   │   ├── auth.types.ts
    │   │   ├── categories.ts
    │   │   └── index.ts
    │   ├── decorators
    │   │   └── auth.decorators.ts
    │   ├── enums
    │   │   ├── auth.enum.ts
    │   │   ├── app.enum.ts
    │   │   └── index.ts
    │   ├── utils
    │   │   └── jwt_util.ts
    │   ├── dtos
    │   │   ├── review.dto.ts
    │   │   ├── order.dto.ts
    │   │   ├── user.dto.ts
    │   │   ├── order_item.dto.ts
    │   │   ├── category.dto.ts
    │   │   ├── index.ts
    │   │   ├── notification.dto.ts
    │   │   ├── product.dto.ts
    │   │   ├── email_subscription.dto.ts
    │   │   └── shipping_address.dto.ts
    │   ├── lib
    │   │   └── sdcn
    │   │       └── utils.ts
    │   └── data
    │       ├── productList.ts
    │       ├── product.ts
    │       ├── categoryList.ts
    │       └── orderList.ts
    ├── lib
    │   ├── utils.ts
    │   ├── api
    │   │   ├── orderService.ts
    │   │   ├── notificationService.ts
    │   │   ├── reviewService.ts
    │   │   ├── authService.ts
    │   │   ├── client.ts
    │   │   └── productService.ts
    │   ├── provider.tsx
    │   └── store
    │       ├── cartStore.ts
    │       ├── authStore.ts
    │       └── notificationStore.ts
    ├── application
    │   ├── config
    │   │   └── service_locator.ts
    │   ├── controllers
    │   │   ├── auth.controller.ts
    │   │   ├── order.controller.ts
    │   │   ├── payment.controller.ts
    │   │   ├── category.controller.ts
    │   │   ├── product.controller.ts
    │   │   └── base.controller.ts
    │   └── services
    │       ├── category.service.ts
    │       ├── auth.service.ts
    │       ├── payment.service.ts
    │       ├── order.service.ts
    │       ├── notification.service.ts
    │       └── product.service.ts
    └── presentation
        └── components
            └── ui
                ├── tabs.tsx
                ├── card.tsx
                ├── slider.tsx
                ├── label.tsx
                ├── switch.tsx
                ├── radio-group.tsx
                ├── dialog.tsx
                ├── badge.tsx
                ├── table.tsx
                ├── button.tsx
                ├── checkbox.tsx
                ├── dropdown-menu.tsx
                ├── select.tsx
                ├── textarea.tsx
                ├── input.tsx
                └── form.tsx

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/postcss.config.mjs`:

```mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/prisma/migrations/migration_lock.toml`:

```toml
# Please do not edit this file manually
# It should be added in your version-control system (e.g., Git)
provider = "postgresql"
```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/prisma/migrations/20250203144713_init/migration.sql`:

```sql
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Admin', 'Customer');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CreditCard', 'PayPal', 'BankTransfer');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Pending', 'Completed', 'Failed', 'Refunded');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('Email', 'Push', 'SMS');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "role" "UserRole" NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "social_login_provider" TEXT,
    "social_login_id" TEXT,
    "phone_number" TEXT NOT NULL,
    "address" TEXT,
    "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount_percentage" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "stock_quantity" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "category_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" UUID NOT NULL,
    "customer_id" UUID NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price_at_purchase" DOUBLE PRECISION NOT NULL,
    "discount_applied" DOUBLE PRECISION NOT NULL DEFAULT 0.00,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "payment_method" "PaymentMethod" NOT NULL,
    "payment_status" "PaymentStatus" NOT NULL,
    "transaction_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" UUID NOT NULL,
    "customer_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "review_text" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingAddress" (
    "id" UUID NOT NULL,
    "customer_id" UUID NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ShippingAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailSubscription" (
    "id" UUID NOT NULL,
    "customer_id" UUID NOT NULL,
    "is_subscribed" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_social_login_id_key" ON "User"("social_login_id");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_refresh_token_key" ON "RefreshToken"("refresh_token");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_order_id_key" ON "Payment"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transaction_id_key" ON "Payment"("transaction_id");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShippingAddress" ADD CONSTRAINT "ShippingAddress_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailSubscription" ADD CONSTRAINT "EmailSubscription_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/prisma/migrations/20250311114621_add_promo_banner_models/migration.sql`:

```sql
-- CreateTable
CREATE TABLE "Promotions" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "discount_percentage" DOUBLE PRECISION NOT NULL,
    "expires_at" TIMESTAMP(3),
    "max_uses" INTEGER,
    "uses" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "min_order_value" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Promotions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Banners" (
    "id" UUID NOT NULL,
    "image_url" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Banners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Promotions_code_key" ON "Promotions"("code");

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/prisma/schema.prisma`:

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id                  String            @id @default(uuid()) @db.Uuid
  role                UserRole
  name                String
  email               String            @unique
  password_hash      String
  social_login_provider String? 
  social_login_id     String?           @unique
  phone_number        String
  address             String?
  is_email_verified   Boolean           @default(false)
  created_at          DateTime          @default(now())
  
  refreshTokens       RefreshToken[]
  notifications       Notification[]
  emailSubscriptions  EmailSubscription[]
  orders              Order[]
  reviews             Review[]
  shippingAddresses   ShippingAddress[]
}

model RefreshToken {
  id          String   @id @default(uuid()) @db.Uuid
  user_id     String   @db.Uuid
  refresh_token String  @unique
  expires_at  DateTime
  created_at  DateTime @default(now())

  user        User     @relation(fields: [user_id], references: [id], onDelete: Cascade)
}

model Product {
  id               String    @id @default(uuid()) @db.Uuid
  name             String
  description      String
  price            Float
  discount_percentage Float @default(0.00)
  stock_quantity   Int
  image_url        String
  category_id      String?  @db.Uuid
  created_at       DateTime @default(now())

  category         Category? @relation(fields: [category_id], references: [id])
  orderItems       OrderItem[]
  reviews          Review[]
}

model Category {
  id          String     @id @default(uuid()) @db.Uuid
  name        String     @unique
  created_at  DateTime   @default(now())

  products    Product[]
}

model Order {
  id          String     @id @default(uuid()) @db.Uuid
  customer_id String     @db.Uuid
  total_price Float
  status      OrderStatus
  created_at  DateTime   @default(now())

  customer    User       @relation(fields: [customer_id], references: [id], onDelete: Cascade)
  orderItems  OrderItem[]
  payment     Payment?
}

model OrderItem {
  id              String    @id @default(uuid()) @db.Uuid
  order_id        String    @db.Uuid
  product_id      String    @db.Uuid
  quantity        Int
  price_at_purchase Float
  discount_applied Float @default(0.00)

  order           Order     @relation(fields: [order_id], references: [id], onDelete: Cascade)
  product         Product   @relation(fields: [product_id], references: [id], onDelete: Cascade)
}

model Payment {
  id              String    @id @default(uuid()) @db.Uuid
  order_id        String    @db.Uuid @unique
  payment_method  PaymentMethod
  payment_status  PaymentStatus
  transaction_id  String?   @unique
  created_at      DateTime  @default(now())

  order           Order     @relation(fields: [order_id], references: [id], onDelete: Cascade)
}

model Review {
  id              String    @id @default(uuid()) @db.Uuid
  customer_id     String    @db.Uuid
  product_id      String    @db.Uuid
  rating          Int       @default(0)
  review_text     String?
  created_at      DateTime  @default(now())

  customer        User      @relation(fields: [customer_id], references: [id], onDelete: Cascade)
  product         Product   @relation(fields: [product_id], references: [id], onDelete: Cascade)
}

model ShippingAddress {
  id              String    @id @default(uuid()) @db.Uuid
  customer_id     String    @db.Uuid
  address         String
  city            String
  postal_code     String
  country         String
  is_default      Boolean   @default(false)

  customer        User      @relation(fields: [customer_id], references: [id], onDelete: Cascade)
}

model Notification {
  id          String    @id @default(uuid()) @db.Uuid
  user_id     String    @db.Uuid
  title       String
  message     String
  type        NotificationType
  is_read     Boolean   @default(false)
  created_at  DateTime  @default(now())

  user        User      @relation(fields: [user_id], references: [id], onDelete: Cascade)
}

model EmailSubscription {
  id          String    @id @default(uuid()) @db.Uuid
  customer_id String    @db.Uuid
  is_subscribed Boolean @default(true)
  created_at  DateTime @default(now())

  customer    User      @relation(fields: [customer_id], references: [id], onDelete: Cascade)
}

enum UserRole {
  Admin
  Customer
}

enum OrderStatus {
  Pending
  Processing
  Shipped
  Delivered
  Cancelled
}

enum PaymentMethod {
  CreditCard
  PayPal
  BankTransfer
}

enum PaymentStatus {
  Pending
  Completed
  Failed
  Refunded
}

enum NotificationType {
  Email
  Push
  SMS
}

model Promotions {
  id                  String     @id @default(uuid()) @db.Uuid
  code                String     @unique
  discount_percentage Float
  expires_at          DateTime?
  max_uses            Int?
  uses                Int        @default(0)
  is_active           Boolean    @default(true)
  min_order_value     Float?
  created_at          DateTime   @default(now())
}

model Banners {
  id          String    @id @default(uuid()) @db.Uuid
  image_url   String
  link        String
  created_at  DateTime  @default(now())
}


```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/presentation/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/app/admin/**/*.{js,ts,jsx,tsx,mdx}",
	
  ],
  theme: {
  	extend: {
		colors: {
			bg_secondary: "#CCB3FF", 
			bg_primary: "#8A4FFF", 
			accent: "#FFFFFF", // White for backgrounds
			grayLight: "#EDEDED", // Light gray for subtle highlights
			sidebarBg: "#F7F9FC", // Background of the sidebar
			cardBg: "#FFFFFF", // Background for cards
			textPrimary: "#1E293B", // Dark text for primary headings
			textSecondary: "#475569", // Lighter gray for secondary text
			link: "#2563EB", // Blue color for links
			btn_hover: "#7733ff",	
			bg_instock:' #66ff99' ,
			text_instock:'#004d1a',
			bg_lowstock:'#ff6666',
			text_lowstock:'#990000',
			bg_outofstock:'#b3b3b3',
			text_outofstock:'#1a1a1a',

		
		},


  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [],
} satisfies Config;

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/package.json`:

```json
{
  "name": "hostnshop",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.0.1",
    "@prisma/client": "^6.7.0",
    "@radix-ui/react-checkbox": "^1.2.3",
    "@radix-ui/react-dialog": "^1.1.11",
    "@radix-ui/react-dropdown-menu": "^2.1.12",
    "@radix-ui/react-label": "^2.1.4",
    "@radix-ui/react-radio-group": "^1.3.4",
    "@radix-ui/react-select": "^2.2.2",
    "@radix-ui/react-slider": "^1.3.2",
    "@radix-ui/react-slot": "^1.2.0",
    "@radix-ui/react-switch": "^1.2.2",
    "@radix-ui/react-tabs": "^1.1.9",
    "@stripe/react-stripe-js": "^3.7.0",
    "@stripe/stripe-js": "^7.3.0",
    "bcrypt": "^5.1.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.0.0",
    "dotenv": "^16.4.7",
    "jsonwebtoken": "^9.0.2",
    "lucide-react": "^0.473.0",
    "next": "^15.1.4",
    "next-auth": "^4.24.11",
    "next-pwa": "^5.6.0",
    "next-themes": "^0.4.6",
    "nodemailer": "^6.10.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.56.1",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "uuid": "^11.1.0",
    "zod": "^3.24.3",
    "zustand": "^5.0.4"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@types/bcrypt": "^5.0.2",
    "@types/jsonwebtoken": "^9.0.9",
    "@types/node": "^20.17.32",
    "@types/react": "^18.3.20",
    "@types/react-dom": "^18.3.5",
    "@types/uuid": "^10.0.0",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.26.0",
    "eslint-config-next": "^15.1.4",
    "postcss": "^8.5.3",
    "prisma": "^6.7.0",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.8.3"
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": false,
    "prefix": ""
  },
  "aliases": {
    "components": "@/presentation/components",
    "utils": "@/shared/lib/sdcn/utils",
    "ui": "@/presentation/components/ui",
    "lib": "@/shared/lib",
    "hooks": "@/presentation/hooks"
  },
  "iconLibrary": "lucide"
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/eslint.config.mjs`:

```mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/next.config.ts`:

```ts
import {NextConfig} from "next";

/**
 * Next.js configuration with TypeScript
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Image configuration to allow images from all domains
  images: {
    // Option 1: Disable optimization and allow all domains
    unoptimized: true,

    // Option 2: Use remote patterns to allow all domains (uncomment to use)
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: '**',
    //   },
    //   {
    //     protocol: 'http',
    //     hostname: '**',
    //   },
    // ],
  },

  // You can add more Next.js configuration options here
  // swcMinify: true,
  // i18n: { ... },
  // rewrites: async () => { ... },
};

export default nextConfig;

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/app/products/[id]/page.tsx`:

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/products/[id]/page.tsx
import {productService} from "@/lib/api/productService";
import ProductDetail from "@/presentation/components/client/product/ProductDetail";
import ProductGrid from "@/presentation/components/client/product/ProductGrid";
import ReviewList from "@/presentation/components/client/product/ReviewList";
import ReviewStats from "@/presentation/components/client/product/ReviewStats";

import {notFound} from "next/navigation";

interface ProductPageProps {
  params: {id: string};
}

export default async function ProductPage({params}: ProductPageProps) {
  try {
    const {id} = params;
    const productResponse = await productService.getProductById(id);

    if (!productResponse.data) {
      return notFound();
    }

    const product = productResponse.data;

    // Fetch category if category_id exists
    let category;
    if (product.category_id) {
      const categoriesResponse = await productService.getCategories();
      category = categoriesResponse.data?.find(
        (c) => c.id === product.category_id
      );
    }

    // Fetch related products (same category)
    let relatedProducts: string | any[] = [];
    if (product.category_id) {
      const relatedResponse = await productService.getProducts({
        categoryId: product.category_id,
        limit: 4,
      });

      // Filter out the current product
      relatedProducts =
        relatedResponse.data?.products.filter((p) => p.id !== id) || [];
    }

    return (
      <div className="pt-6">
        {/* Product Detail */}
        <ProductDetail product={product} category={category} />

        {/* Reviews Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-textPrimary mb-4">
                Ratings & Reviews
              </h2>
              <ReviewStats productId={id} />
            </div>
            <div className="md:col-span-2">
              <ReviewList productId={id} />
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="bg-grayLight py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-textPrimary mb-8">
                You May Also Like
              </h2>
              <ProductGrid products={relatedProducts} />
            </div>
          </div>
        )}
      </div>
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return notFound();
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/app/products/page.tsx`:

```tsx
// src/app/products/page.tsx
import {Suspense} from "react";
import {productService} from "@/lib/api/productService";

import {Loader2} from "lucide-react";
import ProductFilter from "@/presentation/components/client/product/productFilter";
import ProductGrid from "@/presentation/components/client/product/ProductGrid";

interface ProductsPageProps {
  searchParams: {
    category?: string;
    search?: string;
    page?: string;
    minPrice?: string;
    maxPrice?: string;
    inStock?: string;
    onSale?: string;
  };
}

export default async function ProductsPage({searchParams}: ProductsPageProps) {
  const page = parseInt(searchParams.page || "1");
  const limit = 12; // Products per page
  const categoryId = searchParams.category;
  const searchQuery = searchParams.search;

  // Fetch products based on search params
  const {data} = await productService.getProducts({
    // page,
    // limit,
    // categoryId,
    // search: searchQuery,
  });

  const products = data?.products || [];
  const totalProducts = data?.total || 0;
  const totalPages = Math.ceil(totalProducts / limit);

  // Fetch categories for filter
  const categoriesResponse = await productService.getCategories();
  const categories = categoriesResponse.data || [];

  // Calculate min and max price for filter
  const minPrice = 0;
  const maxPrice = 1000; // Use a reasonable max or calculate from products

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textPrimary">
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : categoryId
            ? `${
                categories.find((c) => c.id === categoryId)?.name || "Category"
              } Products`
            : "All Products"}
        </h1>
        {totalProducts > 0 && (
          <p className="text-textSecondary mt-2">
            Showing {products.length} of {totalProducts} products
          </p>
        )}
      </div>

      {/* Product Grid with Filters */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="lg:w-1/4">
          <Suspense fallback={<div>Loading filters...</div>}>
            <ProductFilter
              categories={categories}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          </Suspense>
        </div>

        {/* Product Grid */}
        <div className="lg:w-3/4">
          {products.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-textSecondary mb-4">No products found.</p>
              <p className="text-textSecondary">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-96">
                  <Loader2 className="h-8 w-8 animate-spin text-bg_primary" />
                </div>
              }
            >
              <ProductGrid products={products} />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex space-x-1">
                    {Array.from({length: totalPages}, (_, i) => i + 1).map(
                      (p) => {
                        // Create search params for this page
                        const pageParams = new URLSearchParams();
                        if (categoryId) pageParams.set("category", categoryId);
                        if (searchQuery) pageParams.set("search", searchQuery);
                        pageParams.set("page", p.toString());

                        return (
                          <a
                            key={p}
                            href={`/products?${pageParams.toString()}`}
                            className={`px-4 py-2 border rounded-md ${
                              p === page
                                ? "bg-bg_primary text-white"
                                : "bg-white text-textPrimary hover:bg-grayLight"
                            }`}
                          >
                            {p}
                          </a>
                        );
                      }
                    )}
                  </div>
                </div>
              )}
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/app/about-us/page.tsx`:

```tsx
// src/app/about/page.tsx
import Image from "next/image";
import Link from "next/link";

import {Users, Award, Heart, Target} from "lucide-react";
import {Button} from "@/presentation/components/ui/button";

export default function AboutUs() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/about-hero.jpg"
            alt="About HostNShop"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About HostNShop
            </h1>
            <p className="text-lg">Learn more about our story and mission</p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-textPrimary mb-6">
                Our Story
              </h2>
              <p className="text-textSecondary mb-4">
                HostNShop began in 2020 with a simple vision: to create an
                online shopping experience that truly puts customers first. What
                started as a small operation has now grown into a thriving
                e-commerce platform offering thousands of products across
                multiple categories.
              </p>
              <p className="text-textSecondary mb-4">
                Our founders, who had years of experience in retail and
                technology, noticed a gap in the market for a user-friendly and
                reliable online store that offers quality products at
                competitive prices. They combined their expertise to build
                HostNShop from the ground up.
              </p>
              <p className="text-textSecondary">
                Today, we serve thousands of customers worldwide, but our core
                principles remain the same – providing exceptional products,
                outstanding service, and a seamless shopping experience.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/assets/images/team.jpg"
                alt="Our Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-textPrimary mb-4">
              Our Mission & Values
            </h2>
            <p className="text-textSecondary max-w-3xl mx-auto">
              At HostNShop, we&apos;re driven by a set of core values that guide
              everything we do – from the products we select to the way we
              interact with our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-bg_secondary rounded-full">
                  <Award className="h-6 w-6 text-bg_primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-textPrimary mb-2">
                Quality
              </h3>
              <p className="text-textSecondary">
                We carefully select each product to ensure it meets our high
                standards. Quality is never compromised.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-bg_secondary rounded-full">
                  <Heart className="h-6 w-6 text-bg_primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-textPrimary mb-2">
                Customer First
              </h3>
              <p className="text-textSecondary">
                Your satisfaction is our priority. We strive to exceed
                expectations with every interaction.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-bg_secondary rounded-full">
                  <Target className="h-6 w-6 text-bg_primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-textPrimary mb-2">
                Innovation
              </h3>
              <p className="text-textSecondary">
                We continuously improve our platform and processes to provide
                the best shopping experience.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-bg_secondary rounded-full">
                  <Users className="h-6 w-6 text-bg_primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-textPrimary mb-2">
                Community
              </h3>
              <p className="text-textSecondary">
                We believe in building strong relationships with customers,
                suppliers, and our team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet The Team */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-textPrimary mb-4">
              Meet Our Team
            </h2>
            <p className="text-textSecondary max-w-3xl mx-auto">
              Behind HostNShop is a dedicated team of professionals passionate
              about creating the best shopping experience for you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-72">
                <Image
                  src="/assets/images/avatar.jpg"
                  alt="John Doe"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-textPrimary">
                  John Doe
                </h3>
                <p className="text-bg_primary">Founder & CEO</p>
                <p className="mt-2 text-sm text-textSecondary">
                  John brings over 15 years of retail experience and a vision
                  for customer-centric e-commerce.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-72">
                <Image
                  src="/assets/images/avatar.jpg"
                  alt="Jane Smith"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-textPrimary">
                  Jane Smith
                </h3>
                <p className="text-bg_primary">CTO</p>
                <p className="mt-2 text-sm text-textSecondary">
                  Jane leads our tech team, ensuring a seamless and secure
                  online shopping experience.
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-72">
                <Image
                  src="/assets/images/avatar.jpg"
                  alt="Mike Johnson"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-textPrimary">
                  Mike Johnson
                </h3>
                <p className="text-bg_primary">Product Director</p>
                <p className="mt-2 text-sm text-textSecondary">
                  Mike curates our product selection, ensuring we offer only the
                  highest quality items.
                </p>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-72">
                <Image
                  src="/assets/images/avatar.jpg"
                  alt="Sarah Wilson"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-textPrimary">
                  Sarah Wilson
                </h3>
                <p className="text-bg_primary">Customer Success Manager</p>
                <p className="mt-2 text-sm text-textSecondary">
                  Sarah ensures every customer interaction exceeds expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-bg_primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Become part of our growing community of satisfied customers and
            experience the HostNShop difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-bg_primary"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-white text-bg_primary hover:bg-gray-100"
            >
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/app/auth/register/page.tsx`:

```tsx
// src/app/register/page.tsx (complete version)
"use client";

import {useState, useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {Button} from "@/presentation/components/ui/button";
import {Input} from "@/presentation/components/ui/input";
import {Label} from "@/presentation/components/ui/label";
import {EyeIcon, EyeOffIcon} from "lucide-react";
import {useAuthStore} from "@/lib/store/authStore";
import {authService} from "@/lib/api/authService";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const {isAuthenticated, login} = useAuthStore();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      router.push(redirect);
    }
  }, [isAuthenticated, redirect, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await authService.signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
      });

      if (response.data) {
        login(response.data);
        router.push(redirect);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "Failed to create account");
      } else {
        setError("Failed to create account");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bg_primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Image
            src="/assets/images/HostNShop.png"
            alt="HostNShop Logo"
            width={150}
            height={50}
            className="mx-auto"
          />
          <h2 className="mt-6 text-3xl font-bold text-textPrimary">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-textSecondary">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-bg_primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-textSecondary mt-1">
                Password must be at least 8 characters long
              </p>
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="pr-10"
                />
              </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-bg_primary hover:bg-btn_hover"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </div>

          <div className="text-xs text-textSecondary text-center">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-bg_primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-bg_primary hover:underline">
              Privacy Policy
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/app/auth/login/page.tsx`:

```tsx
// src/app/login/page.tsx (complete version)
"use client";

import {useState, useEffect, SetStateAction} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {Button} from "@/presentation/components/ui/button";
import {Input} from "@/presentation/components/ui/input";
import {Label} from "@/presentation/components/ui/label";
import {EyeIcon, EyeOffIcon} from "lucide-react";
import {useAuthStore} from "@/lib/store/authStore";
import {authService} from "@/lib/api/authService";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const {isAuthenticated, login} = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      router.push(redirect);
    }
  }, [isAuthenticated, redirect, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await authService.signin({
        email,
        password,
      });

      if (response.data) {
        login(response.data);
        router.push(redirect);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "Invalid email or password");
      } else {
        setError("Invalid email or password");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bg_primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Image
            src="/assets/images/HostNShop.png"
            alt="HostNShop Logo"
            width={150}
            height={50}
            className="mx-auto"
          />
          <h2 className="mt-6 text-3xl font-bold text-textPrimary">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-textSecondary">
            Or{" "}
            <Link
              href="/register"
              className="font-medium text-bg_primary hover:underline"
            >
              create a new account
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e: {target: {value: SetStateAction<string>}}) =>
                  setEmail(e.target.value)
                }
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-bg_primary hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-bg_primary hover:bg-btn_hover"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/app/admin/home/page.tsx`:

```tsx
import ClientHomePage from "@/presentation/pages/client/clientHomePage";
// import HomePage from "@/presentation/pages/homePage";
import React from "react";

function page() {
  return (
    <div>
      <ClientHomePage />
    </div>
  );
}

export default page;

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/app/admin/products/page.tsx`:

```tsx
import ProductPage from "../../../presentation/pages/productPage"

export default function Products(){
    return (
        <div className="">
          <ProductPage/>

        </div>
    )
}
```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/app/admin/category/page.tsx`:

```tsx
import CategoryPage from "@/presentation/pages/categoryPage"

export default function Category(){
    return (
        <div>
            <CategoryPage/>
        </div>
    )
}
```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/app/admin/orders/page.tsx`:

```tsx
import OrderPage from "@/presentation/pages/orderPage"

export default function Order(){
    return (
        <div>
            <OrderPage/>
        </div>
    )
}
```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/app/admin/login/page.tsx`:

```tsx
import LoginForm from '@/presentation/pages/loginPage'
import React from 'react'

function page() {
  return (
    <div>
<LoginForm/>

    </div>
  )
}

export default page
```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/app/checkout/page.tsx`:

```tsx
// src/app/checkout/page.tsx
"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useCartStore} from "@/lib/store/cartStore";
import {useAuthStore} from "@/lib/store/authStore";
import {Button} from "@/presentation/components/ui/button";
import {ArrowLeft} from "lucide-react";
import CheckoutForm from "@/presentation/components/client/cart/cartCheckout";

export default function CheckoutPage() {
  const router = useRouter();
  const {items, totalPrice} = useCartStore();
  const {isAuthenticated} = useAuthStore();

  useEffect(() => {
    // Redirect if cart is empty
    if (items.length === 0) {
      router.push("/cart");
    }

    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.push("/login?redirect=/checkout");
    }
  }, [items, isAuthenticated, router]);

  // Don't render until we're sure the user should be here
  if (items.length === 0 || !isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bg_primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center mb-8">
        <Button asChild variant="outline" className="mr-4">
          <Link href="/cart">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-textPrimary">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Checkout Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <CheckoutForm />
          </div>
        </div>

        <div className="lg:col-span-1">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-medium text-textPrimary mb-4">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between">
                  <div>
                    <span className="font-medium">{item.product.name}</span>
                    <span className="text-textSecondary">
                      {" "}
                      × {item.quantity}
                    </span>
                  </div>
                  <span>
                    $
                    {(
                      item.product.price *
                      (1 - item.product.discount_percentage / 100) *
                      item.quantity
                    ).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-textSecondary">Subtotal</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-textSecondary">Shipping</span>
                <span>Free</span>
              </div>

              <div className="flex justify-between">
                <span className="text-textSecondary">Tax</span>
                <span>${(totalPrice() * 0.07).toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-medium text-lg pt-2 border-t border-gray-200">
                <span>Total</span>
                <span className="text-bg_primary">
                  ${(totalPrice() + totalPrice() * 0.07).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/app/profile/page.tsx`:

```tsx
// src/app/profile/page.tsx
"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/components/ui/tabs";
import {useAuthStore} from "@/lib/store/authStore";
import ProfileForm from "@/presentation/components/account/ProfileForm";
import OrderHistory from "@/presentation/components/account/OrderHistory";
import AddressBook from "@/presentation/components/account/AddressBook";
import UserReviews from "@/presentation/components/client/product/UserReviews";
import NotificationsSettings from "@/presentation/components/account/NotificationsSettings";
import PasswordChangeForm from "@/presentation/components/account/PasswordChangeForm";

export default function ProfilePage() {
  const router = useRouter();
  const {isAuthenticated} = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/profile");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bg_primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-textPrimary mb-8">My Account</h1>

      <Tabs defaultValue="profile">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileForm />
        </TabsContent>

        <TabsContent value="orders">
          <OrderHistory />
        </TabsContent>

        <TabsContent value="addresses">
          <AddressBook />
        </TabsContent>

        <TabsContent value="reviews">
          <UserReviews />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationsSettings />
        </TabsContent>

        <TabsContent value="password">
          <PasswordChangeForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/app/layout.tsx`:

```tsx
// src/app/layout.tsx
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";

import Footer from "@/presentation/components/footer";

import {Providers} from "@/lib/provider";
import NavBar from "@/presentation/components/client/header/NavBar";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "HostNShop | Your One-Stop Online Shop",
  description: "Premium products with excellent service",
  manifest: "/manifest.json",
  icons: [
    {rel: "icon", url: "assets/images/logo.png"},
    {rel: "apple-touch-icon", url: "icons/icon-192x192.png"},
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-grow pt-16">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/app/contact-us/page.tsx`:

```tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/contact/page.tsx
"use client";

import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/presentation/components/ui/button";
import {Input} from "@/presentation/components/ui/input";
import {Textarea} from "@/presentation/components/ui/textarea";
import {Label} from "@/presentation/components/ui/label";
import {Mail, Phone, MapPin, Clock, CheckCircle} from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitError("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Reset form and show success message
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError("Failed to send message. Please try again later.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/contact-hero.jpg"
            alt="Contact HostNShop"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg">We&apos;d love to hear from you</p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-textPrimary mb-6">
                Get in Touch
              </h2>
              <p className="text-textSecondary mb-8">
                Have questions, suggestions, or need assistance? Our team is
                here to help. Feel free to reach out through any of the channels
                below.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <MapPin className="h-6 w-6 text-bg_primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-textPrimary">
                      Our Address
                    </h3>
                    <p className="text-textSecondary mt-1">
                      123 Commerce Street
                      <br />
                      Business District
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Mail className="h-6 w-6 text-bg_primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-textPrimary">
                      Email Us
                    </h3>
                    <p className="text-textSecondary mt-1">
                      General Inquiries: info@hostnshop.com
                      <br />
                      Customer Support: support@hostnshop.com
                      <br />
                      Business: business@hostnshop.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Phone className="h-6 w-6 text-bg_primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-textPrimary">
                      Call Us
                    </h3>
                    <p className="text-textSecondary mt-1">
                      Customer Service: +1 (555) 123-4567
                      <br />
                      Sales Department: +1 (555) 765-4321
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Clock className="h-6 w-6 text-bg_primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-textPrimary">
                      Business Hours
                    </h3>
                    <p className="text-textSecondary mt-1">
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday: 10:00 AM - 4:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-textPrimary mb-4">
                  Connect With Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-bg_secondary rounded-full text-bg_primary hover:bg-bg_primary hover:text-white transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-bg_secondary rounded-full text-bg_primary hover:bg-bg_primary hover:text-white transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-bg_secondary rounded-full text-bg_primary hover:bg-bg_primary hover:text-white transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-bg_secondary rounded-full text-bg_primary hover:bg-bg_primary hover:text-white transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-textPrimary mb-6">
                Send Us a Message
              </h2>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Message sent successfully!</p>
                    <p className="text-sm">
                      We&apos;ll get back to you as soon as possible.
                    </p>
                  </div>
                </div>
              )}

              {submitError && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                  <p className="font-medium">{submitError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">
                    Your Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@example.com"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="How can we help you?"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message">
                    Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please let us know how we can help you..."
                    required
                    className="mt-1 h-32"
                  />
                </div>

                <div className="flex items-start mb-4">
                  <div className="flex items-center h-5">
                    <input
                      id="privacy"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-bg_primary border-gray-300 rounded focus:ring-bg_primary"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="privacy" className="text-gray-600">
                      I agree to the{" "}
                      <Link
                        href="/privacy-policy"
                        className="text-bg_primary hover:underline"
                      >
                        Privacy Policy
                      </Link>{" "}
                      and consent to the processing of my data.
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-bg_primary hover:bg-btn_hover"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-textPrimary mb-4">
              Find Us
            </h2>
            <p className="text-textSecondary max-w-2xl mx-auto">
              Visit our store or office in person
            </p>
          </div>

          <div className="relative h-96 rounded-lg overflow-hidden shadow-md">
            {/* Replace with an actual embedded map if available */}
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <p className="text-textSecondary">
                Map Placeholder - Replace with actual Google Maps or other map
                provider
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-textPrimary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-textSecondary max-w-2xl mx-auto">
              Find quick answers to common questions or contact us for more
              specific inquiries.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-textPrimary mb-2">
                  What are your shipping times?
                </h3>
                <p className="text-textSecondary">
                  Standard shipping typically takes 5-7 business days. Express
                  shipping takes 2-3 business days. Overnight shipping is also
                  available for select items.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-textPrimary mb-2">
                  How can I track my order?
                </h3>
                <p className="text-textSecondary">
                  Once your order ships, you&apos;ll receive a confirmation
                  email with tracking information. You can also track your order
                  by logging into your account and viewing your order history.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-textPrimary mb-2">
                  What is your return policy?
                </h3>
                <p className="text-textSecondary">
                  We accept returns within 30 days of delivery. Items must be
                  unused and in their original packaging. Please visit our
                  Returns page for more details and to initiate a return.
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button asChild className="bg-bg_primary hover:bg-btn_hover">
                <Link href="/faq">View All FAQs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Sign-Up */}
      <section className="py-16 bg-bg_primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="mb-8">
              Subscribe to our newsletter for the latest updates, promotions,
              and exclusive offers.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 text-textPrimary"
              />
              <Button className="bg-white text-bg_primary hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
            <p className="text-sm mt-4 opacity-80">
              By subscribing, you agree to our privacy policy and consent to
              receive marketing emails.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/app/cart/page.tsx`:

```tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/cart/page.tsx
"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useCartStore} from "@/lib/store/cartStore";
import {Button} from "@/presentation/components/ui/button";

import {ShoppingCart, ArrowLeft} from "lucide-react";
import CartSummary from "@/presentation/components/client/cart/cartSummery";
import CartItem from "@/presentation/components/client/cart/cartItem";

export default function CartPage() {
  const router = useRouter();
  const {items} = useCartStore();
  const [isClient, setIsClient] = useState(false);

  // Hydration fix
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-textPrimary mb-8">Your Cart</h1>
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bg_primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-textPrimary mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-16 w-16 text-gray-300" />
          </div>
          <h2 className="text-xl font-medium text-textPrimary mb-2">
            Your cart is empty
          </h2>
          <p className="text-textSecondary mb-6">
            Looks like you haven&#39;t added any products to your cart yet.
          </p>
          <Button asChild className="bg-bg_primary hover:bg-btn_hover">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-textPrimary mb-4">
                Cart Items
              </h2>
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
              <div className="mt-6 flex justify-between items-center">
                <Button
                  asChild
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Link href="/products">
                    <ArrowLeft className="h-4 w-4" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/app/api/products/route.ts`:

```ts
import {ProductController} from "@/application/controllers/product.controller";

import {NextRequest} from "next/server";

const productController = new ProductController();

export async function GET(req: NextRequest) {
  return await productController.getProducts(req);
}

export async function POST(req: NextRequest) {
  return await productController.createProduct(req);
}

export async function PUT(req: NextRequest) {
  return await productController.updateProduct(req);
}
export async function DELETE(req: NextRequest) {
  return await productController.deleteProduct(req);
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/app/api/auth/signup/route.ts`:

```ts
import {AuthController} from "@/application/controllers/auth.controller";

import {NextRequest} from "next/server";

const authController = new AuthController();

export async function POST(req: NextRequest) {
  return await authController.signUp(req);
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/app/api/auth/signin/route.ts`:

```ts
import {AuthController} from "@/application/controllers/auth.controller";

import {NextRequest} from "next/server";

const authController = new AuthController();

export async function POST(req: NextRequest) {
  return await authController.signIn(req);
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/app/api/categories/route.ts`:

```ts
import {CategoryController} from "@/application/controllers/category.controller";
import {NextRequest} from "next/server";

const categoryController = new CategoryController();

export async function GET(req: NextRequest) {
  return await categoryController.getCategories(req);
}

export async function POST(req: NextRequest) {
  return await categoryController.createCategory(req);
}

export async function PUT(req: NextRequest) {
  return await categoryController.updateCategory(req);
}
export async function DELETE(req: NextRequest) {
  return await categoryController.deleteCategory(req);
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/app/page.tsx`:

```tsx
import Home from "../app/admin/home/page";


export default function page() {
  return (
    <div>
      <Home/>
    </div>

  );
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/db_client/prisma_client.ts`:

```ts
import {PrismaClient} from "@prisma/client";

// Create a new Prisma client instance on each request (for both development and production)
export const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/repositories/iorder_item.repository.ts`:

```ts
import {CreateOrderItemDTO, ReadOrderItemDTO} from "@/shared/dtos";

export interface IOrderItemRepository {
  create(data: CreateOrderItemDTO): Promise<ReadOrderItemDTO>;
  findByOrder(orderId: string): Promise<ReadOrderItemDTO[]>;
  findByProduct(productId: string): Promise<ReadOrderItemDTO[]>;
  countByProduct(productId: string): Promise<number>;
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/repositories/product.repository.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {prisma} from "../db_client/prisma_client";
import {
  CreateProductDTO,
  ReadProductDTO,
  UpdateProductDTO,
} from "@/shared/dtos";
import {IProductRepository} from "./iproduct.repository";
import {ProductMapper} from "../mappers/prisma";

export class ProductRepository implements IProductRepository {
  async create(data: CreateProductDTO): Promise<ReadProductDTO> {
    const product = await prisma.product.create({data});
    return ProductMapper.toReadDTO(product);
  }

  async update(
    id: string,
    data: UpdateProductDTO
  ): Promise<ReadProductDTO | null> {
    try {
      const product = await prisma.product.update({
        where: {id},
        data,
      });
      return ProductMapper.toReadDTO(product);
    } catch (error) {
      return null;
    }
  }

  async findOne(id: string): Promise<ReadProductDTO | null> {
    const product = await prisma.product.findUnique({
      where: {id},
      include: {category: true},
    });
    return product ? ProductMapper.toReadDTO(product) : null;
  }

  async findAll(options?: {
    categoryId?: string;
    page?: number;
    limit?: number;
    searchQuery?: string;
  }): Promise<{
    products: ReadProductDTO[];
    total: number;
  }> {
    // Build the where clause
    const where: any = {};

    if (options?.categoryId) {
      where.category_id = options.categoryId;
    }

    if (options?.searchQuery) {
      where.OR = [
        {name: {contains: options.searchQuery, mode: "insensitive"}},
        {description: {contains: options.searchQuery, mode: "insensitive"}},
      ];
    }

    // Count total matching products
    const total = await prisma.product.count({where});

    // Get products with pagination
    const skip =
      options?.page && options?.limit
        ? (options.page - 1) * options.limit
        : undefined;
    const take = options?.limit;

    const products = await prisma.product.findMany({
      where,
      skip,
      take,
      orderBy: {created_at: "desc"},
      include: {category: true},
    });

    return {
      products: ProductMapper.toReadDTOList(products),
      total,
    };
  }

  async findByLowStock(threshold: number): Promise<ReadProductDTO[]> {
    const products = await prisma.product.findMany({
      where: {stock_quantity: {lte: threshold}},
      orderBy: {stock_quantity: "asc"},
      include: {category: true},
    });

    return ProductMapper.toReadDTOList(products);
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.product.delete({
        where: {id},
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/repositories/ireview.repository.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import {CreateReviewDTO, ReadReviewDTO, UpdateReviewDTO} from "@/shared/dtos";

export interface IReviewRepository {
  create(data: CreateReviewDTO): Promise<ReadReviewDTO>;
  update(id: string, data: UpdateReviewDTO): Promise<ReadReviewDTO | null>;
  findOne(id: string): Promise<ReadReviewDTO | null>;
  findByProduct(
    productId: string,
    options?: {
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: string;
    }
  ): Promise<{
    reviews: ReadReviewDTO[];
    total: number;
  }>;
  findByUser(
    userId: string,
    options?: {
      page?: number;
      limit?: number;
    }
  ): Promise<{
    reviews: ReadReviewDTO[];
    total: number;
  }>;
  findForModeration(options?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<{
    reviews: any[];
    total: number;
  }>;
  delete(id: string): Promise<boolean>;
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/repositories/order_item.repository.ts`:

```ts
import {prisma} from "../db_client/prisma_client";
import {CreateOrderItemDTO, ReadOrderItemDTO} from "@/shared/dtos";
import {IOrderItemRepository} from "./iorder_item.repository";
import {OrderItemMapper} from "../mappers/prisma";

export class OrderItemRepository implements IOrderItemRepository {
  async create(data: CreateOrderItemDTO): Promise<ReadOrderItemDTO> {
    const orderItem = await prisma.orderItem.create({data});
    return OrderItemMapper.toReadDTO(orderItem);
  }

  async findByOrder(orderId: string): Promise<ReadOrderItemDTO[]> {
    const orderItems = await prisma.orderItem.findMany({
      where: {order_id: orderId},
      include: {
        product: true,
      },
    });

    return OrderItemMapper.toReadDTOList(orderItems);
  }

  async findByProduct(productId: string): Promise<ReadOrderItemDTO[]> {
    const orderItems = await prisma.orderItem.findMany({
      where: {product_id: productId},
      include: {
        order: true,
      },
    });

    return OrderItemMapper.toReadDTOList(orderItems);
  }

  async countByProduct(productId: string): Promise<number> {
    return await prisma.orderItem.count({
      where: {product_id: productId},
    });
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/repositories/iemail_sub.repository.ts`:

```ts
import {
  CreateEmailSubscriptionDTO,
  ReadEmailSubscriptionDTO,
  UpdateEmailSubscriptionDTO,
} from "@/shared/dtos";

export interface IEmailSubscriptionRepository {
  create(data: CreateEmailSubscriptionDTO): Promise<ReadEmailSubscriptionDTO>;
  update(
    id: string,
    data: UpdateEmailSubscriptionDTO
  ): Promise<ReadEmailSubscriptionDTO | null>;
  findOne(id: string): Promise<ReadEmailSubscriptionDTO | null>;
  findByUser(userId: string): Promise<ReadEmailSubscriptionDTO | null>;
  findAll(options?: {
    subscribedOnly?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{
    subscriptions: ReadEmailSubscriptionDTO[];
    total: number;
  }>;
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/repositories/category.repository.ts`:

```ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import {prisma} from "../db_client/prisma_client";
import {
  CreateCategoryDTO,
  ReadCategoryDTO,
  UpdateCategoryDTO,
} from "@/shared/dtos";
import {ICategoryRepository} from "./icategory.repository";
import {CategoryMapper} from "../mappers/prisma";

export class CategoryRepository implements ICategoryRepository {
  async create(data: CreateCategoryDTO): Promise<ReadCategoryDTO> {
    const category = await prisma.category.create({data});
    return CategoryMapper.toReadDTO(category);
  }

  async update(
    id: string,
    data: UpdateCategoryDTO
  ): Promise<ReadCategoryDTO | null> {
    try {
      const category = await prisma.category.update({
        where: {id},
        data,
      });
      return CategoryMapper.toReadDTO(category);
    } catch (error) {
      return null;
    }
  }

  async findOne(id: string): Promise<ReadCategoryDTO | null> {
    const category = await prisma.category.findUnique({
      where: {id},
    });
    return category ? CategoryMapper.toReadDTO(category) : null;
  }

  async findByName(name: string): Promise<ReadCategoryDTO | null> {
    const category = await prisma.category.findUnique({
      where: {name},
    });
    return category ? CategoryMapper.toReadDTO(category) : null;
  }

  async findAll(): Promise<ReadCategoryDTO[]> {
    const categories = await prisma.category.findMany({
      orderBy: {name: "asc"},
    });
    return CategoryMapper.toReadDTOList(categories);
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.category.delete({
        where: {id},
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/repositories/payment.repository.ts`:

```ts
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {prisma} from "../db_client/prisma_client";
import {IPaymentRepository} from "./ipayment.repository";
import {PaymentMapper} from "../mappers/prisma";
import {PaymentMethod, PaymentStatus} from "@/shared/enums";

export class PaymentRepository implements IPaymentRepository {
  async create(data: {
    order_id: string;
    payment_method: PaymentMethod;
    payment_status: PaymentStatus;
    transaction_id?: string;
  }): Promise<any> {
    const payment = await prisma.payment.create({data});
    return PaymentMapper.toReadDTO(payment);
  }

  async update(
    id: string,
    data: {
      payment_status: PaymentStatus;
    }
  ): Promise<any | null> {
    try {
      const payment = await prisma.payment.update({
        where: {id},
        data,
      });
      return PaymentMapper.toReadDTO(payment);
    } catch (error) {
      return null;
    }
  }

  async findOne(id: string): Promise<any | null> {
    const payment = await prisma.payment.findUnique({
      where: {id},
    });
    return payment ? PaymentMapper.toReadDTO(payment) : null;
  }

  async findByOrderId(orderId: string): Promise<any | null> {
    const payment = await prisma.payment.findUnique({
      where: {order_id: orderId},
    });
    return payment ? PaymentMapper.toReadDTO(payment) : null;
  }

  async findAll(options?: {
    status?: PaymentStatus;
    page?: number;
    limit?: number;
  }): Promise<{
    payments: any[];
    total: number;
  }> {
    // Build where clause
    const where: any = {};

    if (options?.status) {
      where.payment_status = options.status;
    }

    // Count total
    const total = await prisma.payment.count({where});

    // Get payments with pagination
    const skip =
      options?.page && options?.limit
        ? (options.page - 1) * options.limit
        : undefined;
    const take = options?.limit;

    const payments = await prisma.payment.findMany({
      where,
      skip,
      take,
      orderBy: {created_at: "desc"},
      include: {
        order: {
          include: {
            customer: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return {
      payments: payments.map((payment) =>
        PaymentMapper.toReadDetailedDTO(payment)
      ),
      total,
    };
  }

  async getAnalytics(startDate?: Date, endDate?: Date): Promise<any> {
    // Build where clause for date range
    const where: any = {};

    if (startDate || endDate) {
      where.created_at = {};

      if (startDate) {
        where.created_at.gte = startDate;
      }

      if (endDate) {
        where.created_at.lte = endDate;
      }
    }

    // Get all payments in date range
    const payments = await prisma.payment.findMany({
      where,
      include: {order: true},
    });

    // Initialize payment method breakdown
    const paymentMethodBreakdown: Record<
      PaymentMethod,
      {count: number; amount: number}
    > = {
      CreditCard: {count: 0, amount: 0},
      PayPal: {count: 0, amount: 0},
      BankTransfer: {count: 0, amount: 0},
    };

    let totalRevenue = 0;
    let totalRefunded = 0;

    // Group by date for revenue chart
    const revenueByDate: {[date: string]: number} = {};

    for (const payment of payments) {
      const method = payment.payment_method;
      const amount = payment.order.total_price;

      // Update payment method breakdown
      paymentMethodBreakdown[method].count++;
      paymentMethodBreakdown[method].amount += amount;

      // Update revenue/refund totals
      if (payment.payment_status === "Completed") {
        totalRevenue += amount;

        // Group revenue by date
        const dateStr = payment.created_at.toISOString().split("T")[0];
        revenueByDate[dateStr] = (revenueByDate[dateStr] || 0) + amount;
      } else if (payment.payment_status === "Refunded") {
        totalRefunded += amount;
      }
    }

    return {
      totalPayments: payments.length,
      totalRevenue,
      totalRefunded,
      paymentMethodBreakdown,
      revenueByDate: Object.entries(revenueByDate).map(([date, revenue]) => ({
        date,
        revenue,
      })),
    };
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/repositories/review.repository.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {prisma} from "../db_client/prisma_client";
import {CreateReviewDTO, ReadReviewDTO, UpdateReviewDTO} from "@/shared/dtos";
import {IReviewRepository} from "./ireview.repository";
import {ReviewMapper} from "../mappers/prisma";

export class ReviewRepository implements IReviewRepository {
  async create(data: CreateReviewDTO): Promise<ReadReviewDTO> {
    const review = await prisma.review.create({data});
    return ReviewMapper.toReadDTO(review);
  }

  async update(
    id: string,
    data: UpdateReviewDTO
  ): Promise<ReadReviewDTO | null> {
    try {
      const review = await prisma.review.update({
        where: {id},
        data,
      });
      return ReviewMapper.toReadDTO(review);
    } catch (error) {
      return null;
    }
  }

  async findOne(id: string): Promise<ReadReviewDTO | null> {
    const review = await prisma.review.findUnique({
      where: {id},
    });
    return review ? ReviewMapper.toReadDTO(review) : null;
  }

  async findByProduct(
    productId: string,
    options?: {
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: string;
    }
  ): Promise<{
    reviews: ReadReviewDTO[];
    total: number;
  }> {
    // Build where clause
    const where = {product_id: productId};

    // Count total
    const total = await prisma.review.count({where});

    // Default sort options
    const sortBy = options?.sortBy || "created_at";
    const sortOrder = options?.sortOrder || "desc";

    // Build orderBy object
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Get reviews with pagination
    const skip =
      options?.page && options?.limit
        ? (options.page - 1) * options.limit
        : undefined;
    const take = options?.limit;

    const reviews = await prisma.review.findMany({
      where,
      skip,
      take,
      orderBy,
      include: {
        customer: {
          select: {
            name: true,
          },
        },
        product: {
          select: {
            name: true,
          },
        },
      },
    });

    return {
      reviews: reviews.map((review) => ReviewMapper.toReadDetailedDTO(review)),
      total,
    };
  }

  async findByUser(
    userId: string,
    options?: {
      page?: number;
      limit?: number;
    }
  ): Promise<{
    reviews: ReadReviewDTO[];
    total: number;
  }> {
    // Build where clause
    const where = {customer_id: userId};

    // Count total
    const total = await prisma.review.count({where});

    // Get reviews with pagination
    const skip =
      options?.page && options?.limit
        ? (options.page - 1) * options.limit
        : undefined;
    const take = options?.limit;

    const reviews = await prisma.review.findMany({
      where,
      skip,
      take,
      orderBy: {created_at: "desc"},
      include: {
        product: {
          select: {
            name: true,
            image_url: true,
          },
        },
      },
    });

    return {
      reviews: reviews.map((review) => ReviewMapper.toReadDetailedDTO(review)),
      total,
    };
  }

  async findForModeration(options?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<{
    reviews: any[];
    total: number;
  }> {
    // In a real application, you would have a status field for moderation
    // For this implementation, we'll return all reviews
    const where: any = {};

    if (options?.status) {
      where.status = options.status;
    }

    // Count total
    const total = await prisma.review.count({where});

    // Get reviews with pagination
    const skip =
      options?.page && options?.limit
        ? (options.page - 1) * options.limit
        : undefined;
    const take = options?.limit;

    const reviews = await prisma.review.findMany({
      where,
      skip,
      take,
      orderBy: {created_at: "desc"},
      include: {
        customer: {
          select: {
            name: true,
            email: true,
          },
        },
        product: {
          select: {
            name: true,
            image_url: true,
          },
        },
      },
    });

    return {
      reviews: reviews.map((review) => ReviewMapper.toReadDetailedDTO(review)),
      total,
    };
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.review.delete({
        where: {id},
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/repositories/inotification.repository.ts`:

```ts
import {CreateNotificationDTO, ReadNotificationDTO} from "@/shared/dtos";

export interface INotificationRepository {
  create(data: CreateNotificationDTO): Promise<ReadNotificationDTO>;
  markAsRead(id: string): Promise<ReadNotificationDTO | null>;
  markAllAsRead(userId: string): Promise<number>;
  findOne(id: string): Promise<ReadNotificationDTO | null>;
  findByUser(
    userId: string,
    options?: {
      page?: number;
      limit?: number;
      unreadOnly?: boolean;
    }
  ): Promise<{
    notifications: ReadNotificationDTO[];
    total: number;
    unreadCount: number;
  }>;
  delete(id: string): Promise<boolean>;
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/repositories/iuser.repository.ts`:

```ts
import {
  CreateUserDTO,
  DeleteUserDTO,
  ReadUserDTO,
  UpdateUserDTO,
} from "@/shared/dtos";

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<ReadUserDTO>;
  update(id: string, data: UpdateUserDTO): Promise<ReadUserDTO | null>;

  findOne(id: string): Promise<ReadUserDTO | null>;
  findByEmail(id: string): Promise<ReadUserDTO | null>;
  findByRole(role: string): Promise<ReadUserDTO[]>;
  findAll(): Promise<ReadUserDTO[]>;
  delete(data: DeleteUserDTO): Promise<boolean>;
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/repositories/iproduct.repository.ts`:

```ts
import {
  CreateProductDTO,
  ReadProductDTO,
  UpdateProductDTO,
} from "@/shared/dtos";

export interface IProductRepository {
  create(data: CreateProductDTO): Promise<ReadProductDTO>;
  update(id: string, data: UpdateProductDTO): Promise<ReadProductDTO | null>;
  findOne(id: string): Promise<ReadProductDTO | null>;
  findAll(options?: {
    categoryId?: string;
    page?: number;
    limit?: number;
    searchQuery?: string;
  }): Promise<{
    products: ReadProductDTO[];
    total: number;
  }>;
  findByLowStock(threshold: number): Promise<ReadProductDTO[]>;
  delete(id: string): Promise<boolean>;
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/repositories/icategory.repository.ts`:

```ts
import {
  CreateCategoryDTO,
  ReadCategoryDTO,
  UpdateCategoryDTO,
} from "@/shared/dtos";

export interface ICategoryRepository {
  create(data: CreateCategoryDTO): Promise<ReadCategoryDTO>;
  update(id: string, data: UpdateCategoryDTO): Promise<ReadCategoryDTO | null>;
  findOne(id: string): Promise<ReadCategoryDTO | null>;
  findByName(name: string): Promise<ReadCategoryDTO | null>;
  findAll(): Promise<ReadCategoryDTO[]>;
  delete(id: string): Promise<boolean>;
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/repositories/user.repository.ts`:

```ts
import {prisma} from "../db_client/prisma_client";
import {
  CreateUserDTO,
  DeleteUserDTO,
  ReadUserAuthDTO,
  ReadUserDTO,
  UpdateUserDTO,
} from "@/shared/dtos";
import {IUserRepository} from "./iuser.repository";
import {UserMapper} from "../mappers/prisma";
import {UserRole} from "@prisma/client";

export class UserRepository implements IUserRepository {
  async create(data: CreateUserDTO): Promise<ReadUserDTO> {
    const user = await prisma.user.create({data});
    return UserMapper.toReadDTO(user);
  }

  async update(id: string, data: UpdateUserDTO): Promise<ReadUserDTO | null> {
    const user = await prisma.user.update({
      where: {id},
      data,
    });
    return user ? UserMapper.toReadDTO(user) : null;
  }

  async findOne(id: string): Promise<ReadUserDTO | null> {
    const user = await prisma.user.findUnique({
      where: {id},
    });
    return user ? UserMapper.toReadDTO(user) : null;
  }

  async findOneAuth(id: string): Promise<ReadUserAuthDTO | null> {
    const user = await prisma.user.findUnique({
      where: {id},
    });
    return user ? UserMapper.toReadAuthDTO(user) : null;
  }

  async findByRole(role: string): Promise<ReadUserDTO[]> {
    const users = await prisma.user.findMany({
      where: {role: role as UserRole},
    });
    return UserMapper.toReadDTOList(users);
  }

  async findByEmail(email: string): Promise<ReadUserAuthDTO | null> {
    const user = await prisma.user.findUnique({
      where: {email},
    });
    return user ? UserMapper.toReadAuthDTO(user) : null;
  }
  async findAll(): Promise<ReadUserDTO[]> {
    const users = await prisma.user.findMany();
    return UserMapper.toReadDTOList(users);
  }

  async delete(data: DeleteUserDTO): Promise<boolean> {
    const user = await prisma.user.delete({
      where: {id: data.id},
    });
    return !!user;
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/repositories/notification.repository.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {prisma} from "../db_client/prisma_client";
import {CreateNotificationDTO, ReadNotificationDTO} from "@/shared/dtos";
import {INotificationRepository} from "./inotification.repository";
import {NotificationMapper} from "../mappers/prisma";

export class NotificationRepository implements INotificationRepository {
  async create(data: CreateNotificationDTO): Promise<ReadNotificationDTO> {
    const notification = await prisma.notification.create({data});
    return NotificationMapper.toReadDTO(notification);
  }

  async markAsRead(id: string): Promise<ReadNotificationDTO | null> {
    try {
      const notification = await prisma.notification.update({
        where: {id},
        data: {is_read: true},
      });
      return NotificationMapper.toReadDTO(notification);
    } catch (error) {
      return null;
    }
  }

  async markAllAsRead(userId: string): Promise<number> {
    const result = await prisma.notification.updateMany({
      where: {user_id: userId, is_read: false},
      data: {is_read: true},
    });

    return result.count;
  }

  async findOne(id: string): Promise<ReadNotificationDTO | null> {
    const notification = await prisma.notification.findUnique({
      where: {id},
    });
    return notification ? NotificationMapper.toReadDTO(notification) : null;
  }

  async findByUser(
    userId: string,
    options?: {
      page?: number;
      limit?: number;
      unreadOnly?: boolean;
    }
  ): Promise<{
    notifications: ReadNotificationDTO[];
    total: number;
    unreadCount: number;
  }> {
    // Build where clause
    const where: any = {user_id: userId};

    if (options?.unreadOnly) {
      where.is_read = false;
    }

    // Count total notifications
    const total = await prisma.notification.count({where});

    // Count unread notifications
    const unreadCount = await prisma.notification.count({
      where: {user_id: userId, is_read: false},
    });

    // Get notifications with pagination
    const skip =
      options?.page && options?.limit
        ? (options.page - 1) * options.limit
        : undefined;
    const take = options?.limit;

    const notifications = await prisma.notification.findMany({
      where,
      skip,
      take,
      orderBy: {created_at: "desc"},
    });

    return {
      notifications: NotificationMapper.toReadDTOList(notifications),
      total,
      unreadCount,
    };
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.notification.delete({
        where: {id},
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/repositories/promo.repository.ts`:

```ts
// import {prisma} from "../db_client/prisma_client";
// import {IPromoCodeRepository} from "./ipromo-code.repository";
// import {PromoCodeMapper} from "../mappers/prisma";

// export class PromoCodeRepository implements IPromoCodeRepository {
//   async create(data: any): Promise<any> {
//     const promoCode = await prisma.$transaction(async (tx) => {
//       // Create promo code
//       const newPromoCode = await tx.promoCode.create({
//         data: {
//           code: data.code,
//           discount_percentage: data.discount_percentage,
//           expires_at: data.expires_at ? new Date(data.expires_at) : null,
//           max_uses: data.max_uses || null,
//           is_active: data.is_active !== undefined ? data.is_active : true,
//           min_order_value: data.min_order_value || null,
//         },
//       });

//       // Create product or category restrictions if provided
//       if (data.applicable_products && data.applicable_products.length > 0) {
//         // In a real schema, you would have junction tables for these relationships
//         // For this implementation, we'll assume this is handled differently
//       }

//       return newPromoCode;
//     });

//     return PromoCodeMapper.toReadDTO(promoCode);
//   }

//   async update(id: string, data: any): Promise<any | null> {
//     try {
//       const promoCode = await prisma.promoCode.update({
//         where: {id},
//         data: {
//           code: data.code,
//           discount_percentage: data.discount_percentage,
//           expires_at: data.expires_at ? new Date(data.expires_at) : undefined,
//           max_uses: data.max_uses,
//           is_active: data.is_active,
//           min_order_value: data.min_order_value,
//         },
//       });

//       // Update product or category restrictions if provided
//       // In a real schema, you would update junction tables for these relationships

//       return PromoCodeMapper.toReadDTO(promoCode);
//     } catch (error) {
//       return null;
//     }
//   }

//   async findOne(id: string): Promise<any | null> {
//     // In a real schema, you would include product and category restrictions
//     const promoCode = await prisma.promoCode.findUnique({
//       where: {id},
//     });

//     return promoCode ? PromoCodeMapper.toReadDTO(promoCode) : null;
//   }

//   async findByCode(code: string): Promise<any | null> {
//     // In a real schema, you would include product and category restrictions
//     const promoCode = await prisma.promoCode.findFirst({
//       where: {code, is_active: true},
//     });

//     return promoCode ? PromoCodeMapper.toReadDTO(promoCode) : null;
//   }

//   async findAll(includeInactive: boolean = false): Promise<any[]> {
//     const where = includeInactive ? {} : {is_active: true};

//     const promoCodes = await prisma.promoCode.findMany({
//       where,
//       orderBy: {created_at: "desc"},
//     });

//     return PromoCodeMapper.toReadDTOList(promoCodes);
//   }

//   async findActive(): Promise<any[]> {
//     const now = new Date();

//     const promoCodes = await prisma.promoCode.findMany({
//       where: {
//         is_active: true,
//         OR: [{expires_at: null}, {expires_at: {gt: now}}],
//       },
//       orderBy: {created_at: "desc"},
//     });

//     return PromoCodeMapper.toReadDTOList(promoCodes);
//   }

//   async delete(id: string): Promise<boolean> {
//     try {
//       await prisma.promoCode.delete({
//         where: {id},
//       });
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }

//   async recordUsage(
//     promoCodeId: string,
//     orderId: string,
//     userId: string,
//     discount: number
//   ): Promise<void> {
//     // In a real schema, you would have a PromoCodeUsage table
//     // For this implementation, we'll just increment usage count
//     await prisma.promoCode.update({
//       where: {id: promoCodeId},
//       data: {
//         uses: {
//           increment: 1,
//         },
//       },
//     });
//   }

//   async getUsageStats(promoCodeId: string): Promise<any> {
//     // In a real schema, you would query the PromoCodeUsage table
//     // For this implementation, we'll return basic stats
//     const promoCode = await prisma.promoCode.findUnique({
//       where: {id: promoCodeId},
//     });

//     if (!promoCode) return null;

//     return {
//       id: promoCode.id,
//       code: promoCode.code,
//       total_uses: promoCode.uses || 0,
//       max_uses: promoCode.max_uses,
//       is_active: promoCode.is_active,
//       // In a real implementation, you would include more detailed stats:
//       // total_discount_amount, average_order_value, etc.
//     };
//   }
// }

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/repositories/email_sub.repository.ts`:

```ts
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {prisma} from "../db_client/prisma_client";
import {
  CreateEmailSubscriptionDTO,
  ReadEmailSubscriptionDTO,
  UpdateEmailSubscriptionDTO,
} from "@/shared/dtos";
import {IEmailSubscriptionRepository} from "./iemail_sub.repository";
import {EmailSubscriptionMapper} from "../mappers/prisma";

export class EmailSubscriptionRepository
  implements IEmailSubscriptionRepository
{
  async create(
    data: CreateEmailSubscriptionDTO
  ): Promise<ReadEmailSubscriptionDTO> {
    // Check if a subscription already exists for this user
    const existingSubscription = await prisma.emailSubscription.findFirst({
      where: {customer_id: data.customer_id},
    });

    if (existingSubscription) {
      // Update existing subscription instead of creating a new one
      const updatedSubscription = await prisma.emailSubscription.update({
        where: {id: existingSubscription.id},
        data: {is_subscribed: data.is_subscribed},
      });

      return EmailSubscriptionMapper.toReadDTO(updatedSubscription);
    }

    // Create new subscription
    const subscription = await prisma.emailSubscription.create({data});
    return EmailSubscriptionMapper.toReadDTO(subscription);
  }

  async update(
    id: string,
    data: UpdateEmailSubscriptionDTO
  ): Promise<ReadEmailSubscriptionDTO | null> {
    try {
      const subscription = await prisma.emailSubscription.update({
        where: {id},
        data,
      });
      return EmailSubscriptionMapper.toReadDTO(subscription);
    } catch (error) {
      return null;
    }
  }

  async findOne(id: string): Promise<ReadEmailSubscriptionDTO | null> {
    const subscription = await prisma.emailSubscription.findUnique({
      where: {id},
    });
    return subscription
      ? EmailSubscriptionMapper.toReadDTO(subscription)
      : null;
  }

  async findByUser(userId: string): Promise<ReadEmailSubscriptionDTO | null> {
    const subscription = await prisma.emailSubscription.findFirst({
      where: {customer_id: userId},
    });
    return subscription
      ? EmailSubscriptionMapper.toReadDTO(subscription)
      : null;
  }

  async findAll(options?: {
    subscribedOnly?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{
    subscriptions: ReadEmailSubscriptionDTO[];
    total: number;
  }> {
    // Build where clause
    const where: any = {};

    if (options?.subscribedOnly) {
      where.is_subscribed = true;
    }

    // Count total
    const total = await prisma.emailSubscription.count({where});

    // Get subscriptions with pagination
    const skip =
      options?.page && options?.limit
        ? (options.page - 1) * options.limit
        : undefined;
    const take = options?.limit;

    const subscriptions = await prisma.emailSubscription.findMany({
      where,
      skip,
      take,
      orderBy: {created_at: "desc"},
      include: {
        customer: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return {
      subscriptions: subscriptions.map((subscription) =>
        EmailSubscriptionMapper.toReadDetailedDTO(subscription)
      ),
      total,
    };
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/repositories/shipping_address.repository.ts`:

```ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import {prisma} from "../db_client/prisma_client";
import {
  CreateShippingAddressDTO,
  ReadShippingAddressDTO,
  UpdateShippingAddressDTO,
} from "@/shared/dtos";
import {IShippingAddressRepository} from "./ishipping_address.repository";
import {ShippingAddressMapper} from "../mappers/prisma";

export class ShippingAddressRepository implements IShippingAddressRepository {
  async create(
    data: CreateShippingAddressDTO
  ): Promise<ReadShippingAddressDTO> {
    // If this is set as default, unset any existing default addresses for this user
    if (data.is_default) {
      await prisma.shippingAddress.updateMany({
        where: {customer_id: data.customer_id, is_default: true},
        data: {is_default: false},
      });
    }

    const address = await prisma.shippingAddress.create({data});
    return ShippingAddressMapper.toReadDTO(address);
  }

  async update(
    id: string,
    data: UpdateShippingAddressDTO
  ): Promise<ReadShippingAddressDTO | null> {
    try {
      // Get the address to update
      const currentAddress = await prisma.shippingAddress.findUnique({
        where: {id},
      });

      if (!currentAddress) return null;

      // If setting as default, unset any existing default addresses for this user
      if (data.is_default && !currentAddress.is_default) {
        await prisma.shippingAddress.updateMany({
          where: {customer_id: currentAddress.customer_id, is_default: true},
          data: {is_default: false},
        });
      }

      const address = await prisma.shippingAddress.update({
        where: {id},
        data,
      });

      return ShippingAddressMapper.toReadDTO(address);
    } catch (error) {
      return null;
    }
  }

  async findOne(id: string): Promise<ReadShippingAddressDTO | null> {
    const address = await prisma.shippingAddress.findUnique({
      where: {id},
    });
    return address ? ShippingAddressMapper.toReadDTO(address) : null;
  }

  async findByUser(userId: string): Promise<ReadShippingAddressDTO[]> {
    const addresses = await prisma.shippingAddress.findMany({
      where: {customer_id: userId},
      orderBy: [{is_default: "desc"}],
    });

    return ShippingAddressMapper.toReadDTOList(addresses);
  }

  async setDefault(
    userId: string,
    addressId: string
  ): Promise<ReadShippingAddressDTO | null> {
    try {
      // First, unset all default addresses for this user
      await prisma.shippingAddress.updateMany({
        where: {customer_id: userId, is_default: true},
        data: {is_default: false},
      });

      // Then set the new default
      const address = await prisma.shippingAddress.update({
        where: {id: addressId},
        data: {is_default: true},
      });

      return ShippingAddressMapper.toReadDTO(address);
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.shippingAddress.delete({
        where: {id},
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/repositories/order.repository.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {prisma} from "../db_client/prisma_client";
import {
  CreateOrderDTO,
  CreateOrderItemDTO,
  ReadOrderDTO,
  UpdateOrderDTO,
} from "@/shared/dtos";

import {OrderMapper} from "../mappers/prisma";
import {OrderStatus} from "@/shared/enums";
import {IOrderRepository} from "./iorder.repository";

export class OrderRepository implements IOrderRepository {
  async create(
    data: CreateOrderDTO,
    orderItems: CreateOrderItemDTO[]
  ): Promise<ReadOrderDTO> {
    const order = await prisma.order.create({
      data: {
        ...data,
        orderItems: {
          create: orderItems,
        },
      },
    });

    return OrderMapper.toReadDTO(order);
  }

  async update(id: string, data: UpdateOrderDTO): Promise<ReadOrderDTO | null> {
    try {
      const order = await prisma.order.update({
        where: {id},
        data,
      });
      return OrderMapper.toReadDTO(order);
    } catch (error) {
      return null;
    }
  }

  async updateStatus(
    id: string,
    status: OrderStatus
  ): Promise<ReadOrderDTO | null> {
    try {
      const order = await prisma.order.update({
        where: {id},
        data: {status},
      });
      return OrderMapper.toReadDTO(order);
    } catch (error) {
      return null;
    }
  }

  async findOne(id: string): Promise<ReadOrderDTO | null> {
    const order = await prisma.order.findUnique({
      where: {id},
    });
    return order ? OrderMapper.toReadDTO(order) : null;
  }

  async findOneWithDetails(id: string): Promise<any | null> {
    const order = await prisma.order.findUnique({
      where: {id},
      include: {
        customer: {
          select: {
            name: true,
            email: true,
            phone_number: true,
          },
        },
        orderItems: {
          include: {
            product: true,
          },
        },
        payment: true,
      },
    });

    return order ? OrderMapper.toReadDetailedDTO(order) : null;
  }

  async findAll(options?: {
    customerId?: string;
    status?: OrderStatus;
    page?: number;
    limit?: number;
  }): Promise<{
    orders: ReadOrderDTO[];
    total: number;
  }> {
    // Build where clause
    const where: any = {};

    if (options?.customerId) {
      where.customer_id = options.customerId;
    }

    if (options?.status) {
      where.status = options.status;
    }

    // Count total
    const total = await prisma.order.count({where});

    // Get orders with pagination
    const skip =
      options?.page && options?.limit
        ? (options.page - 1) * options.limit
        : undefined;
    const take = options?.limit;

    const orders = await prisma.order.findMany({
      where,
      skip,
      take,
      orderBy: {created_at: "desc"},
      include: {
        customer: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return {
      orders: OrderMapper.toReadDTOList(orders),
      total,
    };
  }

  async getAnalytics(startDate?: Date, endDate?: Date): Promise<any> {
    // Build where clause for date range
    const where: any = {};

    if (startDate || endDate) {
      where.created_at = {};

      if (startDate) {
        where.created_at.gte = startDate;
      }

      if (endDate) {
        where.created_at.lte = endDate;
      }
    }

    // Get all orders in date range
    const orders = await prisma.order.findMany({where});

    // Calculate status counts
    const statusCounts: Record<OrderStatus, number> = {
      Pending: 0,
      Processing: 0,
      Shipped: 0,
      Delivered: 0,
      Cancelled: 0,
    };

    let totalRevenue = 0;

    // Group by date for revenue chart
    const revenueByDate: {[date: string]: number} = {};

    for (const order of orders) {
      // Increment status count
      statusCounts[order.status]++;

      // Add to total revenue (if not cancelled)
      if (order.status !== "Cancelled") {
        totalRevenue += order.total_price;
      }

      // Group by date
      const dateStr = order.created_at.toISOString().split("T")[0];
      revenueByDate[dateStr] =
        (revenueByDate[dateStr] || 0) + order.total_price;
    }

    return {
      totalOrders: orders.length,
      totalRevenue,
      averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
      statusCounts,
      revenueByDate: Object.entries(revenueByDate).map(([date, revenue]) => ({
        date,
        revenue,
      })),
    };
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/repositories/ipromo.repository.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPromoCodeRepository {
  create(data: any): Promise<any>;
  update(id: string, data: any): Promise<any | null>;
  findOne(id: string): Promise<any | null>;
  findByCode(code: string): Promise<any | null>;
  findAll(includeInactive?: boolean): Promise<any[]>;
  findActive(): Promise<any[]>;
  delete(id: string): Promise<boolean>;
  recordUsage(
    promoCodeId: string,
    orderId: string,
    userId: string,
    discount: number
  ): Promise<void>;
  getUsageStats(promoCodeId: string): Promise<any>;
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/repositories/ishipping_address.repository.ts`:

```ts
import {
  CreateShippingAddressDTO,
  ReadShippingAddressDTO,
  UpdateShippingAddressDTO,
} from "@/shared/dtos";

export interface IShippingAddressRepository {
  create(data: CreateShippingAddressDTO): Promise<ReadShippingAddressDTO>;
  update(
    id: string,
    data: UpdateShippingAddressDTO
  ): Promise<ReadShippingAddressDTO | null>;
  findOne(id: string): Promise<ReadShippingAddressDTO | null>;
  findByUser(userId: string): Promise<ReadShippingAddressDTO[]>;
  setDefault(
    userId: string,
    addressId: string
  ): Promise<ReadShippingAddressDTO | null>;
  delete(id: string): Promise<boolean>;
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/repositories/ipayment.repository.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import {PaymentMethod, PaymentStatus} from "@/shared/enums";

export interface IPaymentRepository {
  create(data: {
    order_id: string;
    payment_method: PaymentMethod;
    payment_status: PaymentStatus;
    transaction_id?: string;
  }): Promise<any>;
  update(
    id: string,
    data: {
      payment_status: PaymentStatus;
    }
  ): Promise<any | null>;
  findOne(id: string): Promise<any | null>;
  findByOrderId(orderId: string): Promise<any | null>;
  findAll(options?: {
    status?: PaymentStatus;
    page?: number;
    limit?: number;
  }): Promise<{
    payments: any[];
    total: number;
  }>;
  getAnalytics(startDate?: Date, endDate?: Date): Promise<any>;
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/repositories/iorder.repository.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import {CreateOrderDTO, ReadOrderDTO, UpdateOrderDTO} from "@/shared/dtos";
import {OrderStatus} from "@/shared/enums";

export interface IOrderRepository {
  create(data: CreateOrderDTO, orderItems: any[]): Promise<ReadOrderDTO>;
  update(id: string, data: UpdateOrderDTO): Promise<ReadOrderDTO | null>;
  updateStatus(id: string, status: OrderStatus): Promise<ReadOrderDTO | null>;
  findOne(id: string): Promise<ReadOrderDTO | null>;
  findOneWithDetails(id: string): Promise<any | null>;
  findAll(options?: {
    customerId?: string | null;
    status?: OrderStatus;
    page?: number;
    limit?: number;
  }): Promise<{
    orders: ReadOrderDTO[];
    total: number;
  }>;
  getAnalytics(startDate?: Date, endDate?: Date): Promise<any>;
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/mappers/prisma/order.mapper.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Order} from "@prisma/client";
import {ReadOrderDTO} from "@/shared/dtos";

export class OrderMapper {
  static toReadDTO(order: Order): ReadOrderDTO {
    return {
      id: order.id,
      customer_id: order.customer_id,
      total_price: order.total_price,
      status: order.status,
      created_at: order.created_at.toISOString(),
    };
  }

  static toReadDetailedDTO(
    order: Order & {
      customer?: any;
      orderItems?: any[];
      payment?: any;
    }
  ): any {
    return {
      id: order.id,
      customer_id: order.customer_id,
      total_price: order.total_price,
      status: order.status,
      created_at: order.created_at.toISOString(),
      customer: order.customer
        ? {
            name: order.customer.name,
            email: order.customer.email,
          }
        : undefined,
      items: order.orderItems
        ? order.orderItems.map((item) => ({
            id: item.id,
            product_id: item.product_id,
            product_name: item.product.name,
            quantity: item.quantity,
            price_at_purchase: item.price_at_purchase,
            discount_applied: item.discount_applied,
            subtotal:
              item.price_at_purchase *
              item.quantity *
              (1 - item.discount_applied / 100),
          }))
        : [],
      payment: order.payment
        ? {
            id: order.payment.id,
            payment_method: order.payment.payment_method,
            payment_status: order.payment.payment_status,
            transaction_id: order.payment.transaction_id,
            created_at: order.payment.created_at.toISOString(),
          }
        : undefined,
    };
  }

  static toReadDTOList(orders: Order[]): ReadOrderDTO[] {
    return orders.map((order) => this.toReadDTO(order));
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/mappers/prisma/shipping_address.mapper.ts`:

```ts
import {ShippingAddress} from "@prisma/client";
import {ReadShippingAddressDTO} from "@/shared/dtos";

export class ShippingAddressMapper {
  static toReadDTO(address: ShippingAddress): ReadShippingAddressDTO {
    return {
      id: address.id,
      customer_id: address.customer_id,
      address: address.address,
      city: address.city,
      postal_code: address.postal_code,
      country: address.country,
      is_default: address.is_default,
    };
  }

  static toReadDTOList(addresses: ShippingAddress[]): ReadShippingAddressDTO[] {
    return addresses.map((address) => this.toReadDTO(address));
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/mappers/prisma/order_item.mapper.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import {OrderItem} from "@prisma/client";
import {ReadOrderItemDTO} from "@/shared/dtos";

export class OrderItemMapper {
  static toReadDTO(
    orderItem: OrderItem & {product?: any; order?: any}
  ): ReadOrderItemDTO {
    return {
      id: orderItem.id,
      order_id: orderItem.order_id,
      product_id: orderItem.product_id,
      quantity: orderItem.quantity,
      price_at_purchase: orderItem.price_at_purchase,
      discount_applied: orderItem.discount_applied,
      created_at: "",
    };
  }

  static toReadDTOList(
    orderItems: (OrderItem & {product?: any; order?: any})[]
  ): ReadOrderItemDTO[] {
    return orderItems.map((orderItem) => this.toReadDTO(orderItem));
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/mappers/prisma/review.mapper.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Review} from "@prisma/client";
import {ReadReviewDTO} from "@/shared/dtos";

export class ReviewMapper {
  static toReadDTO(review: Review): ReadReviewDTO {
    return {
      id: review.id,
      customer_id: review.customer_id,
      product_id: review.product_id,
      rating: review.rating,
      review_text: review.review_text || undefined,
      created_at: review.created_at.toISOString(),
    };
  }

  static toReadDetailedDTO(
    review: Review & {customer?: any; product?: any}
  ): any {
    return {
      id: review.id,
      customer_id: review.customer_id,
      product_id: review.product_id,
      rating: review.rating,
      review_text: review.review_text || undefined,
      created_at: review.created_at.toISOString(),
      customer: review.customer
        ? {
            name: review.customer.name,
          }
        : undefined,
      product: review.product
        ? {
            name: review.product.name,
            image_url: review.product.image_url,
          }
        : undefined,
    };
  }

  static toReadDTOList(reviews: Review[]): ReadReviewDTO[] {
    return reviews.map((review) => this.toReadDTO(review));
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/mappers/prisma/notification.mapper.ts`:

```ts
import {Notification} from "@prisma/client";
import {ReadNotificationDTO} from "@/shared/dtos";

export class NotificationMapper {
  static toReadDTO(notification: Notification): ReadNotificationDTO {
    return {
      id: notification.id,
      user_id: notification.user_id,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      is_read: notification.is_read,
      created_at: notification.created_at.toISOString(),
    };
  }

  static toReadDTOList(notifications: Notification[]): ReadNotificationDTO[] {
    return notifications.map((notification) => this.toReadDTO(notification));
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/mappers/prisma/promo_code.mapper.ts`:

```ts
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {PromoCode} from "@prisma/client";

// export class PromoCodeMapper {
//   static toReadDTO(promoCode: PromoCode): any {
//     return {
//       id: promoCode.id,
//       code: promoCode.code,
//       discount_percentage: promoCode.discount_percentage,
//       expires_at: promoCode.expires_at
//         ? promoCode.expires_at.toISOString()
//         : null,
//       max_uses: promoCode.max_uses,
//       uses: promoCode.uses || 0,
//       is_active: promoCode.is_active,
//       min_order_value: promoCode.min_order_value,
//       created_at: promoCode.created_at.toISOString(),
//     };
//   }

//   static toReadDTOList(promoCodes: PromoCode[]): any[] {
//     return promoCodes.map((promoCode) => this.toReadDTO(promoCode));
//   }
// }

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/mappers/prisma/product.mapper.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Product} from "@prisma/client";
import {ReadProductDTO} from "@/shared/dtos";

export class ProductMapper {
  static toReadDTO(product: Product & {category?: any}): ReadProductDTO {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      discount_percentage: product.discount_percentage,
      stock_quantity: product.stock_quantity,
      image_url: product.image_url,
      category_id: product.category_id || "",
      created_at: product.created_at.toISOString(),
    };
  }

  static toReadDTOList(
    products: (Product & {category?: any})[]
  ): ReadProductDTO[] {
    return products.map((product) => this.toReadDTO(product));
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/mappers/prisma/user.mapper.ts`:

```ts
import {User} from "@prisma/client"; // Assuming this is your Prisma User model
import {ReadUserAuthDTO, ReadUserDTO} from "@/shared/dtos";

export class UserMapper {
  static toReadDTO(user: User): ReadUserDTO {
    return {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      is_email_verified: user.is_email_verified,
      created_at: user.created_at.toISOString(),
    };
  }
  static toReadAuthDTO(user: User): ReadUserAuthDTO {
    return {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      password_hash: user.password_hash,
      is_email_verified: user.is_email_verified,
      created_at: user.created_at.toISOString(),
    };
  }

  static toReadDTOList(users: User[]): ReadUserDTO[] {
    return users.map((user) => this.toReadDTO(user));
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/mappers/prisma/email_subscription.mapper.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import {EmailSubscription} from "@prisma/client";
import {ReadEmailSubscriptionDTO} from "@/shared/dtos";

export class EmailSubscriptionMapper {
  static toReadDTO(subscription: EmailSubscription): ReadEmailSubscriptionDTO {
    return {
      id: subscription.id,
      customer_id: subscription.customer_id,
      is_subscribed: subscription.is_subscribed,
      created_at: subscription.created_at.toISOString(),
    };
  }

  static toReadDetailedDTO(
    subscription: EmailSubscription & {customer?: any}
  ): any {
    return {
      id: subscription.id,
      customer_id: subscription.customer_id,
      is_subscribed: subscription.is_subscribed,
      created_at: subscription.created_at.toISOString(),
      customer: subscription.customer
        ? {
            name: subscription.customer.name,
            email: subscription.customer.email,
          }
        : undefined,
    };
  }

  static toReadDTOList(
    subscriptions: EmailSubscription[]
  ): ReadEmailSubscriptionDTO[] {
    return subscriptions.map((subscription) => this.toReadDTO(subscription));
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/mappers/prisma/payment.mapper.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Payment} from "@prisma/client";

export class PaymentMapper {
  static toReadDTO(payment: Payment): any {
    return {
      id: payment.id,
      order_id: payment.order_id,
      payment_method: payment.payment_method,
      payment_status: payment.payment_status,
      transaction_id: payment.transaction_id,
      created_at: payment.created_at.toISOString(),
    };
  }

  static toReadDetailedDTO(payment: Payment & {order?: any}): any {
    return {
      id: payment.id,
      order_id: payment.order_id,
      payment_method: payment.payment_method,
      payment_status: payment.payment_status,
      transaction_id: payment.transaction_id,
      created_at: payment.created_at.toISOString(),
      order: payment.order
        ? {
            total_price: payment.order.total_price,
            status: payment.order.status,
            customer: payment.order.customer
              ? {
                  name: payment.order.customer.name,
                  email: payment.order.customer.email,
                }
              : null,
          }
        : null,
    };
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/mappers/prisma/category.mapper.ts`:

```ts
import {Category} from "@prisma/client";
import {ReadCategoryDTO} from "@/shared/dtos";

export class CategoryMapper {
  static toReadDTO(category: Category): ReadCategoryDTO {
    return {
      id: category.id,
      name: category.name,
      created_at: category.created_at.toISOString(),
    };
  }

  static toReadDTOList(categories: Category[]): ReadCategoryDTO[] {
    return categories.map((category) => this.toReadDTO(category));
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/data_access/mappers/prisma/index.ts`:

```ts
export * from "./category.mapper";
export * from "./product.mapper";
export * from "./order.mapper";
export * from "./order_item.mapper";
export * from "./payment.mapper";
export * from "./notification.mapper";
export * from "./review.mapper";
export * from "./shipping_address.mapper";
export * from "./email_subscription.mapper";
//export * from "./promo_code.mapper";
export * from "./user.mapper";

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/middleware/auth.middleware.ts`:

```ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import {NextRequest, NextResponse} from "next/server";
import {AuthResult, AuthUser} from "../types";
import {HttpStatus, UserRole} from "../enums";
import {JWTUtil} from "../utils/jwt_util";

export async function verifyAuth(
  req: NextRequest,
  allowedRoles: UserRole[] = []
): Promise<AuthResult> {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return {
        success: false,
        error: new NextResponse(
          JSON.stringify({
            message: "No token provided",
            statusCode: HttpStatus.UNAUTHORIZED,
          }),
          {status: HttpStatus.UNAUTHORIZED}
        ),
      };
    }

    const user = JWTUtil.verifyAccessToken(token);

    if (allowedRoles.length && !allowedRoles.includes(user.role as UserRole)) {
      return {
        success: false,
        error: new NextResponse(
          JSON.stringify({
            message: "Insufficient permissions",
            statusCode: HttpStatus.FORBIDDEN,
          }),
          {status: HttpStatus.FORBIDDEN}
        ),
      };
    }

    return {
      success: true,
      user: user as AuthUser,
    };
  } catch (error) {
    return {
      success: false,
      error: new NextResponse(
        JSON.stringify({
          message: "Authentication failed",
          statusCode: HttpStatus.UNAUTHORIZED,
        }),
        {status: HttpStatus.UNAUTHORIZED}
      ),
    };
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/types/api.types.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import {HttpStatus} from "../enums";

export interface ApiErrorResponse {
  code: string;
  message: string;
  details?: any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  statusCode: number;
}

export interface ErrorResponse {
  message: string;
  statusCode: HttpStatus;
}

export class HttpError extends Error {
  constructor(
    public statusCode: HttpStatus,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = "HttpError";
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/types/product.ts`:

```ts
export interface Productdashbord {
    id: number;
    name: string;
    currentPrice: number;
    originalPrice: number;
    rating: number;
    image: string;
  }


  export type Product = {
    id: string
    name: string
    category: string
    price: number
    discount: number
    stockQuantity: number
    stockStatus: "In Stock" | "Low Stock" | "Out of Stock"
    image: string
  }
  
  
```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/types/orders.ts`:

```ts
export interface User {
    id: string;
    name: string;
    email?: string;
    avatar?: string;
  }
  
  export interface OrderItem {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
  }
  
  export type OrderStatus = 'Paid' | 'Delivered' | 'Completed' | 'Pending';
  
  export interface Order {
    id: string;
    customer: User;
    status: OrderStatus;
    total: number;
    date: string;
    items: OrderItem[];
  }
```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/types/auth.types.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import {NextResponse} from "next/server";
import {UserRole} from "../enums/auth.enum";

export interface JWTPayload {
  id: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}
export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}
export interface SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    phoneNumber?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
  accessToken: string;
  refreshToken: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}
export interface AuthResult {
  success: boolean;
  user?: AuthUser | null;
  error?: NextResponse;
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/types/categories.ts`:

```ts
export type Category = {
    id: string
    name: string
    slug: string
    description: string
    image: string
    status: boolean
  }
  
  
```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/types/index.ts`:

```ts
export * from "./auth.types";
export * from "./api.types";

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/enums/auth.enum.ts`:

```ts
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum UserRole {
  CUSTOMER = "Customer",
  ADMIN = "Admin",
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/enums/app.enum.ts`:

```ts
export enum OrderStatus {
  PENDING = "Pending",
  PROCESSING = "Processing",
  SHIPPED = "Shipped",
  DELIVERED = "Delivered",
  CANCELLED = "Cancelled",
}

// Payment methods
export enum PaymentMethod {
  CREDIT_CARD = "CreditCard",
  PAYPAL = "PayPal",
  BANK_TRANSFER = "BankTransfer",
}

// Payment statuses
export enum PaymentStatus {
  PENDING = "Pending",
  COMPLETED = "Completed",
  FAILED = "Failed",
  REFUNDED = "Refunded",
}

// Notification types
export enum NotificationType {
  EMAIL = "Email",
  PUSH = "Push",
  SMS = "SMS",
}

// Promo code types
export enum PromoCodeType {
  PERCENTAGE = "Percentage",
  FIXED_AMOUNT = "FixedAmount",
  FREE_SHIPPING = "FreeShipping",
  BUY_ONE_GET_ONE = "BuyOneGetOne",
}

// Promo code applicability
export enum PromoCodeApplicability {
  ALL_PRODUCTS = "AllProducts",
  SPECIFIC_PRODUCTS = "SpecificProducts",
  SPECIFIC_CATEGORIES = "SpecificCategories",
}

// Promo code status
export enum PromoCodeStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  EXPIRED = "Expired",
  USAGE_LIMIT_REACHED = "UsageLimitReached",
}

// Review status (for moderation)
export enum ReviewStatus {
  PENDING = "Pending",
  APPROVED = "Approved",
  REJECTED = "Rejected",
  HIDDEN = "Hidden",
}

// Shipping methods
export enum ShippingMethod {
  STANDARD = "Standard",
  EXPRESS = "Express",
  OVERNIGHT = "Overnight",
  PICKUP = "Pickup",
}

// Marketing campaign types
export enum CampaignType {
  PROMOTIONAL = "Promotional",
  NEWSLETTER = "Newsletter",
  ABANDONED_CART = "AbandonedCart",
  PRODUCT_ANNOUNCEMENT = "ProductAnnouncement",
  WELCOME = "Welcome",
}

// User account status
export enum UserStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  BANNED = "Banned",
  PENDING_VERIFICATION = "PendingVerification",
}

// Inventory status
export enum InventoryStatus {
  IN_STOCK = "InStock",
  LOW_STOCK = "LowStock",
  OUT_OF_STOCK = "OutOfStock",
  DISCONTINUED = "Discontinued",
}

// Sort order
export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/enums/index.ts`:

```ts
export * from "./auth.enum";
export * from "./app.enum";

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/utils/jwt_util.ts`:

```ts
/* eslint-disable @typescript-eslint/no-unused-vars */
// utils/jwt.util.ts
import jwt from "jsonwebtoken";
import {JWTPayload} from "../types";

export class JWTUtil {
  private static readonly JWT_SECRET =
    process.env.JWT_SECRET || "your-secret-key";
  private static readonly JWT_REFRESH_SECRET =
    process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key";
  private static readonly ACCESS_TOKEN_EXPIRY = "15m";
  private static readonly REFRESH_TOKEN_EXPIRY = "7d";

  static generateAccessToken(payload: Omit<JWTPayload, "iat" | "exp">): string {
    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.ACCESS_TOKEN_EXPIRY,
    });
  }

  static generateRefreshToken(
    payload: Omit<JWTPayload, "iat" | "exp">
  ): string {
    return jwt.sign(payload, this.JWT_REFRESH_SECRET, {
      expiresIn: this.REFRESH_TOKEN_EXPIRY,
    });
  }

  static verifyAccessToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, this.JWT_SECRET) as JWTPayload;
    } catch (error) {
      throw new Error("Invalid access token");
    }
  }

  static verifyRefreshToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, this.JWT_REFRESH_SECRET) as JWTPayload;
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }

  static decodeToken(token: string): JWTPayload | null {
    try {
      return jwt.decode(token) as JWTPayload;
    } catch {
      return null;
    }
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/dtos/review.dto.ts`:

```ts
// Create Review DTO
export interface CreateReviewDTO {
  customer_id: string;
  product_id: string;
  rating: number;
  review_text?: string;
}

// Update Review DTO
export interface UpdateReviewDTO {
  rating?: number;
  review_text?: string;
}

// Read Review DTO
export interface ReadReviewDTO {
  id: string;
  customer_id: string;
  product_id: string;
  rating: number;
  review_text?: string;
  created_at: string;
}

// Delete Review DTO
export interface DeleteReviewDTO {
  id: string;
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/dtos/order.dto.ts`:

```ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CreateOrderItemDTO,
  ReadOrderItemDTO,
  UpdateOrderItemDTO,
} from "./order_item.dto";

// Create Order DTO
export interface CreateOrderDTO {
  customer_id: string;
  total_price: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  orderItems: CreateOrderItemDTO[];
}

// Update Order DTO
export interface UpdateOrderDTO {
  total_price?: number;
  status?: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  orderItems: UpdateOrderItemDTO[];
}

// Read Order DTO
export interface ReadOrderDTO {
  id: string;
  customer_id: string;
  total_price: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  // items: ReadOrderItemDTO[];
  created_at: string;
}

// Delete Order DTO
export interface DeleteOrderDTO {
  id: string;
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/dtos/user.dto.ts`:

```ts
// Create User DTO
export interface CreateUserDTO {
  role: "Admin" | "Customer";
  name: string;
  email: string;
  password_hash: string;
  phone_number: string;
  address?: string;
}

// Update User DTO
export interface UpdateUserDTO {
  role?: "Admin" | "Customer";
  name?: string;
  email?: string;
  password_hash?: string;
  phone_number?: string;
  address?: string;
  is_email_verified?: boolean;
}

// Read User DTO (for fetching user data)
export interface ReadUserAuthDTO {
  id: string;
  role: "Admin" | "Customer";
  name: string;
  email: string;
  phone_number: string;
  address?: string;
  password_hash?: string;
  is_email_verified: boolean;
  created_at: string;
}
export interface ReadUserDTO {
  id: string;
  role: "Admin" | "Customer";
  name: string;
  email: string;
  phone_number: string;
  address?: string;

  is_email_verified: boolean;
  created_at: string;
}
// Delete User DTO
export interface DeleteUserDTO {
  id: string;
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/dtos/order_item.dto.ts`:

```ts
// Create OrderItem DTO
export interface CreateOrderItemDTO {
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: number;
  discount_applied?: number;
}

// Update OrderItem DTO
export interface UpdateOrderItemDTO {
  quantity?: number;
  price_at_purchase?: number;
  discount_applied?: number;
}

// Read OrderItem DTO
export interface ReadOrderItemDTO {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: number;
  discount_applied: number;
  created_at: string;
}

// Delete OrderItem DTO
export interface DeleteOrderItemDTO {
  id: string;
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/dtos/category.dto.ts`:

```ts
// Create Category DTO
export interface CreateCategoryDTO {
  name: string;
}

// Update Category DTO
export interface UpdateCategoryDTO {
  name?: string;
}

// Read Category DTO
export interface ReadCategoryDTO {
  id: string;
  name: string;
  created_at: string;
}

// Delete Category DTO
export interface DeleteCategoryDTO {
  id: string;
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/dtos/index.ts`:

```ts
// Exporting all DTOs from a single index.ts file
export * from "./user.dto";
export * from "./product.dto";
export * from "./category.dto";
export * from "./order.dto";
export * from "./order_item.dto";
export * from "./review.dto";
export * from "./shipping_address.dto";
export * from "./notification.dto";
export * from "./email_subscription.dto";

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/dtos/notification.dto.ts`:

```ts
// Create Notification DTO
export interface CreateNotificationDTO {
  user_id: string;
  title: string;
  message: string;
  type: "Email" | "Push" | "SMS";
  is_read: boolean;
}

// Update Notification DTO
export interface UpdateNotificationDTO {
  title?: string;
  message?: string;
  type?: "Email" | "Push" | "SMS";
  is_read?: boolean;
}

// Read Notification DTO
export interface ReadNotificationDTO {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: "Email" | "Push" | "SMS";
  is_read: boolean;
  created_at: string;
}

// Delete Notification DTO
export interface DeleteNotificationDTO {
  id: string;
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/dtos/product.dto.ts`:

```ts
// Create Product DTO
export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  discount_percentage: number;
  stock_quantity: number;
  image_url: string;
  category_id?: string;
}

// Update Product DTO
export interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  discount_percentage?: number;
  stock_quantity?: number;
  image_url?: string;
  category_id?: string;
}

// Read Product DTO
export interface ReadProductDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_percentage: number;
  stock_quantity: number;
  image_url: string;
  category_id: string;
  created_at: string;
}

// Delete Product DTO
export interface DeleteProductDTO {
  id: string;
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/dtos/email_subscription.dto.ts`:

```ts
// Create EmailSubscription DTO
export interface CreateEmailSubscriptionDTO {
  customer_id: string;
  is_subscribed: boolean;
}

// Update EmailSubscription DTO
export interface UpdateEmailSubscriptionDTO {
  is_subscribed?: boolean;
}

// Read EmailSubscription DTO
export interface ReadEmailSubscriptionDTO {
  id: string;
  customer_id: string;
  is_subscribed: boolean;
  created_at: string;
}

// Delete EmailSubscription DTO
export interface DeleteEmailSubscriptionDTO {
  id: string;
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/dtos/shipping_address.dto.ts`:

```ts
// Create ShippingAddress DTO
export interface CreateShippingAddressDTO {
  customer_id: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

// Update ShippingAddress DTO
export interface UpdateShippingAddressDTO {
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  is_default?: boolean;
}

// Read ShippingAddress DTO
export interface ReadShippingAddressDTO {
  id: string;
  customer_id: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

// Delete ShippingAddress DTO
export interface DeleteShippingAddressDTO {
  id: string;
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/lib/sdcn/utils.ts`:

```ts
import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/data/productList.ts`:

```ts
import type { Product } from "@/shared/types/product"

export const initialProducts: Product[] = [
  {
    id: "1",
    name: "Premium T-Shirt",
    category: "Clothing",
    price: 29.99,
    discount: 10,
    stockQuantity: 100,
    stockStatus: "In Stock",
    image: "/lap.jpg",
  },
  {
    id: "2",
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 99.99,
    discount: 0,
    stockQuantity: 50,
    stockStatus: "Low Stock",
    image: "/lap.jpg",
  },
]

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/data/product.ts`:

```ts
export const products = [
    {
      id: 1,
      name: "Boat Headphone",
      currentPrice: 285,
      originalPrice: 375,
      rating: 4,
      image: "/lap.jpg",
    },
    {
      id: 2,
      name: "MacBook Air Pro",
      currentPrice: 900,
      originalPrice: 650,
      rating: 5,
      image: "/lap.jpg",
    },
    {
      id: 3,
      name: "Red Velvet Dress",
      currentPrice: 200,
      originalPrice: 150,
      rating: 3,
      image: "/lap.jpg",
    },
    {
      id: 4,
      name: "Cute Soft Teddybear",
      currentPrice: 345,
      originalPrice: 285,
      rating: 2,
      image: "/lap.jpg",
    }
  ];
  
  
```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/data/categoryList.ts`:

```ts
import type { Category } from "@/shared/types/categories"

export const initialCategories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    slug: "electronics",
    description: "Electronic devices and accessories",
    image: "/assets/images/electronics.jpg",
    status: true,
  },
  {
    id: "2",
    name: "Clothing",
    slug: "clothing",
    description: "Fashion items and apparel",
    image: "/assets/images/clothing.jpg",
    status: true,
  },
]


```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/shared/data/orderList.ts`:

```ts
import { Order } from '../types/orders';

export const orders: Order[] = [
  {
    id: '#390561',
    customer: {
      id: '1',
      name: 'Michelle Black',
      avatar: '/avatars/michelle-black.jpg',
    },
    status: 'Paid',
    total: 7800.00,
    date: 'Jan 8',
    items: [
      {
        id: '1',
        name: 'Ryobi ONE drill/driver',
        price: 409.00,
        imageUrl: '/products/drill.jpg',
      },
      {
        id: '2',
        name: 'Socket Systems Electric',
        price: 228.00,
        imageUrl: '/products/socket.jpg',
      },
      {
        id: '3',
        name: 'DVB-T2 receiver blk',
        price: 139.00,
        imageUrl: '/products/receiver.jpg',
      },
      {
        id: '4',
        name: 'Inferno oil-free compressor',
        price: 135.00,
        imageUrl: '/products/compressor.jpg',
      },
      {
        id: '5',
        name: 'TIG-200 welding inverter',
        price: 699.00,
        imageUrl: '/products/welder.jpg',
      }
    ]
  },
  {
    id: '#663334',
    customer: {
      id: '2',
      name: 'Janice Chandler',
      avatar: '/avatars/janice-chandler.jpg',
    },
    status: 'Delivered',
    total: 1250.00,
    date: 'Jan 6',
    items: []
  },
  {
    id: '#418135',
    customer: {
      id: '3',
      name: 'Mildred Hall',
      avatar: '/avatars/mildred-hall.jpg',
    },
    status: 'Paid',
    total: 540.95,
    date: 'Jan 5',
    items: []
  },
  {
    id: '#801999',
    customer: {
      id: '4',
      name: 'Ana Carter',
      avatar: '/avatars/ana-carter.jpg',
    },
    status: 'Paid',
    total: 1489.00,
    date: 'Jan 2',
    items: []
  },
  {
    id: '#517783',
    customer: {
      id: '5',
      name: 'John Sherman',
      avatar: '/avatars/john-sherman.jpg',
    },
    status: 'Completed',
    total: 925.00,
    date: 'Dec 28',
    items: []
  },
  {
    id: '#602992',
    customer: {
      id: '6',
      name: 'James Miller',
      avatar: '/avatars/james-miller.jpg',
    },
    status: 'Paid',
    total: 1620.00,
    date: 'Dec 26',
    items: []
  },
  {
    id: '#730345',
    customer: {
      id: '7',
      name: 'Travis French',
      avatar: '/avatars/travis-french.jpg',
    },
    status: 'Paid',
    total: 315.50,
    date: 'Dec 22',
    items: []
  },
  {
    id: '#126955',
    customer: {
      id: '8',
      name: 'Ralph Hall',
      avatar: '/avatars/ralph-hall.jpg',
    },
    status: 'Paid',
    total: 1267.45,
    date: 'Dec 20',
    items: []
  },
  {
    id: '#045321',
    customer: {
      id: '9',
      name: 'Gary Gilbert',
      avatar: '/avatars/gary-gilbert.jpg',
    },
    status: 'Completed',
    total: 287.00,
    date: 'Dec 18',
    items: []
  },
  {
    id: '#062848',
    customer: {
      id: '10',
      name: 'Frances Howell',
      avatar: '/avatars/frances-howell.jpg',
    },
    status: 'Delivered',
    total: 1740.00,
    date: 'Dec 17',
    items: []
  },
  {
    id: '#646072',
    customer: {
      id: '11',
      name: 'Herbert Boyd',
      avatar: '/avatars/herbert-boyd.jpg',
    },
    status: 'Paid',
    total: 714.00,
    date: 'Dec 14',
    items: []
  },
  {
    id: '#432019',
    customer: {
      id: '12',
      name: 'Alan White',
      avatar: '/avatars/alan-white.jpg',
    },
    status: 'Paid',
    total: 267.65,
    date: 'Dec 13',
    items: []
  },
  {
    id: '#985927',
    customer: {
      id: '13',
      name: 'Julie Martin',
      avatar: '/avatars/julie-martin.jpg',
    },
    status: 'Delivered',
    total: 389.00,
    date: 'Dec 11',
    items: []
  }
];
```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/lib/api/orderService.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/api/orderService.ts
import {apiClient} from "./client";
import {CreateOrderDTO, ReadOrderDTO} from "@/shared/dtos";

export const orderService = {
  async createOrder(orderData: CreateOrderDTO) {
    return apiClient.post<{data: ReadOrderDTO}>("orders", orderData);
  },

  async getOrders(
    params: {page?: number; limit?: number; status?: string} = {}
  ) {
    const {page = 1, limit = 10, status} = params;

    let endpoint = `orders?page=${page}&limit=${limit}`;

    if (status) {
      endpoint += `&status=${status}`;
    }

    return apiClient.get<{
      data: {
        orders: ReadOrderDTO[];
        total: number;
        page: number;
        totalPages: number;
      };
    }>(endpoint);
  },

  async getOrderById(id: string) {
    return apiClient.get<{data: any}>(`orders/${id}`);
  },

  async cancelOrder(id: string) {
    return apiClient.post<{data: ReadOrderDTO}>(`orders/${id}/cancel`, {});
  },
};

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/lib/api/notificationService.ts`:

```ts
// src/lib/api/notificationService.ts
import {apiClient} from "./client";
import {ReadNotificationDTO} from "@/shared/dtos";

export const notificationService = {
  async getNotifications(
    params: {
      page?: number;
      limit?: number;
      unreadOnly?: boolean;
    } = {}
  ) {
    const {page = 1, limit = 10, unreadOnly = false} = params;

    let endpoint = `notifications?page=${page}&limit=${limit}`;

    if (unreadOnly) {
      endpoint += "&unreadOnly=true";
    }

    return apiClient.get<{
      data: {
        notifications: ReadNotificationDTO[];
        total: number;
        unreadCount: number;
      };
    }>(endpoint);
  },

  async markAsRead(id: string) {
    return apiClient.post<{data: ReadNotificationDTO}>(
      `notifications/${id}/read`,
      {}
    );
  },

  async markAllAsRead() {
    return apiClient.post<{success: boolean; count: number}>(
      "notifications/read-all",
      {}
    );
  },
};

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/lib/api/reviewService.ts`:

```ts
// src/lib/api/reviewService.ts
import {apiClient} from "./client";
import {CreateReviewDTO, ReadReviewDTO} from "@/shared/dtos";

export const reviewService = {
  async createReview(reviewData: CreateReviewDTO) {
    return apiClient.post<{data: ReadReviewDTO}>("reviews", reviewData);
  },

  async getProductReviews(
    productId: string,
    params: {
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: string;
    } = {}
  ) {
    const {
      page = 1,
      limit = 10,
      sortBy = "created_at",
      sortOrder = "desc",
    } = params;

    const endpoint = `reviews/product/${productId}?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`;

    return apiClient.get<{
      data: {
        reviews: ReadReviewDTO[];
        total: number;
      };
    }>(endpoint);
  },

  async getUserReviews(params: {page?: number; limit?: number} = {}) {
    const {page = 1, limit = 10} = params;

    return apiClient.get<{
      data: {
        reviews: ReadReviewDTO[];
        total: number;
      };
    }>(`reviews/user?page=${page}&limit=${limit}`);
  },
};

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/lib/api/authService.ts`:

```ts
// src/lib/api/authService.ts
import {apiClient} from "./client";
import {SignInRequest, SignUpRequest, AuthResponse} from "@/shared/types";

export const authService = {
  async signin(credentials: SignInRequest) {
    return apiClient.post<{data: AuthResponse}>("auth/signin", credentials, {
      token: false,
    });
  },

  async signup(userData: SignUpRequest) {
    return apiClient.post<{data: AuthResponse}>("auth/signup", userData, {
      token: false,
    });
  },

  async refreshToken(refreshToken: string) {
    return apiClient.post<{
      data: {accessToken: string; refreshToken: string};
    }>("auth/refresh", {refreshToken}, {token: false});
  },

  async changePassword(oldPassword: string, newPassword: string) {
    return apiClient.post<{success: boolean}>("auth/change-password", {
      oldPassword,
      newPassword,
    });
  },

  async resetPassword(email: string) {
    return apiClient.post<{success: boolean}>(
      "auth/reset-password",
      {email},
      {token: false}
    );
  },
};

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/lib/api/client.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/api/client.ts

import {useAuthStore} from "../store/authStore";

interface FetchOptions extends RequestInit {
  token?: boolean;
  refreshOnUnauthorized?: boolean;
}

/**
 * API client for making HTTP requests to the backend API
 */
export const apiClient = {
  // Default base URL
  baseUrl: "http://localhost:3000/api",

  /**
   * Set the base URL for all API requests
   */
  setBaseUrl(url: string): void {
    this.baseUrl = url;
  },

  /**
   * Get the current base URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  },

  /**
   * Base fetch method with authentication and refresh token handling
   */
  async fetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const {
      token = true,
      refreshOnUnauthorized = true,
      ...fetchOptions
    } = options;

    const {accessToken, refreshToken, logout} = useAuthStore.getState();
    const headers = new Headers(fetchOptions.headers);

    // Add content-type if not specified and body is not FormData
    if (
      !headers.has("Content-Type") &&
      !(fetchOptions.body instanceof FormData)
    ) {
      headers.set("Content-Type", "application/json");
    }

    // Add authorization token if needed
    if (token && accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    // Build the full URL with the base URL
    const url = `${this.baseUrl}/${endpoint.replace(/^\//, "")}`;

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    // Handle token refresh on 401 errors
    if (response.status === 401 && refreshOnUnauthorized && refreshToken) {
      try {
        const refreshResponse = await fetch(`${this.baseUrl}/auth/refresh`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({refreshToken}),
        });

        const refreshData = await refreshResponse.json();

        if (refreshResponse.ok && refreshData.success) {
          // Update tokens and retry request
          useAuthStore.setState({
            accessToken: refreshData.data.accessToken,
            refreshToken: refreshData.data.refreshToken,
          });

          // Retry original request with new token
          return this.fetch(endpoint, {
            ...options,
            refreshOnUnauthorized: false,
          });
        } else {
          // If refresh failed, log the user out
          logout();
          throw new Error("Session expired. Please login again.");
        }
      } catch (error) {
        logout();
        throw error;
      }
    }

    // Handle other response types
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "An error occurred during the request");
    }

    return data;
  },

  /**
   * GET request helper
   */
  async get<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    return this.fetch<T>(endpoint, {...options, method: "GET"});
  },

  /**
   * POST request helper
   */
  async post<T>(
    endpoint: string,
    data: any,
    options: FetchOptions = {}
  ): Promise<T> {
    return this.fetch<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /**
   * PUT request helper
   */
  async put<T>(
    endpoint: string,
    data: any,
    options: FetchOptions = {}
  ): Promise<T> {
    return this.fetch<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  /**
   * DELETE request helper
   */
  async delete<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    return this.fetch<T>(endpoint, {...options, method: "DELETE"});
  },
};

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/lib/api/productService.ts`:

```ts
// src/lib/api/productService.ts
import {apiClient} from "./client";
import {ReadCategoryDTO, ReadProductDTO} from "@/shared/dtos";

export const productService = {
  async getProducts(
    params: {
      page?: number;
      limit?: number;
      categoryId?: string;
      search?: string;
    } = {}
  ) {
    try {
      const {page = 1, limit = 10, categoryId, search} = params;

      let endpoint = `products?page=${page}&limit=${limit}`;

      if (categoryId) {
        endpoint += `&categoryId=${categoryId}`;
      }

      if (search) {
        endpoint += `&search=${encodeURIComponent(search)}`;
      }

      return await apiClient.get<{
        data: {
          products: ReadProductDTO[];
          total: number;
          page: number;
          totalPages: number;
        };
      }>(endpoint);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  },

  async getProductById(id: string) {
    return apiClient.get<{data: ReadProductDTO}>(`products/${id}`);
  },

  async getCategories() {
    return apiClient.get<{data: ReadCategoryDTO[]}>("categories");
  },
};

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/lib/provider.tsx`:

```tsx
// src/lib/providers.tsx
"use client";

import {ReactNode} from "react";
import {ThemeProvider} from "next-themes";
import React from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({children}: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  );
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/lib/store/cartStore.ts`:

```ts
// src/lib/store/cartStore.ts
import {create} from "zustand";
import {persist} from "zustand/middleware";
import {ReadProductDTO} from "@/shared/dtos";

export interface CartItem {
  product: ReadProductDTO;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: ReadProductDTO, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  applyPromoCode: (code: string) => Promise<boolean>;
  promoCode: string | null;
  discount: number;
  removePromoCode: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      discount: 0,

      addItem: (product, quantity) => {
        const {items} = get();
        const existingItem = items.find(
          (item) => item.product.id === product.id
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? {...item, quantity: item.quantity + quantity}
                : item
            ),
          });
        } else {
          set({items: [...items, {product, quantity}]});
        }
      },

      removeItem: (productId) => {
        const {items} = get();
        set({items: items.filter((item) => item.product.id !== productId)});
      },

      updateQuantity: (productId, quantity) => {
        const {items} = get();
        set({
          items: items.map((item) =>
            item.product.id === productId
              ? {...item, quantity: Math.max(1, quantity)}
              : item
          ),
        });
      },

      clearCart: () => set({items: [], promoCode: null, discount: 0}),

      totalItems: () => {
        const {items} = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      totalPrice: () => {
        const {items, discount} = get();
        const subtotal = items.reduce((total, item) => {
          const price = item.product.price;
          const discountedPrice =
            price * (1 - item.product.discount_percentage / 100);
          return total + discountedPrice * item.quantity;
        }, 0);

        return subtotal * (1 - discount / 100);
      },

      applyPromoCode: async (code) => {
        try {
          // Replace with actual API call to validate promo code
          const response = await fetch(`/api/promo-codes/validate`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({code}),
          });

          const data = await response.json();

          if (data.success) {
            set({
              promoCode: code,
              discount: data.data.discount_percentage,
            });
            return true;
          }
          return false;
        } catch (error) {
          console.error("Failed to apply promo code:", error);
          return false;
        }
      },

      removePromoCode: () => set({promoCode: null, discount: 0}),
    }),
    {
      name: "cart-storage",
    }
  )
);

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/lib/store/authStore.ts`:

```ts
// src/lib/store/authStore.ts
import {create} from "zustand";
import {persist} from "zustand/middleware";
import {AuthResponse} from "@/shared/types";

interface AuthStore {
  user: AuthResponse["user"] | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (data: AuthResponse) => void;
  logout: () => void;
  updateUser: (user: Partial<AuthResponse["user"]>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      login: (data) => {
        set({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },

      updateUser: (userData) => {
        const {user} = get();
        if (user) {
          set({user: {...user, ...userData}});
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/lib/store/notificationStore.ts`:

```ts
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/lib/store/notificationStore.ts
import {create} from "zustand";
import {ReadNotificationDTO} from "@/shared/dtos";

interface NotificationState {
  notifications: ReadNotificationDTO[];
  unreadCount: number;
  addNotification: (notification: ReadNotificationDTO) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  fetchNotifications: () => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,

  addNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + (notification.is_read ? 0 : 1),
    }));
  },

  markAsRead: (id) => {
    set((state) => {
      const updatedNotifications = state.notifications.map((notification) =>
        notification.id === id ? {...notification, is_read: true} : notification
      );

      const unreadCount = updatedNotifications.filter((n) => !n.is_read).length;

      return {notifications: updatedNotifications, unreadCount};
    });
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        is_read: true,
      })),
      unreadCount: 0,
    }));
  },

  fetchNotifications: async () => {
    try {
      const response = await fetch("/api/notifications");
      const data = await response.json();

      if (data.success) {
        set({
          notifications: data.data.notifications,
          unreadCount: data.data.unreadCount,
        });
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  },
}));

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/application/config/service_locator.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import {AuthService} from "../services/auth.service";
import {CategoryService} from "../services/category.service";
import {ProductService} from "../services/product.service";

/**
 * Service Locator pattern implementation
 * This class provides a centralized location for getting service instances
 * and ensures we don't create multiple instances of the same service unnecessarily
 */

export class ServiceLocator {
  private static instance: ServiceLocator;
  private services: Map<string, any> = new Map();

  private constructor() {
    // Private constructor to enforce singleton pattern
  }

  public static getInstance(): ServiceLocator {
    if (!ServiceLocator.instance) {
      ServiceLocator.instance = new ServiceLocator();
    }
    return ServiceLocator.instance;
  }

  // Get a service instance, creating it if it doesn't exist
  public getService<T>(serviceClass: new (...args: any[]) => T): T {
    const serviceName = serviceClass.name;

    if (!this.services.has(serviceName)) {
      this.services.set(serviceName, new serviceClass());
    }

    return this.services.get(serviceName);
  }

  // Service-specific getters for convenience and type safety
  public getAuthService(): AuthService {
    return this.getService(AuthService);
  }

  public getCategoryService(): CategoryService {
    return this.getService(CategoryService);
  }

  public getProductService(): ProductService {
    return this.getService(ProductService);
  }

  //   public getOrderService(): OrderService {
  //     return this.getService(OrderService);
  //   }

  //   public getPaymentService(): PaymentService {
  //     return this.getService(PaymentService);
  //   }

  //   public getNotificationService(): NotificationService {
  //     return this.getService(NotificationService);
  //   }

  //   public getUserManagementService(): UserManagementService {
  //     return this.getService(UserManagementService);
  //   }

  //   public getUserProfileService(): UserProfileService {
  //     return this.getService(UserProfileService);
  //   }

  //   public getEmailSubscriptionService(): EmailSubscriptionService {
  //     return this.getService(EmailSubscriptionService);
  //   }

  //   public getReviewService(): ReviewService {
  //     return this.getService(ReviewService);
  //   }

  //   public getShippingAddressService(): ShippingAddressService {
  //     return this.getService(ShippingAddressService);
  //   }

  //   public getPromoCodeService(): PromoCodeService {
  //     return this.getService(PromoCodeService);
  //   }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/application/controllers/auth.controller.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
// controllers/auth.controller.ts
import {NextRequest} from "next/server";
import {BaseController} from "./base.controller";

import {HttpStatus} from "@/shared/enums";
import {SignInRequest, SignUpRequest} from "@/shared/types";

export class AuthController extends BaseController {
  async signUp(req: NextRequest) {
    try {
      const data = await this.getRequestBody<SignUpRequest>(req);
      const authService = this.serviceLocator.getAuthService();
      const result = await authService.signUp(data);
      return this.sendSuccess(result, HttpStatus.CREATED);
    } catch (error: any) {
      return this.sendError({
        message: error.message,
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async signIn(req: NextRequest) {
    try {
      const credentials = await this.getRequestBody<SignInRequest>(req);
      const authService = this.serviceLocator.getAuthService();
      const result = await authService.signIn(credentials);
      return this.sendSuccess(result);
    } catch (error: any) {
      return this.sendError({
        message: error.message,
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async refreshToken(req: NextRequest) {
    try {
      const {refreshToken} = await this.getRequestBody<{refreshToken: string}>(
        req
      );
      const authService = this.serviceLocator.getAuthService();
      const result = await authService.refreshTokens(refreshToken);
      return this.sendSuccess(result);
    } catch (error: any) {
      return this.sendError({
        message: error.message,
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async changePassword(req: NextRequest) {
    try {
      const {oldPassword, newPassword} = await this.getRequestBody<{
        oldPassword: string;
        newPassword: string;
      }>(req);

      const user = await this.getUser(req);
      if (!user) {
        return this.sendError({
          message: "User not authenticated",
          statusCode: HttpStatus.UNAUTHORIZED,
        });
      }

      const authService = this.serviceLocator.getAuthService();
      await authService.changePassword(user.id, oldPassword, newPassword);
      return this.sendSuccess({message: "Password changed successfully"});
    } catch (error: any) {
      return this.sendError({
        message: error.message,
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async resetPassword(req: NextRequest) {
    try {
      const {email} = await this.getRequestBody<{email: string}>(req);
      const authService = this.serviceLocator.getAuthService();
      await authService.resetPassword(email);
      return this.sendSuccess({
        message:
          "If the email exists, password reset instructions will be sent",
      });
    } catch (error: any) {
      return this.sendError({
        message: error.message,
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async validateToken(req: NextRequest) {
    try {
      const token = req.headers.get("authorization")?.split(" ")[1];
      if (!token) {
        return this.sendError({
          message: "No token provided",
          statusCode: HttpStatus.UNAUTHORIZED,
        });
      }

      const authService = this.serviceLocator.getAuthService();
      const isValid = await authService.validateToken(token);
      if (!isValid) {
        return this.sendError({
          message: "Invalid token",
          statusCode: HttpStatus.UNAUTHORIZED,
        });
      }

      return this.sendSuccess({valid: true});
    } catch (error: any) {
      return this.sendError({
        message: error.message,
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/application/controllers/order.controller.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import {NextRequest} from "next/server";
import {BaseController} from "./base.controller";
import {HttpStatus, OrderStatus, UserRole} from "@/shared/enums";
import {OrderService} from "../services/order.service";
import {CreateOrderDTO, UpdateOrderDTO} from "@/shared/dtos";

export class OrderController extends BaseController {
  private orderService: OrderService;

  constructor() {
    super();
    this.orderService = new OrderService();
  }

  async createOrder(req: NextRequest) {
    return this.handleRequest(
      req,
      async (user) => {
        if (!user) {
          return this.sendError({
            message: "User authentication required",
            statusCode: HttpStatus.UNAUTHORIZED,
          });
        }

        const orderData = await this.getRequestBody<CreateOrderDTO>(req);
        // Set the customer ID to the authenticated user's ID
        orderData.customer_id = user.id;

        return await this.orderService.createOrder(orderData);
      },
      [UserRole.CUSTOMER, UserRole.ADMIN]
    );
  }

  async getOrders(req: NextRequest) {
    return this.handleRequest(
      req,
      async (user) => {
        const page = parseInt(this.getQueryParam(req, "page") || "1");
        const limit = parseInt(this.getQueryParam(req, "limit") || "10");
        const status = this.getQueryParam(req, "status");

        // If admin, they can see all orders, otherwise only the user's orders
        if (user?.role === UserRole.ADMIN) {
          const customerId = this.getQueryParam(req, "customerId");
          return await this.orderService.getOrders({
            page,
            limit,
            status: status as any,
            customerId,
          });
        } else if (user) {
          return await this.orderService.getOrdersByCustomer(user.id, {
            page,
            limit,
            status: status as any,
          });
        }

        return this.sendError({
          message: "Unauthorized",
          statusCode: HttpStatus.UNAUTHORIZED,
        });
      },
      [UserRole.CUSTOMER, UserRole.ADMIN]
    );
  }

  async getOrderById(req: NextRequest) {
    return this.handleRequest(
      req,
      async (user) => {
        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) {
          return this.sendError({
            message: "Order ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }

        const order = await this.orderService.getOrderById(id);

        // If user is not admin, verify they own this order
        if (user?.role !== UserRole.ADMIN && order.customer_id !== user?.id) {
          return this.sendError({
            message: "You are not authorized to view this order",
            statusCode: HttpStatus.FORBIDDEN,
          });
        }

        return order;
      },
      [UserRole.CUSTOMER, UserRole.ADMIN]
    );
  }

  async updateOrderStatus(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) {
          return this.sendError({
            message: "Order ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }

        const {status} = await this.getRequestBody<{
          status: UpdateOrderDTO["status"];
        }>(req);

        // statuss take as OrderStatus
        if (!status) {
          return this.sendError({
            message: "Status is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }

        return await this.orderService.updateOrderStatus(
          id,
          this.mapStringToOrderStatus(status)
        );
      },
      [UserRole.ADMIN]
    );
  }

  async cancelOrder(req: NextRequest) {
    return this.handleRequest(
      req,
      async (user) => {
        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) {
          return this.sendError({
            message: "Order ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }

        // If customer is cancelling, verify they own this order
        if (user?.role === UserRole.CUSTOMER) {
          const order = await this.orderService.getOrderById(id);
          if (order.customer_id !== user.id) {
            return this.sendError({
              message: "You are not authorized to cancel this order",
              statusCode: HttpStatus.FORBIDDEN,
            });
          }
        }

        return await this.orderService.cancelOrder(id);
      },
      [UserRole.CUSTOMER, UserRole.ADMIN]
    );
  }

  async getOrderAnalytics(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const startDate = this.getQueryParam(req, "startDate");
        const endDate = this.getQueryParam(req, "endDate");

        return await this.orderService.getOrderAnalytics(startDate, endDate);
      },
      [UserRole.ADMIN]
    );
  }

  private mapStringToOrderStatus(status: string): OrderStatus {
    switch (status) {
      case "Pending":
        return OrderStatus.PENDING;
      case "Processing":
        return OrderStatus.PROCESSING;
      case "Shipped":
        return OrderStatus.SHIPPED;
      case "Delivered":
        return OrderStatus.DELIVERED;
      case "Cancelled":
        return OrderStatus.CANCELLED;
      default:
        throw new Error(`Invalid order status: ${status}`);
    }
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/application/controllers/payment.controller.ts`:

```ts
import {NextRequest} from "next/server";
import {BaseController} from "./base.controller";
import {HttpStatus, UserRole} from "@/shared/enums";
import {PaymentService} from "../services/payment.service";

export class PaymentController extends BaseController {
  private paymentService: PaymentService;

  constructor() {
    super();
    this.paymentService = new PaymentService();
  }

  async processPayment(req: NextRequest) {
    return this.handleRequest(
      req,
      async (user) => {
        if (!user) {
          return this.sendError({
            message: "User authentication required",
            statusCode: HttpStatus.UNAUTHORIZED,
          });
        }

        const {order_id, payment_method} = await this.getRequestBody<{
          order_id: string;
          payment_method: string;
        }>(req);

        // Verify the user owns this order if they're a customer
        if (user.role === UserRole.CUSTOMER) {
          const isUserOrder = await this.paymentService.validateOrderOwnership(
            order_id,
            user.id
          );
          if (!isUserOrder) {
            return this.sendError({
              message: "You are not authorized to make payment for this order",
              statusCode: HttpStatus.FORBIDDEN,
            });
          }
        }

        return await this.paymentService.processPayment(
          order_id,
          payment_method
        );
      },
      [UserRole.CUSTOMER, UserRole.ADMIN]
    );
  }

  async getPaymentByOrderId(req: NextRequest) {
    return this.handleRequest(
      req,
      async (user) => {
        const order_id = req.nextUrl.pathname.split("/").pop();
        if (!order_id) {
          return this.sendError({
            message: "Order ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }

        // Verify the user owns this order if they're a customer
        if (user?.role === UserRole.CUSTOMER) {
          const isUserOrder = await this.paymentService.validateOrderOwnership(
            order_id,
            user.id
          );
          if (!isUserOrder) {
            return this.sendError({
              message: "You are not authorized to view payment for this order",
              statusCode: HttpStatus.FORBIDDEN,
            });
          }
        }

        return await this.paymentService.getPaymentByOrderId(order_id);
      },
      [UserRole.CUSTOMER, UserRole.ADMIN]
    );
  }

  async processRefund(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const {payment_id, reason} = await this.getRequestBody<{
          payment_id: string;
          reason: string;
        }>(req);

        return await this.paymentService.processRefund(payment_id, reason);
      },
      [UserRole.ADMIN]
    );
  }

  async getAllPayments(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const page = parseInt(this.getQueryParam(req, "page") || "1");
        const limit = parseInt(this.getQueryParam(req, "limit") || "10");
        const status = this.getQueryParam(req, "status");

        return await this.paymentService.getAllPayments({
          page,
          limit,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          status: status as any,
        });
      },
      [UserRole.ADMIN]
    );
  }

  async getPaymentAnalytics(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const startDate = this.getQueryParam(req, "startDate");
        const endDate = this.getQueryParam(req, "endDate");

        return await this.paymentService.getPaymentAnalytics(
          startDate,
          endDate
        );
      },
      [UserRole.ADMIN]
    );
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/application/controllers/category.controller.ts`:

```ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import {NextRequest} from "next/server";
import {BaseController} from "./base.controller";
import {HttpStatus, UserRole} from "@/shared/enums";
import {CategoryService} from "../services/category.service";
import {CreateCategoryDTO, UpdateCategoryDTO} from "@/shared/dtos";

export class CategoryController extends BaseController {
  private categoryService: CategoryService;

  constructor() {
    super();
    this.categoryService = new CategoryService();
  }

  async createCategory(req: NextRequest) {
    return this.handleRequest(
      req,
      async (user) => {
        const categoryData = await this.getRequestBody<CreateCategoryDTO>(req);
        return await this.categoryService.createCategory(categoryData);
      },
      [UserRole.ADMIN]
    );
  }

  async getCategories(req: NextRequest) {
    return this.handleRequest(req, async () => {
      return await this.categoryService.getAllCategories();
    });
  }

  async getCategoryById(req: NextRequest) {
    return this.handleRequest(req, async () => {
      const id = req.nextUrl.pathname.split("/").pop();
      if (!id) {
        return this.sendError({
          message: "Category ID is required",
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      return await this.categoryService.getCategoryById(id);
    });
  }

  async updateCategory(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) {
          return this.sendError({
            message: "Category ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }
        const categoryData = await this.getRequestBody<UpdateCategoryDTO>(req);
        return await this.categoryService.updateCategory(id, categoryData);
      },
      [UserRole.ADMIN]
    );
  }

  async deleteCategory(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) {
          return this.sendError({
            message: "Category ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }
        return await this.categoryService.deleteCategory(id);
      },
      [UserRole.ADMIN]
    );
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/application/controllers/product.controller.ts`:

```ts
import {NextRequest} from "next/server";
import {BaseController} from "./base.controller";
import {HttpStatus, UserRole} from "@/shared/enums";
import {ProductService} from "../services/product.service";
import {CreateProductDTO, UpdateProductDTO} from "@/shared/dtos";

export class ProductController extends BaseController {
  private productService: ProductService;

  constructor() {
    super();
    this.productService = new ProductService();
  }

  async createProduct(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const productData = await this.getRequestBody<CreateProductDTO>(req);
        return await this.productService.createProduct(productData);
      },
      [UserRole.ADMIN]
    );
  }

  async getProducts(req: NextRequest) {
    return this.handleRequest(req, async () => {
      const categoryId = this.getQueryParam(req, "categoryId");
      const page = parseInt(this.getQueryParam(req, "page") || "1");
      const limit = parseInt(this.getQueryParam(req, "limit") || "10");
      const searchQuery = this.getQueryParam(req, "search");

      return await this.productService.getProducts({
        categoryId,
        page,
        limit,
        searchQuery,
      });
    });
  }

  async getProductById(req: NextRequest) {
    return this.handleRequest(req, async () => {
      const id = req.nextUrl.pathname.split("/").pop();
      if (!id) {
        return this.sendError({
          message: "Product ID is required",
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      return await this.productService.getProductById(id);
    });
  }

  async updateProduct(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) {
          return this.sendError({
            message: "Product ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }
        const productData = await this.getRequestBody<UpdateProductDTO>(req);
        return await this.productService.updateProduct(id, productData);
      },
      [UserRole.ADMIN]
    );
  }

  async deleteProduct(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) {
          return this.sendError({
            message: "Product ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }
        return await this.productService.deleteProduct(id);
      },
      [UserRole.ADMIN]
    );
  }

  async updateInventory(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) {
          return this.sendError({
            message: "Product ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }
        const {stock_quantity} = await this.getRequestBody<{
          stock_quantity: number;
        }>(req);
        return await this.productService.updateInventory(id, stock_quantity);
      },
      [UserRole.ADMIN]
    );
  }

  async getLowStockProducts(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const threshold = parseInt(this.getQueryParam(req, "threshold") || "5");
        return await this.productService.getLowStockProducts(threshold);
      },
      [UserRole.ADMIN]
    );
  }

  async updateDiscount(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) {
          return this.sendError({
            message: "Product ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }
        const {discount_percentage} = await this.getRequestBody<{
          discount_percentage: number;
        }>(req);
        return await this.productService.updateDiscount(
          id,
          discount_percentage
        );
      },
      [UserRole.ADMIN]
    );
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/application/controllers/base.controller.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
// controllers/base.controller.ts
import {NextRequest, NextResponse} from "next/server";

import {verifyAuth} from "@/shared/middleware/auth.middleware";
import {HttpStatus, UserRole} from "@/shared/enums";
import {ApiResponse, AuthUser, ErrorResponse} from "@/shared/types";
import {ServiceLocator} from "../config/service_locator";

export abstract class BaseController {
  protected serviceLocator: ServiceLocator;

  constructor() {
    this.serviceLocator = ServiceLocator.getInstance();
  }

  protected async handleRequest<T>(
    req: NextRequest,
    handler: (user?: AuthUser | null) => Promise<T>,
    roles: UserRole[] = []
  ): Promise<NextResponse> {
    try {
      // If roles are specified, verify authentication
      if (roles.length > 0) {
        const authResult = await verifyAuth(req, roles);
        if (!authResult.success) {
          return authResult.error!;
        }
        return this.sendSuccess(await handler(authResult.user));
      }

      // No auth required
      return this.sendSuccess(await handler());
    } catch (error) {
      return this.handleError(error);
    }
  }

  protected sendSuccess<T>(
    data: T,
    statusCode: HttpStatus = HttpStatus.OK
  ): NextResponse {
    const response: ApiResponse<T> = {
      success: true,
      data,
      statusCode,
    };
    return NextResponse.json(response, {status: statusCode});
  }

  sendError(error: ErrorResponse): NextResponse {
    const response: ApiResponse = {
      success: false,
      message: error.message,
      statusCode: error.statusCode,
    };
    return NextResponse.json(response, {status: error.statusCode});
  }

  protected handleError(error: any): NextResponse {
    console.error("Error:", error);

    if (error instanceof Error) {
      return this.sendError({
        message: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }

    return this.sendError({
      message: "An unexpected error occurred",
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }

  protected getQueryParam(req: NextRequest, param: string): string | null {
    return req.nextUrl.searchParams.get(param);
  }

  protected async getRequestBody<T>(req: NextRequest): Promise<T> {
    return (await req.json()) as T;
  }

  protected async getUser(req: NextRequest): Promise<AuthUser | null> {
    const authResult = await verifyAuth(req);

    return authResult.success ? authResult.user ?? null : null;
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/application/services/category.service.ts`:

```ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import {HttpStatus} from "@/shared/enums";
import {HttpError} from "@/shared/types";
import {
  CreateCategoryDTO,
  ReadCategoryDTO,
  UpdateCategoryDTO,
} from "@/shared/dtos";
import {CategoryRepository} from "@/data_access/repositories/category.repository";
import {ICategoryRepository} from "@/data_access/repositories/icategory.repository";

export class CategoryService {
  private categoryRepository: ICategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async createCategory(data: CreateCategoryDTO): Promise<ReadCategoryDTO> {
    try {
      // Check if category with the same name already exists
      const existingCategory = await this.categoryRepository.findByName(
        data.name
      );

      if (existingCategory) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Category with this name already exists",
          "CATEGORY_EXISTS"
        );
      }

      return await this.categoryRepository.create(data);
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to create category",
        "CATEGORY_CREATE_ERROR"
      );
    }
  }

  async getAllCategories(): Promise<ReadCategoryDTO[]> {
    try {
      return await this.categoryRepository.findAll();
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch categories",
        "CATEGORIES_FETCH_ERROR"
      );
    }
  }

  async getCategoryById(id: string): Promise<ReadCategoryDTO> {
    try {
      const category = await this.categoryRepository.findOne(id);

      if (!category) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Category not found",
          "CATEGORY_NOT_FOUND"
        );
      }

      return category;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch category",
        "CATEGORY_FETCH_ERROR"
      );
    }
  }

  async updateCategory(
    id: string,
    data: UpdateCategoryDTO
  ): Promise<ReadCategoryDTO> {
    try {
      // Check if category exists
      const existingCategory = await this.categoryRepository.findOne(id);

      if (!existingCategory) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Category not found",
          "CATEGORY_NOT_FOUND"
        );
      }

      // If name is being updated, check if it's unique
      if (data.name && data.name !== existingCategory.name) {
        const nameExists = await this.categoryRepository.findByName(data.name);

        if (nameExists) {
          throw new HttpError(
            HttpStatus.BAD_REQUEST,
            "Category with this name already exists",
            "CATEGORY_NAME_EXISTS"
          );
        }
      }

      const updatedCategory = await this.categoryRepository.update(id, data);

      if (!updatedCategory) {
        throw new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Failed to update category",
          "CATEGORY_UPDATE_ERROR"
        );
      }

      return updatedCategory;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to update category",
        "CATEGORY_UPDATE_ERROR"
      );
    }
  }

  async deleteCategory(id: string): Promise<{success: boolean}> {
    try {
      // Check if category exists
      const existingCategory = await this.categoryRepository.findOne(id);

      if (!existingCategory) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Category not found",
          "CATEGORY_NOT_FOUND"
        );
      }

      // TODO: Check if there are products using this category
      // We would need a ProductRepository method to count products by category

      const success = await this.categoryRepository.delete(id);

      if (!success) {
        throw new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Failed to delete category",
          "CATEGORY_DELETE_ERROR"
        );
      }

      return {success};
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to delete category",
        "CATEGORY_DELETE_ERROR"
      );
    }
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/application/services/auth.service.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {UserRepository} from "@/data_access/repositories/user.repository";
import {HttpStatus} from "@/shared/enums";
import {
  AuthResponse,
  SignInRequest,
  SignUpRequest,
  TokenResponse,
  HttpError,
} from "@/shared/types";

import {JWTUtil} from "@/shared/utils/jwt_util";

import bcrypt from "bcrypt";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Sign up a new user
   */
  async signUp(data: SignUpRequest): Promise<AuthResponse> {
    try {
      // Check if email exists
      const existingUser = await this.userRepository.findByEmail(data.email);
      if (existingUser) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Email already exists",
          "EMAIL_EXISTS"
        );
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // Create user with default role
      const user = await this.userRepository.create({
        password_hash: hashedPassword,
        role: "Admin",
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone_number: "",
      });

      // Generate tokens
      const tokens = await this.generateTokens(user);

      return {
        user: this.sanitizeUser(user),
        ...tokens,
      };
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Error creating user account",
        "SIGNUP_ERROR"
      );
    }
  }

  /**
   * Sign in existing user
   */
  async signIn(credentials: SignInRequest): Promise<AuthResponse> {
    try {
      // Find user
      const user = await this.userRepository.findByEmail(credentials.email);
      if (!user) {
        throw new HttpError(
          HttpStatus.UNAUTHORIZED,
          "Invalid credentials",
          "INVALID_CREDENTIALS"
        );
      }

      console.log(credentials.password, user.password_hash);
      // Verify password
      const isValidPassword = await bcrypt.compare(
        credentials.password,
        user.password_hash!
      );
      if (!isValidPassword) {
        throw new HttpError(
          HttpStatus.UNAUTHORIZED,
          "Invalid credentials",
          "INVALID_CREDENTIALS"
        );
      }

      // Generate tokens
      const tokens = await this.generateTokens(user);

      return {
        user: this.sanitizeUser(user),
        ...tokens,
      };
    } catch (error) {
      if (error instanceof HttpError) throw error;
      console.error(error);
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Error during sign in",
        "SIGNIN_ERROR"
      );
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshTokens(refreshToken: string): Promise<TokenResponse> {
    try {
      // Verify refresh token
      const payload = JWTUtil.verifyRefreshToken(refreshToken);

      // Find user
      const user = await this.userRepository.findOne(payload.id);
      if (!user) {
        throw new HttpError(
          HttpStatus.UNAUTHORIZED,
          "Invalid refresh token",
          "INVALID_TOKEN"
        );
      }

      // Generate new tokens
      return await this.generateTokens(user);
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(
        HttpStatus.UNAUTHORIZED,
        "Error refreshing token",
        "REFRESH_ERROR"
      );
    }
  }

  /**
   * Validate access token
   */
  async validateToken(accessToken: string): Promise<boolean> {
    try {
      const payload = JWTUtil.verifyAccessToken(accessToken);
      const user = await this.userRepository.findOne(payload.id);
      return !!user;
    } catch {
      return false;
    }
  }

  /**
   * Get user by token
   */
  async getUserFromToken(
    accessToken: string
  ): Promise<AuthResponse["user"] | null> {
    try {
      const payload = JWTUtil.verifyAccessToken(accessToken);
      const user = await this.userRepository.findOne(payload.id);
      return user ? this.sanitizeUser(user) : null;
    } catch {
      return null;
    }
  }

  /**
   * Change user password
   */
  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      const user = await this.userRepository.findOneAuth(userId);
      if (!user) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "User not found",
          "USER_NOT_FOUND"
        );
      }

      // Verify old password
      const isValidPassword = await bcrypt.compare(
        oldPassword,
        user.password_hash!
      );
      if (!isValidPassword) {
        throw new HttpError(
          HttpStatus.UNAUTHORIZED,
          "Current password is incorrect",
          "INVALID_PASSWORD"
        );
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update password
      await this.userRepository.update(userId, {password_hash: hashedPassword});
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Error changing password",
        "PASSWORD_CHANGE_ERROR"
      );
    }
  }

  /**
   * Reset user password (for forgot password flow)
   */
  async resetPassword(email: string): Promise<void> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        // Return success even if user not found for security
        return;
      }

      // Generate temporary password or reset token
      const tempPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(tempPassword, 10);

      // Update user password
      await this.userRepository.update(user.id, {
        password_hash: hashedPassword,
      });

      // Send email with temporary password
      // await this.emailService.sendPasswordReset(email, tempPassword);
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Error resetting password",
        "PASSWORD_RESET_ERROR"
      );
    }
  }

  /**
   * Generate access and refresh tokens
   */
  private async generateTokens(user: any): Promise<TokenResponse> {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: JWTUtil.generateAccessToken(payload),
      refreshToken: JWTUtil.generateRefreshToken(payload),
    };
  }

  /**
   * Remove sensitive data from user object
   */
  private sanitizeUser(user: any): AuthResponse["user"] {
    const {password_hash, ...sanitizedUser} = user;
    return sanitizedUser;
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/application/services/payment.service.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpStatus,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "@/shared/enums";
import {HttpError} from "@/shared/types";
import {NotificationService} from "./notification.service";
import {PaymentRepository} from "@/data_access/repositories/payment.repository";
import {IPaymentRepository} from "@/data_access/repositories/ipayment.repository";
import {OrderRepository} from "@/data_access/repositories/order.repository";
import {IOrderRepository} from "@/data_access/repositories/iorder.repository";
import {v4 as uuidv4} from "uuid";

export class PaymentService {
  private paymentRepository: IPaymentRepository;
  private orderRepository: IOrderRepository;
  private notificationService: NotificationService;

  constructor() {
    this.paymentRepository = new PaymentRepository();
    this.orderRepository = new OrderRepository();
    this.notificationService = new NotificationService();
  }

  async processPayment(orderId: string, paymentMethod: string): Promise<any> {
    try {
      // Validate order exists and is in Pending status
      const order = await this.orderRepository.findOne(orderId);

      if (!order) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Order not found",
          "ORDER_NOT_FOUND"
        );
      }

      if (order.status !== "Pending") {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          `Cannot process payment for order with status '${order.status}'`,
          "INVALID_ORDER_STATUS"
        );
      }

      // Check if payment already exists
      const existingPayment = await this.paymentRepository.findByOrderId(
        orderId
      );

      if (existingPayment) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Payment already exists for this order",
          "PAYMENT_EXISTS"
        );
      }

      // Validate payment method
      if (
        !Object.values(PaymentMethod).includes(paymentMethod as PaymentMethod)
      ) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Invalid payment method",
          "INVALID_PAYMENT_METHOD"
        );
      }

      // In a real application, this would integrate with payment gateways
      // such as Stripe, PayPal, etc.
      // For this implementation, we'll simulate a successful payment

      // Generate a unique transaction ID
      const transactionId = `TXN-${uuidv4().substring(0, 8)}`;

      // Create payment record
      const payment = await this.paymentRepository.create({
        order_id: orderId,
        payment_method: paymentMethod as PaymentMethod,
        payment_status: PaymentStatus.COMPLETED,
        transaction_id: transactionId,
      });

      // Update order status to Processing
      await this.orderRepository.updateStatus(orderId, OrderStatus.PROCESSING);
      // Send payment confirmation notification
      await this.notificationService.sendPaymentConfirmation(
        order.customer_id,
        orderId,
        transactionId
      );

      return payment;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to process payment",
        "PAYMENT_PROCESSING_ERROR"
      );
    }
  }

  async getPaymentByOrderId(orderId: string): Promise<any> {
    try {
      const payment = await this.paymentRepository.findByOrderId(orderId);

      if (!payment) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Payment not found for this order",
          "PAYMENT_NOT_FOUND"
        );
      }

      return payment;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch payment information",
        "PAYMENT_FETCH_ERROR"
      );
    }
  }

  async processRefund(paymentId: string, reason: string): Promise<any> {
    try {
      // Find the payment
      const payment = await this.paymentRepository.findOne(paymentId);

      if (!payment) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Payment not found",
          "PAYMENT_NOT_FOUND"
        );
      }

      if (payment.payment_status === "Refunded") {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Payment has already been refunded",
          "ALREADY_REFUNDED"
        );
      }

      if (payment.payment_status !== "Completed") {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Can only refund completed payments",
          "INVALID_PAYMENT_STATUS"
        );
      }

      // In a real application, this would integrate with payment gateways
      // to process the actual refund
      // For this implementation, we'll simulate a successful refund

      // Update payment status to Refunded
      const updatedPayment = await this.paymentRepository.update(paymentId, {
        payment_status: PaymentStatus.REFUNDED,
      });

      if (!updatedPayment) {
        throw new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Failed to update payment status",
          "PAYMENT_UPDATE_ERROR"
        );
      }

      // Get the order
      const order = await this.orderRepository.findOne(payment.order_id);

      // Update order status to Cancelled if not already
      if (order && order.status !== "Cancelled") {
        await this.orderRepository.updateStatus(
          payment.order_id,
          OrderStatus.CANCELLED
        );
      }

      // Send refund notification
      if (order) {
        await this.notificationService.createNotification({
          user_id: order.customer_id,
          title: "Payment Refunded",
          message: `Your payment for order #${payment.order_id} has been refunded. Reason: ${reason}`,
          type: "Email",
          is_read: false,
        });
      }

      return updatedPayment;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to process refund",
        "REFUND_PROCESSING_ERROR"
      );
    }
  }

  async getAllPayments(options: {
    page: number;
    limit: number;
    status?: PaymentStatus;
  }): Promise<{
    payments: any[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    try {
      const result = await this.paymentRepository.findAll(options);

      return {
        payments: result.payments,
        total: result.total,
        page: options.page,
        totalPages: Math.ceil(result.total / options.limit),
      };
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch payments",
        "PAYMENTS_FETCH_ERROR"
      );
    }
  }

  async getPaymentAnalytics(
    startDate?: string | null,
    endDate?: string | null
  ): Promise<any> {
    try {
      // Parse date range for the repository
      const startDateTime = startDate ? new Date(startDate) : undefined;
      const endDateTime = endDate ? new Date(endDate) : undefined;

      return await this.paymentRepository.getAnalytics(
        startDateTime,
        endDateTime
      );
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to generate payment analytics",
        "PAYMENT_ANALYTICS_ERROR"
      );
    }
  }

  async validateOrderOwnership(
    orderId: string,
    userId: string
  ): Promise<boolean> {
    try {
      const order = await this.orderRepository.findOne(orderId);
      return !!order && order.customer_id === userId;
    } catch (error) {
      return false;
    }
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/application/services/order.service.ts`:

```ts
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {HttpStatus, OrderStatus} from "@/shared/enums";
import {HttpError} from "@/shared/types";
import {CreateOrderDTO, ReadOrderDTO, CreateOrderItemDTO} from "@/shared/dtos";
import {NotificationService} from "./notification.service";
import {OrderRepository} from "@/data_access/repositories/order.repository";
import {IOrderRepository} from "@/data_access/repositories/iorder.repository";

import {ProductRepository} from "@/data_access/repositories/product.repository";
import {IProductRepository} from "@/data_access/repositories/iproduct.repository";
import {UserRepository} from "@/data_access/repositories/user.repository";
import {IUserRepository} from "@/data_access/repositories/iuser.repository";
import {IOrderItemRepository} from "@/data_access/repositories/iorder_item.repository";
import {OrderItemRepository} from "@/data_access/repositories/order_item.repository";

export class OrderService {
  private orderRepository: IOrderRepository;
  private orderItemRepository: IOrderItemRepository;
  private productRepository: IProductRepository;
  private userRepository: IUserRepository;
  private notificationService: NotificationService;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.orderItemRepository = new OrderItemRepository();
    this.productRepository = new ProductRepository();
    this.userRepository = new UserRepository();
    this.notificationService = new NotificationService();
  }

  async createOrder(
    orderData: CreateOrderDTO & {orderItems?: CreateOrderItemDTO[]}
  ): Promise<ReadOrderDTO> {
    try {
      // Validate customer exists
      const customer = await this.userRepository.findOne(orderData.customer_id);

      if (!customer) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Customer not found",
          "CUSTOMER_NOT_FOUND"
        );
      }

      // Validate order items and check stock availability
      if (!orderData.orderItems || orderData.orderItems.length === 0) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Order must contain at least one item",
          "EMPTY_ORDER"
        );
      }

      // Check product availability and prepare for stock update
      for (const item of orderData.orderItems) {
        const product = await this.productRepository.findOne(item.product_id);

        if (!product) {
          throw new HttpError(
            HttpStatus.BAD_REQUEST,
            `Product with ID ${item.product_id} not found`,
            "PRODUCT_NOT_FOUND"
          );
        }

        if (product.stock_quantity < item.quantity) {
          throw new HttpError(
            HttpStatus.BAD_REQUEST,
            `Not enough stock for product "${product.name}". Available: ${product.stock_quantity}, Requested: ${item.quantity}`,
            "INSUFFICIENT_STOCK"
          );
        }
      }

      // Create order and order items
      const order = await this.orderRepository.create(
        orderData,
        orderData.orderItems
      );

      // Update product stock quantities
      for (const item of orderData.orderItems) {
        const product = await this.productRepository.findOne(item.product_id);
        if (product) {
          await this.productRepository.update(item.product_id, {
            stock_quantity: product.stock_quantity - item.quantity,
          });
        }
      }

      // Send order confirmation notification
      await this.notificationService.createNotification({
        user_id: order.customer_id,
        title: "Order Placed Successfully",
        message: `Your order #${order.id} has been placed successfully and is now being processed.`,
        type: "Email",
        is_read: false,
      });

      // Notify admin about new order
      const adminUsers = await this.userRepository.findByRole("Admin");

      for (const admin of adminUsers) {
        await this.notificationService.createNotification({
          user_id: admin.id,
          title: "New Order Received",
          message: `A new order #${order.id} has been placed by customer (ID: ${order.customer_id}).`,
          type: "Email",
          is_read: false,
        });
      }

      return order;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to create order",
        "ORDER_CREATE_ERROR"
      );
    }
  }

  async getOrders(options: {
    page: number;
    limit: number;
    status?: OrderStatus;
    customerId?: string | null;
  }): Promise<{
    orders: ReadOrderDTO[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    try {
      const result = await this.orderRepository.findAll(options);

      return {
        orders: result.orders,
        total: result.total,
        page: options.page,
        totalPages: Math.ceil(result.total / options.limit),
      };
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch orders",
        "ORDERS_FETCH_ERROR"
      );
    }
  }

  async getOrdersByCustomer(
    customerId: string,
    options: {
      page: number;
      limit: number;
      status?: OrderStatus;
    }
  ): Promise<{
    orders: ReadOrderDTO[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    // Reuse getOrders with customer ID filter
    return this.getOrders({
      ...options,
      customerId,
    });
  }

  async getOrderById(id: string): Promise<any> {
    try {
      const order = await this.orderRepository.findOneWithDetails(id);

      if (!order) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Order not found",
          "ORDER_NOT_FOUND"
        );
      }

      return order;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch order",
        "ORDER_FETCH_ERROR"
      );
    }
  }

  async updateOrderStatus(
    id: string,
    status: OrderStatus
  ): Promise<ReadOrderDTO> {
    try {
      const order = await this.orderRepository.findOne(id);

      if (!order) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Order not found",
          "ORDER_NOT_FOUND"
        );
      }

      // // Validate status transition
      // this.validateStatusTransition(order.status, status);

      const updatedOrder = await this.orderRepository.updateStatus(id, status);

      if (!updatedOrder) {
        throw new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Failed to update order status",
          "ORDER_STATUS_UPDATE_ERROR"
        );
      }

      // Send notification about status change
      await this.notificationService.sendOrderStatusNotification(
        order.customer_id,
        order.id,
        status
      );

      return updatedOrder;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to update order status",
        "ORDER_STATUS_UPDATE_ERROR"
      );
    }
  }

  async cancelOrder(id: string): Promise<ReadOrderDTO> {
    try {
      const order = await this.orderRepository.findOneWithDetails(id);

      if (!order) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Order not found",
          "ORDER_NOT_FOUND"
        );
      }

      // Check if order can be cancelled
      if (!["Pending", "Processing"].includes(order.status)) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          `Cannot cancel order with status '${order.status}'`,
          "INVALID_ORDER_STATUS"
        );
      }

      // Restore product stock quantities
      const orderItems = await this.orderItemRepository.findByOrder(id);

      for (const item of orderItems) {
        const product = await this.productRepository.findOne(item.product_id);
        if (product) {
          await this.productRepository.update(item.product_id, {
            stock_quantity: product.stock_quantity + item.quantity,
          });
        }
      }

      // Update order status to cancelled
      const updatedOrder = await this.orderRepository.updateStatus(
        id,
        OrderStatus.CANCELLED
      );

      if (!updatedOrder) {
        throw new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Failed to cancel order",
          "ORDER_CANCEL_ERROR"
        );
      }

      // Send cancellation notification
      await this.notificationService.createNotification({
        user_id: order.customer_id,
        title: "Order Cancelled",
        message: `Your order #${order.id} has been cancelled.`,
        type: "Email",
        is_read: false,
      });

      // Notify admin about cancelled order
      const adminUsers = await this.userRepository.findByRole("Admin");

      for (const admin of adminUsers) {
        await this.notificationService.createNotification({
          user_id: admin.id,
          title: "Order Cancelled",
          message: `Order #${order.id} has been cancelled by customer (ID: ${order.customer_id}).`,
          type: "Email",
          is_read: false,
        });
      }

      return updatedOrder;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to cancel order",
        "ORDER_CANCEL_ERROR"
      );
    }
  }

  async getOrderAnalytics(
    startDate?: string | null,
    endDate?: string | null
  ): Promise<any> {
    try {
      // Parse date range for the repository
      const startDateTime = startDate ? new Date(startDate) : undefined;
      const endDateTime = endDate ? new Date(endDate) : undefined;

      return await this.orderRepository.getAnalytics(
        startDateTime,
        endDateTime
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to generate order analytics",
        "ORDER_ANALYTICS_ERROR"
      );
    }
  }

  // Private helper methods

  // private validateStatusTransition(
  //   currentStatus: OrderStatus,
  //   newStatus: OrderStatus
  // ): void {
  //   // Define valid status transitions
  //   const validTransitions: Record<OrderStatus, OrderStatus[]> = {
  //     Pending: ["Processing", "Cancelled"],
  //     Processing: ["Shipped", "Cancelled"],
  //     Shipped: ["Delivered", "Cancelled"],
  //     Delivered: [], // Terminal state
  //     Cancelled: [], // Terminal state
  //   };

  //   if (!validTransitions[currentStatus].includes(newStatus)) {
  //     throw new HttpError(
  //       HttpStatus.BAD_REQUEST,
  //       `Invalid status transition from '${currentStatus}' to '${newStatus}'`,
  //       "INVALID_STATUS_TRANSITION"
  //     );
  //   }
  // }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/application/services/notification.service.ts`:

```ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import {HttpStatus, NotificationType, UserRole} from "@/shared/enums";
import {HttpError} from "@/shared/types";
import {CreateNotificationDTO, ReadNotificationDTO} from "@/shared/dtos";
import {NotificationRepository} from "@/data_access/repositories/notification.repository";
import {INotificationRepository} from "@/data_access/repositories/inotification.repository";
import {UserRepository} from "@/data_access/repositories/user.repository";
import {IUserRepository} from "@/data_access/repositories/iuser.repository";

export class NotificationService {
  private notificationRepository: INotificationRepository;
  private userRepository: IUserRepository;

  constructor() {
    this.notificationRepository = new NotificationRepository();
    this.userRepository = new UserRepository();
  }

  async createNotification(
    data: CreateNotificationDTO
  ): Promise<ReadNotificationDTO> {
    try {
      // Validate user exists
      const user = await this.userRepository.findOne(data.user_id);

      if (!user) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "User not found",
          "USER_NOT_FOUND"
        );
      }

      const notification = await this.notificationRepository.create(data);

      // In a real-world scenario, we would send the actual notification here
      // based on the notification type (Email, Push, SMS)
      await this.sendRealTimeNotification(notification);

      return notification;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to create notification",
        "NOTIFICATION_CREATE_ERROR"
      );
    }
  }

  async getUserNotifications(
    userId: string,
    options: {
      page: number;
      limit: number;
      unreadOnly: boolean;
    }
  ): Promise<{
    notifications: ReadNotificationDTO[];
    total: number;
    page: number;
    totalPages: number;
    unreadCount: number;
  }> {
    try {
      const result = await this.notificationRepository.findByUser(
        userId,
        options
      );

      return {
        notifications: result.notifications,
        total: result.total,
        page: options.page,
        totalPages: Math.ceil(result.total / options.limit),
        unreadCount: result.unreadCount,
      };
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch notifications",
        "NOTIFICATIONS_FETCH_ERROR"
      );
    }
  }

  async getNotificationById(id: string): Promise<ReadNotificationDTO> {
    try {
      const notification = await this.notificationRepository.findOne(id);

      if (!notification) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Notification not found",
          "NOTIFICATION_NOT_FOUND"
        );
      }

      return notification;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch notification",
        "NOTIFICATION_FETCH_ERROR"
      );
    }
  }

  async markNotificationAsRead(id: string): Promise<ReadNotificationDTO> {
    try {
      const notification = await this.notificationRepository.markAsRead(id);

      if (!notification) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Notification not found",
          "NOTIFICATION_NOT_FOUND"
        );
      }

      return notification;
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to mark notification as read",
        "NOTIFICATION_UPDATE_ERROR"
      );
    }
  }

  async markAllNotificationsAsRead(
    userId: string
  ): Promise<{success: boolean; count: number}> {
    try {
      const count = await this.notificationRepository.markAllAsRead(userId);

      return {
        success: true,
        count,
      };
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to mark all notifications as read",
        "NOTIFICATIONS_UPDATE_ERROR"
      );
    }
  }

  async deleteNotification(id: string): Promise<{success: boolean}> {
    try {
      const success = await this.notificationRepository.delete(id);

      if (!success) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Notification not found or could not be deleted",
          "NOTIFICATION_DELETE_ERROR"
        );
      }

      return {success};
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to delete notification",
        "NOTIFICATION_DELETE_ERROR"
      );
    }
  }

  async sendNotificationToAllUsers(
    title: string,
    message: string,
    type: NotificationType
  ): Promise<{success: boolean; count: number}> {
    try {
      const users = await this.userRepository.findAll();

      const notifications = await Promise.all(
        users.map((user) =>
          this.createNotification({
            user_id: user.id,
            title,
            message,
            type,
            is_read: false,
          })
        )
      );

      return {
        success: true,
        count: notifications.length,
      };
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to send notifications to all users",
        "BROADCAST_NOTIFICATION_ERROR"
      );
    }
  }

  async getNotificationSettings(userId: string): Promise<{
    email_notifications: boolean;
    push_notifications: boolean;
    sms_notifications: boolean;
  }> {
    try {
      // In a real application, this would retrieve user notification settings from a dedicated table
      // For this implementation, we'll use a simplified approach
      return {
        email_notifications: true,
        push_notifications: true,
        sms_notifications: false,
      };
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to get notification settings",
        "NOTIFICATION_SETTINGS_ERROR"
      );
    }
  }

  async updateNotificationSettings(
    userId: string,
    settings: {
      email_notifications: boolean;
      push_notifications: boolean;
      sms_notifications: boolean;
    }
  ): Promise<{
    email_notifications: boolean;
    push_notifications: boolean;
    sms_notifications: boolean;
  }> {
    try {
      // In a real application, this would update user notification settings in a dedicated table
      // For this implementation, we'll just return the settings
      return settings;
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to update notification settings",
        "NOTIFICATION_SETTINGS_UPDATE_ERROR"
      );
    }
  }

  // Public helper methods for other services to use

  async sendLowStockNotification(
    productName: string,
    stockQuantity: number
  ): Promise<void> {
    // Find admin users
    const adminUsers = await this.userRepository.findByRole(
      UserRole.ADMIN.toString()
    );

    // Send notifications
    for (const admin of adminUsers) {
      await this.createNotification({
        user_id: admin.id,
        title: "Low Stock Alert",
        message: `Product "${productName}" is running low on stock (${stockQuantity} units remaining)`,
        type: "Email",
        is_read: false,
      });
    }
  }

  async sendDiscountNotification(
    productName: string,
    discountPercentage: number
  ): Promise<void> {
    // In a real implementation, you would use an EmailSubscriptionRepository
    // to find subscribed users
    const subscribedUsers = await this.userRepository.findAll();

    // Send notifications
    for (const user of subscribedUsers) {
      await this.createNotification({
        user_id: user.id,
        title: "Special Discount",
        message: `Product "${productName}" now has a ${discountPercentage}% discount!`,
        type: "Email",
        is_read: false,
      });
    }
  }

  async sendOrderStatusNotification(
    userId: string,
    orderId: string,
    status: string
  ): Promise<void> {
    await this.createNotification({
      user_id: userId,
      title: "Order Status Updated",
      message: `Your order #${orderId} status has been updated to ${status}.`,
      type: "Email",
      is_read: false,
    });
  }

  async sendPaymentConfirmation(
    userId: string,
    orderId: string,
    transactionId: string
  ): Promise<void> {
    await this.createNotification({
      user_id: userId,
      title: "Payment Successful",
      message: `Your payment for order #${orderId} has been processed successfully. Transaction ID: ${transactionId}`,
      type: "Email",
      is_read: false,
    });
  }

  // Private helper methods

  private async sendRealTimeNotification(
    notification: ReadNotificationDTO
  ): Promise<void> {
    // In a real implementation, this would integrate with:
    // - Email service (e.g., SendGrid, AWS SES) for Email notifications
    // - Push notification service (e.g., Firebase Cloud Messaging) for Push notifications
    // - SMS service (e.g., Twilio) for SMS notifications

    switch (notification.type) {
      case "Email":
        await this.sendEmailNotification(notification);
        break;
      case "Push":
        await this.sendPushNotification(notification);
        break;
      case "SMS":
        await this.sendSmsNotification(notification);
        break;
    }
  }

  private async sendEmailNotification(
    notification: ReadNotificationDTO
  ): Promise<void> {
    // In a real implementation, this would send an actual email
    console.log(
      `[EMAIL] To: ${notification.user_id}, Subject: ${notification.title}, Body: ${notification.message}`
    );
  }

  private async sendPushNotification(
    notification: ReadNotificationDTO
  ): Promise<void> {
    // In a real implementation, this would send a push notification
    console.log(
      `[PUSH] To: ${notification.user_id}, Title: ${notification.title}, Body: ${notification.message}`
    );
  }

  private async sendSmsNotification(
    notification: ReadNotificationDTO
  ): Promise<void> {
    // In a real implementation, this would send an SMS
    console.log(
      `[SMS] To: ${notification.user_id}, Message: ${notification.title} - ${notification.message}`
    );
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/application/services/product.service.ts`:

```ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import {HttpStatus} from "@/shared/enums";
import {HttpError} from "@/shared/types";
import {
  CreateProductDTO,
  ReadProductDTO,
  UpdateProductDTO,
} from "@/shared/dtos";
import {NotificationService} from "./notification.service";
import {ProductRepository} from "@/data_access/repositories/product.repository";
import {IProductRepository} from "@/data_access/repositories/iproduct.repository";
import {CategoryRepository} from "@/data_access/repositories/category.repository";
import {ICategoryRepository} from "@/data_access/repositories/icategory.repository";
import {IOrderItemRepository} from "@/data_access/repositories/iorder_item.repository";
import {OrderItemRepository} from "@/data_access/repositories/order_item.repository";

export class ProductService {
  private productRepository: IProductRepository;
  private categoryRepository: ICategoryRepository;
  private orderItemRepository: IOrderItemRepository;
  private notificationService: NotificationService;

  constructor() {
    this.productRepository = new ProductRepository();
    this.categoryRepository = new CategoryRepository();
    this.orderItemRepository = new OrderItemRepository();
    this.notificationService = new NotificationService();
  }

  async createProduct(data: CreateProductDTO): Promise<ReadProductDTO> {
    try {
      // Validate category if provided
      if (data.category_id) {
        const category = await this.categoryRepository.findOne(
          data.category_id
        );

        if (!category) {
          throw new HttpError(
            HttpStatus.BAD_REQUEST,
            "Invalid category ID",
            "INVALID_CATEGORY"
          );
        }
      }

      return await this.productRepository.create(data);
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to create product",
        "PRODUCT_CREATE_ERROR"
      );
    }
  }

  async getProducts(options: {
    categoryId?: string | null;
    page: number;
    limit: number;
    searchQuery?: string | null;
  }): Promise<{
    products: ReadProductDTO[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    try {
      const sanitizedOptions = {
        ...options,
        categoryId: options.categoryId ?? undefined,
        searchQuery: options.searchQuery ?? undefined,
      };
      const result = await this.productRepository.findAll(sanitizedOptions);

      return {
        products: result.products,
        total: result.total,
        page: options.page,
        totalPages: Math.ceil(result.total / options.limit),
      };
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch products",
        "PRODUCTS_FETCH_ERROR"
      );
    }
  }

  async getProductById(id: string): Promise<ReadProductDTO> {
    try {
      const product = await this.productRepository.findOne(id);

      if (!product) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Product not found",
          "PRODUCT_NOT_FOUND"
        );
      }

      return product;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch product",
        "PRODUCT_FETCH_ERROR"
      );
    }
  }

  async updateProduct(
    id: string,
    data: UpdateProductDTO
  ): Promise<ReadProductDTO> {
    try {
      // Check if product exists
      const existingProduct = await this.productRepository.findOne(id);

      if (!existingProduct) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Product not found",
          "PRODUCT_NOT_FOUND"
        );
      }

      // Validate category if provided
      if (data.category_id) {
        const category = await this.categoryRepository.findOne(
          data.category_id
        );

        if (!category) {
          throw new HttpError(
            HttpStatus.BAD_REQUEST,
            "Invalid category ID",
            "INVALID_CATEGORY"
          );
        }
      }

      const updatedProduct = await this.productRepository.update(id, data);

      if (!updatedProduct) {
        throw new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Failed to update product",
          "PRODUCT_UPDATE_ERROR"
        );
      }

      return updatedProduct;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to update product",
        "PRODUCT_UPDATE_ERROR"
      );
    }
  }

  async deleteProduct(id: string): Promise<{success: boolean}> {
    try {
      // Check if product exists
      const existingProduct = await this.productRepository.findOne(id);

      if (!existingProduct) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Product not found",
          "PRODUCT_NOT_FOUND"
        );
      }

      // Check if product is used in any order items
      const orderItemCount = await this.orderItemRepository.countByProduct(id);

      if (orderItemCount > 0) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Cannot delete product that is associated with orders",
          "PRODUCT_IN_USE"
        );
      }

      const success = await this.productRepository.delete(id);

      if (!success) {
        throw new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Failed to delete product",
          "PRODUCT_DELETE_ERROR"
        );
      }

      return {success};
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to delete product",
        "PRODUCT_DELETE_ERROR"
      );
    }
  }

  async updateInventory(
    id: string,
    stockQuantity: number
  ): Promise<ReadProductDTO> {
    try {
      if (stockQuantity < 0) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Stock quantity cannot be negative",
          "INVALID_STOCK_QUANTITY"
        );
      }

      // Check if product exists
      const existingProduct = await this.productRepository.findOne(id);

      if (!existingProduct) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Product not found",
          "PRODUCT_NOT_FOUND"
        );
      }

      const updatedProduct = await this.productRepository.update(id, {
        stock_quantity: stockQuantity,
      });

      if (!updatedProduct) {
        throw new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Failed to update inventory",
          "INVENTORY_UPDATE_ERROR"
        );
      }

      // If stock is low, send notification to admin
      if (stockQuantity <= 5 && existingProduct.stock_quantity > 5) {
        // Find admin users - in a real implementation, you would use a UserRepository
        // For now, we'll just call the NotificationService directly
        await this.notificationService.sendLowStockNotification(
          updatedProduct.name,
          stockQuantity
        );
      }

      return updatedProduct;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to update inventory",
        "INVENTORY_UPDATE_ERROR"
      );
    }
  }

  async getLowStockProducts(threshold: number): Promise<ReadProductDTO[]> {
    try {
      return await this.productRepository.findByLowStock(threshold);
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch low stock products",
        "LOW_STOCK_FETCH_ERROR"
      );
    }
  }

  async updateDiscount(
    id: string,
    discountPercentage: number
  ): Promise<ReadProductDTO> {
    try {
      if (discountPercentage < 0 || discountPercentage > 100) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Discount percentage must be between 0 and 100",
          "INVALID_DISCOUNT"
        );
      }

      // Check if product exists
      const existingProduct = await this.productRepository.findOne(id);

      if (!existingProduct) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Product not found",
          "PRODUCT_NOT_FOUND"
        );
      }

      const updatedProduct = await this.productRepository.update(id, {
        discount_percentage: discountPercentage,
      });

      if (!updatedProduct) {
        throw new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Failed to update discount",
          "DISCOUNT_UPDATE_ERROR"
        );
      }

      // If discount is added or significantly increased, notify subscribed customers
      if (
        discountPercentage > 0 &&
        discountPercentage > existingProduct.discount_percentage + 5
      ) {
        // Send discount notification to subscribed users
        // In a real implementation, you would use an EmailSubscriptionRepository
        // For now, we'll just call the NotificationService directly
        await this.notificationService.sendDiscountNotification(
          updatedProduct.name,
          discountPercentage
        );
      }

      return updatedProduct;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to update discount",
        "DISCOUNT_UPDATE_ERROR"
      );
    }
  }
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/presentation/components/ui/tabs.tsx`:

```tsx
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/shared/lib/sdcn/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-neutral-100 p-1 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-neutral-950 data-[state=active]:shadow-sm dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 dark:data-[state=active]:bg-neutral-950 dark:data-[state=active]:text-neutral-50",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/presentation/components/ui/card.tsx`:

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-neutral-200 bg-white text-neutral-950 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-neutral-500 dark:text-neutral-400", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/presentation/components/ui/slider.tsx`:

```tsx
"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/shared/lib/sdcn/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
      <SliderPrimitive.Range className="absolute h-full bg-neutral-900 dark:bg-neutral-50" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-neutral-900 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-50 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/presentation/components/ui/label.tsx`:

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/sdcn/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/presentation/components/ui/switch.tsx`:

```tsx
"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import {cn} from "@/shared/lib/sdcn/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({className, ...props}, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-neutral-900 data-[state=unchecked]:bg-neutral-200 dark:focus-visible:ring-neutral-300 dark:focus-visible:ring-offset-neutral-950 dark:data-[state=checked]:bg-neutral-50 dark:data-[state=unchecked]:bg-neutral-800",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 dark:bg-neutral-950"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export {Switch};

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/presentation/components/ui/radio-group.tsx`:

```tsx
"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/shared/lib/sdcn/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-neutral-200 border-neutral-900 text-neutral-900 ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:border-neutral-50 dark:text-neutral-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/presentation/components/ui/dialog.tsx`:

```tsx
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-neutral-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg dark:border-neutral-800 dark:bg-neutral-950",
        "max-h-[85vh] overflow-y-auto scrollbar-hide",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-500 dark:ring-offset-neutral-950 dark:focus:ring-neutral-300 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-400">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-neutral-500 dark:text-neutral-400", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/presentation/components/ui/badge.tsx`:

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-lg  border border-neutral-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent  ",
        secondary:
          "border-transparent bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80",
        destructive:
          "border-transparent bg-red-500 text-neutral-50 hover:bg-red-500/80 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/80",
        outline: "text-neutral-950 dark:text-neutral-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/presentation/components/ui/table.tsx`:

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-neutral-100/50 font-medium [&>tr]:last:border-b-0 dark:bg-neutral-800/50",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-neutral-100/50 data-[state=selected]:bg-neutral-100 dark:hover:bg-neutral-800/50 dark:data-[state=selected]:bg-neutral-800",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-neutral-500 [&:has([role=checkbox])]:pr-0 dark:text-neutral-400",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-neutral-500 dark:text-neutral-400", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/presentation/components/ui/button.tsx`:

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
  {
    variants: {
      variant: {
        default: "",
        destructive:
          "bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
        outline:
          "border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        secondary:
          "bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80",
        ghost: "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/presentation/components/ui/checkbox.tsx`:

```tsx
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/shared/lib/sdcn/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-neutral-200 border-neutral-900 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-neutral-50 dark:border-neutral-800 dark:border-neutral-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 dark:data-[state=checked]:bg-neutral-50 dark:data-[state=checked]:text-neutral-900",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/presentation/components/ui/dropdown-menu.tsx`:

```tsx
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/shared/lib/sdcn/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-neutral-100 data-[state=open]:bg-neutral-100 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus:bg-neutral-800 dark:data-[state=open]:bg-neutral-800",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border border-neutral-200 bg-white p-1 text-neutral-950 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border border-neutral-200 bg-white p-1 text-neutral-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus:bg-neutral-800 dark:focus:text-neutral-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-neutral-100 dark:bg-neutral-800", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/presentation/components/ui/select.tsx`:

```tsx
"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import {Check, ChevronDown, ChevronUp} from "lucide-react";

import {cn} from "@/shared/lib/sdcn/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({className, children, ...props}, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white data-[placeholder]:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:data-[placeholder]:text-neutral-400 dark:focus:ring-neutral-300",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({className, ...props}, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({className, ...props}, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({className, children, position = "popper", ...props}, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border border-neutral-200 bg-white text-neutral-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({className, ...props}, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({className, children, ...props}, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({className, ...props}, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn(
      "-mx-1 my-1 h-px bg-neutral-100 dark:bg-neutral-800",
      className
    )}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/presentation/components/ui/textarea.tsx`:

```tsx
import * as React from "react"

import { cn } from "@/shared/lib/sdcn/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/presentation/components/ui/input.tsx`:

```tsx
import * as React from "react"

import { cn } from "@/shared/lib/sdcn/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

```

`/Users/supunnilakshana/development/my_projects/test_cpy_host/hostnshop/hostnshop/src/presentation/components/ui/form.tsx`:

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/presentation/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-red-500 dark:text-red-900", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-neutral-500 dark:text-neutral-400", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-red-500 dark:text-red-900", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

```