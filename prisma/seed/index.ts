import { faker } from '@faker-js/faker';
import { PrismaClient, State } from '@prisma/client';
import { cpf } from 'cpf-cnpj-validator';
import { crops, location } from './constants.seed';

const prisma = new PrismaClient();

function getRandomEl<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomNumber({
  min = 1,
  max = 3,
}: {
  min?: number;
  max?: number;
} = {}) {
  if (min > max) return 1;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePlanting() {
  const plantingDate = faker.date.past();

  const planting = {
    plantingDate,
    cropName: getRandomEl(crops),
    harvest: new Date(plantingDate).getFullYear(),
  };

  console.log('Planting: ', planting);

  return planting;
}

function generatePlantings(length = 1) {
  return Array.from({ length }).map(() => generatePlanting());
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

  console.log('Property: ', property);

  return property;
}

function generateProperties(length = 1) {
  return Array.from({ length }).map(() => generateProperty());
}

function generateProducer() {
  const producer = {
    fullName: faker.person.fullName(),
    cpfOrCnpj: cpf.generate(),
    properties: { create: generateProperties(getRandomNumber()) },
  };

  console.log('Producer: ', producer);

  return producer;
}

function generateProducers(length = 1) {
  return Array.from({ length }).map(() => generateProducer());
}

async function main() {
  // await prisma.producer.deleteMany();
  const producers = generateProducers(getRandomNumber({ max: 50 }));

  await Promise.all(
    producers.map((producer) => prisma.producer.create({ data: producer })),
  );
}

main()
  .catch((error) => {
    console.error({ error });
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
