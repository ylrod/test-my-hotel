import { Room } from "../model/room.model";

export interface RoomState {
  rooms: Room[];
  loading: boolean;
  error: any;
}
