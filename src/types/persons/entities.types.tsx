import { ZUEPCEntityBase } from "../common/component.types"

export interface PersonPreviewEntity extends ZUEPCEntityBase {
    birthYear?: number,
    deathYear?: number,
    names?: PersonNameEntity[],
    externDatabaseIds: PersonExternDatabaseIdEntity[]
}

export interface PersonDetailsEntity extends ZUEPCEntityBase {
    birthYear?: number,
    deathYear?: number,
    names?: PersonNameEntity[],
    externDatabaseIds: PersonExternDatabaseIdEntity[]
}
export interface PersonNameEntity extends ZUEPCEntityBase {
    personId?: number,
    firstName?: string,
    lastName?: string,
    nameType?: string
}

export interface PersonExternDatabaseIdEntity extends ZUEPCEntityBase {
    personId?: number,
    externIdentifierValue?: string
}