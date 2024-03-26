import { Component, ElementRef, OnInit, Output, EventEmitter, ViewChild, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import {
  debounceTime,
  map,
  distinctUntilChanged,
} from "rxjs/operators";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef = new ElementRef(null);
  @Input() delay: number = 200;
  @Input() autoFocus: boolean = true;
  @Input() fontSize: string = '13px';
  @Input() placeholder: string = 'Buscar...';
  @Output() onChanges = new EventEmitter<string>();
  subs: Subscription[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.subs.push(fromEvent<any>(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(this.delay),
      distinctUntilChanged((valueOne: any, valueTwo: any) => {
        return valueOne === valueTwo ? true : false;
      }),
    ).subscribe(search => {
      let value = search ? search : '';
      this.onChanges.emit(value)
    }));

    if (this.autoFocus) {
      this.searchInput.nativeElement.focus();
    }
  }

  ngOnDestroy() {
    this.onChanges.emit('');
    this.subs.map(s => s.unsubscribe());
  }

}
