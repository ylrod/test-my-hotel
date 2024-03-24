import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomListComponent } from './pages/room-list/room-list.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { roomReducer } from './state/reducers/room.reducers';
import { EffectsModule } from '@ngrx/effects';
import { RoomEffects } from './state/effects/room.effects';


@NgModule({
  declarations: [
    RoomListComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    SharedModule,
    StoreModule.forFeature('rooms', roomReducer),
    EffectsModule.forFeature([RoomEffects])
  ]
})
export class RoomModule { }
