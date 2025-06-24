import { prisma } from "./prisma-client";

async function Up() {
  await prisma.user.createMany({
    data: [
      {
        fullname: "Nikita",
        email: "Nikita@gmail.com",
        password: "nikita",
      },
      {
        fullname: "Oleg",
        email: "Oleg@gmail.com",
        password: "oleg",
      },
    ],
  });
}
async function Down() {
  await prisma.$executeRaw`TRUNCATE TABLE "user" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await Down();
    await Up();
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
