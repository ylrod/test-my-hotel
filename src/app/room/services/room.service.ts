import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Room } from '../model/room.model';
import { mockRooms } from 'src/app/shared/mocks/data';
import { RoomStatus } from '../model/room-status.type';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  rooms: Room[];
  timeDelay: number = 300;

  constructor() {
    this.rooms = [...mockRooms];
  }

  getRooms(): Observable<Room[]> {
    return of([...this.rooms]).pipe(delay(this.timeDelay));;
  }

  addRoom(room: Room): Observable<void> {
    this.rooms.push(room);
    return of(undefined).pipe(delay(this.timeDelay));;
  }

  updateRoom(room: Room): Observable<void> {
    const index = this.rooms.findIndex(r => r.id === room.id);
    if (index !== -1) {
      this.rooms[index] = room;
    }
    return of(undefined).pipe(delay(this.timeDelay));;
  }

  deleteRoom(id: number): Observable<void> {
    const index = this.rooms.findIndex(room => room.id === id);
    if (index !== -1) {
      this.rooms.splice(index, 1);
    }
    return of(undefined).pipe(delay(this.timeDelay));;
  }

  updateRoomStatus({ id, status }: { id: number, status: RoomStatus }): Observable<void> {
    const index = this.rooms.findIndex(room => room.id === id);
    if (index !== -1) {
      this.rooms[index].status = status;
    }
    return of(undefined).pipe(delay(this.timeDelay));;
  }

}
