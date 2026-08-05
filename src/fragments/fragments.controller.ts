import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FragmentsService } from './fragments.service';
import { SpendFragmentDto } from './dto/spend-fragment.dto';

@Controller('fragments')
@UseGuards(JwtAuthGuard)
export class FragmentsController {
  constructor(private readonly fragmentsService: FragmentsService) {}

  @Get('balance')
  getBalance(@Request() req: { user: { id: string } }) {
    return this.fragmentsService.getBalance(req.user.id);
  }

  @Get('transactions')
  getTransactions(
    @Request() req: { user: { id: string } },
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const parsedLimit = limit ? parseInt(limit, 10) : 20;
    const parsedOffset = offset ? parseInt(offset, 10) : 0;
    return this.fragmentsService.getTransactions(req.user.id, parsedLimit, parsedOffset);
  }

  @Post('spend')
  spend(
    @Request() req: { user: { id: string } },
    @Body() spendDto: SpendFragmentDto,
  ) {
    return this.fragmentsService.spend(req.user.id, spendDto.amount, spendDto.description);
  }
}
