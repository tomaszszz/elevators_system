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
exports.KeypadComponent = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const button_1 = require("@angular/material/button");
const form_field_1 = require("@angular/material/form-field");
const icon_1 = require("@angular/material/icon");
const input_1 = require("@angular/material/input");
const select_1 = require("@angular/material/select");
const iterate_ntimes_directive_1 = require("src/app/iterate-ntimes.directive");
const elevator_service_1 = require("src/app/services/elevator.service");
let KeypadComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-keypad',
            standalone: true,
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                form_field_1.MatFormFieldModule,
                icon_1.MatIconModule,
                select_1.MatSelectModule,
                button_1.MatButtonModule,
                input_1.MatInputModule,
                forms_1.FormsModule,
                iterate_ntimes_directive_1.IterateNTimesDirective,
            ],
            templateUrl: './keypad.component.html',
            styleUrls: ['./keypad.component.scss'],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _elevators_decorators;
    let _elevators_initializers = [];
    let _elevators_extraInitializers = [];
    var KeypadComponent = _classThis = class {
        constructor() {
            this.elevators = __runInitializers(this, _elevators_initializers, void 0);
            this.callInsideElevator = (__runInitializers(this, _elevators_extraInitializers), { elevatorId: '1', targetFloor: 0 });
            this.elevatorService = (0, core_1.inject)(elevator_service_1.ElevatorService);
            this.keypadForm = new forms_1.FormGroup({
                elevatorId: new forms_1.FormControl('', [forms_1.Validators.required]),
                targetFloor: new forms_1.FormControl(0, [forms_1.Validators.required]),
            });
        }
        submitCall() {
            if (this.keypadForm.valid) {
                this.elevatorService.callFromElevator(this.keypadForm.value).subscribe();
                console.log(this.keypadForm.value);
            }
        }
    };
    __setFunctionName(_classThis, "KeypadComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _elevators_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _elevators_decorators, { kind: "field", name: "elevators", static: false, private: false, access: { has: obj => "elevators" in obj, get: obj => obj.elevators, set: (obj, value) => { obj.elevators = value; } }, metadata: _metadata }, _elevators_initializers, _elevators_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        KeypadComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return KeypadComponent = _classThis;
})();
exports.KeypadComponent = KeypadComponent;
