"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateResolver = void 0;
const elevator_service_1 = require("../services/elevator.service");
const core_1 = require("@angular/core");
const stateResolver = (route, state) => {
    return (0, core_1.inject)(elevator_service_1.ElevatorService).getState();
};
exports.stateResolver = stateResolver;
