import { Bitbucket } from 'bitbucket';
import {Observable} from 'rxjs';
import {APIClient} from 'bitbucket/lib/bitbucket';

export class BitbucketClient {

    private bitbucket: APIClient;
    private workspaceName: string;

    constructor(private accessToken: string) {
        const clientOptions = {
            auth: {
                token: accessToken,
            },
        };

        const bitbucket = new Bitbucket(clientOptions);
        this.bitbucket = bitbucket;
    }

    public initialize(): Observable<void> {
        return new Observable<void>((subscriber) => {
            this.bitbucket.workspaces.getWorkspaces({ })
            .then(workspaces => {
                if (workspaces.data.size === 1) {
                    this.workspaceName = workspaces.data.values[0].name;
                    subscriber.complete();
                } else {
                    subscriber.error('Too many workspaces.');
                }
            })
            .catch(err => subscriber.error(err));
        });
    }

    public listAllRepos(): Observable<Array<any>> {
        return new Observable<Array<any>>((subscriber) => {
            const params = { workspace: this.workspaceName };
            this.bitbucket.repositories.list(params)
            .then(({ data }) => {
                subscriber.next(data.values);
                subscriber.complete();
            })
            .catch((err) => subscriber.error(err));
        });
    }
}
