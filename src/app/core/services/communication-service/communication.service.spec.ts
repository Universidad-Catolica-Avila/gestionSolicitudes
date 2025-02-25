import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CommunicationService } from './communication.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';

describe('Service: Communication', () => {
	let service: CommunicationService;
	let httpClient: HttpClient;
	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [CommunicationService],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
		});

		httpClient = TestBed.get(HttpClient);
		httpTestingController = TestBed.get(HttpTestingController);
		service = TestBed.get(CommunicationService);
	});

	afterEach(() => {
		// After every test, assert that there are no more pending requests.
		httpTestingController.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('delete', () => {
		it('delete with parameters', () => {
			const mockQuery = {
				key: '',
			};
			service.delete('endpoint', mockQuery).subscribe();
			const req = httpTestingController.expectOne({ method: 'DELETE' });
			expect(req.request.method).toEqual('DELETE');
			req.flush('Delete');
		});

		it('delete with query null', () => {
			service.delete('endpoint', null).subscribe();
			const req = httpTestingController.expectOne({ method: 'DELETE' });
			expect(req.request.method).toEqual('DELETE');
			req.flush('Delete');
		});

		it('delete with error 500', () => {
			let errResponse: HttpErrorResponse;
			const data = 'Invalid request parameters';
			const mockErrorResponse = {
				status: 500,
				statusText: 'Internal Server Error',
			};
			service.delete('endpoint', null).subscribe(
				(res) => res,
				(e) => (errResponse = e)
			);
			httpTestingController.expectOne({ method: 'DELETE' }).flush(data, mockErrorResponse);
			expect(errResponse.status).toEqual(mockErrorResponse.status);
			expect(errResponse.statusText).toEqual(mockErrorResponse.statusText);
		});
	});

	describe('patch', () => {
		it('patch with parameters', () => {
			const mockData = {
				key: '',
			};
			service.patch('endpoint', mockData).subscribe();
			const req = httpTestingController.expectOne({ method: 'PATCH' });
			expect(req.request.method).toEqual('PATCH');
			req.flush('Patch');
		});

		it('patch with error 500', () => {
			let errResponse: HttpErrorResponse;
			const data = 'Invalid request parameters';
			const mockErrorResponse = {
				status: 500,
				statusText: 'Internal Server Error',
			};
			service.patch('endpoint', null).subscribe(
				(res) => res,
				(e) => (errResponse = e)
			);
			httpTestingController.expectOne({ method: 'PATCH' }).flush(data, mockErrorResponse);
			expect(errResponse.status).toEqual(mockErrorResponse.status);
			expect(errResponse.statusText).toEqual(mockErrorResponse.statusText);
		});
	});

	describe('put', () => {
		it('put with parameters', () => {
			const mockData = {
				key: '',
			};
			service.put('endpoint', mockData).subscribe();
			const req = httpTestingController.expectOne({ method: 'PUT' });
			expect(req.request.method).toEqual('PUT');
			req.flush('Put');
		});

		it('put with error 500', () => {
			let errResponse: HttpErrorResponse;
			const data = 'Invalid request parameters';
			const mockErrorResponse = {
				status: 500,
				statusText: 'Internal Server Error',
			};
			service.put('endpoint', null).subscribe(
				(res) => res,
				(e) => (errResponse = e)
			);
			httpTestingController.expectOne({ method: 'PUT' }).flush(data, mockErrorResponse);
			expect(errResponse.status).toEqual(mockErrorResponse.status);
			expect(errResponse.statusText).toEqual(mockErrorResponse.statusText);
		});
	});

	describe('get', () => {
		it('get with parameters', () => {
			const mockQuery = {
				key: '',
			};
			const mockResponseType = 'json';
			service.get('endpoint', mockQuery, mockResponseType).subscribe();
			const req = httpTestingController.expectOne({ method: 'GET' });
			expect(req.request.method).toEqual('GET');
			req.flush('Get');
		});

		it('get with query null', () => {
			service.get('endpoint', null).subscribe();
			const req = httpTestingController.expectOne({ method: 'GET' });
			expect(req.request.method).toEqual('GET');
			req.flush('Get');
		});

		it('get with error 500', () => {
			let errResponse: HttpErrorResponse;
			const data = 'Invalid request parameters';
			const mockErrorResponse = {
				status: 500,
				statusText: 'Internal Server Error',
			};
			service.get('endpoint', null).subscribe(
				(res) => res,
				(e) => (errResponse = e)
			);
			httpTestingController.expectOne({ method: 'GET' }).flush(data, mockErrorResponse);
			expect(errResponse.status).toEqual(mockErrorResponse.status);
			expect(errResponse.statusText).toEqual(mockErrorResponse.statusText);
		});
	});

	describe('post', () => {
		it('post with parameters', () => {
			const mockQuery = {
				key: '',
			};
			service.post('endpoint', mockQuery).subscribe();
			const req = httpTestingController.expectOne({ method: 'POST' });
			expect(req.request.method).toEqual('POST');
			req.flush('Post');
		});

		it('post with query null', () => {
			service.post('endpoint', null).subscribe();
			const req = httpTestingController.expectOne({ method: 'POST' });
			expect(req.request.method).toEqual('POST');
			req.flush('Post');
		});

		it('post with error 500', () => {
			let errResponse: HttpErrorResponse;
			const data = 'Invalid request parameters';
			const mockErrorResponse = {
				status: 500,
				statusText: 'Internal Server Error',
			};
			service.post('endpoint', null).subscribe(
				(res) => res,
				(e) => (errResponse = e)
			);
			httpTestingController.expectOne({ method: 'POST' }).flush(data, mockErrorResponse);
			expect(errResponse.status).toEqual(mockErrorResponse.status);
			expect(errResponse.statusText).toEqual(mockErrorResponse.statusText);
		});
	});
});
