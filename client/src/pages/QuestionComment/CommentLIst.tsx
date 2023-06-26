import { styled } from 'styled-components';
import {data as commentData} from '../../temp/AllCommentQuery.json';
import CommentItem from './CommentItem';

//댓글 리스트를 그려주는 컴포넌트
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