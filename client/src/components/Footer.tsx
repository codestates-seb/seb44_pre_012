import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logoIcon from '../assets/logoIcon.png';
import '../index.css';

type FooterMenu = {
  title: string;
  MENUS: string[];
  url: string[];
};

const Footer = () => {
  const footerMenus: FooterMenu[] = [
    { title: 'STACK_OVERFLOW', MENUS: ['QUESTIONS', 'HELP'], url: ['/', '/'] },
    {
      title: 'PRODUCTS',
      MENUS: ['Teams', 'Advertising', 'Collectives', 'Talent'],
      url: ['/', '/'],
    },
    {
      title: 'COMPANY',
      MENUS: [
        'About',
        'Press',
        'Work Here',
        'Legal',
        'Privacy Policy',
        'Terms of Service',
        'Contact Us',
        'Cookie Settings',
        'Cookie Policy',
      ],
      url: ['/', '/'],
    },
    {
      title: 'STACK EXCHANGE NETWORK',
      MENUS: [
        'Technology',
        'Culture & recreation',
        'Life & arts',
        'Science',
        'Professional',
        'Business',
        'API',
        'Data',
      ],
      url: ['/', '/'],
    },
  ];

  const footerSNS: string[] = [
    'Blog',
    'Facebook',
    'Twitter',
    'Linkedin',
    'Instagram',
  ];
  const versionInfo: string =
    'Site design / logo © 2023 Stack Exchange Inc; user contributions licensed under CC BY-SA. rev 2023.6.15.43493';

  return (
    <S.Footer>
      <S.Container>
        <S.FooterLogoImgContainer>
          <Link to="/">
            <S.FooterLogoImg src={logoIcon} />
          </Link>
        </S.FooterLogoImgContainer>
        <S.Nav>
          {footerMenus.map((menu, idx) => (
            <S.FooterMenuListContainer key={idx}>
              <S.FooterMenuTitle>{menu.title}</S.FooterMenuTitle>
              <ul>
                {menu.MENUS.map((item, i) => (
                  <S.FooterMenuList key={i}>{item}</S.FooterMenuList>
                ))}
              </ul>
            </S.FooterMenuListContainer>
          ))}
        </S.Nav>
        <S.FooterMenuListContainer>
          <S.FooterSNSListContainer>
            <ul>
              {footerSNS.map((el, idx) => {
                return <S.FooterSNSList key={idx}>{el}</S.FooterSNSList>;
              })}
            </ul>
          </S.FooterSNSListContainer>
          <S.FooterVersionInfo>{versionInfo}</S.FooterVersionInfo>
        </S.FooterMenuListContainer>
      </S.Container>
    </S.Footer>
  );
};

const S = {
  Footer: styled.footer`
    background-color: #222629;
    display: flex;
    justify-content: center;
  `,
  Container: styled.div`
    background-color: #222629;
    max-width: 1264px;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    margin: 0 auto;
    padding: 36px 36px 34px 36px;
  `,
  FooterLogoImgContainer: styled.div`
    display: flex;
    width: 64px;
    height: 258px;
    margin: 0 auto;
    flex: 0 10px 64px;
  `,
  FooterLogoImg: styled.img`
    width: 50px;
  `,
  Nav: styled.nav`
    display: flex;
    flex: 2 1 auto;
    flex-wrap: wrap;
  `,
  FooterMenuListContainer: styled.div`
    color: hsl(210, 8%, 60%);
    margin-right: 60px;
    flex: 1 0 auto;
    &:nth-child(5) {
      li {
        &:nth-child(7) {
          margin-top: 16px;
        }
      }
    }
  `,
  FooterMenuTitle: styled.div`
    color: hsl(210, 8%, 75%);
    font-weight: 700;
    font-size: 13px;
    display: block;
    text-align: left;
    margin: 12px auto;
  `,
  FooterMenuList: styled.li`
    color: hsl(210, 8%, 60%);
    font-size: 12px;
    margin: 5px auto;
    display: block;
    text-align: left;
    &:hover {
      color: #9fa6ad;
      cursor: pointer;
    }
  `,
  FooterSNSListContainer: styled.div`
    display: flex;
    margin: 0;
  `,
  FooterSNSList: styled.li`
    color: hsl(210, 8%, 60%);
    display: inline-block;
    font-size: 11px;
    margin-top: 14px;
    margin-right: 8px;
    &:hover {
      color: #9fa6ad;
      cursor: pointer;
    }
  `,
  FooterVersionInfo: styled.div`
    color: hsl(210, 8%, 60%);
    display: block;
    font-size: 11px;
    margin-top: 188px;
    width: 340px;
  `,
};

export default Footer;
