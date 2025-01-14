const errorMessages = {
  'error.AUTH_FAILED': 'Something went wrong, please try again in a moment',
  'error.USER_ALREADY_EXISTS': 'User with this email exists already',
  'error.INVALID_CREDENTIALS': 'Invalid email or password',
  'error.USER_NOT_FOUND': 'There is no user with this email yet',
  'error.WRONG_SOURCE': 'This email currently used by another source',
  'error.UNAUTHORIZED': 'This action is only for authorized user',
  'error.FORBIDDEN': 'This action is not allowed',
  'error.BAD_DATA': 'Invalid data',
  'error.LOG_OUT_FAILED': 'Unable to log out, please try again in a moment',
  'error.NOT_FOUND': 'Item not found',
  'error.ACCESS_DENIED': 'You are not allowed to perform this action',
  'error.INVALID_CONTENT': 'Content is invalid, please update and try again',
  'error.UNABLE_TO_FETCH':
    'Unable to fetch the current article, please make sure the URL is correct and try again',
  'error.UNABLE_TO_PARSE':
    "Unable to parse the article, an incident shall be created to review the article's content and our parser for errors.",
  'error.ARTICLE_ALREADY_EXISTS': 'This article exists already',
  'error.UNABLE_TO_SHARE': 'Unable to share the current article',
  'error.UNABLE_TO_REMOVE': 'Unable to remove the current article',
  'error.SOMETHING_WENT_WRONG': 'Something went wrong',
  'error.NOT_ALLOWED_TO_PARSE': 'You Are Not Allowed to Save this Page.',
  'error.UNABLE_DEFAULT': 'Unable to Make an Action.',
  'error.EXPIRED_TOKEN':
    "Your sign up page has timed out, you'll be redirected to Google sign in page to authenticate again.",
  'error.USER_EXISTS': 'User with this email exists already',
}

const loginPageMessages = {
  'login.highlight': 'Highlight',
  'login.note': 'Note',
  'login.collaborate': 'Collaborate',
  'login.headline': 'Everything you read. Safe, organized, and easy to share.',
  'login.subheadline':
    'Sign up to join the waitlist and reserve your username.',
  'login.googleAuthButton': 'Continue With Google',
  'login.existingAccountHeadline': 'Already have an account?',
  'login.SIGNUP_SUCCESS': 'Sign up successful',
}

const feedPageMessages = {
  key: 'value',
}

export const englishTranslations = {
  ...errorMessages,
  ...loginPageMessages,
  ...feedPageMessages,
}
