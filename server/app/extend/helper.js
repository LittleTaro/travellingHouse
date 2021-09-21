// eslint-disable-next-line strict
const dayjs = require('dayjs');

module.exports = {
  time() { // 获取当前日期
    return dayjs().format('YYYY-MM-DD HH:mm:ss');
  },
  timestamp(data) { // 获取对应日期的时间戳
    return new Date(data).getTime();
  },
  unPick(source, arr) { // 去除不需要返回的键值对
    if (Array.isArray(arr)) {
      const obj = {};
      for (const i in source) {
        if (!arr.includes(i)) {
          obj[i] = source[i];
        }
      }
      return obj;
    }
  },
};
