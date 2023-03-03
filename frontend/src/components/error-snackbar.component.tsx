import React, { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

import { constants } from 'config/constants';
import { useAppSelector } from 'store';
import { moviesStore } from 'store/movies';

export function ErrorSnackbar() {
  const error = useAppSelector(moviesStore.selectors.error);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setVisible(true);
    }
  }, [error]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setVisible(false);
  };

  return (
    <Snackbar
      anchorOrigin={constants.snackbarPosition}
      sx={{ maxWidth: 600 }}
      autoHideDuration={10000}
      open={visible}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        <span>Error: {error}</span>
      </Alert>
    </Snackbar>
  );
}