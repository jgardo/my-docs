import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { DataProviderService } from '../service/data-provider.service';
import { ListParams } from '../service/model/list-params';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  private items: Array<any> = [];
  constructor(
    private dataProviderService: DataProviderService,
    private router: Router
    ) {

  }

  ngOnInit(): void {
    this.dataProviderService.getAll(new ListParams(0, 10))
    .subscribe((result) => {
      this.items = result;
    });
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  loadData(event) {
    const params: ListParams = new ListParams(0, 1);
    this.dataProviderService.getAll(params).subscribe(result => {
      this.items = result;
      event.target.complete();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 100) {
      //   event.target.disabled = true;
      // }
    });
  }

  public navigate(item, event): void {
    const commands: any[] = ['tabs/tab1/item/' + item.path];

    this.router.navigate(commands).then(() => {});
  }
}
