import { Injectable } from '@angular/core';
import { CommunicationService } from './communication-service/communication.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MaestroService {

  constructor(private communicationService: CommunicationService) {

  }

  getValoresTabla(tabla: string): Observable<any> {
    return this.communicationService.apiGet(`tablas/${tabla}`, {});
  }
}
