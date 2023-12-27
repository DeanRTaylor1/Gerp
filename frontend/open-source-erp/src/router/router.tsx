import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { pages, IPage } from './pages';
import Layout from '../layout/Layout';
import Public from './public';
import Private from './private';
import LandingPage from '../layout/LandingPage';
import Toast from '../Components/toast/Toast';

const router = createBrowserRouter(pages.map(page => ({
    path: page.path,
    element: <RouteElement page={page} />,
})));

const Router = () => {
    return <RouterProvider router={router} />;
};
interface RouteElementProps {
    page: IPage;
}

function RouteElement({ page }: RouteElementProps) {
    const Element = page.element;

    if (page.navbar) {
        return (
            <Private>
                <Layout>
                    <Element />
                    <Toast />
                </Layout>
            </Private>
        );
    } else {
        return (
            <Public>
                <LandingPage>
                    <Element />
                    <Toast />
                </LandingPage>
            </Public>
        );
    }
}


export default Router;
