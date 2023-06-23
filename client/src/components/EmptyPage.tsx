import emptyImg from '../assets/emptyPage.svg';
import { Link } from 'react-router-dom';
import CommonStyles from '../style/CommonStyles';

export default function EmptyPage() {
  return (
    <S.ErrorWrap>
      <S.ErrorImg src={emptyImg} />
      <S.ErrorTextWrap>
        <S.ErrorText>현재 페이지가 비어있습니다.</S.ErrorText>
        <S.ErrorText>
          <Link to="/">이곳</Link>을 클릭하여 메인페이지로 이동해주세요.
        </S.ErrorText>
      </S.ErrorTextWrap>
    </S.ErrorWrap>
  );
}

const S = {
  ...CommonStyles,
};
