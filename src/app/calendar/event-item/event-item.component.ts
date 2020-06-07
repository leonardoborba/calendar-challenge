import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent implements OnInit, OnChanges {
  @Input() event;
  @Input() selected;
  @Output() clicked = new EventEmitter();
  @Output() checked = new EventEmitter();
  checkbox: boolean;

  constructor() { }

  ngOnChanges() {
    this.checkbox = this.selected >= 0;
  }

  ngOnInit() {
  }

}
