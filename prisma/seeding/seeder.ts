import { PrismaClient } from "@prisma/client";
import { users } from "./users";
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

  async function hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;

    return await bcrypt.hash(password, saltOrRounds);
  }

async function main(): Promise<void> {
  for (let user of users) {
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
    await prisma.user.create({
      data: user
    });
  }
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect();
})