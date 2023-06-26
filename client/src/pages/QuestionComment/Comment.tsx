import { styled } from 'styled-components';
import CommentList from './CommentLIst';
import CommentWrite from './CommentWrite';

const Comment =() => {
  return (
    <S.Container>
      <CommentList />
      <CommentWrite />
    </S.Container>
  )
}

const S={
  Container:styled.div`
    display: block;
  `
}

export default Comment;