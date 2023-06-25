//날짜를 계산하는 함수 (오늘 남긴 것은 today이라고 표기 됨.)

const timeForToday = (value:string)=> {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  
  // if (betweenTime < 1) return '방금전';
  // if (betweenTime < 60) {
  //     return `${betweenTime}분전`;
  // }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
      return `Today`;
  }

  const betweenTimeYesterday = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 48) {
      return `Yesterday`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
      return `${betweenTimeDay} days ago`;
  }

  return `${Math.floor(betweenTimeDay / 365)} years ago`;

}
  export default timeForToday;