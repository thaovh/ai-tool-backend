import { Controller, Post, Body, Get, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { RawQuery } from '../entities/raw-query.entity';
import { DefineEndpointDto } from '../dto/define-endpoint.dto';
import { UpdateRawQueryDto } from '../dto/update-raw-query.dto';
import { DefineEndpointCommand } from '../commands/define-endpoint.command';
import { UpdateRawQueryCommand } from '../commands/update-raw-query.command';
import { DeleteRawQueryCommand } from '../commands/delete-raw-query.command';
import { GetRawQueriesQuery } from '../queries/get-raw-queries.query';
import { GetRawQueryByIdQuery } from '../queries/get-raw-query-by-id.query';
import { GetRawQueryByEndpointNameQuery } from '../queries/get-raw-query-by-endpoint-name.query';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../users/entities/user.entity';
import { Request } from 'express';

@ApiTags('Raw Query')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('raw-query')
export class RawQueryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('define')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Define a new raw query endpoint' })
  @ApiResponse({ status: 201, description: 'The endpoint has been successfully defined.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async defineEndpoint(
    @Body() dto: DefineEndpointDto,
    @Req() req: Request,
  ): Promise<RawQuery> {
    const userId = req.user['id'];
    return this.commandBus.execute(new DefineEndpointCommand(dto, userId));
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all raw queries' })
  @ApiResponse({ status: 200, description: 'Returns all raw queries' })
  @ApiQuery({ name: 'endpoint_name', required: false, description: 'Filter by endpoint name' })
  async findAll(@Query('endpoint_name') endpointName?: string): Promise<RawQuery[]> {
    return this.queryBus.execute(new GetRawQueriesQuery(endpointName));
  }

  @Get('by-endpoint/:endpoint_name')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get raw query by endpoint name' })
  @ApiResponse({ status: 200, description: 'Returns the raw query' })
  @ApiResponse({ status: 404, description: 'Raw query not found' })
  async findByEndpointName(@Param('endpoint_name') endpointName: string): Promise<RawQuery> {
    return this.queryBus.execute(new GetRawQueryByEndpointNameQuery(endpointName));
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get raw query by ID' })
  @ApiResponse({ status: 200, description: 'Returns the raw query' })
  @ApiResponse({ status: 404, description: 'Raw query not found' })
  async findOne(@Param('id') id: string): Promise<RawQuery> {
    return this.queryBus.execute(new GetRawQueryByIdQuery(id));
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a raw query' })
  @ApiResponse({ status: 200, description: 'The raw query has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Raw query not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateRawQueryDto,
    @Req() req: Request,
  ): Promise<RawQuery> {
    const userId = req.user['id'];
    return this.commandBus.execute(new UpdateRawQueryCommand(id, dto, userId));
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a raw query' })
  @ApiResponse({ status: 200, description: 'The raw query has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Raw query not found' })
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<void> {
    const userId = req.user['id'];
    await this.commandBus.execute(new DeleteRawQueryCommand(id, userId));
  }
} 