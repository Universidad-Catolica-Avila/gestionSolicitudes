import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SolicitudesService } from '../solicitudes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseLoadingService } from '@fuse/services/loading';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit {

  @ViewChild('drawer') drawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  panels: any[] = [];
  selectedPanel: string = 'info';
  id: number = null;
  solicitud: any = null;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private route: ActivatedRoute,
    private _fuseLoadingService: FuseLoadingService,
    private solicitudesService: SolicitudesService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this._fuseLoadingService.show();
        this.solicitudesService.getSolicitud(this.id).subscribe((response: any) => {
          this.solicitud = response;
          this._fuseLoadingService.hide();
        });
      } else {
        this.solicitud = this.solicitudesService.getEmptySolicitud();
      }
    });


    this.panels = [
      {
        id: 'info',
        icon: 'heroicons_outline:user-circle',
        title: 'Información',
        description: 'Solicitud para la realización de Jornadas, Congresos, Actividades, Visitas y Eventos'
      }
    ];
  }

  goToPanel(panel: string): void {
    this.selectedPanel = panel;

    // Close the drawer on 'over' mode
    if (this.drawerMode === 'over') {
      this.drawer.close();
    }
  }
  getPanelInfo(id: string): any {
    return this.panels.find(panel => panel.id === id);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  goToSolicitudes(): void {
    this.router.navigate(['solicitudes']);
  }
}
