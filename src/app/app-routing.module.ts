import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CollectionsComponent } from './list/collections/collections.component';
import { EditListComponent } from './list/edit-list/edit-list.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'edit', component: EditListComponent,data: {} },
      { path: 'collections', component: CollectionsComponent },
      { path: '**', redirectTo: 'edit' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
