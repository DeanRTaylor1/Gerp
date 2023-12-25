import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { pages, IPage } from './pages';
import Layout from '../Components/layout/Layout';
import Public from './public';
import Private from './private';

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
                <Element />
            </Public>
        );
    }
}


export default Router;
