import '../../index.css';
import { styled } from 'styled-components';
import { useState } from 'react';
import { QuestionAnswer, QuestionData } from '../../types/types';
import {
  IoMdArrowDropup,
  IoMdArrowDropdown,
} from 'react-icons/io';

interface GuestDeleteProps {
  item: QuestionAnswer;
  isLoggedIn: boolean;
}

export default function VoteCount({ item, isLoggedIn }: GuestDeleteProps) {
  const [isUpClicked, setIsUpClicked] = useState(false);
  const [isDownClicked, setIsDownClicked] = useState(false);
  const [voteCount, setVoteCount] = useState(item.voteCount);

  const handleUpClick = () => {
    if (typeof voteCount === 'number' && !isUpClicked && !isDownClicked) {
      setVoteCount(voteCount + 1);
      setIsUpClicked(true);
    } else if (typeof voteCount === 'number' && isUpClicked) {
      setVoteCount(voteCount - 1);
      setIsUpClicked(false);
    }
  };

  const handleDownClick = () => {
    if (typeof voteCount === 'number' && !isDownClicked && !isUpClicked) {
      setVoteCount(voteCount - 1);
      setIsDownClicked(true);
    } else if (isDownClicked) {
      setVoteCount(voteCount && voteCount + 1);
      setIsDownClicked(false);
    }
  };
  return (
    <div>
      <S.ArrowBox
        className={isLoggedIn ? '' : 'isNotLoggedIn'}
        onClick={handleUpClick}
        isUpClicked={isUpClicked}
      >
        <IoMdArrowDropup size={28} />
      </S.ArrowBox>
      <S.VoteNumber>
        {item.voteCount !== undefined && isUpClicked
          ? item.voteCount + 1
          : isDownClicked
          ? item.voteCount !== undefined && item.voteCount - 1
          : item.voteCount}
      </S.VoteNumber>
      <S.ArrowBox
        className={isLoggedIn ? '' : 'isNotLoggedIn'}
        onClick={handleDownClick}
        isDownClicked={isDownClicked}
      >
        <IoMdArrowDropdown size={28} />
      </S.ArrowBox>
    </div>
  );
}
interface StyledDivProps {
  isUpClicked?: boolean;
  isDownClicked?: boolean;
}
const S = {
  ArrowBox: styled.div<StyledDivProps>`
    &.isNotLoggedIn {
      opacity: 0.14;
      pointer-events: none;
    }
    border: 1px solid var(--color-button-lightgray);
    color: var(--color-content-desc);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: var(--color-button-orange-hover);
    }
    &:active {
      outline: 3.5px solid rgba(179, 211, 234, 0.5);
    }
    border: ${({ isUpClicked, isDownClicked }) => {
      if (isUpClicked) {
        return '1.34px solid var(--color-layout-orange)';
      } else if (isDownClicked) {
        return '1.34px solid var(--color-layout-orange)';
      }
    }};

    > svg:nth-child(1) {
      color: ${({ isUpClicked, isDownClicked }) => {
        if (isUpClicked) {
          return 'var(--color-layout-orange)';
        } else if (isDownClicked) {
          return 'var(--color-layout-orange)';
        }
      }};
    }
  `,
  VoteNumber: styled.div`
    height: 37px;
    line-height: 37px;
    text-align: center;
    color: var(--color-content-desc);
    font-size: 1.3rem;
    font-weight: 600;
  `,
};
