import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppConfigurationService } from '../config/app.configuration.service';

@Injectable()
export class CommunicationService {
	constructor(
        private http: HttpClient,
        private appConfigurationService: AppConfigurationService
    ) {}

    get apiDomain(): string {
        return this.appConfigurationService.get('apiDomain');
      }

	/**
	 * DELETE
	 * This method is used to communicate with the WebApi specified endpoint with a DELETE verb to delete a resource.
	 *
	 * @param {string} endpoint endpoint is used to specify the endpoint of the communication
	 * @param {any} query
	 * @returns an `Observable` of the body as an `Object`.
	 */
	delete(endpoint: string, query: any): Observable<any> {
		let params: HttpParams = new HttpParams();
		if (query != null) {
			for (const key in query) {
				if (query.hasOwnProperty(key)) {
					params = params.append(key.toString(), query[key]);
				}
			}
		}
		return this.http.delete<Observable<any>>(endpoint, { params }).pipe(
			map((res) => res),
			catchError((e) => throwError(e))
		);
	}

	/**
	 * PATCH
	 * This method is used to communicate with the WebApi specified endpoint with a PATCH verb to modify parcially a resource.
	 *
	 * @param {string} endpoint endpoint is used to specify the endpoint of the communication
	 * @param {any} data
	 * @returns an `Observable` of the body as an `Object`.
	 */
	patch(endpoint: string, data: any): Observable<any> {
		return this.http.patch<Observable<any>>(endpoint, data).pipe(
			map((res) => res),
			catchError((e) => throwError(e))
		);
	}

	/**
	 * PUT
	 * This method is used to communicate with the WebApi specified endpoint with a PUT verb to edit or modify a resource.
	 *
	 * @param {string} endpoint endpoint is used to specify the endpoint of the communication
	 * @param {any} data
	 * @returns an `Observable` of the body as an `Object`.
	 */
	put(endpoint: string, data: any): Observable<any> {
		return this.http.put<Observable<any>>(endpoint, data).pipe(
			map((res) => res),
			catchError((e) => throwError(e))
		);
	}

	/**
	 * GET
	 * This method is used to communicate with the WebApi specified endpoint with a GET verb to get and read a resource
	 *
	 * @param {string} endpoint endpoint is used to specify the endpoint of the communication
	 * @param {any} query
	 * @param {boolean} auth is an optional value for authentication
	 * @returns an `Observable` of the body as an `Object`.
	 */
	get(
		endpoint: string,
		query: any,
		responseType: string = null,
	): Observable<any> {
		let params: HttpParams = new HttpParams();
		let responseTypeStr = null;
		if (query != null) {
			for (const key in query) {
				if (query.hasOwnProperty(key)) {
					params = params.append(key.toString(), query[key]);
				}
			}
		}
		responseTypeStr = responseType;

		return this.http
			.get<Observable<any>>(endpoint, {
				params,
				responseType: responseType ? responseTypeStr : null,
			})
			.pipe(
				map((res) => res),
				catchError((e) => throwError(e))
			);
	}

	/**
	 * POST
	 * This method is used to communicate with the WebApi specified endpoint with a POST verb to create a resource
	 *
	 * @param {string} endpoint endpoint is used to specify the endpoint of the communication
	 * @param {any} data
	 * @param {boolean} auth is an optional value for authentication
	 * @returns an `Observable` of the body as an `Object`.
	 */
	post(
		endpoint: string,
		data: any,
		responseType: string = null,
		auth: boolean = true
	): Observable<any> {

		let responseTypeStr = null;
		responseTypeStr = responseType;
		return this.http
			.post<Observable<any>>(endpoint, data, {
				responseType: responseTypeStr,
			})
			.pipe(
				map((res) => res),
				catchError((e) => {
					console.error(e);
					return throwError(e);
				})
			);
	}


	apiDelete(endpoint: string, query: any): Observable<any> {
        return this.delete(this.apiDomain + endpoint, query);
	}

	apiPatch(endpoint: string, data: any): Observable<any> {
        return this.patch(this.apiDomain + endpoint, data);
	}

	apiPut(endpoint: string, data: any): Observable<any> {
        return this.put(this.apiDomain + endpoint, data);
	}
	
	apiPostText(endpoint: string, data: any, responseType: string = null): Observable<any> {
		const headers = new HttpHeaders({
			'enctype': 'multipart/form-data'
		});
	
		// Verifica si responseType está definido
		const options: any = { headers };
		if (responseType) {
			options.responseType = responseType;  // Configura el responseType como 'text' si es proporcionado
		}
	
		// Realizar la solicitud POST
		return this.http.post(this.apiDomain + endpoint, data, options);
	}
    apiPost(
		endpoint: string,
		data: any,
		responseType: string = null
	): Observable<any> {

        return this.post(this.apiDomain + endpoint, data, responseType);
	}

    apiGet(
		endpoint: string,
		data: any,
		responseType: string = null
	): Observable<any> {

        return this.get(this.apiDomain + endpoint, data, responseType);
	}
}
