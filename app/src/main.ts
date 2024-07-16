import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { Routes, provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { stateResolver } from './app/resolvers/state.resolver';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

const routes: Routes = [{ path: '', component: DashboardComponent, resolve: { state: stateResolver } }];

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule),
        importProvidersFrom(HttpClientModule),
        provideRouter(routes),
        provideAnimations(),
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    ],
}).catch((err) => console.error(err));
