export interface PersonNameCreateDto {
    personId?: number,
    firstName?: number,
    lastName?: number,
    nameType?: string
}

export interface PersonNameUpdateDto {
    id: number,
    personId?: number,
    firstName?: number,
    lastName?: number,
    nameType?: string
}

export interface PersonExternDatabaseIdCreateDto {
    personId?: number,
    externIdentifierValue?: string,
}

export interface PersonExternDatabaseIdUpdateDto {
    id: number,
    personId?: number,
    externIdentifierValue?: string,
}

export interface ApiPersonPreview {
    id: number,
    birthYear?: number,
    deathYear?: number,
    names?: ApiPersonName[],
    externDatabaseIds: ApiPersonExternDatabaseId[]
}

export interface ApiPersonName {
    id: number,
    personId: number,
	firstName?: string,
    lastName?: string,
    nameType?: string
}

export interface ApiPersonExternDatabaseId {
    id: number,
    personId: number,
    externIdentifierValue?: string
}