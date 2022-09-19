import config from '@/config';
// Layout
import { AuthUserLayout } from '@/layouts';

import Home from '@/pages/Home';
import Search from '@/pages/Search';
import { Profile } from '@/pages/User';
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
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }