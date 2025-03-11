import { Injectable } from '@angular/core';
import { CommunicationService } from 'app/core/services/communication-service/communication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

      constructor(private communicationService: CommunicationService)
      {
  
      }

      getSolicitudes(): Observable<any> {
            return this.communicationService.apiGet('solicitudes', {});
      }
  
      getSolicitud(id: number): Observable<any> {
          return this.communicationService.apiGet(`solicitudes/id/${id}`, {});
      }

      getEmptySolicitud():  any {
        return {
            id:                 null,
            nombre      :       null
        };
    }
}
