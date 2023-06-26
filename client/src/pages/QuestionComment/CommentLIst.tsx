import { styled } from 'styled-components';
import {AllCommentQuery as content} from '../../temp/AllCommentQuery.json';
import CommentItem from './CommentItem';

interface CommentProps {
  content: Comment;
}

const CommentList =() => {
  return (
    <S.Container>
      <CommentItem content={content} />
    </S.Container>
  )
}
  
const S={
  Container:styled.div`
    display: flex;
  `
}

export default CommentList;