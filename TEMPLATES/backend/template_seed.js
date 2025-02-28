const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient(); // interact with prisma db

const seed = async () => {
    try {
        const characters = Array.from({ length: 200 }, () => ({
            name: faker.hacker.adjective(),
            avatar: faker.image.avatar(),
            level: Math.floor(Math.random() * 300) + 1 // [1, 300]
        }));

        await prisma.character.createMany({
            data: characters
        });

        console.log("Seeding successful!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await prisma.$disconnect();
    }
};

seed();
