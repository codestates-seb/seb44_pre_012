import { styled } from 'styled-components';
import { HiPencil } from 'react-icons/hi';
import { LuCat } from 'react-icons/lu';
import { SiStackoverflow } from 'react-icons/si';
import { SlSpeech } from 'react-icons/sl';
import '../../index.css';
import cutie from '../../assets/귀요미.png';
import RelatedTags from './RelatedTags';

export default function Aside() {
  return (
    <S.Aside>
      <S.YellowBox>
        <div>The Overflow Blog</div>
        <S.Sub>
          <HiPencil size={15} />
          <a>
            023 Developer Survey results are in: the latest trends in technology
            and...
          </a>
        </S.Sub>
        <S.Sub>
          <HiPencil size={15} />
          <a>
            Hype or not? AI’s benefits for developers explored in the 2023
            Developer Survey
          </a>
        </S.Sub>
        <div>Featured on Meta</div>
        <S.Sub>
          <SlSpeech size={15} />
          <a>Statement from SO: June 5, 2023 Moderator Action</a>
        </S.Sub>
        <S.Sub>
          <SlSpeech size={15} />
          <a>
            Planned maintenance scheduled for Thursday, June 15, 2023 at 21:00
            UTC
          </a>
        </S.Sub>
        <S.Sub>
          <LuCat size={15} /> <a>I love Mango so much</a>
        </S.Sub>
        <S.Sub>
          <SiStackoverflow size={15} />
          <a>Temporary policy: ChatGPT is banned</a>
        </S.Sub>
      </S.YellowBox>
      <S.Ad>
        <div>
          <div>&times;</div>
          <img src={cutie} />
        </div>
        <a>You can't report this ad</a>
      </S.Ad>
      <S.TagBox>
        <div>Related Tags </div>
        <div>
          <RelatedTags />
          <a>more related tags</a>
        </div>
      </S.TagBox>
    </S.Aside>
  );
}

const S = {
  Aside: styled.aside`
    padding: 25px;

    @media (max-width: 979px) {
      display: none;
    }
  `,

  YellowBox: styled.div`
    color: var(--color-content-desc);
    width: 280px;
    background: var(--color-aside-lightyellow);
    border: 0.9px solid #fbe285;
    border-radius: 3px;
    margin-bottom: 16px;
    font-size: 13px;

    div {
      display: flex;
      align-items: flex-start;
      padding: 0 12px;
    }

    div:nth-child(1),
    div:nth-child(4) {
      background: var(--color-aside-yellow);
      font-size: 12px;
      font-weight: 800;
      padding: 12px 15px;
      margin: 10px 0;
    }
    div:nth-child(1) {
      margin: 0px 0 10px 0;
    }
    div:nth-child(8) {
      margin-bottom: 10px;
    }
    a {
      width: 90%;
      font-size: 13px;
    }
  `,
  Sub: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 7px 4px 0 4px;

    div {
      width: 280px;
    }
  `,
  Ad: styled.div`
    width: 280px;
    height: 230px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative;
    margin-bottom: 56px;
    > div {
      border: 0.9px solid var(--color-layout-lightgray);
      width: 100%;
      height: 100%;

      > div {
        width: 15px;
        text-align: center;
        line-height: 12px;
        height: 15px;
        background-color: white;
        position: absolute;
        right: 1px;
        top: 1px;
        color: var(--color-button-blue);
        font-size: 21px;

        &:hover {
          background: var(--color-button-gray);
          color: white;
          cursor: pointer;
        }
      }
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 0 -25px;
    }

    a {
      color: var(--color-content-title);
      font-size: 11px;

      &:hover {
        color: var(--color-button-blue);
      }
    }
  `,
  TagBox: styled.div`
    a {
      color: var(--color-content-title);
      font-size: 13px;
      margin-top: 7px;
      display: inline-block;
      &:hover {
        color: var(--color-button-blue);
      }
    }
    > div:first-child {
      font-size: 19px;
      font-weight: 500;
      color: var(--color-content-desc);
      margin-bottom: 21px;
    }
  `,
};
