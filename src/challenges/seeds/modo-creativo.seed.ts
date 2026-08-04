import { DataSource } from 'typeorm';
import { Challenge } from '../entities/challenge.entity';
import { ChecklistSection } from '../entities/checklist-section.entity';
import { ChecklistItem } from '../entities/checklist-item.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export async function seedModoCreativo(dataSource: DataSource): Promise<void> {
  const challengeRepo = dataSource.getRepository(Challenge);
  const sectionRepo = dataSource.getRepository(ChecklistSection);
  const itemRepo = dataSource.getRepository(ChecklistItem);

  const existing = await challengeRepo.findOne({ where: { slug: 'modo-creativo' } });
  if (existing) {
    console.log('Modo Creativo challenge already exists, skipping seed.');
    return;
  }

  const challenge = challengeRepo.create({
    slug: 'modo-creativo',
    name: 'Modo Creativo',
    description: 'Mentalidad y bases para activar tu creatividad',
    durationDays: 5,
    totalTasks: 5,
    order: 1,
    active: true,
  });
  await challengeRepo.save(challenge);

  const section1 = sectionRepo.create({
    challengeId: challenge.id,
    title: 'Inicio · Antes de empezar',
    order: 1,
  });
  await sectionRepo.save(section1);

  const items1 = [
    { sectionId: section1.id, title: 'Entender qué es el Heroes Protocol', order: 1 },
    { sectionId: section1.id, title: 'Entender por qué Modo Creativo es tan importante', order: 2 },
    { sectionId: section1.id, title: 'Empezar el reto de 5 días', order: 3 },
  ];
  await itemRepo.save(items1.map((item) => itemRepo.create(item)));

  const section2 = sectionRepo.create({
    challengeId: challenge.id,
    title: 'Conceptos clave',
    order: 2,
  });
  await sectionRepo.save(section2);

  const items2 = [
    { sectionId: section2.id, title: 'Aprender sobre el flujo creativo', order: 1 },
    { sectionId: section2.id, title: 'Practicar la técnica de ideación', order: 2 },
  ];
  await itemRepo.save(items2.map((item) => itemRepo.create(item)));

  console.log('Modo Creativo challenge seeded successfully!');
}

if (require.main === module) {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Challenge, ChecklistSection, ChecklistItem],
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  });

  dataSource.initialize().then(async () => {
    await seedModoCreativo(dataSource);
    await dataSource.destroy();
    process.exit(0);
  }).catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  });
}
