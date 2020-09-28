import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { ClaimsComponent } from 'app/pages/claims/claims.component';
import { PoliciesComponent } from 'app/pages/policies/policies.component';
import { InsuranceRequestComponent } from 'app/pages/insurance-request/insurance-request.component';
import { InsuranceRequestListComponent } from 'app/pages/insurance-request-list/insurance-request-list.component';
import { InsuranceRequestStepperComponent } from 'app/pages/insurance-request-stepper/insurance-request-stepper.component';
import { CollectionsComponent } from 'app/pages/collections/collections.component';
import { RenewalsComponent } from 'app/pages/renewals/renewals.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'home', component: DashboardComponent },
    { path: 'user', component: UserComponent },
    { path: 'table', component: TableComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent },
    { path: "claims", component: ClaimsComponent },
    { path: "policies", component: PoliciesComponent },
    { path: "insurance-application", component: InsuranceRequestComponent },
    { path: "insurance-list", component: InsuranceRequestListComponent },
    { path: "ins-application-status/:id", component: InsuranceRequestStepperComponent },
    { path: "collections", component: CollectionsComponent },
    { path: "renewals", component: RenewalsComponent }
];
