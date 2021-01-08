import { BitbucketConfig } from './bitbucket-config';

describe('BitbucketConfig', () => {
  it('should create an instance', () => {
    expect(new BitbucketConfig(null, null, null, null)).toBeTruthy();
  });
});
