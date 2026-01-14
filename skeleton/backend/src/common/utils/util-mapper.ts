import {
  Dictionary,
  MapOptions,
  Mapper,
  ModelIdentifier,
} from '@automapper/core'
import { InjectMapper } from '@automapper/nestjs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UtilMapper {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  map<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
  >(
    sourceObject: TSource,
    sourceIdentifier: ModelIdentifier<TSource>,
    destinationIdentifier: ModelIdentifier<TDestination>,
    options?: MapOptions<TSource, TDestination>,
  ): TDestination {
    return this.mapper.map(
      sourceObject,
      sourceIdentifier,
      destinationIdentifier,
      options,
    )
  }

  mapArray<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
  >(
    sourceArray: TSource[],
    sourceIdentifier: ModelIdentifier<TSource>,
    destinationIdentifier: ModelIdentifier<TDestination>,
    options?: MapOptions<TSource[], TDestination[]>,
  ): TDestination[] {
    return this.mapper.mapArray(
      sourceArray,
      sourceIdentifier,
      destinationIdentifier,
      options,
    )
  }
}
