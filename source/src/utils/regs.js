const regs = {
  phone: /^((1[3-9][0-9])+\d{8})$/,
  email: /^[-_.A-Za-z\d]{1,16}@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/,
  mobile: /^((1[3-9][0-9])+\d{8})$/,
  captcha: /^\d{6}$/,
  nickname: /^(?!\d+$)[\u4e00-\u9fa5A-Za-z\d_]{4,30}$/,
  identity: /^\d{15}(\d\d[0-9xX])?$/,
  password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/,
  userPassword: /^[0-9A-Za-z_.]{6,18}$/,
  date: /^(\d{4})\/((0?([1-9]))|(1[0|1|2]))\/((0?[1-9])|([12]([0-9]))|(3[0|1]))$/,
  Ip:  /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/,
	http:/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-_%&\?\/.=])+$/
};

export default {
  checkPhone: phone => regs.phone.test(phone),
  checkEmail: email => regs.email.test(email),
  checkNickName: nickname => regs.nickname.test(nickname),
  checkPassword: password => regs.password.test(password),
	checkIp: Ip => regs.Ip.test(Ip),
	checkHttp: http => regs.http.test(http),
};
