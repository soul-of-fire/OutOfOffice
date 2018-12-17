export class EventModel {
  year: number;
  month: number;
  date: number;
  data = {};
  constructor(title: string, message: string, date: Date) {
    this.data['title'] = title;
    this.data['message'] = message;
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.date = date.getDate();
  }
}