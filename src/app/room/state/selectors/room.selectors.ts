import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoomState } from '../room.state';


export const selectRoomState = createFeatureSelector<RoomState>('rooms');

export const selectRooms = createSelector(
  selectRoomState,
  (state: RoomState) => state.rooms
);

export const selectRoomLoading = createSelector(
  selectRoomState,
  (state: RoomState) => state.loading
);

export const selectRoomError = createSelector(
  selectRoomState,
  (state: RoomState) => state.error
);
