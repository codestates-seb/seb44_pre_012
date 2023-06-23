import { styled } from 'styled-components';
import {
  AiOutlineGlobal,
  AiFillCheckCircle,
  AiFillShopping,
} from 'react-icons/ai';
import { BsStarFill } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

interface SubMenuLi {
  title: string;
  path: string;
  uniqueDesign?: boolean;
  icon?: JSX.Element;
}

interface Page {
  title: string;
  path?: string;
  subMenu?: SubMenuLi[];
  tooltip?: {
    icon: JSX.Element;
    modal: string;
  };
}

export default function Nav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const pages: Page[] = [
    { title: 'Home', path: '/' },
    {
      title: 'PUBLIC',

      subMenu: [
        { title: 'Questions', path: '/questions', icon: <AiOutlineGlobal /> },
        { title: 'Tags', path: '/tags' },
        { title: 'Users', path: '/user' },
        { title: 'Companies', path: '/companies' },
      ],
    },
    {
      title: 'COLLECTIVES',
      tooltip: { icon: <AiFillCheckCircle />, modal: '' },
      subMenu: [
        {
          title: 'Explore Collectives',
          path: '/collectives',
          icon: <BsStarFill color={'rgb(244, 130, 37)'} />,
        },
      ],
    },
    {
      title: 'COLLECTIVES',
      tooltip: { icon: <AiFillCheckCircle />, modal: '' },
      subMenu: [
        {
          title: 'Create free Team',
          path: '/team',
          icon: <AiFillShopping color={'rgb(244, 130, 37)'} />,
        },
        { title: 'Looking for your Teams?', path: '/team', uniqueDesign: true },
      ],
    },
  ];

  return (
    <S.NavWrap>
      <S.Nav>
        <ol>
          {pages.map((page, idx) => {
            const isSelectedPage = currentPath === page.path;
            return (
              <S.Li key={idx} className={isSelectedPage ? 'selected' : ''}>
                <div>
                  {page.path ? (
                    <Link to={page.path}>{page.title}</Link>
                  ) : (
                    <div>{page.title}</div>
                  )}
                  {page.tooltip && <button>{page.tooltip.icon}</button>}
                </div>
                {page.subMenu && (
                  <ol>
                    {page.subMenu.map((subItem, idx) => {
                      const isSelectedSubItem = currentPath === subItem.path;
                      return (
                        <S.SubMenuLi
                          key={idx}
                          hasIcon={!!subItem.icon}
                          className={`${
                            subItem.uniqueDesign ? 'uniqueDesign' : ''
                          } ${isSelectedSubItem ? 'selected' : ''}`}
                        >
                          {subItem.uniqueDesign ? (
                            <button>{subItem.title}</button>
                          ) : (
                            <S.Link to={subItem.path}>
                              {subItem.icon}
                              {subItem.title}
                            </S.Link>
                          )}
                        </S.SubMenuLi>
                      );
                    })}
                  </ol>
                )}
              </S.Li>
            );
          })}
        </ol>
      </S.Nav>
    </S.NavWrap>
  );
}

const S = {
  NavWrap: styled.div`
    padding: 1.6rem 0 0;
    margin-bottom: 8px;
    font-size: var(--font-s);
    color: hsl(210, 8%, 35%);
  `,
  Nav: styled.nav`
    display: flex;
    flex-direction: column;
    width: 164px;
  `,
  Li: styled.li`
    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      margin: 1rem 0 4px 0;
      & > div {
        padding-left: 4px;
      }
      & > button {
        margin: 0 12px;
        width: 15px;
        color: hsl(210, 8%, 35%);
        & > svg {
          width: 100%;
          height: 100%;
        }
      }
      & > a {
        color: hsl(210, 8%, 35%);
        width: 100%;
        padding: 8px 8px 8px 4px;
      }
    }
    &:first-child > div {
      font-size: var(--font-s);
    }
    &.selected {
      background-color: hsl(210, 8%, 95%);
      color: var(--color-label-black);
      border-right: 3px solid rgb(244, 130, 37);
    }
  `,

  SubMenuLi: styled.li<{ hasIcon?: boolean }>`
    display: flex;
    align-items: center;
    & > a {
      padding: 8px 8px 8px 30px;
      width: 100%;
    }
    &.selected {
      background-color: hsl(210, 8%, 95%);
      color: var(--color-label-black);
      border-right: 3px solid rgb(244, 130, 37);
    }
    ${props =>
      props.hasIcon &&
      `
      & > a {
        padding: 8px 8px 8px 0;
        & > svg {
          width: 30px;
        }
      }
    }
    
  `}
    &.uniqueDesign {
      & > button {
        padding: 8px;
        margin: 8px 8px 0 1px;
        line-height: 1;
        color: var(--color-blue-200);
        background: hsl(208, 100%, 97%);
        font-size: var(--font-xs);
        border-radius: 5px;
      }
      &:hover > button {
        color: var(--color-blue-400);
      }
    }
  `,
  Icon: styled.div`
    margin-right: 8px;
  `,
  Link: styled(Link)`
    display: flex;
    align-items: center;
    > svg {
      width: 18px;
      height: 18px;
    }
  `,
};
