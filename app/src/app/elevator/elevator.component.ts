import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  inject,
} from '@angular/core';
import { Elevator } from '../models/Elevator/Elevator';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-elevator',
  templateUrl: './elevator.component.html',
  styleUrls: ['./elevator.component.scss'],
  standalone: true,
})
export class ElevatorComponent {
  @Input()
  elevator!: Elevator;

  @Output()
  onClick: EventEmitter<void> = new EventEmitter<void>();

  private store = inject(StoreService);

  @HostBinding('style.background') get backgroundColor() {
    if (this.store.getCurrentElevatorId() === this.elevator?.id) {
      return 'green';
    }
    return '#000';
  }

  @HostListener('click') click() {
    return this.onClick.next();
  }
}
