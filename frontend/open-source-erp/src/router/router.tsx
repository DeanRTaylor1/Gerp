import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../layout/Layout';
import Public from './public';
import Private from './private';
import LandingPage from '../layout/LandingPage';
import Toast from '../Components/toast/Toast';
import { IPageTreeItem, pageTree } from './pages';

const router = createBrowserRouter(
  pageTree.flatMap((page) => {
    if (page.children) {
      return page.children.map((child) => {
        return {
          path: child.path,
          element: <RouteElement page={child} />,
        };
      });
    } else {
      return {
        path: page.path,
        element: <RouteElement page={page} />,
      };
    }
  })
);

const Router = () => {
  return <RouterProvider router={router} />;
};
interface RouteElementProps {
  page: IPageTreeItem;
}

function RouteElement({ page }: RouteElementProps) {
  const Element = page.element!;

  if (page.protected) {
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
