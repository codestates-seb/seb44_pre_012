import { styled } from 'styled-components';
import {data as commentData} from '../../temp/AllCommentQuery.json';
import CommentItem from './CommentItem';

// interface CommentProps {
//   commentData: Comment;
// }

const CommentList =() => {
  return (
    <S.Container>
      <ul>
        {commentData.map(el=> <li><CommentItem key={el.commentId} commentData={el} /></li>)}
      </ul>
    </S.Container>
  )
}
  
const S={
  Container:styled.div`
    display: block;
    border-top: 1px solid hsl(210, 8%, 90%);
  `
}

export default CommentList;