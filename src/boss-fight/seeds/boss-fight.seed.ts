import { DataSource } from 'typeorm';
import { Boss } from '../entities/boss.entity';
import { BossQuestion } from '../entities/boss-question.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export async function seedBossFight(dataSource: DataSource): Promise<void> {
  const bossRepo = dataSource.getRepository(Boss);
  const questionRepo = dataSource.getRepository(BossQuestion);
  const challengeRepo = dataSource.getRepository('Challenge');

  const existing = await bossRepo.findOne({ where: {} });
  if (existing) {
    console.log('Boss already exists, skipping seed.');
    return;
  }

  const challenge = await challengeRepo.findOne({ where: { slug: 'modo-creativo' } });
  if (!challenge) {
    console.log('Challenge "modo-creativo" not found. Run seed first: npm run seed');
    return;
  }

  const boss = bossRepo.create({
    challengeId: challenge.id,
    name: 'Boss Final - Modo Creativo',
    description: 'Demuestra tu conocimiento completando el quiz final',
    totalQuestions: 5,
    maxFails: 3,
    order: 1,
  });
  await bossRepo.save(boss);

  const questions = [
    {
      text: '¿Qué es el Heroes Protocol?',
      options: ['Un protocolo de comunicación', 'Un sistema para construir hábitos exitosos', 'Un método de meditación', 'Una herramienta de diseño'],
      correctOptionIndex: 1,
      order: 1,
    },
    {
      text: '¿Cuál es el primer paso del Modo Creativo?',
      options: ['Crear un hábito', 'Entender el Heroes Protocol', 'Hacer ejercicio', 'Leer un libro'],
      correctOptionIndex: 1,
      order: 2,
    },
    {
      text: '¿Por qué es importante mantener la mentalidad de crecimiento?',
      options: ['Para impresionar a otros', 'Para mejorar continuamente', 'Para ganar dinero', 'Para evitar trabajar'],
      correctOptionIndex: 1,
      order: 3,
    },
    {
      text: '¿Cuántos días dura el reto "Modo Creativo"?',
      options: ['3 días', '5 días', '7 días', '10 días'],
      correctOptionIndex: 1,
      order: 4,
    },
    {
      text: '¿Qué técnica ayuda a generar ideas de forma más creativa?',
      options: ['Multitarea', 'Ideación estructurada', 'Procrastinación', 'Repetición'],
      correctOptionIndex: 1,
      order: 5,
    },
  ];

  for (const q of questions) {
    const question = questionRepo.create({
      bossId: boss.id,
      ...q,
    });
    await questionRepo.save(question);
  }

  console.log('Boss Fight seeded successfully! 5 questions added.');
}

if (require.main === module) {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Boss, BossQuestion],
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  });

  dataSource.initialize().then(async () => {
    await seedBossFight(dataSource);
    await dataSource.destroy();
    process.exit(0);
  }).catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  });
}
