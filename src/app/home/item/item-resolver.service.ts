import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataProviderService } from 'src/app/service/data-provider.service';

@Injectable({
    providedIn: 'root',
})
export class ItemResolverService implements Resolve<any> {
    constructor(
        private dataProviderService: DataProviderService
    ) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const url = route.url
            .map(a => a.path)
            .join('/');
        const paramMap = {};
        // tslint:disable-next-line:forin

        return this.resolveForUrlAndParamMap(url, paramMap);
    }

    resolveForUrlAndParamMap(url, paramMap): Observable<any> {
        return new Observable<any>((subscriber) => {
            // tslint:disable-next-line:radix
            this.dataProviderService.getByPath(url).subscribe((value) => {
                subscriber.next(value);
                subscriber.complete();
            });
        });
    }
}
