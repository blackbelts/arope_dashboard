import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PoliciesComponent } from 'app/pages/policies/policies.component';
import { ClaimsComponent } from 'app/pages/claims/claims.component';
import { InsuranceRequestComponent } from 'app/pages/insurance-request/insurance-request.component';
import { InsuranceRequestStepperComponent } from 'app/pages/insurance-request-stepper/insurance-request-stepper.component';
import { InsuranceRequestListComponent } from 'app/pages/insurance-request-list/insurance-request-list.component';
import { CollectionsComponent } from 'app/pages/collections/collections.component';
import { RenewalsComponent } from 'app/pages/renewals/renewals.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    PoliciesComponent,
    ClaimsComponent,
    InsuranceRequestComponent,
    InsuranceRequestStepperComponent,
    InsuranceRequestListComponent,
    CollectionsComponent,
    RenewalsComponent
  ]
})

export class AdminLayoutModule { }
