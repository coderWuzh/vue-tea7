const User = {
  // 查找手机号
  queryUserTel(option) {
    return 'select * from user_list where tel = ' + option.userTel + ''
  },
  // 查找密码
  queryUserPwd(option) {
    return 'select * from user_list where tel = "' + option.userTel + '" and pwd = "' + option.userPwd + '"'
  },
  // 插入数据
  insertData(option) {
    let userTel = option.userTel;
    let userPwd = option.userPwd;
    const jwt = require('jsonwebtoken');
    let payload = { tel: userTel }
    let secret = 'wuzhenhua'
    let token = jwt.sign(payload, secret, {
      expiresIn: 60
    });
    return 'insert into user_list(tel,pwd,imgUrl,nickName,token) values("' + userTel + '","' + userPwd + '","./images/user.jpeg","' + userTel + '","' + token + '")'
  },
  // 修改密码
  changeUserPwd(option) {
    return 'update user_list set pwd="' + option.userPwd + '" where tel = "' + option.userTel + '"'
  }
}
exports = module.exports = User