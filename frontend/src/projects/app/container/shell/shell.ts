import { NgTemplateOutlet, NgClass, CommonModule } from '@angular/common';
import { Component, computed, effect, inject, Signal, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Sidenav, UserIdentity, PageTitle, Logo } from 'projects/app/components';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, fromEvent, map } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { PageTitlePortal } from 'projects/app/services';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { AuthUsecase } from '@parking-system-store/lib/usecases';

@Component({
  selector: 'app-shell',
  imports: [
    MatListModule,
    NgTemplateOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    Sidenav,
    NgClass,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    UserIdentity,
    PageTitle,
    CommonModule,
    Logo,
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  localStorageKey = 'sidenav-setting';

  protected breakPointObserver = inject(BreakpointObserver);
  private pageTitlePortal = inject(PageTitlePortal);
  private authUsecase = inject(AuthUsecase);

  breakPoint: Signal<BreakpointState | undefined> = toSignal(
    this.breakPointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]),
  );

  getAuthFullName$ = this.authUsecase.getAuthFullName$;

  smallerScreens = computed(() => {
    return this.breakPoint()?.matches;
  });

  readLocalStorageSideNav(): boolean {
    const item = localStorage.getItem(this.localStorageKey);

    return item !== null ? item == 'true' : true;
  }

  isExpanded = signal(this.readLocalStorageSideNav());

  portalOpen = signal(false);

  drawerToggle = signal(false);

  toggleExpansion() {
    const updatedExpanded = !this.isExpanded();

    console.log();

    this.writeLocalStorageSidenavSetting(updatedExpanded);
    window.dispatchEvent(new Event('resize'));
    const event = new CustomEvent('localStorageChanged', {
      detail: { key: this.localStorageKey, value: updatedExpanded },
    });

    window.dispatchEvent(event);
  }

  writeLocalStorageSidenavSetting(setting: boolean) {
    localStorage.setItem(this.localStorageKey, `${setting}`);
  }

  private localStorageKeyChange$ = fromEvent<CustomEvent>(window, 'localStorageChanged').pipe(
    filter((event) => event.detail?.key === this.localStorageKey),
    map((event) => event.detail?.value),
  );

  localStorageKeyChange = toSignal(this.localStorageKeyChange$);

  storageEffect = effect(() => {
    const storageEvent = this.localStorageKeyChange();
    this.isExpanded.update((v) =>
      typeof storageEvent !== 'undefined' ? storageEvent : this.readLocalStorageSideNav(),
    );
  });

  drawerOpen = computed(() => {
    return this.drawerToggle() || !this.breakPoint()?.matches;
  });

  toggleDrawer() {
    this.drawerToggle.update((dt) => !dt);
  }

  largerScreens = computed(() => {
    return !this.breakPoint()?.matches;
  });

  portal = toSignal(this.pageTitlePortal.portal$);

  togglePortal() {
    this.portalOpen.update((p) => !p);
  }

  logout() {
    this.authUsecase.logOut();
  }

  //hardcoded for now
  currentMenuItems = [
    // DASHBOARD
    {
      label: 'Dashboard',
      icon: 'dashboard',
      routerLink: ['/dashboard'],
    },
    {
      label: 'Dashboard',
      icon: 'dashboard',
      routerLink: ['/dashboard'],
    },
  ];
}
