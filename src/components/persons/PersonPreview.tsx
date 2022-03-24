import { Card, CardActionArea, CardHeader } from '@mui/material'
import useAuth from '../../hooks/auth/useAuth'
import roles from '../../constatns/roles.constants';
import routes from '../../endpoints/routes.endpoints';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ApiUserDetail } from '../../types/api/auth/entities.types';
import { ApiPersonPreview } from '../../types/api/persons/entities.types';

type Props = {
    person: ApiPersonPreview
}

const UserPreview = (props: Props) => {
    const { person } = props;
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
        navigate(routes.personDetails.replace(":id", person.id.toString()));
    }

    const getUserTitle = (): string => {
        return "hehe";
    }

    return (
        <Card >
            <CardActionArea onClick={handleCardClick}>
                <CardHeader
                    title={getUserTitle()}
                    //subheader={`Id:${user.id} ${user.firstName} ${user.lastName}`}
                />
                <p>{JSON.stringify(person)}</p>
            </CardActionArea>
        </Card>
    )
}

export default UserPreview