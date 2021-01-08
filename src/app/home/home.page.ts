import { Component, OnInit } from '@angular/core';
import { DataSource } from '../provider/facade/model/data-source';
import { BitbucketDataSourceFacadeService } from '../provider/bitbucket/bitbucket-data-source-facade.service';
import { Observable } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

    dataSources: Array<DataSource> | null = null;

    constructor(
        private dataSourceFacade: BitbucketDataSourceFacadeService
    ) {
    }

    ngOnInit(): void {
        this.refresh().subscribe();
    }

    refresh(): Observable<any> {
        return this.dataSourceFacade.list()
            .pipe(tap(sources => this.dataSources = sources
            ));
    }

    add() {
        this.dataSourceFacade.create()
            .pipe(concatMap(x => this.refresh()))
            .subscribe();
    }
}
