class AppError {
  public readonly message: string;

  public readonly statusCode: number; // status dos erros (400,401,200...)

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
