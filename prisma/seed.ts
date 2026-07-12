import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { PRODUCTS, inferMaterialGradeFromName } from '../src/data/products';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Start seeding...');

  for (const product of PRODUCTS) {
    const materialGrade =
      product.materialGrade ?? inferMaterialGradeFromName(product.name) ?? null;

    const p = await prisma.product.upsert({
      where: { sku: product.sku },
      update: {
        featured: product.featured || false,
        unit: product.unit || null,
        materialGrade,
        recycledContentPct: product.recycledContentPct ?? null,
        carbonOffset: product.carbonOffset ?? false,
        bpaFree: product.bpaFree ?? null,
        foodSafe: product.foodSafe ?? null,
        sustainabilityNotes: product.sustainabilityNotes ?? null,
      },
      create: {
        id: product.id,
        name: product.name,
        slug: product.id,
        description: product.description,
        sku: product.sku,
        category: product.category,
        price: product.price || 0,
        imageUrl: product.image,
        featured: product.featured || false,
        unit: product.unit || null,
        active: true,
        materialGrade,
        recycledContentPct: product.recycledContentPct ?? null,
        carbonOffset: product.carbonOffset ?? false,
        bpaFree: product.bpaFree ?? null,
        foodSafe: product.foodSafe ?? null,
        sustainabilityNotes: product.sustainabilityNotes ?? null,
      },
    });
    console.log(`Created product with sku: ${p.sku}`);

    if (product.images && product.images.length > 0) {
      for (let i = 0; i < product.images.length; i++) {
        const existingImage = await prisma.productImage.findFirst({
          where: { productId: p.id, imageUrl: product.images[i] },
        });

        if (!existingImage) {
          await prisma.productImage.create({
            data: {
              productId: p.id,
              imageUrl: product.images[i],
              sortOrder: i,
            },
          });
        }
      }
    }
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
