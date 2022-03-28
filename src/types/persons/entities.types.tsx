import { ZUEPCEntityBase } from "../common/component.types"

export interface PersonPreviewEntity {
    id: number,
    birthYear?: number,
    deathYear?: number,
    names?: PersonNameEntity[],
    externDatabaseIds: PersonExternDatabaseIdEntity[]
}

export interface PersonDetailsEntity {
    id: number,
    birthYear?: number,
    deathYear?: number,
    names?: PersonNameEntity[],
    externDatabaseIds: PersonExternDatabaseIdEntity[]
}
export interface PersonNameEntity extends ZUEPCEntityBase {
    id?: number,
    personId?: number,
    firstName?: string,
    lastName?: string,
    nameType?: string
}

export interface PersonExternDatabaseIdEntity extends ZUEPCEntityBase {
    personId?: number,
    externIdentifierValue?: string
}