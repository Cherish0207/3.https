let { generateKeyPairSync, privateEncrypt, publicDecrypt } = require("crypto");
let rsa = generateKeyPairSync("rsa", {
  modulusLength: 1024,
  publicKeyEncoding: {
    type: "spki",
    format: "pem", //base64格式的私钥
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
    cipher: "aes-256-cbc",
    passphrase: "aa", // 私钥的密码
  },
});
let message = "hello";
let enc_by_prv = privateEncrypt(
  {
    key: rsa.privateKey,
    passphrase: "aa",
  },
  Buffer.from(message, "utf8")
);
let dec_by_pub = publicDecrypt(rsa.publicKey, enc_by_prv);
console.log("数据私钥加密后: " + enc_by_prv.toString("hex"));
console.log("数据公钥解密后: " + dec_by_pub.toString("utf8"));
