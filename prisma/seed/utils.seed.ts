export function getRandomEl<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomNumber({
  min = 1,
  max = 3,
}: {
  min?: number;
  max?: number;
} = {}) {
  if (min > max) return 1;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
