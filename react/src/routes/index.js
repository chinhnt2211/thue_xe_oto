import config from '@/config';
/* ------------ Layout ------------ */
import { AdminLayout } from '@/layouts/AdminLayout';
import { AuthUserLayout, AuthAdminLayout } from "@/layouts/AuthLayout";

/*-------------User Pages----------- */
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import { Profile } from '@/pages/User';
import { SignIn, SignUp } from '@/pages/AuthUser';


/*----------- Admin Pages ----------- */
import { Dashboard, ProfileAdmin } from "@/pages/Admin";
import { Login } from '@/pages/Admin/Auth';
import { Brands, BrandStore, BrandDetail, BrandDelete } from '@/pages/Admin/Brands';
import { Stations, StationsDetail, StationStore, StationDelete } from '@/pages/Admin/Stations';
import { Vehicles, VehicleStore, VehicleDetail, VehicleDelete } from '@/pages/Admin/Vehicles';
import { Admins, AdminStore, AdminDetail } from '@/pages/Admin/Admins';
import { Contracts, ContractStore, ContractDetail, ContractExchange } from '@/pages/Admin/Contracts';


const authAdminRoutes = [
    {
        path: config.routes.admin.auth.login,
        component: Login,
        layout: AuthAdminLayout,
    }
];

const adminRoutes = [
    /*----------- Admin routes ------------*/
    {
        path: config.routes.admin.admins.home,
        component: Admins,
        layout: AdminLayout,
        role: config.enums.role.superAdmin,
    },
    {
        path: config.routes.admin.admins.store,
        component: AdminStore,
        layout: AdminLayout,
        role: config.enums.role.superAdmin,
    },
    {
        path: config.routes.admin.admins.detail,
        component: AdminDetail,
        layout: AdminLayout,
        role: config.enums.role.superAdmin,
    }
];

const contractRoutes = [
    /*----------- Contract routes ------------*/
    {
        path: config.routes.admin.contracts.home,
        component: Contracts,
        layout: AdminLayout,
    },
    {
        path: config.routes.admin.contracts.store,
        component: ContractStore,
        layout: AdminLayout,
    },
    {
        path: config.routes.admin.contracts.detail,
        component: ContractDetail,
        layout: AdminLayout,
    },
    {
        path: config.routes.admin.contracts.exchange,
        component: ContractExchange,
        layout: AdminLayout,
    }
];

const brandRoutes = [
    /*----------- Brand routes ------------*/
    {
        path: config.routes.admin.brands.home,
        component: Brands,
        layout: AdminLayout,
    },
    {
        path: config.routes.admin.brands.store,
        component: BrandStore,
        layout: AdminLayout,
    },
    {
        path: config.routes.admin.brands.detail,
        component: BrandDetail,
        layout: AdminLayout,
    },
    {
        path: config.routes.admin.brands.delete,
        component: BrandDelete,
        layout: AdminLayout,
    },
];

const stationRoutes = [
    /*----------- Station routes ------------*/
    {
        path: config.routes.admin.stations.home,
        component: Stations,
        layout: AdminLayout,
    },
    {
        path: config.routes.admin.stations.store,
        component: StationStore,
        layout: AdminLayout,
    },
    {
        path: config.routes.admin.stations.detail,
        component: StationsDetail,
        layout: AdminLayout,
    },
    {
        path: config.routes.admin.stations.delete,
        component: StationDelete,
        layout: AdminLayout,
    },
];

const vehicleRoutes = [
    /*----------- Vehicle routes ------------*/
    {
        path: config.routes.admin.vehicles.home,
        component: Vehicles,
        layout: AdminLayout,
    },
    {
        path: config.routes.admin.vehicles.store,
        component: VehicleStore,
        layout: AdminLayout,
    },
    {
        path: config.routes.admin.vehicles.detail,
        component: VehicleDetail,
        layout: AdminLayout,
    },
    {
        path: config.routes.admin.vehicles.delete,
        component: VehicleDelete,
        layout: AdminLayout,
    },
];


const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.search,
        component: Search,
    },
    // AuthUser
    {
        path: config.routes.auth.signIn,
        component: SignIn,
        layout: AuthUserLayout,
    },
    {
        path: config.routes.auth.signUp,
        component: SignUp,
        layout: AuthUserLayout,
    },
    {
        path: config.routes.user.profile,
        component: Profile,
    },
    ...authAdminRoutes
];

const privateRoutes = [
    /*-------------------- Admin routes --------------------*/
    {
        path: config.routes.admin.dashboard,
        component: Dashboard,
        layout: AdminLayout,
    },
    {
        path: config.routes.admin.profile,
        component: ProfileAdmin,
        layout: AdminLayout,
    },
    
    ...adminRoutes,
    ...brandRoutes,
    ...contractRoutes,
    ...stationRoutes,
    ...vehicleRoutes
];

export { publicRoutes, privateRoutes }