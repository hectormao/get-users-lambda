import httpStatus from "http-status";

export class UserNotFoundException extends Error {
  private readonly statusCode: number = httpStatus.NOT_FOUND;
  constructor(private readonly msg: string) {
    super(msg);
  }
}
