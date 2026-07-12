-- CreateEnum
CREATE TYPE "MaterialGrade" AS ENUM ('VIRGIN', 'GR2', 'GR3', 'POST_CONSUMER', 'MIXED');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "recycledContentPct" INTEGER,
ADD COLUMN     "materialGrade" "MaterialGrade",
ADD COLUMN     "carbonOffset" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "bpaFree" BOOLEAN,
ADD COLUMN     "foodSafe" BOOLEAN,
ADD COLUMN     "sustainabilityNotes" TEXT;
