import axios from 'axios';
import { computed } from 'vue';
import Cookies from 'js-cookie';

const redirectUrl = window.location.href;
const domain = window.location.hostname.slice(window.location.hostname.split('.')[0].length);

const authLink = `${import.meta.env.VITE_APP_AUTH_URL || `http://localhost:5173/tradition.webapp/signin`}`;

const isUnauthorizedPage = computed(() => {
  const tokens = getTokenFromCookies();
  const unauthorizedPages= [
    '/signin'
  ];
  return unauthorizedPages.includes(window.location.pathname) && !tokens;
});

const getTokenFromCookies = (): string | null => {
  const cookies = document.cookie.split('; ');
  let accessToken: string = '';
  
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === 'jwt') {
      accessToken = value;
    }
  }

  if (accessToken) {
    return accessToken;
  }

  return null;
};

axios.interceptors.request.use(
  async (config) => {
    const configOptions = config;

    if (!isUnauthorizedPage.value) {
      let tokens = getTokenFromCookies();
      
      if (!tokens) {
        // window.location.href = authLink;
        throw new Error('Access token and/or refresh token not found in cookies');
      }
    
      const accessToken = tokens;

      configOptions.headers['Access-Control-Allow-Origin'] = '*';
      configOptions.headers.Accept = 'application/json';

      configOptions.headers.Authorization = `Bearer ${accessToken}`;
    }
    return configOptions;
  },
  (error) => Promise.reject(error),
);