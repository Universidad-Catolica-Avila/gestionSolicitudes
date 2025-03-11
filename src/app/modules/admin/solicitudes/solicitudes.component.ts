import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SolicitudesService } from './solicitudes.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {

      displayedColumns: string[] = [
          'nombre',
          'email',
          'telefono',
          'rol',
          'acciones'];
      dataSource = new MatTableDataSource([]);
      solicitudes: any[] = [];
  
      constructor(
          private solicitudService: SolicitudesService,
          private router: Router,
          private _fuseConfirmationService: FuseConfirmationService,
      ) { }
  
      ngOnInit(): void {
          this.loadData();
      }
      loadData(): void {
        this.solicitudService.getSolicitudes().subscribe((data) => {
            console.log(data);
            this.solicitudes = [...data];
        });
      } 

      crearSolicitud(): void {
        this.router.navigate(['solicitudes/new']);
      }
}
