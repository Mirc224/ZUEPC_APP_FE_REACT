import { PersonExternDatabaseIdEntity, PersonNameEntity } from "./entities.types"

export interface CreatePersonWithDetailsCommand {
    birthYear?: number,
    deathYear?: number,
    names?: PersonNameEntity[],
    externDatabaseIds?: PersonExternDatabaseIdEntity[],
}


export interface UpdatePersonWithDetailsCommand {
    id?: number
    birthYear?: number,
    deathYear?: number,
    namesToInsert?: PersonNameEntity[],
    namesToUpdate?: PersonNameEntity[],
    namesToDelete?: number[],
    externDatabaseIdsToInsert?: PersonExternDatabaseIdEntity[],
    externDatabaseIdsToUpdate?: PersonExternDatabaseIdEntity[],
    externDatabaseIdsToDelete?: number[]
}