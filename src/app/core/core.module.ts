import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthModule } from 'app/core/auth/auth.module';
import { IconsModule } from 'app/core/icons/icons.module';
import { TranslocoCoreModule } from 'app/core/transloco/transloco.module';
import { AppConfigurationService } from './services/config/app.configuration.service';
import { CommunicationService } from './services/communication-service/communication.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';

/**
 * Load configuration from environment folder
 * @param startupService
 */
 export const startupServiceFactory =
 (startupService: AppConfigurationService): (() => any) =>
 () =>
     startupService.loadConfiguration();

@NgModule({
    imports: [
        AuthModule,
        IconsModule,
        TranslocoCoreModule
    ],
	providers: [
        CommunicationService,
		AppConfigurationService,
		{
			provide: APP_INITIALIZER,
			useFactory: startupServiceFactory,
			deps: [AppConfigurationService],
			multi: true,
		},
        { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
	]
})
export class CoreModule
{
    /**
     * Constructor
     */
    constructor(
        @Optional() @SkipSelf() parentModule?: CoreModule
    )
    {
        // Do not allow multiple injections
        if ( parentModule )
        {
            throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
        }
    }
}
