import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard/home', title: 'Dashboard', icon: 'nc-bank', class: '' },
    //{ path: '/dashboard/icons', title: 'Icons', icon: 'nc-diamond', class: '' },
    // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    // { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    { path: '/dashboard/user', title: 'User Profile', icon: 'nc-single-02', class: '' },
    //{ path: '/dashboard/table', title: 'Table List', icon: 'nc-tile-56', class: '' },
    // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
    { path: "/dashboard/policies", title: "My Policies", icon: "nc-paper", class: "" },
    { path: "/dashboard/claims", title: "My Claims", icon: "nc-paper", class: "" },
    { path: "/dashboard/insurance-list", title: "Insurance Applications", icon: "nc-paper", class: "" },
    { path: "/dashboard/insurance-application", title: "Insurance Request", icon: "nc-simple-add", class: "" },


];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
