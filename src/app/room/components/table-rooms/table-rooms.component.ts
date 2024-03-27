import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Room } from '../../model/room.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TableRoomService } from '../../services/table-room.service';
import { MenuTableRoomsComponent } from '../menu-table-rooms/menu-table-rooms.component';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-table-rooms',
  templateUrl: './table-rooms.component.html',
  styleUrls: ['./table-rooms.component.scss']
})
export class TableRoomsComponent {
  @ViewChild(MenuTableRoomsComponent) menuComponent!: MenuTableRoomsComponent;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  @Input() rooms: Room[] = [];
  @Output() onMenuOptionClick = new EventEmitter<{ room: Room, option: string }>();
  displayedColumns: string[] = ['number', 'type', 'status', 'pricePerNight', 'description', 'features', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<Room>();
  selectedRoom!: Room;
  statusClasses: { [key: string]: string } = {
    available: 'status--available',
    occupied: 'status--occupied',
    cleaning: 'status--cleaning'
  };

  constructor(private _tableRoomService: TableRoomService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rooms']) {
      this.dataSource.data = this.rooms;
    }
  };

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this._tableRoomService.getTableRoomFilter;
  }

  onMenuClick(event: MouseEvent, room: Room) {
    this.selectedRoom = room;
    event.stopPropagation();
  }

  menuOptionClick(option: string) {
    this.menuTrigger.closeMenu();
    this.onMenuOptionClick.emit({ room: this.selectedRoom, option });
  }

  onChangesSearchTerm(searchTerm: string) {
    this.dataSource.filter = searchTerm;
  }

}
