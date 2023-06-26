import { styled } from 'styled-components';
import { Comment } from '../../types/types';


interface CommentProps {
  commentData: Comment;
}

//날짜를 계산하는 함수 ((comment)
const timeForComment = (value:Date)=> {
  const today = new Date();
  const timeValue = new Date(value);
  const hours =`${timeValue.getHours() < 10 ? `0${timeValue.getHours()}` : `${timeValue.getHours()}`}:${timeValue.getMinutes() < 10 ? `0${timeValue.getMinutes()}` : `${timeValue.getMinutes()}`}`;
  const monthName = timeValue.toLocaleString('en-US', { month: 'long' });
  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  
  if (betweenTime < 1) return 'a few minutes ago';
  if (betweenTime < 60) {
    return `${betweenTime}mins ago`;
  }
  if (betweenTime < 120) {
    return `${betweenTime}hour ago`;
  }
  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTime}hours ago`;
  }
  if (betweenTimeHour < 36) {
    return `${betweenTimeHour}days ago`
  } else {
    return ` ${monthName} ${timeValue.getDate()} at ${hours}`
  }
}


//댓글 한 개를 그려주는 컴포넌트
const CommentItem =({commentData}:CommentProps) => {
  const timeValue = new Date(commentData.createdAt);

  return (
    <S.Container>
      <S.Div>
        <S.Content>{commentData.commentContent+' - '}</S.Content>
        <S.CommentName>{"UserName"}</S.CommentName>
        <S.CommentDate>{timeForComment(timeValue)}</S.CommentDate>
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