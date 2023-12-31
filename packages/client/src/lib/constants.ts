export const MILLISECONDS_IN_SECOND = 1000;
const DAYS_IN_MONTH = 30;
const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
export const MILLISECONDS_IN_MONTH =
  DAYS_IN_MONTH * HOURS_IN_DAY * MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
export const JWT_AUTH_NAME = 'jwt_authentication';

export const QUERY_KEY = {
  user: 'user',
} as const;
