import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { ElevatorComponent } from '../elevator/elevator.component';
import { IterateNTimesDirective } from '../iterate-ntimes.directive';
import { Elevator } from '../models/Elevator/Elevator';
import { ElevatorService } from '../services/elevator.service';
import { DirectionPanelComponent } from './direction-panel/direction-panel.component';
import { KeypadComponent } from './keypad/keypad.component';

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
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    elevators: Elevator[] = [];
    floorsCount = 0;

    private activatedRoute = inject(ActivatedRoute);
    private elevatorService = inject(ElevatorService);

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({ state }) => {
            this.elevators = state.elevators;
            this.floorsCount = state.floorsCount;
        });
    }

    step() {
        this.elevatorService.step().subscribe();
        this.elevatorService.getState().subscribe((state) => {
            this.elevators = state.elevators;
            this.floorsCount = state.floorsCount;
        });
    }
}
