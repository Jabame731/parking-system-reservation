import { CdkPortal, CdkPortalOutlet } from '@angular/cdk/portal';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PageTitlePortal } from 'projects/app/services';
import { TransactionsTableHistory } from 'projects/app/components';

@Component({
  selector: 'app-transactions',
  imports: [CdkPortal, MatButtonModule, MatIcon, TransactionsTableHistory, CdkPortalOutlet],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
})
export class Transactions implements OnInit, OnDestroy {
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

  dataSource = [];
}
