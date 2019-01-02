import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ApiProvider {
  host = 'https://calendar-18888.firebaseio.com/';

  constructor(public http: HttpClient, 
    public toastCtrl: ToastController) {}

  get(...args): Observable<any> {
    return this.http.get<any[]>(this.host + args[0], args[1]).pipe(
      catchError(this.handleError())
    );
  }

  post(...args): Observable<any> {
    return this.http.post<any>(this.host + args[0], args[1], args[2]).pipe(
      catchError(this.handleError())
    );
  }

  put(...args): Observable<any> {
    return this.http.put<any>(this.host + args[0], args[1], args[2]).pipe(
      catchError(this.handleError())
    );
  }

  remove(...args): Observable<any> {
    return this.http.delete<any>(this.host + args[0]).pipe(
      catchError(this.handleError())
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      let message =  error.error instanceof ErrorEvent? error.error.message: error.statusText;
      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return Observable.of(null);
    };
  }
}
