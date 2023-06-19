export function formatElapsedTime(createdAt:string) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const tempPostedTime = new Date(createdAt);
  const now = new Date();
  const elapsedMilliseconds = now.getTime() - tempPostedTime.getTime();
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);

  let formattedElapsedTime;
  switch (true) {
    case elapsedDays > 0:
      const formattedDate = `${
        monthNames[tempPostedTime.getMonth()]
      } ${tempPostedTime.getDate()}, ${tempPostedTime.getFullYear()}`;
      const formattedTime = `${tempPostedTime.getHours()}:${String(
        tempPostedTime.getMinutes()
      ).padStart(2, '0')}`;
      formattedElapsedTime = `${formattedDate} at ${formattedTime}`;
      break;
    case elapsedHours > 1:
      formattedElapsedTime = `${elapsedHours} hours ago`;
      break;
    case elapsedHours === 1:
      formattedElapsedTime = `${elapsedHours} hour ago`;
      break;
    case elapsedMinutes > 0:
      formattedElapsedTime = `${elapsedMinutes} minute(s) ago`;
      break;
    default:
      formattedElapsedTime = `${elapsedSeconds} seconds ago`;
      break;
  }

  return formattedElapsedTime;
}
