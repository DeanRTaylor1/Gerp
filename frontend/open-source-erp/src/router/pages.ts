import Home from '../pages/Home';
import SignInPage from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import UsersAdmin from '../pages/UsersAdmin';
import PayScales from '../pages/payments/admin/PayScales';
import EditUserProfile from '../pages/users/EditUserProfile';
import UserProfile from '../pages/users/UserProfile';

type PageName =
  | 'home'
  | 'about'
  | 'sign-in'
  | 'sign-up'
  | 'user management'
  | 'profile'
  | 'edit profile'
  | 'payments'
  | 'pay scales'
  | 'create';

type PageCategory = 'users' | 'payments';

export interface IPageTreeItem {
  name: CapitalizeWords<PageName | PageCategory>;
  navbar: boolean;
  icon: string;
  children?: IPageTreeItem[];
  path?: string;
  protected: boolean;
  element?: () => JSX.Element;
}

export const pageTree: Array<IPageTreeItem> = [
  {
    name: 'Home',
    path: '/',
    navbar: true,
    icon: 'house-door',
    element: Home,
    protected: true,
  },
  {
    name: 'Users',
    navbar: true,
    icon: 'people',
    protected: true,
    children: [
      {
        name: 'User Management',
        path: '/admin/users',
        navbar: true,
        icon: 'pencil',
        element: UsersAdmin,
        protected: true,
      },
    ],
  },
  {
    name: 'Payments',
    navbar: true,
    icon: 'credit-card-2-back',
    protected: true,
    children: [
      {
        name: 'Pay Scales',
        path: '/admin/pay-scales',
        navbar: true,
        icon: 'cash-stack',
        element: PayScales,
        protected: true,
      },
    ],
  },
  {
    name: 'Profile',
    path: '/profile',
    navbar: false,
    icon: 'mdi:account',
    element: UserProfile,
    protected: true,
  },
  {
    name: 'Edit Profile',
    path: '/profile/edit/:id',
    navbar: false,
    icon: 'mdi:home',
    element: EditUserProfile,
    protected: true,
  },

  //Landing pages
  {
    name: 'Sign-in',
    path: '/signin',
    navbar: false,
    icon: '',
    element: SignInPage,
    protected: false,
  },
  {
    name: 'Sign-up',
    path: '/signup',
    navbar: false,
    icon: '',
    element: SignUp,
    protected: false,
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
