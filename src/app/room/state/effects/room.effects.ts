import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as RoomActions from '../actions/room.actions';
import { RoomService } from '../../services/room.service';

@Injectable()
export class RoomEffects {

  loadRooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.loadRooms),
      mergeMap(() =>
        this.roomService.getRooms().pipe(
          map(rooms => RoomActions.loadRoomsSuccess({ rooms })),
          catchError(error => of(RoomActions.loadRoomsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private roomService: RoomService
  ) { }
}
