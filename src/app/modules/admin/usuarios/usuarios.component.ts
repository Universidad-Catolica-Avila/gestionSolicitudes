import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from './usuarios.service';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {

    displayedColumns: string[] = [
        'nombre',
        'email',
        'telefono',
        'rol',
        'acciones'];
    dataSource = new MatTableDataSource([]);
    usuarios: any[] = [];

    constructor(
        private usuariosService: UsuariosService,
        private router: Router,
        private _fuseConfirmationService: FuseConfirmationService,
    ) { }

    ngOnInit(): void {
        this.loadData();
    }

    goToUsuario(id: number): void {
        //TODO PONER LA RUTA AL SERVICIO
        
    }

    createUsuario(): void {
        //TODO PONER LA RUTA AL SERVICIO
        this.router.navigate(['']);
    }


    deleteUsuario(id: number): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Borrar Usuario',
            message: '¿Está seguro que quiere borrar el usuario?',
            actions: {
                confirm: {
                    label: 'Borrar'
                }
            }
        });

        confirmation.afterClosed().subscribe((result) => {
            if ( result === 'confirmed' )
            {
                this.usuariosService.deleteUsuario(id).subscribe(() => {
                    this.loadData();
                });
            }
        });
    }

    loadData(): void {
        this.usuariosService.getUsuarios().subscribe((data) => {
            console.log(data);
            this.usuarios = [...data];
        });
    }

}
