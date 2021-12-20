import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: "Larissa Dantas",
      email: "lari@example.com",
      groups: {
        connectOrCreate: {
          where: {
            id: 1,
          },
          create: {
            id: 1,
            title: "Group 1",
          },
        },
      },
    },
  });

  console.log("Novo usuário:", newUser);

  const allUsers = await prisma.user.findMany({
    include: {
      groups: true,
    },
  });

  console.log("Todos os usuários:", allUsers);
  console.dir(allUsers, { depth: null });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

console.log("Finished");
