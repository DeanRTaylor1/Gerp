import About from "../pages/About";
import Home from "../pages/Home";
import SignInPage from "../pages/SignInPage";
import SignUp from "../pages/SignUp";
import UsersAdmin from "../pages/UsersAdmin";

type PageName = "home" | "about" | "sign-in" | "sign-up" | "users";

export interface IPage {
  name: CapitalizeWords<PageName>;
  path: string;
  navbar: boolean;
  element: () => JSX.Element;
}

type CapitalizeWords<S extends string> =
  S extends `${infer FirstWord} ${infer Rest}`
    ? `${Capitalize<FirstWord>} ${CapitalizeWords<Rest>}`
    : Capitalize<S>;

export const pages: Array<IPage> = [
  {
    name: "Home",
    path: "/",
    navbar: true,
    element: Home,
  },
  {
    name: "About",
    path: "/about",
    navbar: true,
    element: About,
  },
  {
    name: "Sign-in",
    path: "/signin",
    navbar: false,
    element: SignInPage,
  },
  {
    name: "Sign-up",
    path: "/signup",
    navbar: false,
    element: SignUp,
  },
  {
    name: "Users",
    path: "/users",
    navbar: true,
    element: UsersAdmin,
  },
];

type PagesObject = { [K in IPage["name"]]: IPage };

export const pagesList: PagesObject = pages.reduce((obj, page) => {
  obj[page.name] = page;
  return obj;
}, {} as PagesObject);
