import { Card, CardActionArea, CardHeader } from '@mui/material'
import useAuth from '../../hooks/auth/useAuth'
import roles from '../../constatns/roles.constants';
import ROUTES from '../../endpoints/routes.endpoints';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDetailEntity } from '../../types/auth/entities.types';
import ItemCardPreviewBase from '../itemPage/ItemCardPreviewBase';

type Props = {
    user: UserDetailEntity
}

const UserPreview = (props: Props) => {
    const { user } = props;
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [canEdit, setCanEdit] = useState(
        auth.roles?.includes(roles.Editor) ||
        auth.roles?.includes(roles.Admin));

    useEffect(() => {
        setCanEdit(() => {
            return auth.roles?.includes(roles.Editor) ||
                auth.roles?.includes(roles.Admin)
        })
    }, [auth])

    const handleCardClick = () => {
        navigate(ROUTES.userDetails.replace(":id", user.id.toString()));
    }

    return (
        <ItemCardPreviewBase
            title={user.email}
            subheader={`Id:${user.id} ${user.firstName} ${user.lastName}`}
            onClick={handleCardClick}
        />
    )
}

export default UserPreview