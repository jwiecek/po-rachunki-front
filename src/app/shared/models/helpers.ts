import * as moment from 'moment';

export class HelpersData {
  public static today() {
    return moment().format('MM-DD-YYYY');
  }
  public static todayPlusOneMonth() {
    return moment().add(1, 'months').format('MM-DD-YYYY');
  }
  public static todayPlusOneYear() {
    return moment().add(1, 'year').format('MM-DD-YYYY');
  }
}
