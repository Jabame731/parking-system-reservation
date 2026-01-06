import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { PageTitlePortal } from 'projects/app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-title',
  imports: [CdkPortalOutlet, CommonModule],
  templateUrl: './page-title.html',
  styleUrl: './page-title.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTitle implements OnInit {
  portal$!: Observable<TemplatePortal>;

  private pageTitlePortal = inject(PageTitlePortal);

  ngOnInit(): void {
    this.portal$ = this.pageTitlePortal.portal$;
  }
}
