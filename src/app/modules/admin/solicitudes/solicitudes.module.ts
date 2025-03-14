import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { SolicitudFormComponent } from './solicitud-form/solicitud-form.component';
import { SolicitudesComponent } from './solicitudes.component';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatNativeDateModule } from '@angular/material/core';

const routes: Route[] = [
    {
        path     : '',
        component: SolicitudesComponent
    },
    {
        path     : 'new',
        component: SolicitudComponent
    },
    {
        path     : 'edit/:id',
        component: SolicitudComponent
    }
];


@NgModule({
  declarations: [
    SolicitudComponent,
    SolicitudFormComponent,
    SolicitudesComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    RouterModule.forChild(routes),
    MatSnackBarModule,
    ReactiveFormsModule,
    FuseAlertModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule 
  ],
  exports: [
    SolicitudesComponent
  ]
})
export class SolicitudesModule { }
