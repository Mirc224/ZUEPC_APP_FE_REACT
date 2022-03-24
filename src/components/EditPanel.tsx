import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
    onClick: () => void;
}

const EditPanel = (props: Props) => {
    const {onClick} = props;
  return (
    <div>
        <IconButton onClick={()=> onClick()} aria-label="edit">
            <EditIcon/>
        </IconButton>
    </div>
  )
}

export default EditPanel