import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FuseLoadingService } from '@fuse/services/loading';
import { Subject, takeUntil } from 'rxjs';
import { MaestroService } from 'app/core/services/maestro.service';

@Component({
  selector: 'app-solicitud-form',
  templateUrl: './solicitud-form.component.html',
  styleUrls: ['./solicitud-form.component.scss']
})
export class SolicitudFormComponent implements OnInit, OnDestroy {
  @Output() save: EventEmitter<any> = new EventEmitter();
  public form: FormGroup;
  private _solicitud: any = null;
  private id: number = null;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  datosTablaFormatos: any[] = [];
  datosTablaLocalizaciones: any[] = [];
  datosTablaTiposEvento: any[] = [];
  datosTablaSoportes: any[] = [];
  datosTablaCertificados: any[] = [];
  datosTablaDifusiones: any[] = [];
  mostrarOtroCampoEvento = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private solicitudesService: SolicitudesService,
    private maestroService: MaestroService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private _fuseLoadingService: FuseLoadingService) {



  }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe((params) => {
      this.id = params['id'];
    });
    this.agregarFecha();
    this.agregarPonencia();
    this.cargarDatosTabla('formatos_evento', 'datosTablaFormatos');
    this.cargarDatosTabla('localizaciones', 'datosTablaLocalizaciones');
    this.cargarDatosTabla('tipos_evento', 'datosTablaTiposEvento');
    this.cargarDatosTabla('soportes', 'datosTablaSoportes');
    this.cargarDatosTabla('certificados', 'datosTablaCertificados');
    this.cargarDatosTabla('difusiones', 'datosTablaDifusiones');
  }
  @Input() set solicitud(value: any) {
    this._solicitud = value;
    this.initForm(this._solicitud);
  }

  initForm(solicitud: any = null): void {
    this.form = this.fb.group({
      id: [solicitud ? solicitud.id : null],
      nombre: [solicitud ? solicitud.nombre : null, Validators.required],
      nombreResponsable: [solicitud ? solicitud.nombreResponsable : null, Validators.required],
      tipoEvento: [solicitud ? solicitud.tipoEvento : null, Validators.required],
      otroTipoEvento: [],
      fechas: this.fb.array([]),
      ponencias: this.fb.array([]),
      tipoOrganizador: [solicitud ? solicitud.tipoOrganizador : null, Validators.required],
      organismosColaboradores: [solicitud ? solicitud.organismosColaboradores : null, Validators.required],
      formato: [solicitud ? solicitud.formato : null, Validators.required],
      lugar: [solicitud ? solicitud.lugar : null, Validators.required],
      soporte: [solicitud ? solicitud.soporte : null, Validators.required],
      certificado: [solicitud ? solicitud.certificado : null, Validators.required],
      comunicacion: [solicitud ? solicitud.comunicacion : null, Validators.required],
    });
  }

  cargarDatosTabla(nombreTabla: string, propiedad: string): void {
    this.maestroService.getValoresTabla(nombreTabla).subscribe(data => {
      this[propiedad] = data;  // Asigna los datos correctamente
    }, error => {
      console.error(`Error al obtener los datos de ${nombreTabla}:`, error);
    });
  }

  cancel(): void {
    this.router.navigate(['solicitudes']);
  }

  saveForm(): void {
    this._fuseLoadingService.show();
    //this.form.controls.username.setValue(this.form.controls.email.value);
    this.save.emit(this.form.value);
  }
  onTipoEventoChange(value: string): void {
    this.mostrarOtroCampoEvento = Number(value) === 6;


    if (!this.mostrarOtroCampoEvento) {
      this.form.get('otroTipoEvento').setValue(''); // Limpia el campo si no es "Otro"
    }
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  //FECHAS DE LA SOLICITUD
  get fechas(): FormArray {
    return this.form.get('fechas') as FormArray;
  }

  agregarFecha(): void {
    this.fechas.push(this.fb.control('', Validators.required));
  }

  eliminarFecha(index: number): void {
    this.fechas.removeAt(index);
  }

  ultimaFechaValida(): boolean {
    const fechasArray = this.form.get('fechas') as FormArray;
    if (fechasArray.length === 0) return true; // Si no hay fechas, permitir agregar
    const ultimaFecha = fechasArray.at(fechasArray.length - 1).value;
    return ultimaFecha !== null && ultimaFecha !== ''; // Verifica que haya una fecha
  }
  
  //PONENCIAS
  get ponencias(): FormArray {
    return this.form.get('ponencias') as FormArray;
  }

  agregarPonencia(): void {
    this.ponencias.push(this.fb.group({
      horario: ['', Validators.required],
      nombre: ['', Validators.required],
      autor: ['', Validators.required],
      tratamiento: ['', Validators.required]
    }));
  }

  eliminarPonencia(index: number): void {
    this.ponencias.removeAt(index);
  }

  ultimaPonenciaValida(): boolean {
    if (this.ponencias.length === 0) return true; // Si no hay ponencias, permitir agregar
    const ultimaPonencia = this.ponencias.at(this.ponencias.length - 1).value;
    return Object.values(ultimaPonencia).every(val => val !== null && val !== '');
  }

  guardar(): void {
    console.log('Ponencias guardadas:', this.form.value.ponencias);
    // Aquí podrías hacer una petición HTTP para guardar las ponencias en la BD.
  }

}
