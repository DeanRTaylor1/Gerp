
import { Link } from "react-router-dom";
import SignUpForm from "../Components/forms/SignUpForm";
import useTranslator from "../hooks/useTranslator";
import { useTheme } from "../hooks/useTheme";
import { useRecoilState } from "recoil";
import languages from "../constants/languages";
import { Locale } from "../recoil/globalState";
import Select from "../Components/select/select";

const SignInPage = () => {

    const { getColorClasses } = useTheme();
    const primary = getColorClasses('primary')
    const secondary = getColorClasses('secondary')

    const availableLangs = Object.values(languages).map((language) => language.value);

    const translator = useTranslator();

    const [locale, setLocale] = useRecoilState(Locale);

    const changeLanguage = (value: string) => {
        setLocale(value);
    };


    return (

        <section>
            <div className={`grid max-h-screen md:h-screen md:grid-cols-2 ${primary}`}>
                <div className={`flex flex-col items-center justify-center ${primary}`}>
                    <div className="flex flex-col justify-center items-center gap-4 max-w-lg min-w-[350px] px-5 py-16 text-center md:px-10 md:py-24 lg:py-0">
                        <Select additionalClasses="" title="Select language" value={locale} options={availableLangs} onChange={changeLanguage} />
                        <h2 className="mb-8 text-3xl font-bold md:mb-12 md:text-5xl">{translator.global.welcome}</h2>
                        <SignUpForm />
                        <p className="text-sm text-[#636262]">{translator.global.have_an_account} <Link to="/signin" className="text-sm font-bold text-black">{translator.global.login_now}</Link>
                        </p>
                    </div>
                </div>
                <div className={`flex flex-col items-center justify-center  ${secondary}`}>                    <div className="max-w-lg px-5  py-16 lg:py-0 md:px-10  ">
                    <div className="mb-6 ml-2 flex h-14 w-14 items-center justify-center bg-[#276ef1] [box-shadow:rgb(171,_196,_245)_-8px_8px] dark:bg-primary-bg-dark">
                        <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358f5ec37c8c32b17d1c725_Vector-9.svg" alt="" className="inline-block" />
                    </div>
                    <p className="mb-8 text-[#647084] dark:text-primary-text-dark md:mb-12 lg:mb-16">Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim.</p>
                    <p className="font-bold">Dean Taylor</p>
                    <p className="text-sm">CTO</p>
                </div>
                </div>
            </div>
        </section>
    );
};

export default SignInPage;
