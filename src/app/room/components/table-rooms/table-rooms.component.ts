import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Room } from '../../model/room.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import tableRoomsFilter from '../../utils/tableRoomsFilter';
import { TranslationService } from 'src/app/shared/services/translate.service';

@Component({
  selector: 'app-table-rooms',
  templateUrl: './table-rooms.component.html',
  styleUrls: ['./table-rooms.component.scss']
})
export class TableRoomsComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() rooms: Room[] = [];
  @Output() onMenuOptionClick = new EventEmitter<{ room: Room, option: string }>();
  displayedColumns: string[] = ['id', 'number', 'type', 'status', 'pricePerNight', 'description', 'features', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<Room>();
  options = ['Editar', 'Eliminar'];
  selectedRoom!: Room;

  constructor(private _datePipe: DatePipe, private _translateService: TranslationService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rooms']) {
      this.dataSource.data = this.rooms;
    }
  };

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    const { _datePipe, _translateService } = this;
    this.dataSource.filterPredicate = tableRoomsFilter({ _datePipe, _translateService });
  }

  onMenuClick(event: MouseEvent, room: Room) {
    this.selectedRoom = room;
    event.stopPropagation();
  }

  menuOptionClick(option: string) {
    this.onMenuOptionClick.emit({ room: this.selectedRoom, option });
  }

  onChangesSearchTerm(searchTerm: string) {
    this.dataSource.filter = searchTerm;
  }

}
