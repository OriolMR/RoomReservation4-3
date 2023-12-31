import { Component } from '@angular/core';
import { easepick } from '@easepick/bundle';
import { DateTime } from '@easepick/bundle';
import { RequestService } from '../services/request.service';
import { LockedDate } from '../models/locked-date';
import { LockedDatesService } from '../services/lockeddates.service';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
})
export class DatepickerComponent {
  dateStrings: string[] = [];
  disabledDates: DateTime[] = [];

  constructor(private requestService: RequestService, private lockedDatesService: LockedDatesService) { }

  ngOnInit() {
    this.requestService
      .get(
        `${this.lockedDatesService.getAllLockedDates}`
      )
      .subscribe({
        next: (lockedDates: LockedDate[]) => {
          this.dateStrings = lockedDates.map(
            (lockedDate) =>
              `${lockedDate.year}-${lockedDate.month}-${lockedDate.day}`
          );
        },
      });

    this.disabledDates = this.dateStrings.map(
      (dateString) => new DateTime(dateString, 'YYYY-MM-DD')
    );

    const picker = new easepick.create({
      element: document.getElementById('datepicker')!,
      css: [
        'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
      ],
      plugins: ['LockPlugin'],
      LockPlugin: {
        minDate: new Date(),
        filter: (date, picked) => {
          return date instanceof DateTime
            ? this.disabledDates.includes(date)
            : false;
        },
      },
    });
  }
}
