import { ApiProperty } from "@nestjs/swagger";

export class BookDto {
  private bookDto: void;

  @ApiProperty()
  id: number;

  @ApiProperty()
  author: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  isbn: string;

  @ApiProperty()
  publishDate: Date;

  @ApiProperty()
  publisher: string;
}