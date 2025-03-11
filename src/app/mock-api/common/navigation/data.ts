/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'mainProfesor',
        title: 'Principal',
        type: 'group',
        roles: [1, 2],
        children: [
            {
                id: 'gestionSolicitudes',
                title: 'Gestión Solicitudes',
                type: 'collapsable', // Cambiado a 'collapsable' para permitir submenús
                icon: 'heroicons_outline:clipboard-list',
                children: [
                   
                    {
                        id: 'listSolicitudes',
                        title: 'Listado Solicitudes',
                        type: 'basic',
                        icon: 'heroicons_outline:check-circle',
                        link: '/solicitudes'
                    }
                ]
            }

        ]
    },
    {
        id: 'mainAdminCC',
        title: 'Principal',
        type: 'group',
        roles: [3, 4],
        children: [
            {
                id: 'gestionSolicitudes',
                title: 'Gestión Solicitudes',
                type: 'collapsable', // Cambiado a 'collapsable' para permitir submenús
                icon: 'heroicons_outline:clipboard-list',
                children: [
                   
                    {
                        id: 'listSolicitudes',
                        title: 'Listado Solicitudes',
                        type: 'basic',
                        icon: 'heroicons_outline:check-circle',
                        link: '/solicitudes'
                    }
                ]
            }

        ]
    },
    {
        id: 'administracion',
        title: 'Administración',
        type: 'group',
        roles: [1],
        children: [
            {
                id: 'users',
                title: 'Gestión usuarios',
                type: 'basic',
                icon: 'heroicons_outline:users',
                link: '/usuarios'
            }
        ]
    }

];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
