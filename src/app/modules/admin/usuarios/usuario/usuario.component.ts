import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseLoadingService } from '@fuse/services/loading';
import { Subject, takeUntil } from 'rxjs';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit, OnDestroy {

    @ViewChild('drawer') drawer: MatDrawer;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    panels: any[] = [];
    selectedPanel: string = 'info';
    id: number = null;
    usuario: any = null;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private route: ActivatedRoute,
        private _fuseLoadingService: FuseLoadingService,
        private usuariosService: UsuariosService,
        private router: Router,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {

        this.route.params.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((params) => {
            this.id = params['id'];
            if (this.id) {
                this._fuseLoadingService.show();
                this.usuariosService.getUsuario(this.id).subscribe( (response: any) => {
                    this.usuario = response;
                    this._fuseLoadingService.hide();
                });
            } else {
                    this.usuario = this.usuariosService.getEmptyUsuario();
            }
         });


        this.panels = [
            {
                id         : 'info',
                icon       : 'heroicons_outline:user-circle',
                title      : 'Información',
                description: 'Información general del usuario'
            }
        ];
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    goToPanel(panel: string): void
    {
        this.selectedPanel = panel;

        // Close the drawer on 'over' mode
        if ( this.drawerMode === 'over' )
        {
            this.drawer.close();
        }
    }

     getPanelInfo(id: string): any
     {
         return this.panels.find(panel => panel.id === id);
     }

     trackByFn(index: number, item: any): any
     {
         return item.id || index;
     }

     goToUsuarios(): void {
        this.router.navigate(['usuarios']);
     }

     saveUsuario(value: any): void {
        this._fuseLoadingService.show();
        if (this.id) {
            this.usuariosService.updateUsuario(this.id, value).subscribe( (response) => {
                this.snackBar.open('Usuario actualizado correctamente', 'Cerrar' , {
                    duration: 3000
                });
                this.router.navigate(['usuarios']);
                this._fuseLoadingService.hide();
            });
        } else {
            this.usuariosService.saveUsuario(value).subscribe( (response) => {
                this.snackBar.open('Usuario creado correctamente', 'Cerrar' , {
                    duration: 3000
                });
                this.router.navigate(['usuarios']);
                this._fuseLoadingService.hide();
            });
        }

    }
}
