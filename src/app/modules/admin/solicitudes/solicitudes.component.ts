import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SolicitudesService } from './solicitudes.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {
	@ViewChild(MatPaginator) paginator: MatPaginator;
      displayedColumns: string[] = [
          'nombre',   
          'responsable',  
          'fechaInicio',
          'fechaFin',
          'estado',
          'localizacion',     
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
            this.dataSource.data = data;
        });
      } 

      crearSolicitud(): void {
        this.router.navigate(['solicitudes/new']);
      }
      ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
       
      }
}
