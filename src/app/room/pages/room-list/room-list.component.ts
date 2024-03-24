import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Room } from '../../model/room.model';
import { selectRooms } from '../../state/selectors/room.selectors';
import { loadRooms } from '../../state/actions/room.actions';
import { RoomState } from '../../state/room.state';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent {

  public rooms$: Observable<Room[]> | undefined;

  constructor(private store: Store<RoomState>) { }

  ngOnInit(): void {
    this.rooms$ = this.store.select(selectRooms);
    this.store.dispatch(loadRooms());
  }
}
