import { ZodObject, treeifyError } from 'zod';
import { PipeTransform, BadRequestException } from '@nestjs/common';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject) {}

  public transform(value: any) {
    const validationResult = this.schema.safeParse(value);
    if (!validationResult.success) {
      throw new BadRequestException(
        treeifyError(validationResult.error),
        'Validation failed',
      );
    }
    return validationResult.data;
  }
}
