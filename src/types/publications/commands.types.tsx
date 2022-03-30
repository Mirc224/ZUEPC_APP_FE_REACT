import { PublicationActivityEntity, PublicationAuthorDetailsEntity, PublicationIdentifierEntity, PublicationNameEntity, RelatedPublicationEntity } from "./entities.types";

export interface CreatePublicationWithDetailsCommand {
    publishYear?: number,
    documentType?: string,
    names: PublicationNameEntity[],
    ExternDatabaseIds: PublicationIdentifierEntity[],
    identifiers: PublicationIdentifierEntity[],
    authors: PublicationAuthorDetailsEntity[],
    relatedPublications?: RelatedPublicationEntity[],
    publicationActivities?: PublicationActivityEntity[]
}


export interface UpdatePublicationWithDetailsCommand {
    id?: number,
    publishYear?: number,
    documentType?: string,
    names: PublicationNameEntity[],
    ExternDatabaseIds: PublicationIdentifierEntity[],
    identifiers: PublicationIdentifierEntity[],
    authors: PublicationAuthorDetailsEntity[],
    relatedPublications?: RelatedPublicationEntity[],
    publicationActivities?: PublicationActivityEntity[]
}