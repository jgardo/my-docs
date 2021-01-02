import {Bitbucket, Schema} from 'bitbucket';
import {Observable} from 'rxjs';
import {APIClient} from 'bitbucket/lib/bitbucket';
import Workspace = Schema.Workspace;
import Repository = Schema.Repository;
import Branch = Schema.Branch;
import Treeentry = Schema.Treeentry;

export class BitbucketClient {

    constructor(private bitbucket: APIClient,
                private workspace: Workspace,
                private repository: Repository,
                private branch: Branch,
                private latestCommit: string) {

    }

    public refresh(): Observable<string> {
        return new Observable<string>((subscriber) => {
            this.bitbucket.commits.list({
                repo_slug: this.repository.uuid,
                workspace: this.workspace.name
            })
            .then(({ data }) => {
                this.latestCommit = data.values[0].hash;
                subscriber.next(data.values[0].hash);
                subscriber.complete();
            })
            .catch((err) => subscriber.error(err));
        });
    }

    public listAllFiles(path: string): Observable<Array<Treeentry>> {
        return new Observable<Array<Treeentry>>((subscriber) => {
            this.bitbucket.source.read({
                node: this.latestCommit,
                path,
                repo_slug: this.repository.uuid,
                workspace: this.workspace.name
            })
            .then(({ data }) => {
                subscriber.next(data.values);
                subscriber.complete();
            })
            .catch((err) => subscriber.error(err));
        });
    }
}
