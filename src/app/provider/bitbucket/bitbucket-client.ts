import { Observable } from 'rxjs';
import { APIClient } from 'bitbucket/lib/bitbucket';
import { BitbucketConfig } from './model/bitbucket-config';

export class BitbucketClient {

    private static readonly PAGE_LEN = 100;

    constructor(private bitbucket: APIClient,
                public config: BitbucketConfig,
                public expiresIn?: number) {

    }

    public refresh(): Observable<string> {
        return new Observable<string>((subscriber) => {
            this.bitbucket.commits.list({
                repo_slug: this.config.repository.uuid,
                workspace: this.config.workspace.uuid
            })
                .then(({data}) => {
                    this.config.latestCommit = data.values[0].hash;
                    subscriber.next(data.values[0].hash);
                    subscriber.complete();
                })
                .catch((err) => subscriber.error(err));
        });
    }

    public resolvePath(path: string, page?: string): Observable<any> {
        return new Observable<any>((subscriber) => {
            this.bitbucket.source.read({
                node: this.config.latestCommit,
                path,
                repo_slug: this.config.repository.uuid,
                workspace: this.config.workspace.uuid,
                pagelen: BitbucketClient.PAGE_LEN,
                page,
            })
                .then((data) => {
                    subscriber.next(data);
                    subscriber.complete();
                })
                .catch((err) => subscriber.error(err));
        });
    }
}
