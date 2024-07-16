import { Component, OnInit, inject } from '@angular/core';
import { Elevator } from './models/Elevator/Elevator';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ElevatorComponent } from './elevator/elevator.component';
import { NgFor } from '@angular/common';
import { IterateNTimesDirective } from './iterate-ntimes.directive';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterModule, DashboardComponent],
})
export class AppComponent {
    title = 'Elevator Simulator';
}
