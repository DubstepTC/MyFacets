-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "Question" (
    "id" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" INTEGER NOT NULL,
    "userid" TEXT NOT NULL,
    "questonid" INTEGER NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questonid_fkey" FOREIGN KEY ("questonid") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
