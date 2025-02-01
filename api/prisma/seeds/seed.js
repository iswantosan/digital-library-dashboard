const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    // Seed Users
    const passwordHash = await bcrypt.hash("password123", 10);
    const user1 = await prisma.user.upsert({
        where: { email: "user1@example.com" },
        update: {},
        create: {
            email: "user1@example.com",
            password: passwordHash,
        },
    });

    const user2 = await prisma.user.upsert({
        where: { email: "user2@example.com" },
        update: {},
        create: {
            email: "user2@example.com",
            password: passwordHash,
        },
    });

    console.log("Users seeded!");

    // Seed Books
    await prisma.book.createMany({
        data: [
            { title: "The Pragmatic Programmer", author: "Andrew Hunt", isbn: "978-0201616224", quantity: 5, category: "Programming" },
            { title: "Clean Code", author: "Robert C. Martin", isbn: "978-0132350884", quantity: 3, category: "Software Engineering" },
            { title: "Introduction to Algorithms", author: "Thomas H. Cormen", isbn: "978-0262033848", quantity: 2, category: "Algorithms" },
        ],
        skipDuplicates: true, // Prevent duplicate records
    });

    console.log("Books seeded!");

    // Seed Lending Records
    await prisma.lending.createMany({
        data: [
            { bookId: 1, userId: user1.id, borrowDate: new Date(), returnDate: null },
            { bookId: 2, userId: user2.id, borrowDate: new Date(), returnDate: null },
        ],
    });

    console.log("Lending records seeded!");
    console.log("Seeding complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
