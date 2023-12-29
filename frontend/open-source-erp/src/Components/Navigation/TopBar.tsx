import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import Select from '../select/select';
import languages from '../../constants/languages';
import { Locale } from '../../recoil/globalState';
import { useRecoilState } from 'recoil';
import { useAuth } from '../../context/useAuth';

interface TopBarProps {
  openNav: () => void;
  closeNavIfOpen: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ openNav, closeNavIfOpen }) => {
  const { getColorClasses } = useTheme();
  const primary = getColorClasses('primary');
  const { user } = useAuth();

  const availableLangs = Object.values(languages).map(
    (language) => language.value
  );
  const [locale, setLocale] = useRecoilState(Locale);

  const changeLanguage = (value: string) => {
    setLocale(value);
  };

  return (
    <div className="w-full px-4">
      <div className={`${primary} flex items-center justify-between space-x-2`}>
        <span className=" w-40 flex gap-2 items-center justify-left text-2xl font-extrabold">
          <span className="w-12">
            <Icon
              onClick={openNav}
              className="xl:hidden pl-2 w-8 h-8 hover:cursor-pointer"
              width="30"
              icon="mdi:menu"
            />
          </span>
          <Link
            to="/"
            className={`${primary} flex items-center justify-between space-x-2`}
            onClick={closeNavIfOpen}
          >
            <h1>Go-erp</h1>
          </Link>
        </span>{' '}
        <div className="flex gap-4 items-center  py-2">
          <Select
            additionalClasses=""
            title=""
            value={locale}
            options={availableLangs}
            onChange={changeLanguage}
          />
          <span className="flex justify-center items-center w-12 h-12 rounded-full ">
            <Link to={'/profile'}>
              <img
                src={user.avatar}
                alt={user.username}
                className="rounded-full h-8 w-8 object-cover inline-block"
              />
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
