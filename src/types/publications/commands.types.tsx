import { PublicationActivityEntity, PublicationAuthorDetailsEntity, PublicationExternDatabaseIdEntity, PublicationIdentifierEntity, PublicationNameEntity, RelatedPublicationEntity } from "./entities.types";

export interface CreatePublicationWithDetailsCommand {
    publishYear?: number,
    documentType?: string,
    names: PublicationNameEntity[],
    externDatabaseIds: PublicationExternDatabaseIdEntity[],
    identifiers: PublicationIdentifierEntity[],
    authors: PublicationAuthorDetailsEntity[],
    relatedPublications?: RelatedPublicationEntity[],
    publicationActivities?: PublicationActivityEntity[]
}


export interface UpdatePublicationWithDetailsCommand {
    id?: number,
    publishYear?: number,
    documentType?: string,
    
    namesToInsert: PublicationNameEntity[],
    namesToUpdate: PublicationNameEntity[],
    namesToDelete: number[],
    
    identifiersToInsert: PublicationIdentifierEntity[],
    identifiersToUpdate: PublicationIdentifierEntity[],
    identifiersToDelete: number[],

    externDatabaseIdsToInsert: PublicationIdentifierEntity[],
    externDatabaseIdsToUpdate: PublicationIdentifierEntity[],
    externDatabaseIdsToDelete: number[],

    authorsToInsert: PublicationAuthorDetailsEntity[],
    authorsToUpdate: PublicationAuthorDetailsEntity[],
    authorsToDelete: number[],
    
    relatedPublicationsToInsert: RelatedPublicationEntity[],
    relatedPublicationsToUpdate: RelatedPublicationEntity[],
    relatedPublicationsToDelete: number[],
    
    publicationActivitiesToInsert: PublicationActivityEntity[],
    publicationActivitiesToUpdate: PublicationActivityEntity[],
    publicationActivitiesToDelete: number[]
}