import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ListParams } from './model/list-params';

@Injectable({
    providedIn: 'root'
})
export class DataProviderService {

    private items: Array<any> = [{
        id: 'src/master/README.md',
        path: 'src/master/README.md',
        mediaType: 'text/markdown',
        url: 'https://bitbucket.org/gardziol/egnyte/src/master/README.md',
        name: 'README.md'
    }, {
        id: 'src/master/pom.xml',
        path: 'src/master/pom.xml',
        mediaType: 'text/xml',
        url: 'https://bitbucket.org/gardziol/egnyte/src/master/pom.xml',
        name: 'pom.xml'
    }];

    constructor() {
    }

    public getAll(params: ListParams): Observable<Array<any>> {
        return of(this.items);
    }

    public getById(id: string): Observable<any> {
        return of(this.items[0]);
    }

    public getByPath(path: string): Observable<any> {
        return of(this.items[0]);
    }
}
