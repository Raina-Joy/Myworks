const http = require('http')
const express = require('./rest')
const server = http.createServer(express);
server.listen(3000);