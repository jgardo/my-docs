import { BitbucketClient } from './bitbucket-client';

describe('BitbucketClient', () => {
    it('should create an instance', () => {
        expect(new BitbucketClient(null, null)).toBeTruthy();
    });
});
