import { DataSource } from './data-source';

describe('DataSource', () => {
  it('should create an instance', () => {
    expect(new DataSource(null, null, null, null)).toBeTruthy();
  });
});
