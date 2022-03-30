import { Card, CardActionArea, CardContent, CardHeader } from '@mui/material';
import React, { ReactElement } from 'react'

type Props = {
    children?: any,
    title: any,
    subheader?: any,
    onClick?: () => void
}

const ItemCardPreviewBase = (props: Props) => {
    const { title, subheader, children, onClick } = props;

    const FormatedCardContent = (): ReactElement => {
        const baseContent = (
            <>
                <CardHeader
                    title={title}
                    subheader={subheader}
                />
                {children &&
                    <CardContent>
                        {children}
                    </CardContent>
                }
            </>
        )

        return onClick
            ? <CardActionArea onClick={onClick}>{baseContent}</CardActionArea>
            : baseContent;
    }

    return (
        <Card>
            {FormatedCardContent()}
        </Card>
    )
}

export default ItemCardPreviewBase