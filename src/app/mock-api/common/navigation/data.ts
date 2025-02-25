/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'main',
        title: 'Principal',
        type: 'group',
        roles: [1, 2],
        children: [
            {
                id: 'gestionImagenes',
                title: 'Gestión Imágenes SMOWL',
                type: 'collapsable', // Cambiado a 'collapsable' para permitir submenús
                icon: 'heroicons_outline:identification',
                children: [
                   
                    {
                        id: 'cargarDatos',
                        title: 'Cargar Datos',
                        type: 'basic',
                        icon: 'heroicons_outline:document-duplicate',
                        link: '/'
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
