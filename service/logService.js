"use strict"

let createLogService = function () {
  let logApiCall = function (body, nextName) {
    console.log(
      "Request:[" +
      body + 
      "]/n Next:[" +
      nextName +
      "]");
  };

  return {
    logApiCall: logApiCall
  };
};

let LogService = createLogService();
module.exports = LogService;

