import { Link } from "react-router-dom";
import SignInForm from "../Components/forms/SignInForm";
import useTranslator from "../hooks/useTranslator";
import { useRecoilState } from "recoil";
import { Locale } from "../recoil/globalState";
import { SyntheticEvent } from "react";
import languages from "../constants/languages";


const SignInPage = () => {

    const availableLangs = Object.values(languages);

    const translator = useTranslator();

    const [locale, setLocale] = useRecoilState(Locale);

    const changeLanguage = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        setLocale(target.value);
    }

    return (

        <section>
            <div className="grid md:h-screen md:grid-cols-2">
                <div className="flex flex-col items-center justify-center bg-white">
                    <div>
                        <h1>Select Language:</h1>
                        <select value={locale} onChange={e => changeLanguage(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {availableLangs.map(lang => <option key={lang.value} value={lang.value}>{lang.label}</option>)}
                        </select>
                    </div>
                    <div className="max-w-lg px-5 py-16 text-center md:px-10 md:py-24 lg:py-32">
                        <h2 className="mb-8 text-3xl font-bold md:mb-12 md:text-5xl">{translator.global.txt_welcome}</h2>
                        <SignInForm />
                        <p className="text-sm text-[#636262]">Don&apos;t have an account? <Link to='/signup' className="text-sm font-bold text-black">Sign up now</Link>
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center bg-[#f2f2f7]">
                    <div className="max-w-lg px-5 py-16 md:px-10 md:py-24 lg:py-32">
                        <div className="mb-6 ml-2 flex h-14 w-14 items-center justify-center bg-[#276ef1] [box-shadow:rgb(171,_196,_245)_-8px_8px]">
                            <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358f5ec37c8c32b17d1c725_Vector-9.svg" alt="" className="inline-block" />
                        </div>
                        <p className="mb-8 text-[#647084] md:mb-12 lg:mb-16">Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim.</p>
                        <p className="font-bold">Dean Taylor</p>
                        <p className="text-sm">CTO</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignInPage;
