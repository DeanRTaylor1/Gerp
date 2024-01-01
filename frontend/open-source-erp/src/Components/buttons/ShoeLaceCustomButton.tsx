import React, { ReactNode, MouseEventHandler } from 'react';
import SlButton from '@shoelace-style/shoelace/dist/react/button/index.js';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon/index.js';

interface CustomStyledButtonProps {
  children?: ReactNode;
  icon?: string;
  onClick?: MouseEventHandler<HTMLSpanElement>;
  type?: 'submit' | 'button';
}

const ShoeLaceCustomButton: React.FC<CustomStyledButtonProps> = ({
  children,
  icon,
  type = 'button',
  onClick,
}) => {
  return (
    <>
      <style>
        {`
          sl-button.custom-button::part(base) {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px 16px;
            padding-right: 28px;
            font-weight: 600;
            color: current-color;
            text-align: center;
            transition: box-shadow 150ms ease;
          }

          sl-button.custom-button::part(base):hover {
            background-color: #a1a1aa;
            color: black;
            border-color: black;
          }
        `}
      </style>
      <span onClick={onClick}>
        <SlButton className="custom-button" type={type} onClick={onClick}>
          {children}
          {icon && <SlIcon name={icon} slot="suffix"></SlIcon>}
        </SlButton>
      </span>
    </>
  );
};

export default ShoeLaceCustomButton;
