import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon/index.js';

export interface ModalContainerProps {
  closeFn: () => void;
}

interface CardProps {
  children: React.ReactNode;
  title: string;
  closeFn: () => void;
}

const FormModal: React.FC<CardProps> = ({ children, title, closeFn }) => {
  const { getColorClasses, getStyles } = useTheme();
  const primary = getColorClasses('primary');
  const modal = getStyles('modalContainer');
  const overlay = getStyles('overlay');

  return (
    <div className={overlay}>
      <div className={`${modal} ${primary}`}>
        <div className="w-full h-full flex flex-col">
          <div className="w-full flex just-between">
            <h3 className="w-full text-center mt-4 text-3xl font-bold  md:text-5xl ">
              {title}
            </h3>{' '}
            <SlIcon onClick={closeFn} name="x-square"></SlIcon>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormModal;
