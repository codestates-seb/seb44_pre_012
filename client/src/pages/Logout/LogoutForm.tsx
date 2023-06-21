import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import CommonStyles from '../../style/CommonStyles';
import { BsBookmarkHeartFill } from 'react-icons/bs';
import InputCheck from '../../components/InputCheck';
import { USER_MESSAGES } from '../../constants/userMessages';
import FormSubmit from '../../components/FormSubmit';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

export default function LogoutForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutRequestHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('memberid');
    dispatch(
      logout({
        accessToken: null,
        memberId: null,
        isLogin: false,
        refreshToken: null,
      })
    );
    navigate('/users/login');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const teams = [
    { part: 'FE', name: '김가영', github: 'https://github.com/sogood17' },
    { part: 'FE', name: '오은비', github: 'https://github.com/dreamogu' },
    { part: 'FE', name: '이선아', github: 'https://github.com/Doyu-Lee' },
    { part: 'FE', name: '최연동', github: 'https://github.com/YeondongChoe' },
    { part: 'BE', name: '김영식', github: 'https://github.com/kimyoungsik12' },
    { part: 'BE', name: '박형준', github: 'https://github.com/1004mapa2' },
    { part: 'BE', name: '황성재', github: 'https://github.com/hsj2588' },
  ];
  return (
    <S.FormContainer>
      <S.Form onSubmit={logoutRequestHandler}>
        <S.ListWrap>
          {teams.map((el, idx) => {
            return (
              <S.List key={idx}>
                <BsBookmarkHeartFill
                  color={el.part === 'FE' ? '#5296d5' : '#925cb1'}
                />
                <S.Text>
                  {' '}
                  <Link to={el.github}>
                    [{el.part}] {el.name} Github{' '}
                  </Link>
                </S.Text>
              </S.List>
            );
          })}
        </S.ListWrap>
        <InputCheck
          id={USER_MESSAGES.LOGOUT_CHECK}
          label={USER_MESSAGES.LOGOUT_CHECK_LABEL}
        />
        <S.ButtonWrap>
          <FormSubmit text={USER_MESSAGES.LOGOUT} />
          <S.LinkButton onClick={handleGoBack}>
            {USER_MESSAGES.CANCEL}
          </S.LinkButton>
        </S.ButtonWrap>
        <S.CaptionWrap>{USER_MESSAGES.LOGOUT_CAPTION}</S.CaptionWrap>
      </S.Form>
    </S.FormContainer>
  );
}
const S = {
  ...CommonStyles,
  ListWrap: styled.ul`
    width: 100%;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid hsl(210, 8%, 85%);
    margin-bottom: 1rem;
  `,
  List: styled.li`
    display: flex;
    align-items: center;
    margin: 4px auto;
  `,
  Text: styled.div`
    margin-left: 0.5rem;
    font-weight: 500;
    &:hover {
      background: linear-gradient(90deg, #5296d5, #925cb1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `,
  ButtonWrap: styled.div`
    display: flex;
    width: 100%;
    margin: 1rem auto 2rem;
  `,
  LinkButton: styled.button`
    line-height: 1;
    margin: 2px;
    font-weight: 400;
    box-shadow: var(--button-box-shadow);
    font-size: var(--font-s);
    color: var(--color-blue-200);
    padding: var(--pd-10);
    border-radius: var(--input-border-radius);
    border: 1px solid rgba(0, 0, 0, 0);
    &:hover {
      background: hsl(206, 100%, 97%);
      color: hsl(209, 100%, 37.5%);
    }
    &:focus {
      box-shadow: 0 0 0 4px hsla(206, 100%, 40%, 0.15);
    }
  `,
  CaptionWrap: styled.div`
    font-size: var(--font-xs);
    color: hsl(210, 8%, 45%);
  `,
};
