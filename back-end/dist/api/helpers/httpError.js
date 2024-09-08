"use strict";
class HttpError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
// const HttpError = function (message, code) {
//   const customError = Object.create(Error);
//   customError.message = message;
//   customError.code = code;
//   return customError;
// };
module.exports = HttpError;
