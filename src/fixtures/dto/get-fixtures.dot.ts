// src/fixtures/dto/get-fixtures-query.dto.ts
import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class GetFixturesQueryDto {
  @IsOptional()
  @IsNumberString()
  live?: string;

  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsNumberString()
  league?: string;

  @IsOptional()
  @IsNumberString()
  season?: string;

  @IsOptional()
  @IsNumberString()
  team?: string;

  @IsOptional()
  @IsNumberString()
  last?: string;

  @IsOptional()
  @IsNumberString()
  next?: string;

  @IsOptional()
  @IsString()
  from?: string;

  @IsOptional()
  @IsString()
  to?: string;

  @IsOptional()
  @IsString()
  round?: string;

  @IsOptional()
  @IsString()
  timezone?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsNumberString()
  venue?: string;

  @IsOptional()
  @IsString()
  ids?: string;
}
