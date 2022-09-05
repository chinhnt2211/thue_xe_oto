import config from '@/config';
// Layout
import { AuthUserLayout } from '@/layouts';

import Home from '@/pages/Home';
import Search from '@/pages/Search';
// AuthUser
import { SignIn, SignUp } from '@/pages/AuthUser';


const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.search,
        component: Search,
    },
    {
        path: config.routes.stations,
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
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }