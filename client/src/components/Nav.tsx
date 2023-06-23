import { styled } from 'styled-components';
import {
  AiOutlineGlobal,
  AiFillCheckCircle,
  AiFillShopping,
} from 'react-icons/ai';
import { BsStarFill } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import { PATHS } from '../constants/paths';

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
  console.log(currentPath);

  const pages: Page[] = [
    { title: 'Home', path: '/' },
    {
      title: 'PUBLIC',

      subMenu: [
        {
          title: 'Questions',
          path: PATHS.QUESTIONS,
          icon: <AiOutlineGlobal />,
        },
        { title: 'Tags', path: PATHS.TAG },
        { title: 'Users', path: PATHS.USER },
        { title: 'Companies', path: '/companies' },
      ],
    },
    {
      title: 'COLLECTIVES',
      tooltip: { icon: <AiFillCheckCircle />, modal: '' },
      subMenu: [
        {
          title: 'Explore Collectives',
          path: PATHS.COLLECTIVE,
          icon: <BsStarFill color={'rgb(244, 130, 37)'} />,
        },
      ],
    },
    {
      title: 'TEAMS',
      tooltip: { icon: <AiFillCheckCircle />, modal: '' },
      subMenu: [
        {
          title: 'Create free Team',
          path: PATHS.TEAM,
          icon: <AiFillShopping color={'rgb(244, 130, 37)'} />,
        },
        {
          title: 'Looking for your Teams?',
          path: PATHS.TEAM,
          uniqueDesign: true,
        },
      ],
    },
  ];

  return (
    <S.NavWrap>
      <S.Nav>
        <ol>
          {pages.map((page, idx) => {
            const isSelectedPage = page.path
              ? page.path === '/'
                ? currentPath === '/'
                : currentPath.startsWith(page.path)
              : false;
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
                      const isSelectedSubItem = subItem.path
                        ? currentPath.startsWith(subItem.path)
                        : false;

                      return (
                        <S.SubMenuLi
                          key={idx}
                          className={`${
                            subItem.uniqueDesign ? 'uniqueDesign' : ''
                          } ${isSelectedSubItem ? 'selected' : ''}`}
                        >
                          {subItem.uniqueDesign ? (
                            <button>{subItem.title}</button>
                          ) : (
                            <S.Link
                              to={subItem.path}
                              className={subItem.icon && 'icon'}
                            >
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
    width: 100%;
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
      font-weight: 600;
    }
  `,

  SubMenuLi: styled.li`
    display: flex;
    align-items: center;
    & > a {
      padding: 8px 8px 8px 30px;
      width: 100%;

      & > svg:first-child {
        width: 30px;
      }
    }
    & > a.icon {
      padding: 8px 8px 8px 0;
    }

    &.selected {
      background-color: hsl(210, 8%, 95%);
      color: var(--color-label-black);
      border-right: 3px solid rgb(244, 130, 37);
      font-weight: 600;
    }

    &.uniqueDesign {
      & > button {
        padding: 8px;
        margin: 8px 0 0 1px;
        line-height: 1;
        color: var(--color-blue-200);
        background: hsl(208, 100%, 97%);
        font-size: var(--font-xs);
        border-radius: 5px;
        width: 100%;
        text-align: left;
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
