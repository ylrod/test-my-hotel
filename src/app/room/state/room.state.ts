import { Action, State, StateContext } from "@ngxs/store";
import { Room } from "../model/room.model";
import { RoomService } from "../services/room.service";
import { AddRoom, DeleteRoom, LoadRooms, UpdateRoom, UpdateRoomStatus } from "./room.actions";
import { catchError, tap, throwError } from "rxjs";
import { Injectable } from "@angular/core";

export interface RoomStateModel {
  rooms: Room[];
  loading: boolean;
  error: any;
}

@State<RoomStateModel>({
  name: 'rooms',
  defaults: {
    rooms: [],
    loading: false,
    error: undefined
  }
})
@Injectable()
export class RoomState {
  constructor(private roomService: RoomService) { }

  @Action(LoadRooms)
  loadRooms(ctx: StateContext<RoomStateModel>, action: LoadRooms) {
    ctx.patchState({ loading: true });
    return this.roomService.getRooms().pipe(
      tap((rooms: Room[]) => {
        ctx.patchState({ rooms, loading: false });
      }),
      catchError(error => {
        ctx.patchState({ error, loading: false });
        return throwError(error);
      })
    );
  }

  @Action(DeleteRoom)
  deleteRoom(ctx: StateContext<RoomStateModel>, action: DeleteRoom) {
    ctx.patchState({ loading: true });
    return this.roomService.deleteRoom(action.id).pipe(
      tap(() => {
        const rooms = ctx.getState().rooms.filter(room => room.id !== action.id);
        ctx.patchState({ rooms, loading: false });
      }),
      catchError(error => {
        ctx.patchState({ error, loading: false });
        return throwError(error);
      })
    );
  }

  @Action(UpdateRoomStatus)
  updateRoomStatus(ctx: StateContext<RoomStateModel>, action: UpdateRoomStatus) {
    ctx.patchState({ loading: true });
    const { id, status } = action;
    return this.roomService.updateRoomStatus({ id, status }).pipe(
      tap(() => {
        const rooms = ctx.getState().rooms.map(room => {
          if (room.id === id) {
            return { ...room, status };
          }
          return room;
        });
        ctx.patchState({ rooms, loading: false });
      }),
      catchError(error => {
        ctx.patchState({ error, loading: false });
        return throwError(error);
      })
    );
  }

  @Action(UpdateRoom)
  updateRoom(ctx: StateContext<RoomStateModel>, action: UpdateRoom) {
    ctx.patchState({ loading: true });
    return this.roomService.updateRoom(action.room).pipe(
      tap(() => {
        ctx.dispatch(new LoadRooms());
      }),
      catchError(error => {
        ctx.patchState({ error, loading: false });
        return throwError(error);
      })
    );
  }

  @Action(AddRoom)
  addRoom(ctx: StateContext<RoomStateModel>, action: AddRoom) {
    ctx.patchState({ loading: true });
    return this.roomService.addRoom({
      ...action.room,
      id: ctx.getState().rooms.length + 1,
      createdAt: new Date().toISOString()
    }).pipe(
      tap(() => {
        ctx.dispatch(new LoadRooms());
      }),
      catchError(error => {
        ctx.patchState({ error, loading: false });
        return throwError(error);
      })
    );
  }
}
