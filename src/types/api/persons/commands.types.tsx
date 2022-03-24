import { PersonExternDatabaseIdCreateDto, PersonExternDatabaseIdUpdateDto, PersonNameCreateDto, PersonNameUpdateDto } from "./entities.types";

export interface CreatePersonWithDetailsCommand {
    birthYear?: number,
    deathYear?: number,
    names?: PersonNameCreateDto[],
    externDatabaseIds?: PersonExternDatabaseIdCreateDto[],
}


export interface UpdatePersonWithDetailsCommand {
    id?: number
    birthYear?: number,
    deathYear?: number,
    namesToInsert?: PersonNameCreateDto[],
    namesToUpdate?: PersonNameUpdateDto[],
    namesToDelete?: number[],
    externDatabaseIdsToInsert?: PersonExternDatabaseIdCreateDto[],
    externDatabaseIdsToUpdate?: PersonExternDatabaseIdUpdateDto[],
    externDatabaseIdsToDelete?: number[]
}