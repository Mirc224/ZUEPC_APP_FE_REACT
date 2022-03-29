import { PublicationActivityEntity, PublicationAuthorDetailsEntity, PublicationIdentifierEntity, PublicationNameEntitiy, RelatedPublicationEntity } from "./entities.types";

export interface CreatePublicationWithDetailsCommand {
    publishYear?: number,
    documentType?: string,
    names: PublicationNameEntitiy[],
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
    names: PublicationNameEntitiy[],
    ExternDatabaseIds: PublicationIdentifierEntity[],
    identifiers: PublicationIdentifierEntity[],
    authors: PublicationAuthorDetailsEntity[],
    relatedPublications?: RelatedPublicationEntity[],
    publicationActivities?: PublicationActivityEntity[]
}