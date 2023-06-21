import styled from 'styled-components';

// 디자인 공통 컴포넌트

const CommonStyles = {
  UserContainer: styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 56px);
    > div {
      margin-bottom: 1.6rem;
    }
  `,
  UserInner: styled.div`
    min-width: 19rem;
    max-width: 19rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
  `,
  FormContainer: styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    padding: 1.6rem;
    background-color: #fff;
    border-radius: 0.3rem;
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.05),
      0 1rem 2rem rgba(0, 0, 0, 0.05), 0 1rem 3rem rgba(0, 0, 0, 0.1);
  `,
  Form: styled.form`
    width: 100%;
  `,
  CaptionWrap: styled.div`
    font-size: var(--font-xs);
    color: hsl(210, 8%, 45%);
    > a {
      color: var(--color-blue-200);
      &:hover {
        color: var(--color-blue-100);
      }
    }
  `,
  FormButtonWrap: styled.div`
    display: flex;
    width: 100%;
    margin: 1rem auto 2rem;
  `,
};

export default CommonStyles;