export class EventModel {
  year: number;
  month: number;
  date: number;
  data = {};
  constructor(data: any, date: Date, user: any) {
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.date = date.getDate();
    
    this.data = {
      id: new Date().getTime(),
      user: user,
      title: data.title,
      message: data.message, 
      from: data.from,
      to: data.to
    };
  }
}