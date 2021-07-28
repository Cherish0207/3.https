const { createCipheriv, createDecipheriv } = require("crypto");
/**
 *
 * @param {*} data
 * @param {*} key 用于加密的密钥 如果加密算法是128，则对应的密钥是16位，加密算法是256，则对应的密钥是32位
 * @param {*} iv 指定加密时所用的向量，相当于加盐
 * @returns
 */
function encrypt(data, key, iv) {
  // aes-128-cbc: 指定加密算法
  //   aes-加密算法的类型,aes是市面上最主流的对称加密算法
  //   128-长度-长度越长加密越慢,
  //   cbc-模式
  let cipher = createCipheriv("aes-128-cbc", key, iv);
  cipher.update(data);
  // hex: 表示16进制--把结果输出成16进制的字符串
  return cipher.final("hex");
}

function decrypt(data, key, iv) {
  let decipher = createDecipheriv("aes-128-cbc", key, iv);
  decipher.update(data, "hex"); // 数据是16进制的字符串
  return decipher.final("utf-8"); // 把结果输出成utf8字符串
}

let key = "1234567890123456";
let iv = "1234567890123456";
let data = "hello";
let encrypted = encrypt(data, key, iv);
console.log("数据加密后:", encrypted); // 加密后得到一个十六进制的字符串
let decrypted = decrypt(encrypted, key, iv);
console.log("数据解密后:", decrypted);
