import { ResolveFn } from '@angular/router';
import { Elevator } from '../models/Elevator/Elevator';
import { ElevatorService } from '../services/elevator.service';
import { inject } from '@angular/core';

export const stateResolver: ResolveFn<{ floorsCount: number; elevators: Elevator[] }> = (route, state) => {
    return inject(ElevatorService).getState();
};
