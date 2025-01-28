/**
 * Transforms an array of objects with a specified key and a `_count` property
 * into an object where the keys are the values of the specified key,
 * and the values are the counts.
 *
 * @param data An array of objects with a specified key and a `_count` property.
 * @param key The property name to use as the key in the resulting object.
 * @returns An object where each key is the value of the specified property, and the value is the associated count.
 */
export function transformArrayToObject<T extends string>(
  data: Array<{ [key in T]: string } & { _count: number }>,
  key: T,
) {
  return data.reduce(
    (acc, item) => {
      acc[item[key]] = item._count;

      return acc;
    },
    {} as Record<string, number>,
  );
}
