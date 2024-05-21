import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function loading() {
  return (
    <Stack sx={{ color: 'grey.500' }} direction="row">
      <CircularProgress color="secondary" />
    </Stack>
  );
}