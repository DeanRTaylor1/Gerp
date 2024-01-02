import { Icon } from '@iconify/react/dist/iconify.js';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import languages, { countryCodeToFlagEmoji } from '../../constants/languages';
import { Locale } from '../../recoil/globalState';
import { useRecoilState } from 'recoil';
import { useAuth } from '../../context/useAuth';
import SlSelect, {
  type SlChangeEvent,
} from '@shoelace-style/shoelace/dist/react/select/index.js';
import SlOption from '@shoelace-style/shoelace/dist/react/option/index.js';
import type SlSelectElement from '@shoelace-style/shoelace/dist/components/select/select.js';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon/index.js';
import SlButton from '@shoelace-style/shoelace/dist/react/button/index.js';
import SlDropdown from '@shoelace-style/shoelace/dist/react/dropdown/index.js';
import SlMenu, {
  SlSelectEvent,
} from '@shoelace-style/shoelace/dist/react/menu/index.js';
import SlMenuItem from '@shoelace-style/shoelace/dist/react/menu-item/index.js';
import React from 'react';
import { finalPagesList } from '../../router/pages';
import { themes } from '../../context/themes';

interface ProfileDropdownProps {
  children: React.ReactNode;
  logout: () => void;
  navigate: NavigateFunction;
}
const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  children,
  logout,
  navigate,
}) => {
  const { theme, toggleTheme } = useTheme();

  function handleSelect(event: SlSelectEvent) {
    const selectedItem = event.detail.item;
    switch (selectedItem.value) {
      case 'logout':
        return logout();
      case 'profile':
        navigate(`${finalPagesList.Profile.path}`);
        break;
      case 'light':
        toggleTheme();
        break;
      case 'dark':
        toggleTheme();
        break;
    }
  }

  return (
    <SlDropdown className="w-16 h-10">
      <SlButton className="w-18 h-10 p-0" slot="trigger" caret>
        {children}
      </SlButton>
      <SlMenu onSlSelect={handleSelect}>
        <SlMenuItem value="profile">
          <SlIcon slot="prefix" name="person-circle" />
          Profile
        </SlMenuItem>
        <SlMenuItem value="logout">
          <SlIcon slot="prefix" name="box-arrow-right" />
          Logout
        </SlMenuItem>
        {theme === themes.LIGHT ? (
          <SlMenuItem value="dark">
            {' '}
            <SlIcon slot="prefix" name="moon" />
            Dark Mode
          </SlMenuItem>
        ) : (
          <SlMenuItem value="light">
            {' '}
            <SlIcon slot="prefix" name="sun" />
            Light Mode
          </SlMenuItem>
        )}
      </SlMenu>
    </SlDropdown>
  );
};

interface TopBarProps {
  openNav: () => void;
  closeNavIfOpen: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ openNav, closeNavIfOpen }) => {
  const { getColorClasses } = useTheme();
  const primary = getColorClasses('primary');
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const availableLangs = Object.values(languages).map((language) => ({
    ...language,
    flag: countryCodeToFlagEmoji(language.countryCode),
  }));

  const [locale, setLocale] = useRecoilState(Locale);

  const changeLanguage = (value: string) => {
    setLocale(value);
  };

  const handleChange = (event: SlChangeEvent) => {
    const value = (event.target as SlSelectElement).value;
    changeLanguage(value as string);
  };

  return (
    <div className="w-full md:px-4">
      <div
        className={`${primary} dark:bg-transparent bg-transparent flex items-center justify-between `}
      >
        <span className="w-[40%] flex gap-2 items-center justify-left text-2xl font-extrabold">
          <span className="w-12">
            <Icon
              onClick={openNav}
              className="pl-2 w-8 h-8 hover:cursor-pointer"
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
        <div className="flex gap-4 items-center py-2 w-[50%] md:w-[220px]">
          <span className="w-20">
            <SlSelect
              className="custom-select"
              label=""
              value={locale}
              onSlChange={(e) => handleChange(e)}
            >
              {availableLangs.map((availableLang) => (
                <SlOption
                  key={availableLang.countryCode}
                  value={availableLang.value}
                >
                  {availableLang.flag}
                </SlOption>
              ))}
            </SlSelect>
          </span>
          <ProfileDropdown
            navigate={navigate}
            logout={logout}
            children={
              <span className="flex justify-center items-center w-10 h-10 rounded-full ">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="rounded-full h-6 w-6 object-cover inline-block"
                />
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
