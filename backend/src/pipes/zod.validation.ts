import {
    ArgumentMetadata,
    BadRequestException,
    PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) {}

    transform(value: any, metadata: ArgumentMetadata) {
        try {
            const parsedValue = this.schema.parse(value);
            return parsedValue;
        } catch (err) {
            throw new BadRequestException(
                err.issues.map((issue) => ({
                    cause: issue.path[0],
                    message: issue.message,
                })),
                err,
            );
        }
    }
}
