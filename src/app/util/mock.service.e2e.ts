import { Injectable, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BitbucketConfig } from '../provider/bitbucket/model/bitbucket-config';
import { Schema } from 'bitbucket';
import { environment } from '../../environments/environment';
import { BitbucketClientAccessToken } from '../provider/bitbucket/bitbucket-client-provider.service';
import Workspace = Schema.Workspace;
import Repository = Schema.Repository;
import Branch = Schema.Branch;

@Injectable()
export class MockService {

  constructor(private window: Window,
              private ngZone: NgZone,
              private storage: Storage) {

  }

  init() {
    // tslint:disable-next-line:no-string-literal
    this.window['initializeProviders'] = () => {
      const workspace: Workspace = {
        name: 'jg-docs-test',
        slug: 'jg-docs-test',
        type: 'workspace',
        uuid: '{d460169b-59c7-4b6d-b262-355bc8db5be0}'
      };
      const repository: Repository = {
        created_on: '2021-01-23T12:29:37.595077+00:00',
        description: '',
        fork_policy: 'allow_forks',
        full_name: 'jg-docs-test/examples',
        has_issues: false,
        has_wiki: false,
        is_private: false,
        language: '',
        mainbranch: {type: 'branch', name: 'master'},
        name: 'Examples',
        owner: {username: 'jg-docs-test', display_name: 'jg-docs-test', type: 'team', uuid: '{d460169b-59c7-4b6d-b262-355bc8db5be0}'},
        project: {type: 'project', name: 'it', key: 'IT', uuid: '{70f42263-e730-44cb-97f0-42ca3c20bf02}'},
        scm: 'git',
        size: 267161,
        slug: 'examples',
        type: 'repository',
        updated_on: '2021-02-07T12:05:15.384500+00:00',
        uuid: '{ed7301d2-d447-4025-865a-9ffee0206075}',
        website: null,
        workspace: {
          name: 'jg-docs-test',
          slug: 'jg-docs-test',
          type: 'workspace',
          uuid: '{d460169b-59c7-4b6d-b262-355bc8db5be0}'
        }
      };
      const branch: Branch = {
        name: 'master',
        type: 'branch'
      };
      const commit = '42e7354d282c1dfde17955401ddbdba51d8d9dd9';

      return this.storage.set('providers.bitbucket', [
        new BitbucketConfig(workspace, repository, branch, commit)
      ]);
    };

    // tslint:disable-next-line:no-string-literal
    this.window['initializeAccessToken'] = () => {
      const clientId = environment.bitbucketClientId;

      const date = new Date();
      date.setTime(date.getTime() + 10000000);
      const accessToken = new BitbucketClientAccessToken('', date);

      return this.storage.set(`accessToken-${clientId}`, accessToken);
    };

    // tslint:disable-next-line:no-string-literal
    this.window['clearStorage'] = () => {
      return this.storage.clear();
    };
  }
}
