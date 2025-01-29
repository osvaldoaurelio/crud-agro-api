import { faker } from '@faker-js/faker';
import { PrismaClient, State } from '@prisma/client';
import { cpf } from 'cpf-cnpj-validator';
import { location } from './location.seed';

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
  const crops = ['Wheat', 'Corn', 'Soy', 'Rice', 'Beans', 'Cotton'];
  const plantingDate = faker.date.past();

  console.log({ plantingDate, year: new Date(plantingDate).getFullYear() });

  return {
    plantingDate: faker.date.past(),
    cropName: getRandomEl(crops),
    harvest: new Date(plantingDate).getFullYear(),
  };
}

function generatePlantings(length = 1) {
  return Array.from({ length }).map(() => generatePlanting());
}

function generateProperty() {
  const arableArea = getRandomNumber({ max: 10000 });
  const vegetationArea = getRandomNumber({ max: 10000 });

  const [[state, cities]] = Object.entries<string[]>(getRandomEl(location));

  return {
    propertyName: `${faker.person.firstName()}'s Farm`,
    state: state as State,
    city: getRandomEl(cities),
    arableArea,
    vegetationArea,
    totalArea: arableArea + vegetationArea,
    plantings: { create: generatePlantings(getRandomNumber()) },
  };
}

function generateProperties(length = 1) {
  return Array.from({ length }).map(() => generateProperty());
}

function generateProducer() {
  return {
    fullName: faker.person.fullName(),
    cpfOrCnpj: cpf.generate(),
    properties: { create: generateProperties(getRandomNumber()) },
  };
}

function generateProducers(length = 1) {
  return Array.from({ length }).map(() => generateProducer());
}

async function main() {
  const producers = generateProducers(10);

  await Promise.all(
    producers.map((producer) => prisma.producer.create({ data: producer })),
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
