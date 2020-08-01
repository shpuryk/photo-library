import { splitArrayIntoChunks } from './utils';

describe('utils', () => {
  it(`should split array into chunks`, () => {
    const arr1 = [1, 2, 3, 4, 5];
    const arr2 = [[1, 2], [3, 4], [5]];
    expect(splitArrayIntoChunks(arr1, 2)).toEqual(arr2);
  });
});
