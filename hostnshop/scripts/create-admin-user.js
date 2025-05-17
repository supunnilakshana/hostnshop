/* eslint-disable @typescript-eslint/no-require-imports */
// scripts/create-admin-user.js
const {PrismaClient} = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function createAdminUser() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.log(
      "Admin email or password not provided, skipping admin creation"
    );
    return;
  }

  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: {email: adminEmail},
    });

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    if (existingUser) {
      // Update existing admin
      await prisma.user.update({
        where: {email: adminEmail},
        data: {
          password_hash: hashedPassword,
          role: "Admin",
        },
      });
      console.log(`Admin user ${adminEmail} updated successfully`);
    } else {
      // Create new admin
      await prisma.user.create({
        data: {
          email: adminEmail,
          name: "Admin User",
          password_hash: hashedPassword,
          role: "Admin",
          phone_number: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
        },
      });
      console.log(`Admin user ${adminEmail} created successfully`);
    }
  } catch (error) {
    console.error("Error creating/updating admin user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser().catch((error) => {
  console.error(error);
  process.exit(1);
});
