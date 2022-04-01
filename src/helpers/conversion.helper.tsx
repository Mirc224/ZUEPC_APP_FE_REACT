import { AuthorFormValues, RelatedPublicationFormValues } from "../types/common/component.types";
import { PublicationAuthorDetailsEntity, PublicationAuthorEntity, RelatedPublicationDetailsEntity, RelatedPublicationEntity } from "../types/publications/entities.types";

export const conversionHelper = {
    authorFormValuesToPublicationAuthorEntity,
    publicationAuthorDetailsEntityToAuthorFormValues,
    relatedPublicationFormValuesToRelatedPublicationEntity,
    relatedPublicationDetailsEntityToRelatedPublicationFormValues,
    relatedPublicationDetailsEntityToRelatedPublicationEntity,
    publicationAuthorDetailsEntityToPublicationAuthorEntity
};


function relatedPublicationFormValuesToRelatedPublicationEntity(value: RelatedPublicationFormValues): RelatedPublicationEntity {
    return {
        id: value.id,
        relatedPublicationId: value.relatedPublicationName?.publicationId,
        relationType: value.relationType,
        citationCategory: value.citationCategory
    };
}

function relatedPublicationDetailsEntityToRelatedPublicationFormValues(value: RelatedPublicationDetailsEntity): RelatedPublicationFormValues {
    return {
        id: value.id,
        relatedPublicationName: value.relatedPublication?.names && 
        value.relatedPublication?.names.length > 0 ? value.relatedPublication.names[0] : null,
        relationType: value.relationType,
        citationCategory: value.citationCategory
    };
}

function relatedPublicationDetailsEntityToRelatedPublicationEntity(value: RelatedPublicationDetailsEntity): RelatedPublicationEntity {
    return relatedPublicationFormValuesToRelatedPublicationEntity(relatedPublicationDetailsEntityToRelatedPublicationFormValues(value))
}

function authorFormValuesToPublicationAuthorEntity(value: AuthorFormValues): PublicationAuthorEntity {
    return {
        id: value.id,
        personId: value.personName?.personId,
        institutionId: value.institutionName?.institutionId,
        contributionRatio: value.contributionRatio,
        role: value.role
    };
}

function publicationAuthorDetailsEntityToAuthorFormValues(value: PublicationAuthorDetailsEntity): AuthorFormValues {
    return {
        id: value.id,
        personName: value.personPreview?.names && value.personPreview.names.length > 0 
            ? value.personPreview.names[0] : null,
        institutionName: value.institutionPreview?.names && value.institutionPreview.names.length > 0
            ? value.institutionPreview.names[0] : null,
        contributionRatio: value.contributionRatio,
        role: value.role
    };
}

function publicationAuthorDetailsEntityToPublicationAuthorEntity(value: PublicationAuthorDetailsEntity): PublicationAuthorEntity {
    return authorFormValuesToPublicationAuthorEntity(publicationAuthorDetailsEntityToAuthorFormValues(value))
}