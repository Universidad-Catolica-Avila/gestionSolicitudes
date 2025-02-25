import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FuseLoadingService } from '@fuse/services/loading';
import { Asociado } from 'app/core/model/asociado.model';
import { Subject, takeUntil } from 'rxjs';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit, OnDestroy {
    @Output() save: EventEmitter<any> = new EventEmitter();
    public form: FormGroup;
    private _usuario: any = null;
    private id: number = null;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private usuariosService: UsuariosService,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private _fuseLoadingService: FuseLoadingService
    ) { }

    @Input() set usuario(value: any){
        this._usuario = value;
        this.initForm(this._usuario);
    }

    ngOnInit(): void {

        this.route.params.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((params) => {
            this.id = params['id'];
         });



    }

    initForm(usuario: any = null): void {
        this.form = this.fb.group({
            id      :           [usuario ? usuario.id : null],
            nombre      :       [usuario ? usuario.nombre : null, Validators.required],
            email   :           [usuario ? usuario.email : null, [Validators.email, Validators.required]],
            telefono   :        [usuario ? usuario.telefono : null, Validators.required],
            rolId        :      [usuario && usuario.roles ? usuario.roles[0].id : 2, Validators.required],
            password   :        [null, usuario.id === null ? Validators.required : null],
            password2  :        [null, usuario.id === null ? Validators.required : null],
            username  :         [null],
        });
    }

    cancel(): void {
        this.router.navigate(['usuarios']);
    }

    saveForm(): void {
        this._fuseLoadingService.show();
        this.form.controls.username.setValue(this.form.controls.email.value);
        this.save.emit(this.form.value);
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
}
