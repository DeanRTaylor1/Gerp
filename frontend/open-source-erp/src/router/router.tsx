// src/router/Router.js
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { pages } from './pages';

const router = createBrowserRouter(pages.map(page => ({
    path: page.path,
    element: <page.element />,
})));

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;
