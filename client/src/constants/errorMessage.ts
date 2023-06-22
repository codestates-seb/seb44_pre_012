export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'No user found with matching email.' as const,
  INVALID_PASSWORD: 'The email or password is incorrect.' as const,
  EMAIL_EMPTY: 'Email cannot be empty.' as const,
  PASSWORD_EMPTY: 'Password cannot be empty.' as const,
  DISPLAYNAME_EMPTY: 'Display name cannot be empty.' as const,
  LOGIN_ERROR: 'An error occurred with log in.' as const,
  REGISTER_ERROR:
    'Something went wrong. Please contact us at community-support@stackoverflow.email for assistance' as const,
  DISPLAY_NAME_NUMBER_ERROR:
    'The display name must be at least 5 characters.' as const,
  EMAIL_FORMAT_ERROR: ' is not a valid email address.' as const,
  EMAIL_DUPLICATION_ERROR:
    'This email is already in use. Please use a different one.' as const,
  PASSWORD_ERROR_CONTAIN:
    'Please add one of the following things to make your password stronger: ' as const,
  PASSWORD_ERROR_FORMAT:
    'Passwords must contain at least eight characters, including at least 1 letter, 1 number, and 1 special character (!, @, #, $, %, ^, &, *).' as const,
};
