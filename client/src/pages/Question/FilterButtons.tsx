import { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import '../../index.css';
import { RiArrowDownSFill } from 'react-icons/ri';
import { QuestionInfo } from '../../types/types';
import DropdownMenu from './DropDown';

interface FilterButtonsProps {
  data: QuestionInfo[];
  handleFilteredData: (filteredData: QuestionInfo[]) => void;
}

export default function FilterButtons({
  data,
  handleFilteredData,
}: FilterButtonsProps) {
  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const DropDownHandler = () => {
    setIsOpen(!isOpen);
  };

  const buttonData = [
    { title: 'Newest' },
    { title: 'Active' },
    { title: 'Bountied', count: 220 },
    { title: 'Unanswered' },
    { title: 'More', icon: <RiArrowDownSFill /> },
  ];

  const handleFilterOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    let filteredData;
    const title = event.currentTarget.title;
    switch (title) {
      case 'Newest':
        filteredData = data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        handleFilteredData(filteredData);
        setSelectedMenu('Newest');
        break;
      case 'Active':
        filteredData = data;
        handleFilteredData(filteredData);
        setSelectedMenu('Active');

        break;
      case 'Bountied':
        filteredData = data;
        handleFilteredData(filteredData);
        setSelectedMenu('Bountied');

        break;
      case 'Unanswered':
        filteredData = data.filter(item => !item.answerCount);
        handleFilteredData(filteredData);
        setSelectedMenu('Unanswered');

        break;
      default:
        break;
    }
  };
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div>
      <S.Container>
        {buttonData.map((item, index) => (
          <button
            ref={buttonRef}
            key={index}
            title={item.title}
            onClick={
              item.title === 'More' ? DropDownHandler : handleFilterOnClick
            }
            className={selectedMenu === item.title ? 'active' : ''}
          >
            {item.title}
            {item.count && <span>{item.count}</span>}
            {item.icon && item.icon}
          </button>
        ))}
      </S.Container>
      <DropdownMenu
        buttonRef={buttonRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}

const S = {
  Container: styled.aside`
    display: flex;
    > button {
      border: 1px solid #aab0b7;
      background: var(--color-button-white);
      border-left: 1px;
      padding: 9px;
      font-size: 12px;
      height: 35px;
      color: var(--color-button-gray);
      box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;
      font-weight: 400;
      span {
        background-color: var(--color-content-title);
        color: white;
        border-radius: 3px;
        padding: 1px 5px;
        margin-left: 3px;
      }
      &:first-child {
        border-radius: 3px 0px 0px 3px;
        border: 1px solid #aab0b7;
      }
      &:last-child {
        border-radius: 0px 3px 3px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &:nth-child(2),
      &:nth-child(3) {
        @media (max-width: 650px) {
          display: none;
        }
      }
      &:hover {
        background: var(--color-button-white-hover);
      }
      &.active {
        background: var(--color-layout-lightgray);
        color: var(--color-content-desc);
      }
    }
  `,
};
