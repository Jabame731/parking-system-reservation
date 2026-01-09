import { CdkPortal } from '@angular/cdk/portal';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ParkingCardStatus } from 'projects/app/components';
import { PageTitlePortal } from 'projects/app/services';

@Component({
  selector: 'app-dashboard',
  imports: [NgxChartsModule, ParkingCardStatus, CdkPortal],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  providers: [],
})
export class Dashboard implements OnInit, OnDestroy {
  private pageTitlePortal = inject(PageTitlePortal);

  @ViewChild(CdkPortal) pageTitle!: CdkPortal;

  ngOnInit(): void {
    setTimeout(() => {
      this.pageTitlePortal.setPortal(this.pageTitle);
    });
  }

  ngOnDestroy(): void {
    if (this.pageTitle?.isAttached) {
      this.pageTitle.detach();
      this.pageTitlePortal.setPortal(null!);
    }
  }

  view: any[number] = [1600, 400];
  single = [
    { name: 'January', value: 52000 },
    { name: 'February', value: 48000 },
    { name: 'March', value: 61000 },
    { name: 'April', value: 58000 },
    { name: 'May', value: 67000 },
    { name: 'June', value: 72000 },
    { name: 'July', value: 75000 },
    { name: 'August', value: 73000 },
    { name: 'September', value: 69000 },
    { name: 'October', value: 76000 },
    { name: 'November', value: 81000 },
    { name: 'December', value: 0 },
  ];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Month (2026)';
  yAxisLabel = 'Parking Revenue';
  reportTitle = 'Monthly Parking Revenue Report';

  colorScheme: any = {
    domain: [
      '#1E88E5', // January
      '#42A5F5', // February
      '#90CAF9', // March
      '#26A69A', // April
      '#66BB6A', // May
      '#9CCC65', // June
      '#D4E157', // July
      '#FFCA28', // August
      '#FFA726', // September
      '#FB8C00', // October
      '#EF5350', // November
      '#8E24AA', // December
    ],
  };

  constructor() {
    const single = [
      { name: 'January', value: 52000 },
      { name: 'February', value: 48000 },
      { name: 'March', value: 61000 },
      { name: 'April', value: 58000 },
      { name: 'May', value: 67000 },
      { name: 'June', value: 72000 },
      { name: 'July', value: 75000 },
      { name: 'August', value: 73000 },
      { name: 'September', value: 69000 },
      { name: 'October', value: 76000 },
      { name: 'November', value: 0 },
      { name: 'December', value: 0 },
    ];
    Object.assign(this, { single });
  }

  onSelect(event: any) {
    console.log(event);
  }
}
