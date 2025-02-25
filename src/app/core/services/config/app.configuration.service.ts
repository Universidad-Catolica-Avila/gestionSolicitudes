import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AppConfigurationService {
	/**
	 * Store the key-value
	 */
	config: any = null;

	constructor(private http: HttpClient) {}

	/**
	 * Retrieve the value for the input key
	 */
	public get(key: any) {
		return this.config[key];
	}

	/**
	 * Get the name of assets configuration file name
	 */
	public getConfigFilePath(): string {
		const configFile = environment.configFilePath;
		return configFile;
	}

	/**
	 * Load "configuration.[environment].json" to get all variables (e.g.: 'assets/configuration/configuration.production.json')
	 * Use the environment class to get the configuration file name.
	 */
	public loadConfiguration() {
		const configFile = this.getConfigFilePath();
		return new Promise((resolve, reject) => {
			this.http
				.get(configFile)
				.pipe(
					catchError((error: any) => {
						resolve(error);
						console.log(' error app config ==== ', error);
						return throwError(error.json().error || 'Server error');
					})
				)
				.subscribe((responseData) => {
					this.config = responseData;
					resolve(true);
				});
		});
	}

	public didFinishLoad() {
		return this.config != null;
	}
}
