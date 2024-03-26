import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../../model/room.model';
import { Select, Store } from '@ngxs/store';
import { DeleteRoom, LoadRooms } from '../../state/room.actions';
import { RoomSelectors } from '../../state/room.selector';
import { searchProperties } from '../../utils/constants';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent {

  @Select(RoomSelectors.getRoomsList) rooms$!: Observable<Room[]>;
  @Select(RoomSelectors.getRoomsLoading) loading$!: Observable<boolean>;
  public searchTerm: string = '';
  public searchProperties = searchProperties;
  public view: string = 'home';
  selectedRoom!: Room;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadRooms());
  }

  changeView(view: string) {
    this.view = view;
  }

  onChangesSearchTerm(searchTerm: string) {
    this.searchTerm = searchTerm;
  }

  onMenuOptionClick(event: { room: Room, option: string }) {
    this.selectedRoom = event.room;
    if (event.option === 'Eliminar') {
      this.changeView('delete');
    } else if (event.option === 'Editar') {
      // Implementar lógica para editar una habitación
    }
  }

  onConfirmDeleteRoom() {
    this.store.dispatch(new DeleteRoom(this.selectedRoom.id));
  }
}
