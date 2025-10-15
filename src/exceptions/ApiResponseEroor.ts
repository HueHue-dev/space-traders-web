export class ApiError extends Error {
  public readonly code?: number;

  public readonly data?: any;

  constructor(
    message: string,
    code?: number,
    data?: any
  ) {
    super(message);
    this.code = code;
    this.data = data;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
