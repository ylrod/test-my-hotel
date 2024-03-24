

import { Selector } from '@ngxs/store';
import { RoomState, RoomStateModel } from './room.state';

export class RoomSelectors {
  @Selector([RoomState])
  static getRoomsList(state: RoomStateModel) {
    return state.rooms;
  }
  @Selector([RoomState])
  static getRoomsLoading(state: RoomStateModel) {
    return state.loading;
  }
  @Selector([RoomState])
  static getRoomsError(state: RoomStateModel) {
    return state.error;
  }
}
