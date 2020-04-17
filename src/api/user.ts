
import { post } from './index';

interface UserInfo {
  phone: string;
  password: string;
}

export const consoleUserLogin = (params: UserInfo) => post('/console/user/login', params, {
  headers: {
    'Content-Type': 'application/json',
  },
});

export const consoleUserLogout = () => post('/console/user/logout');

export default {};
