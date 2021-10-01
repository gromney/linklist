import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CollectionsComponent } from './list/collections/collections.component';
import { EditListComponent } from './list/edit-list/edit-list.component';
import { ViewListComponent } from './list/view-list/view-list.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 's/edit', component: EditListComponent },
      { path: 's/collections', component: CollectionsComponent },
      { path: ':title', component: ViewListComponent },
      { path: '**', redirectTo: 's/edit' }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
