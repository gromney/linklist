import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { EditListComponent } from './list/edit-list/edit-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CollectionsComponent } from './list/collections/collections.component';
import { ApiRequestInterceptor } from './common/interceptors/api-request.interceptor';
import { ViewListComponent } from './list/view-list/view-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    EditListComponent,
    NavBarComponent,
    CollectionsComponent,
    ViewListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
