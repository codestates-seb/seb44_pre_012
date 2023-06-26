import { styled } from "styled-components";
import { MdMenu, MdAccountBox, MdHelp } from 'react-icons/md';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'
import { BsInboxFill } from 'react-icons/bs'
import { GiDiamondTrophy } from 'react-icons/gi'
import { FaStackExchange } from 'react-icons/fa'
import { useState } from "react";
import logoIcon from '../assets/headerlogo.png';
import { Link } from 'react-router-dom';

interface SearchProps {
  isDown: boolean;
}

const S = {
  TopbarWrapper: styled.header`
    max-width: 100%;
    width: 100%;
    height: 52px;
    display: flex;
    justify-self: center;
    align-items: center;
    border-top: 3px solid var(--color-layout-orange);
    border-bottom: 1px solid var(--color-ui-border);
    background: white;
    /* position: absolute; */
  `,
  TopbarContainer: styled.div`
    max-width: 1264px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    margin: auto;
  `,
  TopbarMenuBtn: styled.div`
    height: 100%;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 12px 0px 12px;
    &:hover {
      background-color: var(--color-navbar-button-hover);
    }
  `,
  TopbarLogoImgContainer: styled.div`
    height: 52px;
    padding: 0px 8px;
    display: flex;
    align-items: center;
  `,
  TopbarLogoImg: styled.img`
    width: 150px;
    height: 28px;
  `,
  TopbarNav: styled.ol`
    display: flex;
    list-style: none;
  `,
  NavButton: styled.li`
    color: 	#525960;
    padding: 8px;
    margin: 2px;
    border-radius: 30px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      background-color: var(--color-navbar-button-hover);
    }
  `,
  TopForm: styled.form`
    height: 30px;
    flex-grow: 1;
    padding: 0px 3px 0px 3px;
  `,
  TopFormContainer: styled.div<SearchProps>`
    display: flex;
    align-items: center;
    border: 1px solid ${(props)=>(props.isDown ? "#69b9f7" : "var(--color-ui-border)")};
    box-shadow: ${(props) => (props.isDown ? "0px 0px 0px 4px rgba(105, 185, 247, 0.3)" : "none")};
    border-radius: 3px;
    padding-left: 5px;
  `,
  TopFormInput: styled.input`
    height: 30px;
    display: flex;
    align-items: center;
    border: none;
    padding-left: 5px;
    outline: none;
  `,
  TopSearchPopoverContainer: styled.div<SearchProps>`
    background-color: white;
    border: 1px solid var(--color-ui-border);
    box-shadow:0px 1px 3px 3px var(--color-ui-border-shadow);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    position: relative;
    margin-top: 10px;
    filter: drop-shadow(0px 0px 5px var(--color-ui-border));
    display: ${(props) => (props.isDown ? "block" : "none")};
    &::before {
      content: "";
      position: absolute;
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
	    border-bottom: 12px solid white;
	    border-left: 12px solid transparent;
	    border-right: 12px solid transparent;
    }
  `,
  TopSearchPopoverWrapper: styled.div`
    width: 100%;
    height: 130px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding-left: 5px;
  `,
  TopSearchPopoverContent: styled.div`
    padding: 3px;
    width: 50%;
  `,
  TopSearchPopoverContentTitle: styled.span`
    font-size: 13px;
    color: black;
    margin-right: 3px;      
  `,
  TopSearchPopoverContentMSG: styled.span`
    font-size: 13px;
  `,
  TopSearchPopoverBottom: styled.div`
    height: 51px;
    padding: 0px 12px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--color-ui-border);
  `,
  TopSearchPopoverBottomWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  TopSearchPopoverQuestionBtn: styled.div`
    border-radius: 3px;
    font-size: 11px;
    padding: 3px;
    cursor: pointer;
    background-color: var(--color-button-sky);
    border: 1px solid var(--color-button-border);
    color: var(--color--button-login);
    &:hover {
      background-color: var(--color-button-sky-hover);
    }
  `,
  TopSearchPopoverHelpBtn: styled.div`
    color: var(--color-searchBtn);
    font-size: 11px;
    cursor: pointer;
  `,
  TopbarBtns: styled.ol`
    display: flex;
    align-items: center;
    list-style: none;
  `,
  TopbarLoginBtn: styled.li`
    height: 30px;
    font-size: 13px;
    margin: 3px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 3px;
    padding: 0px 10px;
    background-color: var(--color-button-sky);
    border: 1px solid var(--color-button-border);
    color: var(--color--button-login);
    &:hover {
      background-color: var(--color-button-sky-hover);
    }
  `,
  TopbarSignupBtn: styled.li`
      height: 30px;
      font-size: 13px;
      margin-right: 3px;
      cursor: pointer;
      display: flex;
      align-items: center;
      border-radius: 3px;
      padding: 0px 10px;
      background-color: var(--color-button-blue);
      border: 1px solid var(--color-button-border);
      color: var(--color--button-signup);
      &:hover {
        background-color: var(--color-button-blue-hover);
      }
  `,
  TopbarBtn: styled.li`
      width: 40px;
      height: 49px;
      font-size: 30px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 5px;
      &:hover {
        background-color: var(--color-navbar-button-hover);
      }
      > div {
        margin-right: -1px;
      }
  `,
  TopbarReputation: styled.div`
      width: 6px;
      height: 12px;
      font-size: 12px;
      display: flex;
      align-items: center;
  `,
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const searchData = [
    { keyword: '[tag]', description: 'search within a tag' },
    { keyword: 'user: 1234', description: 'search by author' },
    { keyword: '"words here"', description: 'exact phrase' },
    { keyword: 'collective: "Name"', description: 'collective content' },
    { keyword: 'answers: 0', description: 'unanswered questions' },
    { keyword: 'score: 3', description: 'posts with a 3+ score' },
    { keyword: 'is: question', description: 'type of post' },
    { keyword: 'isaccepted yes', description: 'search within status' }
  ]
  const topButton = [
    { icon: <BsInboxFill/>, title: "Recent inbox messages" },
    { icon: <GiDiamondTrophy/>, title: "Help Center and other resources" },
    { icon: <MdHelp/>, title: "Help Center and other resources" }
  ]

  const MenuDropdown = () => {
    setIsOpen(!isOpen)
    console.log("작동한다")
  }

  const SearchInputDropdown = () => {
    setIsDown(!isDown)
    console.log("작동한다1")
  }

  return (
  <S.TopbarWrapper>
    <S.TopbarContainer>
      <S.TopbarMenuBtn onClick={MenuDropdown}>      
        {isOpen ? <AiOutlineClose /> : <MdMenu />}
      </S.TopbarMenuBtn>
      <S.TopbarLogoImgContainer>
          <Link to="/">
            <S.TopbarLogoImg src={logoIcon}/>
          </Link>
        </S.TopbarLogoImgContainer>
      <S.TopbarNav>
        <S.NavButton>About</S.NavButton>
        <S.NavButton>Produts</S.NavButton>
        <S.NavButton>For Teams</S.NavButton>
      </S.TopbarNav>
      <S.TopForm>
        <S.TopFormContainer 
          onClick={SearchInputDropdown}
          isDown={isDown}>
          <AiOutlineSearch />
          <S.TopFormInput 
            type="text"
            placeholder="Search..."/>
        </S.TopFormContainer>
        <S.TopSearchPopoverContainer isDown={isDown}>
          <S.TopSearchPopoverWrapper>
            {searchData.map((el, idx) => (
              <S.TopSearchPopoverContent key={idx}>
                <S.TopSearchPopoverContentTitle>{el.keyword}</S.TopSearchPopoverContentTitle>
                <S.TopSearchPopoverContentMSG>{el.description}</S.TopSearchPopoverContentMSG>
                </S.TopSearchPopoverContent>
              ))}
          </S.TopSearchPopoverWrapper>
          <S.TopSearchPopoverBottom>
            <S.TopSearchPopoverBottomWrapper>
              <Link to="questions/ask">
                <S.TopSearchPopoverQuestionBtn>
                  Ask a question
                </S.TopSearchPopoverQuestionBtn>
              </Link>
              <S.TopSearchPopoverHelpBtn>
                Serch help
              </S.TopSearchPopoverHelpBtn>
            </S.TopSearchPopoverBottomWrapper>
          </S.TopSearchPopoverBottom>
        </S.TopSearchPopoverContainer>
      </S.TopForm>
      <S.TopbarBtns>
        <Link to="users/login">
          <S.TopbarLoginBtn>Log in</S.TopbarLoginBtn>
        </Link>
        <S.TopbarSignupBtn>Sign up</S.TopbarSignupBtn>
        <S.TopbarBtn role="menuitem" title="User Name">
          <MdAccountBox/>
          <S.TopbarReputation>
            <div>1</div>
          </S.TopbarReputation>
        </S.TopbarBtn>
        {topButton.map((el, idx) => 
        <S.TopbarBtn key={idx} title={el.title}>{el.icon}
        </S.TopbarBtn>
        )}
        <Link to="users/logout">
          <S.TopbarBtn role="menuitem" title="A list of all 181 Stack Exchange sites">
            <FaStackExchange/>
          </S.TopbarBtn>
        </Link>
      </S.TopbarBtns>
    </S.TopbarContainer>
  </S.TopbarWrapper>
  ) 
}