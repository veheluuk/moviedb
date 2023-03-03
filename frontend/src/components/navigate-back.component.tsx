import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

export interface NavigateBackComponentProps {
  text?: string;
  style?: React.CSSProperties;
}

export function NavigateBack(props: NavigateBackComponentProps) {
  const navigate = useNavigate();

  const goBack = () =>{
    navigate(-1);
  };

  return (
    <div style={{...props.style, cursor: 'pointer', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10}} onClick={goBack}>
      <ArrowBack /><strong>{props.text ?? 'Back to listing'}</strong>
    </div>
  );
}
