import {DataSource} from './model/data-source';
import {Observable} from 'rxjs';

export interface DataSourceFacade {
    list(): Observable<Array<DataSource>>;
    create(): Observable<DataSource>;
    delete(): Observable<void>;
}
