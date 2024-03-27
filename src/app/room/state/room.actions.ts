import { RoomStatus } from "../model/room-status.type";
import { Room } from "../model/room.model";


export class LoadRooms {
  static readonly type = '[Room] Load Rooms';
}

export class AddRoom {
  static readonly type = '[Room] Add Room';
  constructor(public room: Room) { }
}

export class UpdateRoom {
  static readonly type = '[Room] Update Room';
  constructor(public room: Room) { }
}

export class DeleteRoom {
  static readonly type = '[Room] Delete Room';
  constructor(public id: number) { }
}

export class UpdateRoomStatus {
  static readonly type = '[Room] Update Room Status';
  constructor(public id: number, public status: RoomStatus) { }
}
