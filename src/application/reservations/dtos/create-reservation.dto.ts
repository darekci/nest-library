import { IsNotEmpty, IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  private createReservationDto: void;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  reservationDays: number;
}
