-- CreateTable
CREATE TABLE "Equip" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "attack" INTEGER NOT NULL,
    "stars" INTEGER NOT NULL,
    "characterID" INTEGER NOT NULL,

    CONSTRAINT "Equip_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Equip" ADD CONSTRAINT "Equip_characterID_fkey" FOREIGN KEY ("characterID") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
