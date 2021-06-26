/*
software control:
- variables not empty
- variables only number
- variables have a range
*/
'use strict'
var Data;

// library
const modbus = require("jsmodbus");
const net = require('net');
const readline = require("readline");

// Input data
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.on("close", function() {
  process.exit(0);
});

repeat();

function repeat(){
rl.question("ipaddress: ", function(ip){
           //console.log(typeof(ip));
    rl.question("port (default 502): ", function(port){
              //console.log({port});
      rl.question("slave address: ", function(slaveid){
               //console.log({slaveid});
        rl.question("FC: ", function(functionCode){
                //console.log({functionCode});
          rl.question("Start register or register: ", function(register){
                  //console.log({register})              
                  console.log([{"ip":ip},{"port":port},{"slave":slaveid},{"fc":functionCode},{"reg":register}],"your selection")
                  const socket = new net.Socket()
                  const options = {
                      //'host':'localhost',
                      'host': ip,
                      'port': port
                  }
                  const client = new modbus.client.TCP(socket)
                  switch(functionCode){
                    case "1":
                      socket.on('connect', function (fc_1) {
                      client.readCoils(register,1)
                      .then(function (resp) {
                        console.log(resp)
                        socket.end()
                      }).catch(function () {
                        console.error(arguments)
                        socket.end()
                      })})
                      socket.on('error', console.error)
                      socket.connect(options)
                    break;
                    
                    case "2":
                      socket.on('connect', function (fc_2) {
                        client.readDiscreteInputs(register,1)
                        .then(function (resp) {
                          console.log(resp)
                          socket.end()
                        }).catch(function () {
                          console.error(arguments)
                          socket.end()
                        })})
                        socket.on('error', console.error)
                        socket.connect(options)
                    break;
                    
                    case "3":
                      socket.on('connect', function (fc_3) {
                        client.readHoldingRegisters(register,10)
                        .then(function (resp) {
                          console.log(resp)
                          socket.end()
                        }).catch(function () {
                          console.error(arguments)
                          socket.end()
                        })})
                       socket.on('error', console.error)
                       socket.connect(options)
                    break;
                    
                    case "4":
                      socket.on('connect', function (fc_4) {
                        client.readDiscreteInputs(register,1)
                        .then(function (resp) {
                          console.log(resp)
                          socket.end()
                        }).catch(function () {
                          console.error(arguments)
                          socket.end()
                        })})
                        socket.on('error', console.error)
                        socket.connect(options)
                    break;
                    
                    case "5":
                      rl.question("register value: ", function(value){
                        var values = parseInt(value,2)
                        client.writeSingleCoil(register,values)
                        .then(function (resp) {
                          console.log(resp)
                          socket.end()
                        }).catch(function () {
                          console.error(arguments)
                          socket.end()
                        })})
                        socket.on('error', console.error)
                        socket.connect(options)
                    break;
                    
                    case "6":
                      rl.question("register value: ", function(value){
                        var values = parseInt(value,10)
                        client.writeSingleRegister(register,values)
                        .then(function (resp) {
                          console.log(resp)
                          socket.end()
                        }).catch(function () {
                          console.error(arguments)
                          socket.end()
                        })})
                        socket.on('error', console.error)
                        socket.connect(options)
                    break;
                    
                    case "15":
                      rl.question("array of value: ", function(str){
                        var values=str.split`,`.map(x=>+x)
                        client.writeMultipleCoils(register,values)
                        .then(function (resp) {
                          console.log(resp)
                          socket.end()
                        }).catch(function () {
                          console.error(arguments)
                          socket.end()
                        })})
                        socket.on('error', console.error)
                        socket.connect(options)
                    break;
                    
                    case "16":
                      rl.question("array of value: ", function(str){
                        var values=str.split`,`.map(x=>+x)
                        client.writeMultipleRegisters(register,values)
                        .then(function (resp) {
                          console.log(resp)
                          socket.end()
                        }).catch(function () {
                          console.error(arguments)
                          socket.end()
                        })})
                        socket.on('error', console.error)
                        socket.connect(options)
                    break;
                    }
                  })
                 })
                })
              })
            })
          }

          rl.question("another request? 1 or 0: ", function(answer){
            if(answer == 1){
              repeat();
            }else{
              rl.close();
            }
          })
