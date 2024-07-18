import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
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
import { IterateNTimesDirective } from 'src/app/iterate-ntimes.directive';
import { Elevator } from 'src/app/models/Elevator/Elevator';
import { ElevatorService } from 'src/app/services/elevator.service';
import { CallFromHallway } from '../../models/Common/Call/CallFromHallway';

@Component({
  selector: 'app-direction-panel',
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
  templateUrl: './direction-panel.component.html',
  styleUrls: ['./direction-panel.component.scss'],
})
export class DirectionPanelComponent {
  @Input() elevators!: Elevator[];
  @Input() floorsCount!: number;
  callFromHallway: CallFromHallway = { floor: 0, direction: 0 };

  elevatorService = inject(ElevatorService);

  directionPanel = new FormGroup({
    floor: new FormControl(0, [Validators.required]),
    direction: new FormControl(0, [Validators.required]),
  });

  submitCall() {
    if (this.directionPanel.valid) {
      this.elevatorService
        .callFromHallway(this.directionPanel.value)
        .subscribe();
    }
  }
}
