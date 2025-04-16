import { PaginationDto } from '../dto/pagination.dto';

export class GetFineTunesQuery {
  constructor(public readonly paginationDto: PaginationDto) {}
}
