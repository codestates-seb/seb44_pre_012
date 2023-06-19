import styled from "styled-components";
import {Link} from "react-router-dom";
import logoIcon from "../assets/logoIcon.png"
import '../index.css';

type FooterMenu = {
    title: string;
    MENUS: string[];
    url: string[];
  };

const Footer = () => {
    const footerMenus:FooterMenu[] =[
        { title: "STACK_OVERFLOW", MENUS: ["QUESTIONS", "HELP"], url: ["/", "/"] },
        {
          title: "PRODUCTS",
          MENUS: ["Teams", "Advertising", "Collectives", "Talent"],
          url: ["/", "/"]
        },
        {
          title: "COMPANY",
          MENUS: [
            "About",
            "Press",
            "Work Here",
            "Legal",
            "Privacy Policy",
            "Terms of Service",
            "Contact Us",
            "Cookie Settings",
            "Cookie Policy"
          ],
          url: ["/", "/"]
        },
        {
          title: "STACK EXCHANGE NETWORK",
          MENUS: [
            "Technology",
            "Culture & recreation",
            "Life & arts",
            "Science",
            "Professional",
            "Business",
            "API",
            "Data"
          ],
          url: ["/", "/"]
        }
      ];

    const footerSNS:string[] = ["Blog", "Facebook", "Twitter", "Linkedin", "Instagram"]
    const versionInfo:string = "Site design / logo © 2023 Stack Exchange Inc; user contributions licensed under CC BY-SA. rev 2023.6.15.43493";

    return (
        <S.Container>
            <S.FooterLogoImgContainer>
                <Link to="/"><S.FooterLogoImg src={logoIcon}/></Link>
            </S.FooterLogoImgContainer>
            {footerMenus.map((menu) => (
                <S.FooterMenuListContainer>
                    <S.FooterMenuTitle>
                    {menu.title}
                    </S.FooterMenuTitle>
                    <ul>
                    {menu.MENUS.map((item) => (
                        <S.FooterMenuList>{item}</S.FooterMenuList>
                    ))}
                    </ul>
                </S.FooterMenuListContainer>
            ))}

            <S.FooterMenuListContainer>
                <S.FooterSNSListContainer>
                    <ul>
                    {footerSNS.map(el => {return <S.FooterSNSList>{el}</S.FooterSNSList>})}
                    </ul>
                </S.FooterSNSListContainer>
                <S.FooterVersionInfo>{versionInfo}</S.FooterVersionInfo>
            </S.FooterMenuListContainer>
        </S.Container>

    )
}

const S = {
    Container: styled.div`
    background-color: #222629;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-flow: row wrap;
    margin: 0 auto;
    padding: 36px 36px 34px 36px;
    width: 100%;
    `,
    FooterLogoImgContainer: styled.div`
    display: block;
    width:50px;
    margin: 0 0 0 auto;
    `,
    FooterLogoImg: styled.img`
    width:50px;
    `,
    FooterMenuListContainer: styled.div`
    color: hsl(210,8%,60%);
    display: block;
    margin: 0 auto;
    &:nth-child(2) {
        margin-left: 20px;        
    }
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
    font-weight:700;
    font-size:13px;
    display: block;
    text-align:left;
    margin: 10px auto;
    `,
    FooterMenuList: styled.li`
    color: hsl(210,8%,60%);
    font-size:12px;
    margin: 5px auto;
    display: block;
    text-align:left;
    &:hover{
        color: #9fa6ad;
        cursor: pointer;
    }
    `,
    FooterSNSListContainer: styled.div`
    display: flex;
    margin: 0;
    `,
    FooterSNSList: styled.li`
    color: hsl(210,8%,60%);
    display: inline-block;
    font-size:12px;
    margin-right:8px;
    &:hover{
        color: #9fa6ad;
        cursor: pointer;
    }
    `,
    FooterVersionInfo: styled.div`
    color: hsl(210,8%,60%);
    display: block;
    font-size:11px;
    margin-top: 188px;
    width: 300px;
    `
}

export default Footer;