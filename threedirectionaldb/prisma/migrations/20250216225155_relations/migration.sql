/*
  Warnings:

  - Added the required column `gameID` to the `Champion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameID` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Champion" ADD COLUMN     "gameID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "gameID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_gameID_fkey" FOREIGN KEY ("gameID") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Champion" ADD CONSTRAINT "Champion_gameID_fkey" FOREIGN KEY ("gameID") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
