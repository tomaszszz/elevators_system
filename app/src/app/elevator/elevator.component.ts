import { Component, Input } from '@angular/core';
import { Elevator } from '../models/Elevator/Elevator';

@Component({
    selector: 'app-elevator',
    templateUrl: './elevator.component.html',
    styleUrls: ['./elevator.component.scss'],
    standalone: true,
})
export class ElevatorComponent {
    @Input()
    elevator!: Elevator;
}
