import { Box, Typography } from '@mui/material';
import React from 'react'

type Props = {
    title: string,
    children: any | undefined
}

const ItemDataSection = (props: Props) => {
    const { children, title } = props;
    const mainBoxStyle = { p: 2 };
    const headerBoxStyle = { mb: 2 };
    return (
        <section>
            <Box sx={mainBoxStyle}>
                <header>
                    <Box sx={headerBoxStyle}>
                        <Typography
                            component="h2"
                            variant="h5"
                        >
                            {title}
                        </Typography>
                    </Box>
                </header>
                <main>
                    {children && children}
                </main>
            </Box>
        </section>
    )
}

export default ItemDataSection

//     < Typography
// component = "h2"
// variant = "h5"
//     >
//     { t("name") }
//                 </Typography >
//     <NewItemWithExistingUpdateDeletePreview
//         formName="new-name"
//         newItemFormSchema={newNameSchema}
//         existItemFormSchema={newNameSchema}
//         items={personNames.map(x => x.item)}
//         onNewItemSubmit={handleNewName}
//         onItemDelete={handleNameDelete}
//         onEixstItemUpdate={handleNamesUpdate}
//     />