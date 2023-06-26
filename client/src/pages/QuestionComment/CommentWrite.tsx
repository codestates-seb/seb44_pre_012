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
    width: 300px;
  `,
  Input:styled.input`
    width: 280px;
  `,

}

export default CommentWrite;