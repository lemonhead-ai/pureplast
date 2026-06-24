-- Remove the legacy role column and enum if they exist.
ALTER TABLE "User" DROP COLUMN IF EXISTS "role";
DROP TYPE IF EXISTS "Role";
