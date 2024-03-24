import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Room } from "../model/room.model";
import { RoomService } from "../services/room.service";
import { LoadRooms } from "./room.actions";
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
}
