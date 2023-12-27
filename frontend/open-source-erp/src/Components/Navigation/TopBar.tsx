import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

interface TopBarProps {
  openNav: () => void;
  closeNavIfOpen: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ openNav, closeNavIfOpen }) => {
  const { getColorClasses } = useTheme();
  const primary = getColorClasses('primary');

  return (
    <div className="w-full mx-4">
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
        </span>
        <span className="flex justify-center items-center w-8 h-8 rounded-full  border-2 border-primary-text-light">
          <Icon icon="mdi:account" width={30} />
        </span>
      </div>
    </div>
  );
};

export default TopBar;
