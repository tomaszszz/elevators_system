"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const router_1 = require("@angular/router");
const app_component_1 = require("./app/app.component");
const dashboard_component_1 = require("./app/dashboard/dashboard.component");
const state_resolver_1 = require("./app/resolvers/state.resolver");
const animations_1 = require("@angular/platform-browser/animations");
const form_field_1 = require("@angular/material/form-field");
const routes = [{ path: '', component: dashboard_component_1.DashboardComponent, resolve: { state: state_resolver_1.stateResolver } }];
(0, platform_browser_1.bootstrapApplication)(app_component_1.AppComponent, {
    providers: [
        (0, core_1.importProvidersFrom)(platform_browser_1.BrowserModule),
        (0, core_1.importProvidersFrom)(http_1.HttpClientModule),
        (0, router_1.provideRouter)(routes),
        (0, animations_1.provideAnimations)(),
        { provide: form_field_1.MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    ],
}).catch((err) => console.error(err));
