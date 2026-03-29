import { getRequestConfig } from 'next-intl/server';
import { messages } from '@thor/i18n';

export default getRequestConfig(async () => {
  // Static for now, we'll change this later
  const locale = 'en';
  console.log('Request config called with locale:', messages[locale]);
  return {
    locale,
    messages: messages[locale],
  };
});
