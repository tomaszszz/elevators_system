import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private currentElevatorId: string = '1';

  getCurrentElevatorId() {
    return this.currentElevatorId;
  }

  setCurrentElevatorId(id: string) {
    this.currentElevatorId = id;
  }
}
