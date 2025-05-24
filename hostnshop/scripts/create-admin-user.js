/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */

const {execSync} = require("child_process");
const path = require("path");
const fs = require("fs");

async function createAdminUser() {
  try {
    console.log("Starting admin user creation process...");

    // Ensure we're in the right directory
    console.log("Current working directory:", process.cwd());

    // Check if prisma schema exists
    const schemaPath = path.join(process.cwd(), "prisma", "schema.prisma");
    if (!fs.existsSync(schemaPath)) {
      console.error("Prisma schema not found at:", schemaPath);
      process.exit(1);
    }

    // Force regenerate Prisma client with proper error handling
    console.log("Forcing Prisma client regeneration...");
    try {
      execSync("npx prisma generate --schema=./prisma/schema.prisma", {
        stdio: "inherit",
        cwd: process.cwd(),
      });
      console.log("Prisma client generated successfully");
    } catch (generateError) {
      console.error("Error generating Prisma client:", generateError.message);
      console.error("Stdout:", generateError.stdout?.toString());
      console.error("Stderr:", generateError.stderr?.toString());
      throw generateError;
    }

    // Wait a moment for the client to be fully written to disk
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Verify the client was generated
    const clientPath = path.join(
      process.cwd(),
      "node_modules",
      ".prisma",
      "client"
    );
    if (!fs.existsSync(clientPath)) {
      console.error(
        "Prisma client was not generated at expected path:",
        clientPath
      );
      process.exit(1);
    }

    console.log("Prisma client verified at:", clientPath);

    // Clear require cache to ensure fresh import
    delete require.cache[require.resolve("@prisma/client")];

    // Now import PrismaClient
    const {PrismaClient} = require("@prisma/client");
    const bcrypt = require("bcrypt");

    console.log("Initializing Prisma client...");
    const prisma = new PrismaClient({
      log: ["error", "warn"],
    });

    // Test database connection
    try {
      await prisma.$connect();
      console.log("Database connection successful");
    } catch (connectError) {
      console.error("Database connection failed:", connectError.message);
      throw connectError;
    }

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.log(
        "Admin email or password not provided. Skipping admin user creation."
      );
      await prisma.$disconnect();
      return;
    }

    console.log(`Creating/updating admin user with email: ${email}`);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if admin user exists
    const existingUser = await prisma.user.findUnique({
      where: {email},
    });

    if (existingUser) {
      // Update existing admin
      await prisma.user.update({
        where: {email},
        data: {
          password: hashedPassword,
          role: "ADMIN",
        },
      });
      console.log(`✅ Updated admin user: ${email}`);
    } else {
      // Create new admin user
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role: "ADMIN",
          name: "Admin",
        },
      });
      console.log(`✅ Created admin user: ${email}`);
    }

    await prisma.$disconnect();
    console.log("Admin user creation completed successfully");
  } catch (error) {
    console.error("❌ Error creating/updating admin user:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
}

// Run the function
createAdminUser();
