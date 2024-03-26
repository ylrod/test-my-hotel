import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() title!: string;
  @Input() type!: string;
  @Input() item!: any[];
  @Input() message!: string;
  @Input() closeOnContainer: boolean = true;
  @Output() closeModal = new EventEmitter();
  @Output() confirmModal = new EventEmitter();

  containerClose() {
    if (!this.closeOnContainer) return;
    this.close();
  }

  close() {
    this.closeModal.emit()
  }
  confirm() {
    this.confirmModal.emit()
  }

  constructor() { }

  ngOnInit() {
  }

}
