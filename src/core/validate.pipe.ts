import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
  public async transform(value, metadata: ArgumentMetadata) {
    try {
      const result = await super.transform(value, metadata);
      return result;
    } catch (e) {
      if (e instanceof BadRequestException) {
        const eResponse = e.getResponse();
        throw new UnprocessableEntityException(
          this.handleError(eResponse['message']),
        );
      }
    }
  }

  private handleError(errors) {
    const result = Array.isArray(errors);
    if (result) {
      const err = errors.map((error) => error);
      return err;
    } else {
      return errors;
    }
  }
}
