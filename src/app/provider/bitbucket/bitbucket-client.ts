import {Observable} from 'rxjs';
import {APIClient} from 'bitbucket/lib/bitbucket';
import { BitbucketConfig } from './model/bitbucket-config';

export class BitbucketClient {

    constructor(private bitbucket: APIClient,
                public config: BitbucketConfig) {

    }

    public refresh(): Observable<string> {
        return new Observable<string>((subscriber) => {
            this.bitbucket.commits.list({
                repo_slug: this.config.repository.uuid,
                workspace: this.config.workspace.name
            })
            .then(({ data }) => {
                this.config.latestCommit = data.values[0].hash;
                subscriber.next(data.values[0].hash);
                subscriber.complete();
            })
            .catch((err) => subscriber.error(err));
        });
    }

    public resolvePath(path: string): Observable<any> {
        return new Observable<any>((subscriber) => {
            this.bitbucket.source.read({
                node: this.config.latestCommit,
                path,
                repo_slug: this.config.repository.uuid,
                workspace: this.config.workspace.name,
                pagelen: 100
            })
            .then(({ data }) => {
                subscriber.next(data);
                subscriber.complete();
            })
            .catch((err) => subscriber.error(err));
        });
    }
}
