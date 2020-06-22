import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {filter, map, mergeMap} from 'rxjs/operators';
import {BehaviorSubject, from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  constructor(private http: HttpClient) {
  }
  currenturrency = new BehaviorSubject('TL');
  setCurrency(value) {
    this.currenturrency.next(value);
  }
  getTodoList() {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos');
  }
  getUserWithSearch(serachText: string) {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(mergeMap(x => from(x)), filter(x => x.name.toLowerCase().includes(serachText.toLowerCase())), map(x => x.name));
  }
}
