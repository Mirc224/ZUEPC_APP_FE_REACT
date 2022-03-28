import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import roles from '../../constatns/roles.constants'
import { permissionHelper } from '../../helpers/permission.helper'
import useAuth from '../../hooks/auth/useAuth'
import EditPanel from './EditPanel'

type Props = {
    title: string,
    onClickEdit?: () => void,
    onClickDelete?: () => void
}

const ItemPageHeader = (props: Props) => {
    const {title, onClickEdit, onClickDelete} = props;
    const canEditRoles = [roles.Admin];
    const { auth } = useAuth();
    const [canEdit, setCanEdit] = useState(permissionHelper.hasRole(auth.roles, canEditRoles));

    useEffect(() => {
        setCanEdit(permissionHelper.hasRole(auth.roles, canEditRoles));
    }, [auth])
    
  return (
      <header>
          <Typography
              className='text-center'
              component="h1"
              variant="h4">
              {title}
          </Typography>
          {canEdit && <EditPanel onEditClick={onClickEdit} onDeleteClick={onClickDelete} />}
          <hr />
      </header>
  )
}

export default ItemPageHeader