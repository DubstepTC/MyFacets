/*
  Warnings:

  - You are about to drop the column `questonid` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `userid` on the `Answer` table. All the data in the column will be lost.
  - Added the required column `queston_id` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questonid_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_userid_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "questonid",
DROP COLUMN "userid",
ADD COLUMN     "queston_id" INTEGER NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserAnswer" (
    "answer_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "UserAnswer_pkey" PRIMARY KEY ("answer_id","user_id")
);

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_queston_id_fkey" FOREIGN KEY ("queston_id") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "Answer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
