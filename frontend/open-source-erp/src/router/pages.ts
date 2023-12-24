import About from "../pages/About";
import Home from "../pages/Home";
import SignInPage from "../pages/SignInPage";
import SignUp from "../pages/SignUp";

type PageName = "home" | "about" | "sign-in" | "sign-up";

export interface IPage {
  name: Capitalize<PageName>;
  path: string;
  navbar: boolean;
  element: () => JSX.Element;
}

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
];

type PagesObject = { [K in IPage["name"]]: IPage };

export const pagesList: PagesObject = pages.reduce((obj, page) => {
  obj[page.name] = page;
  return obj;
}, {} as PagesObject);
