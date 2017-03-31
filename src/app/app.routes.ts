import { Routes } from '@angular/router';
import { ScheduleListComponent } from './schedule-list';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: ScheduleListComponent },
  { path: 'schedule-list',  component: ScheduleListComponent },
  { path: '**',    component: NoContentComponent },
];
