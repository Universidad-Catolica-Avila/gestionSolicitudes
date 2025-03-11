import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FuseLoadingService } from '@fuse/services/loading';
import { Subject, takeUntil } from 'rxjs';

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

  constructor(private fb: FormBuilder,
    private router: Router,
    private solicitudesService: SolicitudesService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private _fuseLoadingService: FuseLoadingService) { }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe((params) => {
      this.id = params['id'];
    });


  }
  @Input() set solicitud(value: any) {
    this._solicitud = value;
    this.initForm(this._solicitud);
  }

  initForm(solicitud: any = null): void {
    this.form = this.fb.group({
      id: [solicitud ? solicitud.id : null],
      nombre: [solicitud ? solicitud.nombre : null, Validators.required]     
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

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
