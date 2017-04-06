import { Routes } from '@angular/router';
import { ScheduleComponent } from './schedule';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: ScheduleComponent },
  { path: 'schedule',  component: ScheduleComponent },
  { path: '**',    component: NoContentComponent },
];
