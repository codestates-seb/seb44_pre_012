import { styled } from 'styled-components';
import '../../index.css';
import { data } from '../../temp/TagsQuery.json';

export default function RelatedTags() {
  return (
    <div>
      {data.map(item => (
        <S.OneTag key={item.tagName}>
          <button>{item.tagName}</button> <div>&times; {item.numberOfTags}</div>
        </S.OneTag>
      ))}
    </div>
  );
}

const S = {
  OneTag: styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 9px;
    button {
      border-radius: 3px;
      padding: 4px 6px;
      background-color: var(--color-button-sky);
      color: var(--color-tag-blue);
      margin-right: 6px;
      font-size: 12px;
    }
    div {
      font-size: 11px;
      colors: var(--color-subInfo-lightgray);
    }
  `,
};
