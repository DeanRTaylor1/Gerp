import { atom, selector } from "recoil";
import en from "../locales/en";
import it from "../locales/it";
import languages from "../constants/languages";


const Locale = atom<string>({
    key: 'locale',
    default: languages.eng.value,
});
  
const Language = selector({
  key: 'language',
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

export {
  Locale,
  Language
};
