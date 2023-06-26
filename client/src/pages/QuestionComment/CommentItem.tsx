import { styled } from 'styled-components';
import { Comment } from '../../types/types';


interface CommentProps {
  commentData: Comment;
}

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
    padding: 0 20px;
  `,
  Div:styled.div`
    display: inline-block;
    /* border: 1px solid hsl(210, 8%, 95%);; */
    /* border-right: #ffffff; */
    border-bottom: 1px solid hsl(210, 8%, 95%);
    padding: 6px;
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