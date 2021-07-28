let { generateKeyPairSync, createSign, createVerify } = require("crypto");
let passphrase = "zhufeng";
let rsa = generateKeyPairSync("rsa", {
  modulusLength: 1024,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
    cipher: "aes-256-cbc",
    passphrase,
  },
});
//  签名--验证文件验证身份有没有被改过-md5  证书--验证你是不是你
/**
 * 先创建签名对象
 * 放入文件内容
 * 用rsa私钥签名，输出一个16进制的字符串
 * @param {*} content 文件内容
 * @param {*} privateKey rsa私钥
 * @param {*} passphrase 密码
 * @returns
 */
function getSign(content, privateKey, passphrase) {
  var sign = createSign("RSA-SHA256");
  sign.update(content);
  return sign.sign({ key: privateKey, format: "pem", passphrase }, "hex");
}
/**
 * 验证签名对象
 * 放入文件内容
 * 验证签名是否合法ß
 * @param {*} content
 * @param {*} sign
 * @param {*} publicKey
 * @returns
 */
function verifySign(content, sign, publicKey) {
  var verify = createVerify("RSA-SHA256");
  verify.update(content);
  return verify.verify(publicKey, sign, "hex");
}
let content = "hello";
const sign = getSign(content, rsa.privateKey, passphrase);
let serverCertIsValid = verifySign(content, sign, rsa.publicKey);
console.log("serverCertIsValid", serverCertIsValid);
// 内部是这样的实现,我是如何知道签名是否正确呢
// 验证方先拿到文件file,然后用 publickey计算签名sign,如果跟对方的sign匹配,则验证通过

module.exports.getSign = getSign;
module.exports.verifySign = verifySign;
