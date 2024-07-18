import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CallFromHallway } from '../models/Common/Call/CallFromHallway';
import { CallInsideElevator } from '../models/Common/Call/CallInsideElevator';
import { Queue } from '../models/Common/Queue';
import { Elevator } from '../models/Elevator/Elevator';
import { Call } from '../models/Common/Call/Call';

export const BASE_URL = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class ElevatorService {
  private http = inject(HttpClient);

  getState(): Observable<{ floorsCount: number; elevators: Elevator[] }> {
    return this.http.get<{ floorsCount: number; elevators: Elevator[] }>(
      `${BASE_URL}/state`
    );
  }

  getElevatorQueue(id: string): Observable<Queue<Call>> {
    return this.http.get<Queue<Call>>(`${BASE_URL}/elevatorQueue?id=${id}`);
  }

  callFromElevator(call: Partial<CallInsideElevator>): Observable<any> {
    return this.http.post(`${BASE_URL}/callFromElevator`, call);
  }

  callFromHallway(call: Partial<CallFromHallway>): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(`${BASE_URL}/callFromHallway`, call);
  }

  step(): Observable<any> {
    return this.http.get(`${BASE_URL}/step`);
  }
}
