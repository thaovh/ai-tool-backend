import { SearchFineTuneDto } from '../dto/search-fine-tune.dto';
import { PaginationDto } from '../dto/pagination.dto';

export class SearchFineTunesQuery {
  constructor(
    public readonly searchDto: SearchFineTuneDto,
    public readonly paginationDto: PaginationDto,
  ) {}
}
