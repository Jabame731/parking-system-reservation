import { TemplatePortal } from '@angular/cdk/portal';
import { Component, inject, OnInit } from '@angular/core';
import { PageTitlePortal } from 'projects/app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-title',
  imports: [],
  templateUrl: './page-title.html',
  styleUrl: './page-title.scss',
})
export class PageTitle implements OnInit {
  portal$!: Observable<TemplatePortal>;

  private pageTitlePortal = inject(PageTitlePortal);

  ngOnInit(): void {
    this.portal$ = this.pageTitlePortal.portal$;
  }
}
