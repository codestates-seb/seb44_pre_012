import { styled } from 'styled-components';
import { Comment } from '../../types/types';


interface CommentProps {
  commentData: Comment;
}

//댓글 한 개를 그려주는 컴포넌트
const CommentItem =({commentData}:CommentProps) => {
  const timeValue = new Date(commentData.createdAt);

  return (
    <S.Container>
      <S.Div>
        <S.Content>{commentData.commentContent+' - '}</S.Content>
        <S.CommentName>{"UserName"}</S.CommentName>
        <S.CommentDate>{commentData.createdAt}</S.CommentDate>
      </S.Div>
    </S.Container>
  )
}


const S={
  Container:styled.div`
    display: inline-block;
    border-bottom: 1px solid hsl(210, 8%, 95%);
  `,
  Div:styled.div`
    display: inline-block;
    padding: 6px 6px 6px 24px;
  `,
  Content:styled.span`
    font-size: 13px;
    color: hsl(210, 8%, 15%);
  `,
  CommentName:styled.span`
    font-size: 13px;
    color: #0074C2;
    &:hover {
      color: hsl(206, 100%, 52%)
    }
  `,
  CommentDate:styled.span`
    font-size: 13px;
    color: #9199a1;
  `
}

export default CommentItem;