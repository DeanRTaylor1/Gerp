import About from '../pages/About';
import Home from '../pages/Home';
import SignInPage from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import UsersAdmin from '../pages/UsersAdmin';

type PageName =
  | 'home'
  | 'about'
  | 'sign-in'
  | 'sign-up'
  | 'user management'
  | 'create';
type PageCategory = 'users' | 'payslips';

export interface IPageTreeItem {
  name: CapitalizeWords<PageName | PageCategory>;
  navbar: boolean;
  icon: string;
  children?: IPageTreeItem[];
  path?: string;
  element?: () => JSX.Element;
}

export const pageTree: Array<IPageTreeItem> = [
  {
    name: 'Home',
    path: '/',
    navbar: true,
    icon: 'mdi:home',
    element: Home,
  },
  {
    name: 'Users',
    navbar: true,
    icon: 'mdi:account-multiple',
    children: [
      {
        name: 'User Management',
        path: '/users',
        navbar: true,
        icon: 'mdi:account-multiple',
        element: UsersAdmin,
      },
    ],
  },
  {
    name: 'Payslips',
    navbar: true,
    icon: 'mdi:file-document-edit',
    children: [
      {
        name: 'Create',
        path: '/about',
        navbar: true,
        icon: 'mdi:pencil',
        element: About,
      },
    ],
  },

  //Landing pages
  {
    name: 'Sign-in',
    path: '/signin',
    navbar: false,
    icon: '',
    element: SignInPage,
  },
  {
    name: 'Sign-up',
    path: '/signup',
    navbar: false,
    icon: '',
    element: SignUp,
  },
];

type PagesTreeObject = { [K in IPageTreeItem['name']]: IPageTreeItem };

const processPageTree = (
  items: IPageTreeItem[],
  acc: PagesTreeObject = {} as PagesTreeObject
): PagesTreeObject => {
  items.forEach((item) => {
    if (!item.children || item.children.length === 0) {
      acc[item.name] = item;
    } else if (item.children) {
      processPageTree(item.children, acc);
    }
  });
  return acc as PagesTreeObject;
};

export const finalPagesList: PagesTreeObject = processPageTree(pageTree);

type CapitalizeWords<S extends string> =
  S extends `${infer FirstWord} ${infer Rest}`
    ? `${Capitalize<FirstWord>} ${CapitalizeWords<Rest>}`
    : Capitalize<S>;
