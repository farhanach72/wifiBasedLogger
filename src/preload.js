const { ipcRenderer } = require("electron")
const { networkInterfaces } = require('os');
const path = require('path')

//getting ip address dynamically
const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object
for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
    // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
    const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
    if (net.family === familyV4Value && !net.internal) {
      if (!results[name]) {
        results[name] = [];
      }
      results[name].push(net.address);
    }
  }
}
//storing ip address to IPV4
const IPV4 = results['Wi-Fi'] ? `${results['Wi-Fi'].join('')}` : undefined


// let dir = path.join(__dirname , '../../../src/data.json')
// console.log("=> ",dir)

// exec(`npx json-server --watch ${dir} --port 8000 --no-cors -H ${IPV4}`);

// contextBridge.exposeInMainWorld("myApp", {
//     ipv4:`${IPV4}`,
// })
