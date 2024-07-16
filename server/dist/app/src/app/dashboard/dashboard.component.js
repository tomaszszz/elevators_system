"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardComponent = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const button_1 = require("@angular/material/button");
const icon_1 = require("@angular/material/icon");
const tabs_1 = require("@angular/material/tabs");
const toolbar_1 = require("@angular/material/toolbar");
const router_1 = require("@angular/router");
const elevator_component_1 = require("../elevator/elevator.component");
const iterate_ntimes_directive_1 = require("../iterate-ntimes.directive");
const elevator_service_1 = require("../services/elevator.service");
const direction_panel_component_1 = require("./direction-panel/direction-panel.component");
const keypad_component_1 = require("./keypad/keypad.component");
let DashboardComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-dashboard',
            standalone: true,
            imports: [
                common_1.CommonModule,
                elevator_component_1.ElevatorComponent,
                keypad_component_1.KeypadComponent,
                direction_panel_component_1.DirectionPanelComponent,
                iterate_ntimes_directive_1.IterateNTimesDirective,
                tabs_1.MatTabsModule,
                icon_1.MatIconModule,
                button_1.MatButtonModule,
                toolbar_1.MatToolbarModule,
            ],
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.scss'],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DashboardComponent = _classThis = class {
        constructor() {
            this.elevators = [];
            this.floorsCount = 0;
            this.activatedRoute = (0, core_1.inject)(router_1.ActivatedRoute);
            this.elevatorService = (0, core_1.inject)(elevator_service_1.ElevatorService);
        }
        ngOnInit() {
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
    };
    __setFunctionName(_classThis, "DashboardComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DashboardComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DashboardComponent = _classThis;
})();
exports.DashboardComponent = DashboardComponent;
