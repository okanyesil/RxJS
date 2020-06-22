import { Component, OnInit } from '@angular/core';
import {TodoServiceService} from '../todo-service.service';

@Component({
  selector: 'app-b',
  templateUrl: './b.component.html',
  styleUrls: ['./b.component.css']
})
export class BComponent implements OnInit {

  constructor(public todoService: TodoServiceService) { }

  ngOnInit() {
  }

}
