import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  private createBookDto: void;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  isbn: string;

  @ApiProperty()
  @IsNumber()
  publishYear: number;

  @ApiProperty()
  @IsString()
  publisher: string;
}
