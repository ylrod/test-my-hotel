import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomListComponent } from './pages/room-list/room-list.component';
import { SharedModule } from '../shared/shared.module';
import { RoomState } from './state/room.state';
import { NgxsModule } from '@ngxs/store';
import { TableRoomsComponent } from './components/table-rooms/table-rooms.component';
import { MenuTableRoomsComponent } from './components/menu-table-rooms/menu-table-rooms.component';


@NgModule({
  declarations: [
    RoomListComponent,
    TableRoomsComponent,
    MenuTableRoomsComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    SharedModule,
    NgxsModule.forFeature([RoomState]),
  ]
})
export class RoomModule { }
