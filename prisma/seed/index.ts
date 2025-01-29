import { faker } from '@faker-js/faker';
import { PrismaClient, State } from '@prisma/client';
import { cpf } from 'cpf-cnpj-validator';
import { createInterface } from 'node:readline/promises';
import { crops, location } from './constants.seed';
import { getRandomEl, getRandomNumber } from './utils.seed';

const prisma = new PrismaClient();

function generatePlanting() {
  const plantingDate = faker.date.past();

  const planting = {
    plantingDate,
    cropName: getRandomEl(crops),
    harvest: new Date(plantingDate).getFullYear(),
  };

  console.log(`\t\tPlanting: ${planting.cropName}`);

  return planting;
}

function generatePlantings(length = 1) {
  return Array.from({ length }).map(generatePlanting);
}

function generateProperty() {
  const arableArea = getRandomNumber({ max: 10000 });
  const vegetationArea = getRandomNumber({ max: 10000 });

  const [[state, cities]] = Object.entries<string[]>(getRandomEl(location));

  const property = {
    propertyName: `${faker.person.firstName()}'s Farm`,
    state: state as State,
    city: getRandomEl(cities),
    arableArea,
    vegetationArea,
    totalArea: arableArea + vegetationArea,
    plantings: { create: generatePlantings(getRandomNumber()) },
  };

  console.log(`\tProperty: ${property.propertyName}`);

  return property;
}

function generateProperties(length = 1) {
  return Array.from({ length }).map(generateProperty);
}

function generateProducer() {
  const producer = {
    fullName: faker.person.fullName(),
    cpfOrCnpj: cpf.generate(),
    properties: { create: generateProperties(getRandomNumber()) },
  };

  console.log(`Producer: ${producer.fullName}\n`);

  return producer;
}

function generateProducers(length = 1) {
  return Array.from({ length }).map(generateProducer);
}

function clearDatabase() {
  return prisma.producer.deleteMany();
}

async function main() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('You cannot run this in production!');
  }

  const count = Number(process.argv[2]) || 20;

  if (Number.isNaN(count) || count < 1 || count > 1000) {
    throw new Error(
      'Invalid count: Please provide a number between 1 and 1000',
    );
  }

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await rl.question(
    `\t********* This seed will create ${count} new producers. *********

        Would you like to clear the database before seeding? (y/N) `,
  );

  rl.close();

  if (answer.toLowerCase() === 'y') {
    console.log('\n# Clearing database...\n');
    await clearDatabase();
  }

  return Promise.all(
    generateProducers(count).map((data) => prisma.producer.create({ data })),
  );
}

main()
  .catch((error) => {
    console.error({ error });
    process.exit(1);
  })
  .finally(() => {
    console.log('# Seeding completed!');
    prisma.$disconnect();
    console.log('# Seeding completed!');
  });
