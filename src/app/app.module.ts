import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { from } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { InsuranceRequestComponent } from './pages/insurance-request/insurance-request.component';
import { CollectionsComponent } from './pages/collections/collections.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    /*  OdooService,
     ConfigService */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
