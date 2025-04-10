
class AppError extends Error {
  constructor(statusCode=500,message="Something went wrong!", data={} ) {
    super(message); // Call the Error constructor
    this.statusCode = statusCode;
    this.data = data;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Identify operational errors

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports =  AppError ;
