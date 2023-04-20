import { Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import './styles.scss';

//defining the shape or type of our label model
export type LabelColor =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'success';

type Props = {
  className?: string;
  color?: LabelColor;
  children?: ReactNode;
  style?: {};
};

const Label = ({
  className = '',
  color = 'secondary',
  children,
  style,
  ...rest
}: Props) => {
  const theme = useTheme();

  return (
    <span
      style={{ color: theme.palette[color].main }}
      className={`label ${className}`}
      data-testid="label"
      {...rest}
    >
      <Typography>{children}</Typography>
    </span>
  );
};

export default Label;
