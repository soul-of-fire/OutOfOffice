import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomDateFormatterProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CustomDateFormatterProvider Provider');
  }

}
