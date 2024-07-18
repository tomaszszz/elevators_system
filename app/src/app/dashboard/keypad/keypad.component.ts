import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IterateNTimesDirective } from 'src/app/common/iterate-ntimes.directive';
import { Elevator } from 'src/app/models/Elevator/Elevator';
import { ElevatorService } from 'src/app/services/elevator.service';
import { CallInsideElevator } from '../../models/Common/Call/CallInsideElevator';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-keypad',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    IterateNTimesDirective,
  ],
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.scss'],
})
export class KeypadComponent {
  @Input() elevators!: Elevator[];

  @Output() elevatorChange = new EventEmitter<string>();

  @Output() onCallSubmitted = new EventEmitter<void>();

  callInsideElevator: CallInsideElevator = { elevatorId: '1', targetFloor: 0 };

  private elevatorService = inject(ElevatorService);

  private store = inject(StoreService);

  keypadForm = new FormGroup({
    elevatorId: new FormControl('', [Validators.required]),
    targetFloor: new FormControl(0, [Validators.required]),
  });

  submitCall(): void {
    if (this.keypadForm.valid) {
      this.elevatorService
        .callFromElevator(this.keypadForm.value)
        .subscribe(() => {
          this.onCallSubmitted.next();
          const id = this.keypadForm.get('elevatorId')?.value;
          if (id) {
            this.elevatorChange.next(id);
          }
        });
    }
  }

  onElevatorChoose(id: string): void {
    this.elevatorChange.next(id);
  }

  setCurrentElevatorId(id: string): void {
    return this.store.setCurrentElevatorId(id);
  }

  getCurrentElevatorId(): string {
    return this.store.getCurrentElevatorId();
  }
}
