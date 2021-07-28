let { generateKeyPairSync, createHash } = require("crypto");
let { getSign, verifySign } = require("./1.数字签名和数字证书实现过程");
let passphrase = "zhufeng";
let serverRSA = generateKeyPairSync("rsa", {
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
let caRSA = generateKeyPairSync("rsa", {
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
// 服务器把这个申请信息(域名和服务器公钥)发给CA机构请求颁发证书
const info = {
  domain: "http://127.0.0.1:8080",
  publicKey: serverRSA.publicKey,
};
// 实现的时候签名的并不是info,而是它的hash。因为签名算法很大会消耗性能
const hash = createHash("sha256").update(JSON.stringify(info)).digest("hex");
// CA 用自己的私钥将服务器的公钥进行数字签名
const sign = getSign(hash, caRSA.privateKey, passphrase);
// CA 并颁发数字证书
const cert = { info, sign };

// 客户端会用CA的公钥验证证书的合法性，然后取出公钥
let certIsValid = verifySign(hash, cert.sign, caRSA.publicKey);
console.log("浏览器验证CA的签名", certIsValid);
let serverPublicKey = cert.info.publicKey