import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad
{
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Can activate
     *
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._check(redirectUrl, route);
    }

    /**
     * Can activate child
     *
     * @param childRoute
     * @param state
     */
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._check(redirectUrl, childRoute);
    }

    /**
     * Can load
     *
     * @param route
     * @param segments
     */
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean
    {
        return this._check('/', route);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Check the authenticated status and roles
     *
     * @param redirectURL
     * @private
     */
    private _check(redirectURL: string, route?: ActivatedRouteSnapshot | Route): Observable<boolean>
    {
        return this._authService.check()
            .pipe(
                switchMap((authenticated) => {

                    // Si el usuario no está autenticado...
                    if (!authenticated) {
                        this._router.navigate(['sign-in'], { queryParams: { redirectURL } });
                        return of(false);
                    }

                    // Obtener los roles requeridos de la ruta
                    const expectedRoles = route?.data?.['roles'] as number[] | undefined;

                    if (expectedRoles) {
                        const userRoles = this._authService.getRoles();

                        // Si el usuario no tiene uno de los roles requeridos, redirigir
                        if (!userRoles.some(role => expectedRoles.includes(Number(role)))) {
                            this._router.navigate(['/dashboard']); // Redirigir si no tiene acceso
                            return of(false);
                        }
                    }

                    // Permitir el acceso
                    return of(true);
                })
            );
    }
}
