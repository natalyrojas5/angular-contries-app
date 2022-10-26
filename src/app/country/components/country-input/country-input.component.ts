import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html',
  styles: [],
})
export class CountryInputComponent implements OnInit {
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  @Input() placeholder: string = '';

  debounce: Subject<string> = new Subject();
  term: string = '';

  constructor() {}
  ngOnInit() {
    this.debounce.pipe(debounceTime(300)).subscribe((val) => {
      this.onDebounce.emit(val);
    });
  }
  search() {
    this.onEnter.emit(this.term);
  }
  enterSearch() {
    this.debounce.next(this.term);
  }
}
