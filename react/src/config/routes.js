const adminBaseUrl = '/admin';

const routes = {
    home: '/',
    search: '/search',
    // AuthUser
    auth: {
        signIn: '/sign-in',
        signUp: '/sign-up',
    },
    user: {
        profile: '/profile',
    },
    admin: {
        adminBaseUrl: '/admin',
        
        dashboard: adminBaseUrl + '/dashboard',
        profile: adminBaseUrl + '/profile',
        auth: {
            login: adminBaseUrl + '/auth/login',
        },

        admins: {
            home: adminBaseUrl + '/admins',
            store: adminBaseUrl + '/admins/store',
            detail: adminBaseUrl + '/admins/:id',
        },
        brands: {
            home: adminBaseUrl + '/brands',
            store: adminBaseUrl + '/brands/store',
            detail: adminBaseUrl + '/brands/:id',
            delete: adminBaseUrl + '/brands/:id/delete',
        },
        contracts: {
            home: adminBaseUrl + '/contracts',
            store: adminBaseUrl + '/contracts/store',
            detail: adminBaseUrl + '/contracts/:id',
            exchange:  adminBaseUrl + '/contracts/:id/exchange',
        },
        stations: {
            home: adminBaseUrl + '/stations',
            store: adminBaseUrl + '/stations/store',
            detail: adminBaseUrl + '/stations/:id/',
            delete: adminBaseUrl + '/stations/:id/delete',
        },
        vehicles: {
            home: adminBaseUrl + '/vehicles',
            store: adminBaseUrl + '/vehicles/store',
            detail: adminBaseUrl + '/vehicles/:id/',
            delete: adminBaseUrl + '/vehicles/:id/delete',
        },
    }
};

export default routes;