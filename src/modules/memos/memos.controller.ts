import { Body, Controller, Get, Headers, Post, Put, UseGuards } from '@nestjs/common';
import { MemosService } from '@src/modules/memos/memos.service';
import { AuthGuard } from '@src/modules/auth/auth.guard';
import { CreateMemoDto, FindMemoDto, UpdateMemoDto } from './memos.dto';
import { getUser, validateAuthState } from '@src/auth';

@Controller('memos')
@UseGuards(AuthGuard)
export class MemosController {
  constructor(private readonly memosService: MemosService) {}

  @Get()
  async find(
    @Headers('authorization') bearerToken: string,
    @Body() dto: FindMemoDto,
  ) {
    const idToken = await validateAuthState(bearerToken);
    const user = await getUser(idToken.uid);
    return await this.memosService.find(dto, user);
  }

  @Post()
  async create(
    @Headers('authorization') bearerToken: string,
    @Body() dto: CreateMemoDto,
  ) {
    const idToken = await validateAuthState(bearerToken);
    const user = await getUser(idToken.uid);
    return await this.memosService.create(dto, user);
  }

  @Put()
  async update(
    @Headers('authorization') bearerToken: string,
    @Body() dto: UpdateMemoDto,
  ) {
    const idToken = await validateAuthState(bearerToken);
    const user = await getUser(idToken.uid);
    return await this.memosService.update(dto, user);
  }
}
