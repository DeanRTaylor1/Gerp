import { atom, selector } from "recoil";
import en from "../locales/en";
import it from "../locales/it";
import languages from "../constants/languages";

const getInitialLocale = () => {
  const storedLocale = localStorage.getItem("userLocale");
  if (storedLocale) {
    return storedLocale;
  }
  const browserLocale = navigator.language;

  return mapBrowserLocaleToYourLocale(browserLocale) || languages.eng.value;
};

function mapBrowserLocaleToYourLocale(browserLocale: string): string | null {
  switch (browserLocale) {
    case "it":
    case "it-IT":
      return languages.ita.value;
    case "en":
    case "en-US":
    case "en-UK":
      return languages.eng.value;
    default:
      return null;
  }
}

const Locale = atom<string>({
  key: "locale",
  default: getInitialLocale(),
});

const Language = selector({
  key: "language",
  get: ({ get }) => {
    const locale = get(Locale);

    switch (locale) {
      case languages.ita.value:
        return it;
      default:
        return en;
    }
  },
});

export { Locale, Language };
