import '../index.css';
import { styled } from 'styled-components';
import { useState } from 'react';

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function SocialShare() {
  const [isShareClicked, setIsShareClicked] = useState(true);
  const currentUrl = window.location.href;
  return (
    <S.ShareContainer>
      <S.ShareButton onClick={() => setIsShareClicked(prev => !prev)}>
        Share
      </S.ShareButton>

      {isShareClicked && (
        <div>
          <S.ColumnContainer onClick={() => setIsShareClicked(prev => !prev)}>
            <CopyToClipboard text={currentUrl}>
              <S.URLShareBox>
                <S.URLShareText>{`Share a link to this question`}</S.URLShareText>
                <S.URLShareLink>{`${currentUrl}`}</S.URLShareLink>
              </S.URLShareBox>
            </CopyToClipboard>
            <S.SocialButtonsBox>
              <FacebookShareButton url={currentUrl}>
                <FacebookIcon
                  size={28}
                  round={true}
                  borderRadius={24}
                ></FacebookIcon>
              </FacebookShareButton>
              <TwitterShareButton url={currentUrl}>
                <TwitterIcon
                  size={28}
                  round={true}
                  borderRadius={24}
                ></TwitterIcon>
              </TwitterShareButton>
            </S.SocialButtonsBox>
          </S.ColumnContainer>
          <S.Layout onClick={() => setIsShareClicked(prev => !prev)}></S.Layout>
        </div>
      )}
    </S.ShareContainer>
  );
}

const S = {
  ShareButton: styled.button``,
  Layout: styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    cursor: auto;
  `,
  ShareContainer: styled.div`
    position: relative;
    height: 21px;
  `,
  ColumnContainer: styled.div`
    width: 240px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 2px 6px 0px, rgba(0, 0, 0, 0.09) 0px 3px 8px 0px;
    position: absolute;
    border: 1px solid var(--color-ui-border);
    border-radius: 5px;
    padding: 11px;
    top: 150%;
    left: 0%;
    display: flex;
    flex-direction: column;
    z-index: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;

    &:after {
      content: '';
      position: absolute;
      top: -6.2%;
      left: 4.2%;
      border: 7.7px solid transparent;
      border-top-width: 0;
      border-bottom-color: white;
    }
    &:before {
      content: '';
      position: absolute;
      top: -8.2%;
      left: 3.7%;
      border: 9px solid transparent;
      border-top-width: 0;
      border-bottom-color: #dadde1ac;
    }
  `,
  URLShareBox: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
  SocialButtonsBox: styled.div`
    margin-top: 5px;
    width: 33%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  `,
  URLShareText: styled.div`
    color: #0c0d0e;
    font-size: 0.85rem;
    font-weight: 500;
    width: 100%;
    margin-bottom: 3px;
  `,
  URLShareLink: styled.div`
    height: 27px;
    line-height: 25px;
    font-weight: 300;
    padding-left: 5px;
    border: 1px solid gray;
    border-radius: 3px;
    font-size: 0.8rem;
    overflow: hidden;
    -webkit-border-radius: 0;
    border: 1.4px solid var(--color-ui-border);
    border-radius: 3px;
    &:hover {
      outline: 3.5px solid rgba(179, 211, 234, 0.5);
      border-radius: 3px;
      border: 1px solid var(--color-button-blue);
    }
  `,
};
