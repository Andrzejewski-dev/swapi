import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { PaginatedDto, replaceUrlBase, ResourceDto } from '@swapi/common';
import { SWAPI_OPTIONS_PROVIDER } from '../swapi.constants';
import { SwapiOptionsInterface } from '../swapi-options.interface';

@Injectable()
export abstract class ResourcesService<T extends ResourceDto> {
  protected abstract readonly endpoint: string;

  constructor(
    @Inject()
    protected readonly httpService: HttpService,
    @Inject(SWAPI_OPTIONS_PROVIDER)
    protected options: SwapiOptionsInterface,
  ) {}

  async findAll(page?: number): Promise<PaginatedDto<T>> {
    const response = await this.httpService.axiosRef.get(
      `${this.options.baseUrl}/${this.endpoint}`,
      { params: { page } },
    );

    return {
      count: response.data.count,
      results: response.data.results.map((result) =>
        this.convertResourceToDto(result),
      ),
      previous: response.data.previous
        ? replaceUrlBase(this.options.appBaseUrl, response.data.previous)
        : null,
      next: response.data.next
        ? replaceUrlBase(this.options.appBaseUrl, response.data.next)
        : null,
    };
  }

  async findOne(id: number): Promise<T | null> {
    const response = await this.httpService.axiosRef
      .get(`${this.options.baseUrl}/${this.endpoint}/${id}`)
      .catch((error) => {
        if (error.response?.status === 404) {
          return null;
        }
        throw error;
      });

    return this.convertResourceToDto(response.data);
  }

  abstract convertResourceToDto(resource: any): T;
}
