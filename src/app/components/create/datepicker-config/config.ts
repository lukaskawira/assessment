import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as dayjs from 'dayjs';

export class CustomDatePickerConfig extends NgbDatepickerConfig {
    override firstDayOfWeek = 3;
    override minDate: NgbDateStruct = {
        year: dayjs().year(),
        month: dayjs().month() + 1,
        day: dayjs().date() + 1
    }
}