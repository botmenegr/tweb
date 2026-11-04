export const CURRENT_ACCOUNT_QUERY_PARAM = 'account';

export const MAX_ACCOUNTS_FREE = 25;
export const MAX_ACCOUNTS_PREMIUM = 25;
export const MAX_ACCOUNTS = MAX_ACCOUNTS_PREMIUM;
export const ACCOUNT_NUMBERS = Array.from({length: MAX_ACCOUNTS}, (_, i) => i + 1);
