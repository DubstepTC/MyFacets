/*
  Warnings:

  - You are about to drop the column `queston_id` on the `Answer` table. All the data in the column will be lost.
  - Added the required column `question_id` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_queston_id_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "queston_id",
ADD COLUMN     "question_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
