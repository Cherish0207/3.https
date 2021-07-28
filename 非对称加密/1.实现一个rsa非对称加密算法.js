
let p = 3,
  q = 11;
let n = p * q;
let fn = (p - 1) * (q - 1);
let e = 7;
for (var d = 1; (e * d) % fn !== 1; d++) {
  console.log(d, e * d, fn, (e * d) % fn);
}
console.log(d);
