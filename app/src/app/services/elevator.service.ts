import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CallFromHallway } from '../dashboard/direction-panel/direction-panel.component';
import { CallInsideElevator } from '../dashboard/keypad/keypad.component';
import { Elevator } from '../models/Elevator/Elevator';

export const BASE_URL = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class ElevatorService {
  private http = inject(HttpClient);

  getState(): Observable<{ floorsCount: number; elevators: Elevator[] }> {
    return this.http.get<{ floorsCount: number; elevators: Elevator[] }>(
      `${BASE_URL}/state`
    );
  }

  getElevatorQueue(
    id: string
  ): Observable<CallFromHallway[] | CallInsideElevator[]> {
    return this.http.get<CallFromHallway[] | CallInsideElevator[]>(
      `${BASE_URL}/elevatorQueue?id=${id}`
    );
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
