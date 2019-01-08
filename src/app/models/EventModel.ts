export class EventModel {
  year: number;
  month: number;
  date: number;
  data = {};
  constructor(title: string, message: string, date: Date, id: number, user: any) {
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.date = date.getDate();
    
    this.data = {
      id: id,
      user: user,
      title: title,
      message: message
    };
  }
}