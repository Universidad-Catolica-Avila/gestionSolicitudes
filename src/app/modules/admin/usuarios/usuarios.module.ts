import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule} from '@angular/material/table';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FuseAlertModule } from '@fuse/components/alert';
import { UsuariosComponent } from './usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

const routes: Route[] = [
    {
        path     : '',
        component: UsuariosComponent
    },
    {
        path     : 'new',
        component: UsuarioComponent
    },
    {
        path     : 'edit/:id',
        component: UsuarioComponent
    }
];


@NgModule({
  declarations: [
    UsuariosComponent,
    UsuarioComponent,
    UsuarioFormComponent,
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
    MatMomentDateModule,
    MatSidenavModule,
    MatSlideToggleModule,
    RouterModule.forChild(routes),
    MatSnackBarModule,
    ReactiveFormsModule,
    FuseAlertModule
  ],
  exports: [
    UsuariosComponent
  ]
})
export class UsuariosModule { }
