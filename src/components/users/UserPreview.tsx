import { Card, CardActionArea, CardHeader} from '@mui/material'
import useAuth from '../../hooks/useAuth'
import { ApiUser } from '../../types/auth/types'
import roles from '../../constatns/roles.constants';
import routes from '../../endpoints/routes.endpoints';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

type Props = {
    user: ApiUser
}

const UserPreview = (props: Props) => {
    const {user} = props;
    const {auth} = useAuth();
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
        navigate(routes.userDetails.replace(":id", user.id.toString()));
    }

  return (
      <Card >
        <CardActionArea onClick={handleCardClick}>
            <CardHeader
                title={user.email }
                subheader={`Id:${user.id} ${user.firstName} ${user.lastName}`}
            />
        </CardActionArea>
      </Card>
  )
}

export default UserPreview