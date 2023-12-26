import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { pages, IPage } from './pages';
import Layout from '../layout/Layout';
import Public from './public';
import Private from './private';
import LandingPage from '../layout/LandingPage';

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
                </Layout>
            </Private>
        );
    } else {
        return (
            <Public>
                <LandingPage>
                    <Element />
                </LandingPage>
            </Public>
        );
    }
}


export default Router;
