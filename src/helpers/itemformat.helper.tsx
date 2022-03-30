import { ReactElement, ReactNode } from "react";

export const itemformatHelper = {
    formatExternDatabaseIds
};

function formatExternDatabaseIds(values: any[], t: any): ReactElement {
    let counter = 0;
    const externDbIds = values
        .map<ReactNode>(x => {
            return <span key={counter++}>{x.externIdentifierValue}</span>
        });
    const finalExternDbIds = externDbIds.length > 0
        ? externDbIds
            .reduce((prev, curr) => {
                const delimeter = <strong key={counter++}> / </strong>
                return [prev, delimeter, curr];
            }) : externDbIds;
    return externDbIds.length > 0 ?
        <p>
            <strong>{t('externDatabaseIds')}: </strong>
            {finalExternDbIds}
        </p>
        : <></>;
}