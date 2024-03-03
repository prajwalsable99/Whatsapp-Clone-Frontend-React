import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function UserChip({ item, removeMember }) {
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
    removeMember(item.id);
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        avatar={<img src={ item?.profile_picture ||"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="User Avatar" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />}
        label={ item?.full_name}
        onDelete={handleDelete}
      />
    </Stack>
  );
}
