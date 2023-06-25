import { styled } from 'styled-components';
import { Comment } from '../../../types/types';


interface CommentProps {
  content: Comment;
}

const CommentItem =({content}:CommentProps) => {
  const timeValue = new Date(content.createdAt);

  return (
    <S.Container>
      <S.Content>{content.commentContent}</S.Content>
      <S.CommentDate>{content.createdAt}</S.CommentDate>
    </S.Container>
  )
}


const S={
  Container:styled.div`
    display: flex;
    flex-wrap: wrap;
  `,
  Content:styled.span`
    font-size: 12px;
    color: hsl(210, 8%, 15%);
  `,
  CommentDate:styled.span`
    
  `
}

export default CommentItem;