import {Component, OnInit} from '@angular/core';
import {TodoServiceService} from './todo-service.service';
import {debounceTime, distinctUntilChanged, map, mergeMap, take} from 'rxjs/operators';
import {from, iif, of} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'udemyRxJs';
  search = new FormControl('');
  currency: string[] = ['TL', 'Dolar'];
  selectCurrency = new FormControl('TL');
  constructor(private todoService: TodoServiceService) {
  }

  ngOnInit(): void {
    this.todoService.getTodoList()
      .pipe(mergeMap(x => from(x)), take(10), map(x => {
        delete x.completed;
        return x;
      }))
      .subscribe(data => {
      console.log(data);
    });
    this.search.valueChanges
      .pipe(debounceTime(500), map(val => val.trim()), distinctUntilChanged()
        , mergeMap(value => iif(() => value.length > 3, of(value)))
      , mergeMap(val => this.todoService.getUserWithSearch(val)))
      .subscribe(data => {
      console.log(data);
    });
    this.selectCurrency.valueChanges.subscribe(data => {
      this.todoService.setCurrency(data);
    });
  }


}
