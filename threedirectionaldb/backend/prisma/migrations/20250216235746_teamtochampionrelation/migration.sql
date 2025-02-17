/*
  Warnings:

  - Added the required column `teamID` to the `Champion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Champion" ADD COLUMN     "teamID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Champion" ADD CONSTRAINT "Champion_teamID_fkey" FOREIGN KEY ("teamID") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
