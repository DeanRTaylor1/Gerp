import Home from '../pages/Home';
import SignInPage from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import UsersAdmin from '../pages/UsersAdmin';

type PageName = 'home' | 'about' | 'sign-in' | 'sign-up' | 'user management';

export interface IPage {
  name: CapitalizeWords<PageName>;
  path: string;
  navbar: boolean;
  icon: string;
  element: () => JSX.Element;
}

type CapitalizeWords<S extends string> =
  S extends `${infer FirstWord} ${infer Rest}`
    ? `${Capitalize<FirstWord>} ${CapitalizeWords<Rest>}`
    : Capitalize<S>;

export const pages: Array<IPage> = [
  {
    name: 'Home',
    path: '/',
    navbar: true,
    icon: 'mdi:home',
    element: Home,
  },
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
  {
    name: 'User Management',
    path: '/users',
    navbar: true,
    icon: 'mdi:account-multiple',
    element: UsersAdmin,
  },
];

type PagesObject = { [K in IPage['name']]: IPage };

export const pagesList: PagesObject = pages.reduce((obj, page) => {
  obj[page.name] = page;
  return obj;
}, {} as PagesObject);
