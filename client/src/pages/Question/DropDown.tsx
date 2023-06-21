import { styled, css } from 'styled-components';
import { useRef, useEffect } from 'react';

interface DropdownMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

export default function DropdownMenu({
  isOpen,
  setIsOpen,
  buttonRef,
}: DropdownMenuProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const handleClickOutside = (e: MouseEvent) => {
    if (
      !ref.current?.contains(e.target as Node) &&
      !buttonRef.current?.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  const handleItemClick = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
      return () => window.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div>
      <Menu ref={ref} className={isOpen ? 'isDropped' : ''}>
        <Ul>
          <li onClick={handleItemClick}>Frequent</li>
          <li onClick={handleItemClick}>Score</li>
          <Li onClick={handleItemClick}>Unanswered (my tags)</Li>
          <div>CUSTOM FILTERS</div>
        </Ul>
        <Div>
          <div>{`Save custom sorting & 
          filtering for easy access`}</div>
        </Div>
      </Menu>
    </div>
  );
}

const Menu = styled.div.attrs(() => ({ role: 'dropdown-menu' }))`
  position: absolute;
  top: 80px;
  background: white;
  width: 200px;
  height: 216px;
  filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.1));
  border-radius: 3px;
  opacity: 0;
  visibility: hidden;
  transform: translate(120%, 70px);
  z-index: 999;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:after {
    content: '';
    position: absolute;
    top: -4.5%;
    left: 45%;
    border: 12px solid transparent;
    border-top-width: 0;
    border-bottom-color: white;
  }
  &.isDropped {
    opacity: 1;
    visibility: visible;
  }
`;

const Div = styled.div`
  margin-left: -5px;
  width: 100%;
  height: 100%;
  font-size: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    width: 70%;
  }
`;

const Ul = styled.ul`
  font-size: 13px;
  > li {
    color: #525960;
    margin: 7px 0;
    padding-left: 10px;
    &:hover {
      cursor: pointer;
    }
  }
  > div {
    margin-top: 18px;
    color: #6a737c;
    padding-left: 10px;
  }
`;

const Li = styled.li`
  margin-left: -10px;
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
  border-top: 0.1px solid #e3e6e8;
  border-bottom: 0.1px solid #e3e6e8;
  &:hover {
    cursor: pointer;
  }
`;
