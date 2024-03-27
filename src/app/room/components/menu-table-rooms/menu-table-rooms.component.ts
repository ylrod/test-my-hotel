import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-menu-table-rooms',
  templateUrl: './menu-table-rooms.component.html',
  styleUrls: ['./menu-table-rooms.component.scss']
})
export class MenuTableRoomsComponent {
  @ViewChild(MatMenu) menu!: MatMenu;
  @Output() onMenuOptionClick = new EventEmitter<string>();

  menuOptionClick(option: string) {
    this.onMenuOptionClick.emit(option);
  }
}
