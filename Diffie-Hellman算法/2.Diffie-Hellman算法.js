
const { createDiffieHellman } = require("crypto");

var client = createDiffieHellman(512);
var client_keys = client.generateKeys();

var prime = client.getPrime();
var generator = client.getGenerator();

var server = createDiffieHellman(prime, generator);
var server_keys = server.generateKeys();

var client_secret = client.computeSecret(server_keys);
var server_secret = server.computeSecret(client_keys);

console.log("client_secret: " + client_secret.toString("hex"));
console.log("server_secret: " + server_secret.toString("hex"));