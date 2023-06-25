import errorImg from '../assets/404Error.svg';
import { Link } from 'react-router-dom';
import CommonStyles from '../style/CommonStyles';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { styled } from 'styled-components';

export default function NotFound() {
  return (
    <>
      <Header />
      <S.Container>
        <S.ErrorWrap>
          <S.ErrorImg src={errorImg} />
          <S.ErrorTextWrap>
            <S.ErrorText>현재 404 에러가 발생하였습니다.</S.ErrorText>
            <S.ErrorText>
              <Link to="/">이곳</Link>을 클릭하여 메인페이지로 이동해주세요.
            </S.ErrorText>
          </S.ErrorTextWrap>
        </S.ErrorWrap>
      </S.Container>
      <Footer />
    </>
  );
}

const S = {
  ...CommonStyles,
  Container: styled.div<{ background: string }>`
    display: flex;
    flex: 1;
    min-height: 100%;
  `,
};
