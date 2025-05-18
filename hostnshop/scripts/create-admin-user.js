/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Modified create-admin-user.js
const {execSync} = require("child_process");
const path = require("path");

// Run prisma generate explicitly before using the client
console.log("Generating Prisma client...");
try {
  execSync("npx prisma generate", {stdio: "inherit"});
  console.log("Prisma client generated successfully");
} catch (error) {
  console.error("Error generating Prisma client:", error);
  process.exit(1);
}

// Now import and use PrismaClient
const {PrismaClient} = require("@prisma/client");
const bcrypt = require("bcrypt"); // or bcryptjs if you switched

const prisma = new PrismaClient();

// Rest of your admin user creation logic
async function createAdminUser() {
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.log(
        "Admin email or password not provided. Skipping admin user creation."
      );
      return;
    }

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
      console.log(`Updated admin user: ${email}`);
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
      console.log(`Created admin user: ${email}`);
    }
  } catch (error) {
    console.error("Error creating/updating admin user:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
