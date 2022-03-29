import { InstitutionExternDatabaseIdEntity, InstitutionNameEntity } from "./entities.types"


export interface CreateInstitutionWithDetailsCommand {
    level?: number,
    institutionType?: number,
    names?: InstitutionNameEntity[],
    externDatabaseIds?: InstitutionExternDatabaseIdEntity[],
}


export interface UpdateInstitutionWithDetailsCommand {
    id?: number
    level?: number,
    institutionType?: number,
    namesToInsert?: InstitutionNameEntity[],
    namesToUpdate?: InstitutionNameEntity[],
    namesToDelete?: number[],
    externDatabaseIdsToInsert?: InstitutionExternDatabaseIdEntity[],
    externDatabaseIdsToUpdate?: InstitutionExternDatabaseIdEntity[],
    externDatabaseIdsToDelete?: number[]
}