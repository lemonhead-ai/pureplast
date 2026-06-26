import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { PRODUCTS } from '../src/data/products';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Start seeding...');

  for (const product of PRODUCTS) {
    // Upsert ensures we don't duplicate products if the seed script runs multiple times
    const p = await prisma.product.upsert({
      where: { sku: product.sku }, 
      update: {
        featured: product.featured || false,
        unit: product.unit || null,
        recycledContentPct: product.recycledContentPct ?? (product.category === 'packaging' ? 80 : product.category === 'construction' ? 100 : null),
        materialGrade: product.materialGrade ?? (product.category === 'construction' ? 'MIXED' : product.category === 'industrial' ? 'GR2' : product.category === 'packaging' ? 'POST_CONSUMER' : 'VIRGIN'),
        carbonOffset: product.carbonOffset ?? (Math.random() > 0.7),
        bpaFree: product.bpaFree ?? (['household', 'kitchenware'].includes(product.category)),
        foodSafe: product.foodSafe ?? (['household', 'kitchenware', 'packaging'].includes(product.category)),
        sustainabilityNotes: product.sustainabilityNotes || null,
      },
      create: {
        id: product.id,
        name: product.name,
        slug: product.id, // using id as slug since it's url friendly (e.g. "b-001")
        description: product.description,
        sku: product.sku,
        category: product.category,
        price: product.price || 0, // Fallback price for now
        imageUrl: product.image,
        featured: product.featured || false,
        unit: product.unit || null,
        active: true,
        recycledContentPct: product.recycledContentPct ?? (product.category === 'packaging' ? 80 : product.category === 'construction' ? 100 : null),
        materialGrade: product.materialGrade ?? (product.category === 'construction' ? 'MIXED' : product.category === 'industrial' ? 'GR2' : product.category === 'packaging' ? 'POST_CONSUMER' : 'VIRGIN'),
        carbonOffset: product.carbonOffset ?? (Math.random() > 0.7),
        bpaFree: product.bpaFree ?? (['household', 'kitchenware'].includes(product.category)),
        foodSafe: product.foodSafe ?? (['household', 'kitchenware', 'packaging'].includes(product.category)),
        sustainabilityNotes: product.sustainabilityNotes || null,
      },
    });
    console.log(`Created product with sku: ${p.sku}`);

    // If the product has multiple images, add them to ProductImage
    if (product.images && product.images.length > 0) {
      for (let i = 0; i < product.images.length; i++) {
        // Simple check to avoid duplicating images if seeding multiple times
        const existingImage = await prisma.productImage.findFirst({
          where: { productId: p.id, imageUrl: product.images[i] }
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
