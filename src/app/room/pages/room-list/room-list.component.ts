import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../../model/room.model';
import { Select, Store } from '@ngxs/store';
import { AddRoom, DeleteRoom, LoadRooms, UpdateRoom, UpdateRoomStatus } from '../../state/room.actions';
import { RoomSelectors } from '../../state/room.selector';
import { MatDialog } from '@angular/material/dialog';
import { AddRoomComponent } from '../../components/add-room/add-room.component';

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
  searchTerm: string = '';

  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadRooms());
  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }

  changeView(view: string) {
    this.view = view;
  }

  onChangesSearchTerm(searchTerm: string) {
    this.searchTerm = searchTerm;
  }

  onMenuOptionClick(event: { room: Room, option: string }) {
    this.selectedRoom = event.room;
    switch (event.option) {
      case 'delete':
        this.changeView('delete');
        break;
      case 'edit':
        this.openDialog();
        break;
      case 'occupied':
      case 'available':
      case 'cleaning':
        this.store.dispatch(new UpdateRoomStatus(this.selectedRoom.id, event.option));
        this.selectedRoom = null;
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

  openDialog(): void {
    const dialogRef = this.dialog.open(AddRoomComponent, {
      data: {
        room: this.selectedRoom
      }
    });

    dialogRef.afterClosed().subscribe((result: Room) => {
      this.selectedRoom = null;
      if (!result) return;

      if (result.id) {
        this.store.dispatch(new UpdateRoom(result));
      } else {
        this.store.dispatch(new AddRoom(result));
      }
    });
  }
}
