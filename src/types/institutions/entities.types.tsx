import { ZUEPCEntityBase } from "../common/component.types"

export interface InstitutionPreviewEntity extends ZUEPCEntityBase{
    id: number,
    level?: number,
    institutionType?: string,
    names?: InstitutionNameEntity[],
    externDatabaseIds: InstitutionExternDatabaseIdEntity[]
}

export interface InstitutionDetailsEntity extends ZUEPCEntityBase {
    level?: number,
    institutionType?: string,
    names?: InstitutionNameEntity[],
    externDatabaseIds: InstitutionExternDatabaseIdEntity[]
}
export interface InstitutionNameEntity extends ZUEPCEntityBase {
    institutionId?: number,
    name?: string,
    nameType?: string
}

export interface InstitutionExternDatabaseIdEntity extends ZUEPCEntityBase {
    institutionId?: number,
    externIdentifierValue?: string
}