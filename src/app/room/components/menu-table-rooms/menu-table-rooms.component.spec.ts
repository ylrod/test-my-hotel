import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTableRoomsComponent } from './menu-table-rooms.component';

describe('MenuTableRoomsComponent', () => {
  let component: MenuTableRoomsComponent;
  let fixture: ComponentFixture<MenuTableRoomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuTableRoomsComponent]
    });
    fixture = TestBed.createComponent(MenuTableRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
