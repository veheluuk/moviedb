import { SnackbarOrigin } from '@mui/material';

interface AppConfig {
  apiUrl: string;
  snackbarPosition: SnackbarOrigin,
}

export const constants: AppConfig = {
  apiUrl: "http://localhost:8080",
  snackbarPosition: { horizontal: 'center', vertical: 'bottom' },
}
