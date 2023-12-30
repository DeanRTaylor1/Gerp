import { Link } from 'react-router-dom';
import SignInForm from '../Components/forms/SignInForm';
import useTranslator from '../hooks/useTranslator';
import { useRecoilState } from 'recoil';
import { Locale } from '../recoil/globalState';
import languages from '../constants/languages';
import { useTheme } from '../hooks/useTheme';
import Select from '../Components/select/select';

const SignInPage = () => {
  const { getColorClasses } = useTheme();
  const primary = getColorClasses('primary');
  const secondary = getColorClasses('secondary');

  const availableLangs = Object.values(languages).map(
    (language) => language.value
  );

  const translator = useTranslator();

  const [locale, setLocale] = useRecoilState(Locale);

  const changeLanguage = (value: string) => {
    setLocale(value);
  };

  return (
    <section className="min-h-screen h-screen">
      <div className={`h-full grid md:h-screen md:grid-cols-2 ${primary}`}>
        <div className={`flex flex-col items-center justify-center ${primary}`}>
          <Select
            title="Select language"
            value={locale}
            options={availableLangs}
            onChange={changeLanguage}
          />
          <div className="max-w-lg min-w-[350px] px-5 py-16 text-center md:px-10 md:py-24 lg:py-32">
            <h2 className="mb-8  text-3xl font-bold md:mb-12 md:text-5xl">
              {translator.global.txt_welcome_back}
            </h2>
            <SignInForm />
            <p className="text-sm text-[#636262] dark:text-primary-text-dark">
              {translator.global.no_account}
              <Link
                to="/signup"
                className="text-sm font-bold text-black dark:text-white"
              >
                {' '}
                {translator.global.sign_up_now}
              </Link>
            </p>
          </div>
        </div>
        <div
          className={`flex flex-col items-center justify-center  ${secondary}`}
        >
          <div className="max-w-lg px-5 py-16 md:px-10 md:py-24 lg:py-32">
            <div className="mb-6 ml-2 flex h-14 w-14 items-center justify-center bg-[#276ef1] dark:bg-primary-bg-dark [box-shadow:rgb(171,_196,_245)_-8px_8px]">
              <img
                src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358f5ec37c8c32b17d1c725_Vector-9.svg"
                alt=""
                className="inline-block"
              />
            </div>
            <p className="mb-8  md:mb-12 lg:mb-16">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam, purus sit amet luctus venenatis, lectus magna fringilla
              urna, porttitor rhoncus dolor purus non enim.
            </p>
            <p className="font-bold">Dean Taylor</p>
            <p className="text-sm">CTO</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
