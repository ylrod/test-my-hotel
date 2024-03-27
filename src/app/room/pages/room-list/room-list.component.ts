import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../../model/room.model';
import { Select, Store } from '@ngxs/store';
import { DeleteRoom, LoadRooms, UpdateRoomStatus } from '../../state/room.actions';
import { RoomSelectors } from '../../state/room.selector';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent {

  @Select(RoomSelectors.getRoomsList) rooms$!: Observable<Room[]>;
  @Select(RoomSelectors.getRoomsLoading) loading$!: Observable<boolean>;
  public view: string = 'home';
  selectedRoom: Room | null = null;

  constructor(private store: Store, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadRooms());
  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }

  changeView(view: string) {
    this.view = view;
  }

  onMenuOptionClick(event: { room: Room, option: string }) {
    this.selectedRoom = event.room;

    switch (event.option) {
      case 'delete':
        this.changeView('delete');
        break;
      case 'edit':
        break;
      case 'occupied':
      case 'available':
      case 'cleaning':
        this.store.dispatch(new UpdateRoomStatus(this.selectedRoom.id, event.option));
        break;
    }
  }

  onConfirmDeleteRoom() {
    if (this.selectedRoom) {
      this.store.dispatch(new DeleteRoom(this.selectedRoom.id));
      this.selectedRoom = null;
      this.changeView('home');
    }
  }
}
