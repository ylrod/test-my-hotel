import { createAction, props } from '@ngrx/store';
import { Room } from '../../model/room.model';

export const loadRooms = createAction('[Room] Load Rooms');
export const loadRoomsSuccess = createAction('[Room] Load Rooms Success', props<{ rooms: Room[] }>());
export const loadRoomsFailure = createAction('[Room] Load Rooms Failure', props<{ error: any }>());
