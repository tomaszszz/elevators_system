import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { IterateNTimesDirective } from '../common/iterate-ntimes.directive';
import { ElevatorComponent } from '../elevator/elevator.component';
import { Elevator } from '../models/Elevator/Elevator';
import { ElevatorService } from '../services/elevator.service';
import { DirectionPanelComponent } from './direction-panel/direction-panel.component';
import { KeypadComponent } from './keypad/keypad.component';
import { StoreService } from '../services/store.service';
import { Queue } from '../models/Common/Queue';
import { Call } from '../models/Common/Call/Call';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ElevatorComponent,
    KeypadComponent,
    DirectionPanelComponent,
    IterateNTimesDirective,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatChipsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  elevators: Elevator[] = [];
  floorsCount = 0;
  currentQueue!: Observable<Queue<Call>>;
  currentElevator = '1';

  private activatedRoute = inject(ActivatedRoute);
  private elevatorService = inject(ElevatorService);
  store = inject(StoreService);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ state }) => {
      this.elevators = state.elevators;
      this.floorsCount = state.floorsCount;
    });
    this.currentQueue = this.elevatorService.getElevatorQueue(
      this.currentElevator
    );
  }

  step() {
    this.elevatorService
      .step()
      .pipe(switchMap(() => this.elevatorService.getState()))
      .subscribe((state) => {
        this.elevators = state.elevators;
        this.floorsCount = state.floorsCount;
        this.updateCurrentElevatorState();
      });
  }

  onElevatorChange(id: string) {
    this.currentElevator = id;
    this.updateCurrentElevatorState();
  }

  updateState() {
    this.elevatorService.getState().subscribe((state) => {
      this.elevators = state.elevators;
      this.floorsCount = state.floorsCount;
    });
  }

  updateCurrentElevatorState() {
    this.currentQueue = this.elevatorService.getElevatorQueue(
      this.currentElevator
    );
  }

  setCurrentElevatorId(id: string) {
    this.store.setCurrentElevatorId(id);
    this.onElevatorChange(id);
  }
}
