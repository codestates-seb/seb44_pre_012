import { styled } from 'styled-components';

const CommentWrite =() => {
  return (
    <S.Container>
      <S.Form>
        <S.Input>

        </S.Input>
      </S.Form>
    </S.Container>
  )
}
  
const S={
  Container:styled.div`
    display: flex;
  `,
  Form:styled.form`
    width: 95%;
  `,
  Input:styled.input`
    width: 90%;
    font-size: 14px;
  `,

}

export default CommentWrite;