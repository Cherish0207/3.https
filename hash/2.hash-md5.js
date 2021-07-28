const { createHash, createHmac } = require("crypto");
// md5
// 最常用
// 32位，长度不够长，不是很安全
let content = "123456";
let salt = "123456"; //盐值
let md5Hash = createHash("md5").update(content).update(content).digest("hex");
let sha1Hash = createHmac("sha256", salt)
  .update(content)
  .update(content)
  .digest("hex");
console.log(md5Hash, md5Hash.length);
console.log(sha1Hash, sha1Hash.length);
