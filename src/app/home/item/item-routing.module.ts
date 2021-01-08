import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemResolverService } from './item-resolver.service';

import { ItemPage } from './item.page';

const routes: Routes = [
  {
    path: '**',
    component: ItemPage,
    resolve: {
      item: ItemResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemPageRoutingModule {}
