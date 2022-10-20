import config from '@/config';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { Switch, Route, Redirect } from "react-router-dom";

// components

import { AdminNavbar } from '@/components/Navbars';
import { Sidebar } from '@/components/Sidebars';
import { HeaderStats } from '@/components/Headers';
// import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

// import Dashboard from "views/admin/Dashboard.js";
// import Maps from "views/admin/Maps.js";
// import Settings from "views/admin/Settings.js";
// import Tables from "views/admin/Tables.js";

export default function AdminLayout({ children }) {
    const isLogin = useSelector((state) => state.auth.isLogin);

    return (
        <div>
          {/* {!isLogin && (<Navigate to={config.routes.admin.auth.login} />)} */}
            <Sidebar />
            <div className="relative md:ml-64 bg-blueGray-100">
                <AdminNavbar />
                {/* Header */}
                <HeaderStats />
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    {children}
                    {/* <FooterAdmin /> */}
                </div>
            </div>
        </div>
    );
}
