const secretKey = 3;
function encrypt(str) {
  let buffer = Buffer.from(str);
  for (let i = 0; i < buffer.length; i++) {
    const buf = buffer[i];
    buffer[i] = buf + secretKey;
  }
  return buffer.toString();
}
function decrypt(str) {
  let buffer = Buffer.from(str);
  for (let i = 0; i < buffer.length; i++) {
    const buf = buffer[i];
    buffer[i] = buf - secretKey;
  }
  return buffer.toString();
}
let string = "hello";
let stringSecret = encrypt(string);
let decryptString = decrypt(stringSecret);
console.log(stringSecret);
console.log(decryptString);
