import { Pipe, PipeTransform } from '@angular/core';

interface MonthData {
  month: string;
  total: number;
}

interface ChartData {
  name: string;
  value: number;
}

@Pipe({
  name: 'monthToChart',
})
export class MonthToChartPipe implements PipeTransform {
  transform(value: MonthData[] | undefined): ChartData[] {
    if (!value) return [];

    return value.map((item) => ({
      name: item.month,
      value: item.total,
    }));
  }
}
