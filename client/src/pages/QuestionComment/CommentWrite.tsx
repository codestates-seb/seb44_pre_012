import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import { useState } from "react";

  // const isLoggedIn = useSelector(
  //   (state: RootState) => state.auth.login.isLogin
  // );

const isLoggedIn = true;

//댓글 작성하는 컴포넌트
const CommentWrite =() => {
  const add =() => {
    // isLoggedIn? return {<S.Input>}: false;
  }

  const [inputValue, setInputValue] = useState("");

  const valueHandler =(e) => {
    setInputValue(e.target.value);
  }

  const formSubmit = () => {
    //post요청
    //get요청
  }

  return (
    <S.Container>
      <S.Add onClick={add}>
        {"Add a comment"}
      </S.Add>
      <S.Form onSubmit={formSubmit}>
        <S.Input value={inputValue} onChange={valueHandler} />
        <S.Btn type="submit">submit</S.Btn>
      </S.Form>
    </S.Container>
  )
}
  
const S={
  Container:styled.div`
    display: block;
  `,
  Add:styled.div`
    color: #838C95;
    margin-top:10px;
    font-size: 13px;
    &:hover {
      color:#0A95FF;
      cursor: pointer;
    }
  `,
  Form:styled.form`
    width: 95%;
    margin: 12px 4px 4px 28px;
  `,
  Input:styled.input`
    width: 80%;
    height: 30px;
    font-size: 14px;
    border: none;
    margin-top:-4px;
  `,
  Btn:styled.button`
    margin: 16px 4px -18px 8px;
    padding: 4px 10px;
    height: 30px;
    background: var(--color-button-blue);
    border: 1px solid var(--color-button-blue);
    font-weight: 500;
    color: #ffffff;
    border-radius: 3px;
    white-space: nowrap;
    box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;
    font-size: 13px;
    &:hover {
    background: var(--color-content-title);
    }
  `
}

export default CommentWrite;