import { Exclude, Expose } from 'class-transformer';
import { ResponseStatus } from '../unions/response.union';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @Exclude() private readonly _status: ResponseStatus;
  @Exclude() private readonly _message?: string;
  @Exclude() private readonly _data?: object;
  @Exclude() private readonly _date: number;

  constructor(
    status: ResponseStatus,
    message?: string,
    data?: object,
    date?: number,
  ) {
    this._status = status;
    this._message = message;
    this._data = data;
    this._date = date;
  }

  static success(message?: string): ResponseDto {
    return new ResponseDto('success', message);
  }

  static successWithArrayJSON(data: object, message?: string): ResponseDto {
    return new ResponseDto('success', message, [data]);
  }

  static successWithJSON(data: object, message?: string): ResponseDto {
    return new ResponseDto('success', message, data);
  }

  static fail(message: string): ResponseDto {
    return new ResponseDto('fail', message);
  }

  static error(message: string): ResponseDto {
    return new ResponseDto('error', message);
  }

  static exception(message: string): ResponseDto {
    return new ResponseDto('exception', message);
  }

  @ApiProperty()
  @Expose()
  get status(): ResponseStatus {
    return this._status;
  }

  @ApiProperty()
  @Expose()
  get message(): string {
    return this._message;
  }

  @ApiProperty()
  @Expose()
  get data(): object {
    return this._data;
  }

  @ApiProperty()
  @Expose()
  get date(): number {
    return this._date;
  }
}
