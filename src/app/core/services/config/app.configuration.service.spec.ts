import { TestBed } from '@angular/core/testing';

import { AppConfigurationService } from './app.configuration.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

const httpClientMock = {
	get: () => ({
		pipe: () => {
			return {
				subscribe: () => Promise.resolve(true),
			};
		},
	}),
};

describe('AppConfigurationService', () => {
	let service: AppConfigurationService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				AppConfigurationService,
				{
					provide: HttpClient,
					useValue: httpClientMock,
				},
			],
			imports: [HttpClientTestingModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
		});
		service = TestBed.inject(AppConfigurationService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('Should call get', () => {
		service.config = { test: 12 };
		const sut = service.get('test');
		expect(sut).toBe(12);
	});

	it('should call getConfigFilePath', () => {
		const sut = service.getConfigFilePath();
		expect(sut).toBe('assets/configuration/configuration.json');
	});

	it('should call didFinishLoad', async () => {
		const sut = service.didFinishLoad();
		expect(sut).toBe(false);
	});
});
