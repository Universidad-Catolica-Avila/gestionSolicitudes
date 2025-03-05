import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunicationService } from '../../../core/services/communication-service/communication.service';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService
{

    /**
     * Constructor
     */
    constructor(private communicationService: CommunicationService)
    {

    }

    getUsuarios(): Observable<any> {
        return this.communicationService.apiGet('users', {});
    }

    getUsuario(id: number): Observable<any> {
        return this.communicationService.apiGet(`users/id/${id}`, {});
    }

    getEmptyUsuario():  any {
        return {
            id:                 null,
            nombre      :       null,
            email   :           null,
            telefono   :        null,
            roles        :      [[{id:2}]],
            password   :        [null],
            password2  :        [null],
            username  :         [null],
        };
    }

    saveUsuario(data: any): Observable<any> {
        return this.communicationService.apiPost('user', data);
    }

    updateUsuario(id: number, data: any): Observable<any> {
        return this.communicationService.apiPut('user', data);
    }

    deleteUsuario(id: number): Observable<any> {
        return null;
    }

}
