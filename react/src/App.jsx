import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';

import config from './config';
import { publicRoutes, privateRoutes } from '@/routes';
import { useSelector } from 'react-redux';
import { DefaultLayout } from '@/layouts/DefaultLayout';

function App() {
    const isLogin = useSelector((sate) => sate.auth.isLogin);
    const admin = useSelector((sate) => sate.auth.admin);

    return (
        <Router>
            <div className="App">
                <Routes>
                <Route path="/" element={<Navigate to={config.routes.admin.dashboard} />} />
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        const Component = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Component />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    <Route
                        path={config.routes.admin.adminBaseUrl}
                        element={<Navigate to={config.routes.admin.dashboard} />}
                    />
                    {privateRoutes
                        .filter((route) => {
                            if (!isLogin) {
                                return true;
                            }

                            if (route.hasOwnProperty('role')) {
                                if (route.role == admin.role) {
                                    return true;
                                }
                                return false;
                            }

                            return true;
                        })
                        .map((route, index) => {
                            let Layout = DefaultLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            const Component = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        isLogin ? (
                                            <Layout>
                                                <Component />
                                            </Layout>
                                        ) : (
                                            <Navigate to={config.routes.admin.auth.login} />
                                        )
                                    }
                                />
                            );
                        })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
