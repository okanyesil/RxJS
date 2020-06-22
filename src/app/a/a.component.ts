import { Component, OnInit } from '@angular/core';
import {TodoServiceService} from '../todo-service.service';

@Component({
  selector: 'app-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.css']
})
export class AComponent implements OnInit {
  myCurrency: string;
  constructor(private todoService: TodoServiceService) { }

  ngOnInit() {
    this.todoService.currenturrency.subscribe(data => {
      this.myCurrency = data;
    });
  }

}
