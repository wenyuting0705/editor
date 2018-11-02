import qs from 'qs';
import axios from 'axios';
import Promise from 'promise-polyfill';
import { message } from 'antd';

const APITYPE = process.env.API_ROOT;
const baseURL = window.location.hostname.indexOf('demo') !== -1 ? `${window.location.protocol}//demo.` : `${window.location.protocol}//`;
const instance = axios.create({
  // baseURL,
  timeout: 200000,
});
const base = args =>
  // if (args.method.toLocaleLowerCase() === 'post') {
   instance({
    ...args,
    url: APITYPE === 'build' ? baseURL + args.url : args.url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(args.data),
    withCredentials: true
  });
  // }
  // return instince(args)


export default args => base(args)
  .then((result) => {
    if (!window.Promise) {
      window.Promise = Promise;
    }
    if (result.status !== 200) {
      message.warning('未知错误');
    }
    if (result.data.errno !== 0) {
      message.warning(result.errmsg);
    }
    return result.data;
  }, () => Promise.resolve({
      error: '未知错误'
    }));
