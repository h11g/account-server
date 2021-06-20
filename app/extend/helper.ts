import sha256 = require('crypto-js/sha256');

const helper = {
  // 加密
  async createPassword(password: string) {
    const hamc = sha256(password, (this as any).config.crypto.secret);
    return hamc.toString();
  },
  // 验证密码
  async checkPassword(password, hash_password) {
    // 先对需要验证的密码进行加密
    password = await this.createPassword(password);
    return password === hash_password;
  },
};

export default helper;
