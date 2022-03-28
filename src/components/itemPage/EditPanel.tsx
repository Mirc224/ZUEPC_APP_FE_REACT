import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type Props = {
  onEditClick?: () => void,
  onDeleteClick?: () => void;
}

const EditPanel = (props: Props) => {
  const { onEditClick, onDeleteClick} = props;
  return (
    <div>
      { onEditClick &&
      <IconButton onClick={() => onEditClick()} aria-label="edit" color="primary">
        <EditIcon />
      </IconButton>}
      {onDeleteClick &&
        <IconButton onClick={() => onDeleteClick()} aria-label="delete" color="error">
        <DeleteForeverIcon />
      </IconButton>
      }
    </div>
  )
}

export default EditPanel