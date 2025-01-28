import { transformArrayToObject } from './transformers';

describe('transformArrayToObject', () => {
  it('should transform an array using "state" as the key', () => {
    const input = [
      { _count: 2, state: 'SP' },
      { _count: 11, state: 'GO' },
      { _count: 3, state: 'TO' },
    ];
    const expectedOutput = { SP: 2, GO: 11, TO: 3 };

    expect(transformArrayToObject(input, 'state')).toEqual(expectedOutput);
  });

  it('should transform an array using "cropName" as the key', () => {
    const input = [
      { _count: 2, cropName: 'Soybean' },
      { _count: 11, cropName: 'Corn' },
      { _count: 3, cropName: 'Wheat' },
    ];
    const expectedOutput = { Soybean: 2, Corn: 11, Wheat: 3 };

    expect(transformArrayToObject(input, 'cropName')).toEqual(expectedOutput);
  });
});
