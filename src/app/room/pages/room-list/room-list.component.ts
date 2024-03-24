import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../../model/room.model';
import { Select, Store } from '@ngxs/store';
import { LoadRooms } from '../../state/room.actions';
import { RoomSelectors } from '../../state/room.selector';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent {

  @Select(RoomSelectors.getRoomsList) rooms$!: Observable<Room[]>;
  @Select(RoomSelectors.getRoomsLoading) loading$!: Observable<boolean>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadRooms());
  }
}
