import { ZUEPCEntityBase } from "../common/component.types";
import { InstitutionPreviewEntity } from "../institutions/entities.types";
import { PersonPreviewEntity } from "../persons/entities.types";

export interface PublicationPreviewEntity extends ZUEPCEntityBase {
    publishYear?: number,
    documentType?: string,
    names: PublicationNameEntitiy[],
    identifiers: PublicationIdentifierEntity[],
    authors: PublicationAuthorDetailsEntity[],
    relatedPublications?: RelatedPublicationDetailsEntity[],
    publicationActivities?: PublicationActivityEntity[]
}

export interface PublicationPreviewEntity extends ZUEPCEntityBase {
    publishYear?: number,
    documentType?: string,
    names: PublicationNameEntitiy[],
    ExternDatabaseIds: PublicationIdentifierEntity[],
    identifiers: PublicationIdentifierEntity[],
    authors: PublicationAuthorDetailsEntity[]
}

export interface PublicationNameEntitiy extends ZUEPCEntityBase {
    publicationId?: number,
    name?: string,
    nameType?: string
}

export interface PublicationIdentifierEntity extends ZUEPCEntityBase {
    publicationId?: number,
    identifierValue?: string,
    identifierName?: string,
    iSForm?: string
}

export interface PublicationAuthorDetailsEntity extends ZUEPCEntityBase {
    personPreview?: PersonPreviewEntity,
    institutionPreview?: InstitutionPreviewEntity,
    contributionRatio?: number,
    role?: string
}

export interface PublicationExternDatabaseIdEntity extends ZUEPCEntityBase {
    publicationId?: number,
    externIdentifierValue?: string
}

export interface RelatedPublicationDetailsEntity extends ZUEPCEntityBase {
    relatedPublication?: PublicationPreviewEntity,
    relationType?: string,
    citationCategory?: string
}

export interface PublicationActivityEntity extends ZUEPCEntityBase {
    publicationId?: number,
    activityYear?: number,
    category?: string,
    governmentGrant?: string
}

export interface RelatedPublicationEntity extends ZUEPCEntityBase {
    relatedPublicationId?: number,
    relationType?: string,
    citationCategory?: string
}