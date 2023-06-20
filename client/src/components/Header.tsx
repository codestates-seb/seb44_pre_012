import { styled } from "styled-components";
import { MdMenu, MdAccountBox, MdHelp } from 'react-icons/md';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'
import { BsInboxFill } from 'react-icons/bs'
import { GiDiamondTrophy } from 'react-icons/gi'
import { FaStackExchange } from 'react-icons/fa'
import { useState } from "react";

const S = {
  topbarWrapper: styled.div`
    max-width: 1264px;
    width: 100%;
    height: 52px;
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
    font-size: 20px;
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
  topFormContainer: styled.div<{ isdown:boolean }>`
    display: flex;
    align-items: center;
    border: 1px solid ${(props)=>(props.isdown ? "#69b9f7" : "var(--color-ui-border)")};
    box-shadow: ${(props) => (props.isdown ? "0px 0px 0px 4px rgba(105, 185, 247, 0.3)" : "none")};
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
  topSearchPopoverContainer: styled.div`
    background-color: white;
    border: 1px solid var(--color-ui-border);
    box-shadow:0px 1px 3px 3px var(--color-ui-border-shadow);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    position: relative;
    margin-top: 10px;
    filter: drop-shadow(0px 0px 5px var(--color-ui-border));
    &::before {
      content: "";
      position: absolute;
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
	    border-bottom: 12px solid white;/* 화살표 */
	    border-left: 12px solid transparent;
	    border-right: 12px solid transparent;
      
    }
  `,
  topSearchPopoverWrapper: styled.div`
    width: 100%;
    height: 130px;
    display: flex;
  `,
  topSearchPopoverLeft: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10px;
  `,
  topSearchPopoverRight: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  topSearchPopoverContent: styled.div`
    padding: 3px;
  `,
  topSearchPopoverContentTitle: styled.span`
    font-size: 13px;
    color: black;
    margin-right: 3px;      
  `,
  topSearchPopoverContentMSG: styled.span`
    font-size: 13px;
  `,
  topSearchPopoverBottom: styled.div`
    height: 51px;
    padding: 0px 12px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--color-ui-border);
  `,
  topSearchPopoverBottomWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  
  `,
  topSearchPopoverQuestionBtn: styled.div`
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
  topSearchPopoverHelpBtn: styled.div`
    color: var(--color-searchBtn);
    font-size: 11px;
    cursor: pointer;
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
    `,
    topbarMyAccountBtn: styled.li`
      width: 40px;
      height: 52px;
      font-size: 30px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: var(--color-navbar-button-hover);
      }
    `,
    topbarReputation: styled.div`
      width: 6px;
      height: 12px;
      font-size: 12px;
      display: flex;
      align-items: center;
    `,
    topbarInboxBtn: styled.li`
      width: 40px;
      height: 52px;
      font-size: 30px;
      margin-left: 12px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: var(--color-navbar-button-hover);
      }
    `,
    topbarAchievementsBtn: styled.li`
      width: 40px;
      height: 52px;
      font-size: 30px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: var(--color-navbar-button-hover);
      }
    `,
    topbarHelpBtn: styled.li`
      width: 40px;
      height: 52px;
      font-size: 30px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: var(--color-navbar-button-hover);
      }
    `,
    topbarExchangeBtn: styled.li`
      width: 40px;
      height: 52px;
      font-size: 27px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: var(--color-navbar-button-hover);
      }
    `,
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDown, setIsDown] = useState(false);

  const MenuDropdown = () => {
    setIsOpen(!isOpen)
    console.log("작동한다")
  }

  const SearchInputDropdown = () => {
    setIsDown(!isDown)
    console.log("작동한다1")
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
          isdown={isDown}>
          <AiOutlineSearch />
          <S.topFormInput 
            type="text"
            placeholder="Search..."/>
        </S.topFormContainer>

        <S.topSearchPopoverContainer>
          <S.topSearchPopoverWrapper>
            <S.topSearchPopoverLeft>
              <S.topSearchPopoverContent>
                <S.topSearchPopoverContentTitle>
                  [tag]
                </S.topSearchPopoverContentTitle>
                <S.topSearchPopoverContentMSG>
                  search within a tag
                </S.topSearchPopoverContentMSG>
              </S.topSearchPopoverContent>
              <S.topSearchPopoverContent>
                <S.topSearchPopoverContentTitle>
                  user: 1234
                </S.topSearchPopoverContentTitle>
                <S.topSearchPopoverContentMSG>
                  search by author
                </S.topSearchPopoverContentMSG>
              </S.topSearchPopoverContent>
              <S.topSearchPopoverContent>
                <S.topSearchPopoverContentTitle>
                  "words here"
                </S.topSearchPopoverContentTitle>
                <S.topSearchPopoverContentMSG>
                  exact phrase
                </S.topSearchPopoverContentMSG>
              </S.topSearchPopoverContent>
              <S.topSearchPopoverContent>
                <S.topSearchPopoverContentTitle>
                  collective: "Name"
                </S.topSearchPopoverContentTitle>
                <S.topSearchPopoverContentMSG>
                  collective content
                </S.topSearchPopoverContentMSG>
              </S.topSearchPopoverContent>
              
            </S.topSearchPopoverLeft>
            <S.topSearchPopoverRight>
              <S.topSearchPopoverContent>
                <S.topSearchPopoverContentTitle>
                  answers: 0
                </S.topSearchPopoverContentTitle>
                <S.topSearchPopoverContentMSG>
                  unanswered questions
                </S.topSearchPopoverContentMSG>
              </S.topSearchPopoverContent>
              <S.topSearchPopoverContent>
                <S.topSearchPopoverContentTitle>
                  score: 3
                </S.topSearchPopoverContentTitle>
                <S.topSearchPopoverContentMSG>
                  posts with a 3+ score
                </S.topSearchPopoverContentMSG> 
              </S.topSearchPopoverContent>
              <S.topSearchPopoverContent>
                <S.topSearchPopoverContentTitle>
                  is: question
                </S.topSearchPopoverContentTitle>
                <S.topSearchPopoverContentMSG>
                  type of post
                </S.topSearchPopoverContentMSG>
              </S.topSearchPopoverContent>
              <S.topSearchPopoverContent>
                <S.topSearchPopoverContentTitle>
                  isaccepted: yes
                </S.topSearchPopoverContentTitle>
                <S.topSearchPopoverContentMSG>
                  search within status
                </S.topSearchPopoverContentMSG>
              </S.topSearchPopoverContent>

            </S.topSearchPopoverRight>
          </S.topSearchPopoverWrapper>
          <S.topSearchPopoverBottom>
            <S.topSearchPopoverBottomWrapper>
              <S.topSearchPopoverQuestionBtn>
                Ask a question
              </S.topSearchPopoverQuestionBtn>
              <S.topSearchPopoverHelpBtn>
                Serch help
              </S.topSearchPopoverHelpBtn>
            </S.topSearchPopoverBottomWrapper>
          </S.topSearchPopoverBottom>
        </S.topSearchPopoverContainer>


      </S.topForm>

        




      <S.topbarBtns>
        <S.topbarLoginBtn>Log in</S.topbarLoginBtn>
        <S.topbarSignupBtn>Sign up</S.topbarSignupBtn>
        <S.topbarMyAccountBtn role="menuitem" title="User Name">
          <MdAccountBox></MdAccountBox>
          <S.topbarReputation>
            <div>1</div>
          </S.topbarReputation>
        </S.topbarMyAccountBtn>
        <S.topbarInboxBtn role="menuitem" title="Recent inbox messages">
          <BsInboxFill/>
        </S.topbarInboxBtn>
        <S.topbarAchievementsBtn role="menuitem" title="Recent achievements">
          <GiDiamondTrophy/>
        </S.topbarAchievementsBtn>
        <S.topbarHelpBtn role="menuitem" title="Help Center and other resources">
          <MdHelp/>
        </S.topbarHelpBtn>
        <S.topbarExchangeBtn role="menuitem" title="A list of all 181 Stack Exchange sites">
          <FaStackExchange/>
        </S.topbarExchangeBtn>
      </S.topbarBtns>
    </S.topbarContainer>
  </S.topbarWrapper>
  ) 
}





