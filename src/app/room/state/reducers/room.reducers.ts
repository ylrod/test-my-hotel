import { createReducer, on } from '@ngrx/store';
import * as RoomActions from '../actions/room.actions';
import { RoomState } from '../room.state';

export const initialState: RoomState = {
  rooms: [],
  loading: false,
  error: null
};

export const roomReducer = createReducer(
  initialState,
  on(RoomActions.loadRooms, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(RoomActions.loadRoomsSuccess, (state, { rooms }) => ({
    ...state,
    rooms,
    loading: false
  })),
  on(RoomActions.loadRoomsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
