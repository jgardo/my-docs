import {Schema} from 'bitbucket';
import Workspace = Schema.Workspace;
import Repository = Schema.Repository;
import Branch = Schema.Branch;

export class BitbucketConfig {
    constructor(public workspace: Workspace,
                public repository: Repository,
                public branch: Branch,
                public latestCommit: string) {
    }
}
