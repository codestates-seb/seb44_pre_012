import { styled } from "styled-components";
import { MdMenu } from 'react-icons/md';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'
import { useState } from "react";

const S = {
  topbarWrapper: styled.div`
    max-width: 1264px;
    width: 100%;
    height: 56px;
    display: flex;
    justify-self: center;
    align-items: center;
    border-top: 3px solid var(--color-layout-orange);
    border-bottom: 1px solid var(--color-ui-border);
    background: white;
  `,
  topbarContainer: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 auto;
  `,
  topbarMenuBtn: styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 12px 0px 12px;
    &:hover {
      background-color: var(--color-navbar-button-hover);
    }
  `,
  topbarNav: styled.ol`
    display: flex;
    list-style: none;
  `,
  navButton: styled.li`
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
  topForm: styled.form`
    height: 30px;
    flex-grow: 1;
    padding: 0px 3px 0px 3px;
  `,
  topFormContainer: styled.div<{ isDown:boolean }>`
    display: flex;
    align-items: center;
    border: 1px solid ${(props)=>(props.isDown ? "#69b9f7" : "var(--color-ui-border)")};
    box-shadow: ${(props) => (props.isDown ? "4px 4px 3px rgba(105, 185, 247, 0.3), -4px -4px 3px rgba(105, 185, 247, 0.3)" : "none")};
    border-radius: 3px;
    padding-left: 5px;
  `,
  topFormInput: styled.input`
    height: 30px;
    display: flex;
    align-items: center;
    border: none;
    padding-left: 5px;
    outline: none;
  `,
  topbarBtns: styled.ol`
    display: flex;
    align-items: center;
    list-style: none;
  `,
  topbarLoginBtn: styled.li`
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
      topbarSignupBtn: styled.li`
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
    `
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDown, setIsDown] = useState(false);

  const MenuDropdown = () => {
    setIsOpen(!isOpen)
    console.log("작동한다1")
  }

  const SearchInputDropdown = () => {
    setIsDown(!isDown)
    console.log("작동한다")
  }

  return (
  <S.topbarWrapper>
    <S.topbarContainer>
      <S.topbarMenuBtn onClick={MenuDropdown}>      
        {isOpen ? <AiOutlineClose /> : <MdMenu />}
      </S.topbarMenuBtn>
      <div>이미지</div>
      <S.topbarNav>
        <S.navButton>About</S.navButton>
        <S.navButton>Produts</S.navButton>
        <S.navButton>For Teams</S.navButton>
      </S.topbarNav>
      <S.topForm>
        <S.topFormContainer 
          onClick={SearchInputDropdown}
          isDown ={isDown}
          >
          <AiOutlineSearch />
          <S.topFormInput 
            type="text"
            placeholder="Search..."/>
        </S.topFormContainer>
      </S.topForm>
      <S.topbarBtns>
        <S.topbarLoginBtn>Log in</S.topbarLoginBtn>
        <S.topbarSignupBtn>Sign up</S.topbarSignupBtn>

      </S.topbarBtns>
    </S.topbarContainer>
  </S.topbarWrapper>
  ) 
}