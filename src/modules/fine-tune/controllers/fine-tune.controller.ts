import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../../users/entities/user.entity';
import { CreateFineTuneDto } from '../dto/create-fine-tune.dto';
import { UpdateFineTuneDto } from '../dto/update-fine-tune.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { SearchFineTuneDto } from '../dto/search-fine-tune.dto';
import { FineTuneData } from '../entities/fine-tune-data.entity';
import { FineTuneService } from '../services/fine-tune.service';

// Commands
import { CreateFineTuneCommand } from '../commands/create-fine-tune.command';
import { UpdateFineTuneCommand } from '../commands/update-fine-tune.command';
import { DeleteFineTuneCommand } from '../commands/delete-fine-tune.command';

// Queries
import { GetFineTunesQuery } from '../queries/get-fine-tunes.query';
import { GetFineTuneByIdQuery } from '../queries/get-fine-tune-by-id.query';
import { SearchFineTunesQuery } from '../queries/search-fine-tunes.query';

@ApiTags('Fine-tune Data')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('fine-tune')
export class FineTuneController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly fineTuneService: FineTuneService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Create a new fine-tune data entry' })
  @ApiResponse({ status: 201, description: 'The fine-tune data has been successfully created.' })
  async create(
    @Body() createFineTuneDto: CreateFineTuneDto,
    @Request() req,
  ): Promise<{ data: FineTuneData; be_time: string }> {
    const fineTuneData = await this.commandBus.execute(
      new CreateFineTuneCommand(createFineTuneDto, req.user),
    );
    return {
      data: fineTuneData,
      be_time: new Date().toISOString(),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all fine-tune data entries with pagination' })
  @ApiResponse({ status: 200, description: 'Return all fine-tune data entries.' })
  async findAll(@Query() paginationDto: PaginationDto): Promise<{
    data: FineTuneData[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    be_time: string;
  }> {
    const { data, total } = await this.queryBus.execute(new GetFineTunesQuery(paginationDto));
    return {
      data,
      total,
      page: paginationDto.page,
      limit: paginationDto.limit,
      totalPages: Math.ceil(total / paginationDto.limit),
      be_time: new Date().toISOString(),
    };
  }

  @Get('search')
  @ApiOperation({ summary: 'Search fine-tune data entries' })
  @ApiResponse({ status: 200, description: 'Return matching fine-tune data entries.' })
  async search(
    @Query() searchDto: SearchFineTuneDto,
    @Query() paginationDto: PaginationDto,
  ): Promise<{
    data: FineTuneData[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    keyword: string;
    be_time: string;
  }> {
    const { data, total } = await this.queryBus.execute(
      new SearchFineTunesQuery(searchDto, paginationDto),
    );
    return {
      data,
      total,
      page: paginationDto.page,
      limit: paginationDto.limit,
      totalPages: Math.ceil(total / paginationDto.limit),
      keyword: searchDto.keyword,
      be_time: new Date().toISOString(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a fine-tune data entry by ID' })
  @ApiResponse({ status: 200, description: 'Return the fine-tune data entry.' })
  async findOne(@Param('id') id: string): Promise<{ data: FineTuneData; be_time: string }> {
    const fineTuneData = await this.queryBus.execute(new GetFineTuneByIdQuery(id));
    return {
      data: fineTuneData,
      be_time: new Date().toISOString(),
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a fine-tune data entry' })
  @ApiResponse({ status: 200, description: 'The fine-tune data has been successfully updated.' })
  async update(
    @Param('id') id: string,
    @Body() updateFineTuneDto: UpdateFineTuneDto,
    @Request() req,
  ): Promise<{ data: FineTuneData; be_time: string }> {
    const fineTuneData = await this.commandBus.execute(
      new UpdateFineTuneCommand(id, updateFineTuneDto, req.user),
    );
    return {
      data: fineTuneData,
      be_time: new Date().toISOString(),
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a fine-tune data entry' })
  @ApiResponse({ status: 200, description: 'The fine-tune data has been successfully deleted.' })
  async remove(@Param('id') id: string): Promise<{ message: string; be_time: string }> {
    await this.commandBus.execute(new DeleteFineTuneCommand(id));
    return {
      message: 'Fine-tune data deleted successfully',
      be_time: new Date().toISOString(),
    };
  }

  @Patch(':id/check')
  @ApiOperation({ summary: 'Update the checked status of a fine-tune data entry' })
  @ApiResponse({ status: 200, description: 'The checked status has been successfully updated.' })
  async updateIsChecked(
    @Param('id') id: string,
    @Body('isChecked') isChecked: boolean,
    @Request() req,
  ): Promise<{ data: FineTuneData; be_time: string }> {
    const fineTuneData = await this.fineTuneService.updateIsChecked(id, isChecked, req.user.id);
    return {
      data: fineTuneData,
      be_time: new Date().toISOString(),
    };
  }
}
