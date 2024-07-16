import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Elevator } from '../models/Elevator/Elevator';
import { CallFromHallway } from '../dashboard/direction-panel/direction-panel.component';
import { CallInsideElevator } from '../dashboard/keypad/keypad.component';

export const BASE_URL = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class ElevatorService {
    private http = inject(HttpClient);

    getState(): Observable<{ floorsCount: number; elevators: Elevator[] }> {
        return this.http.get(`${BASE_URL}/state`) as Observable<{ floorsCount: number; elevators: Elevator[] }>;
    }

    callFromElevator(call: Partial<CallInsideElevator>): Observable<any> {
        return this.http.post(`${BASE_URL}/callFromElevator`, call);
    }

    callFromHallway(call: Partial<CallFromHallway>): Observable<any> {
        return this.http.post(`${BASE_URL}/callFromHallway`, call);
    }

    step(): Observable<any> {
        return this.http.get(`${BASE_URL}/step`);
    }
}
