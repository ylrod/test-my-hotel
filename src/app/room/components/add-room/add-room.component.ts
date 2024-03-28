import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Room } from '../../model/room.model';
import { Subscription } from 'rxjs';
import { ROOM_FEATURES, ROOM_STATUSES, ROOM_TYPES } from '../../utils/constants';

interface DialogData {
  room?: Room;
}

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent {

  public form!: FormGroup;
  public subs: Subscription[] = [];
  public lists = {
    types: ROOM_TYPES,
    statuses: ROOM_STATUSES,
    features: ROOM_FEATURES
  };

  constructor(
    public dialogRef: MatDialogRef<AddRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initFormFields();
    if (this.data.room) {
      this.fillForm();
    }
  }

  ngOnDestroy() {
    this.subs.forEach((subs) => subs.unsubscribe());
  }

  initFormFields() {
    this.form = this.fb.group({
      'id': [null],
      'number': [null, { validators: [Validators.required] }],
      'type': [null, { validators: [Validators.required] }],
      'status': [null, { validators: [Validators.required] }],
      'pricePerNight': [null, { validators: [Validators.required] }],
      'description': [null],
      'features': [[]],
      'createdAt': [null]
    });
  }

  fillForm() {
    this.form.patchValue({ ...this.data.room });
    this.form.updateValueAndValidity();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.form.getRawValue());
  }
}
