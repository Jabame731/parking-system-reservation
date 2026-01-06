import { Component, input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-skeleton-text',
  template: ` @for (width of lineWidths; track width) {
    <p
      class="skeleton--text bg-gray-100  skeleton-loading"
      [style.width]="fullWidth() ? '100%' : width"
      [style.height.px]="lineHeight()"
    ></p>
  }`,
  styleUrl: './skeleton-text.scss',
})
export class SkeletonText implements OnChanges {
  lines = input<number>(5);

  minLineWidth = input<number>(100);

  maxLineWidth = input<number>(300);

  lineHeight = input<number>(16);

  fullWidth = input<boolean>(false);

  lineWidths!: Array<string>;

  /**
   * Returns a random width in pixels based off a min width, and a max width.
   */
  getRandomInt = (min: number, max: number) => {
    return `${`${Math.floor(Math.random() * (max - min + 1) + min)}px`}`;
  };

  ngOnChanges(changes: SimpleChanges): void {
    // Creates an array of length defined by input lines with content from
    // 0 to lines - 1, maps each value to a random width in pixels.
    this.lineWidths = Array.from(Array(this.lines).keys()).map(() =>
      this.getRandomInt(this.minLineWidth(), this.maxLineWidth()),
    );
  }
}
