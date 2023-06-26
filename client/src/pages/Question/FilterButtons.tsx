import React, { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import '../../index.css';
import { RiArrowDownSFill } from 'react-icons/ri';
import { QuestionInfo } from '../../types/types';
import DropdownMenu from './DropDown';

interface FilterButtonsProps {
  data: QuestionInfo[];
  handleFilteredData: (filteredData: QuestionInfo[]) => void;
  filterRef?: React.Ref<HTMLDivElement>;

}
const FilterButtons = React.memo(
  ({ data, handleFilteredData, filterRef }: FilterButtonsProps) => {
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
    const handleFilterOnClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      const title = event.currentTarget.title;
      let filteredData: QuestionInfo[] = [];

      switch (title) {
        case 'Newest':
          filteredData = [...data].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setSelectedMenu('Newest');
          break;
        case 'Active':
          filteredData = [...data].sort((a, b) => {
            const totalCountA = a.viewCount + a.voteCount + a.answerCount;
            const totalCountB = b.viewCount + b.voteCount + b.answerCount;
            return totalCountB - totalCountA;
          });
          setSelectedMenu('Active');
          break;
        case 'Bountied':
          filteredData = [...data].sort((a, b) => {
            if (a.bounty && !b.bounty) {
              return -1;
            } else if (!a.bounty && b.bounty) {
              return 1;
            } else if (a.bounty && b.bounty) {
              return b.bounty - a.bounty;
            } else {
              return 0;
            }
          });

          setSelectedMenu('Bountied');
          break;
        case 'Unanswered':
          filteredData = [...data].sort((a, b) => a.answerCount - b.answerCount);
          // filteredData = [...data].filter(item => !item.answerCount);
          setSelectedMenu('Unanswered');
          break;
        default:
          break;
      }

      handleFilteredData(filteredData);
    };
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    return (
      <div>
        <S.Container ref={filterRef}>
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
);

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
        @media (max-width: 800px) {
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

export default FilterButtons;
