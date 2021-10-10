import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const LinkButton = ({ children, ...props }) => {
  return (
    <Button variant='contained' type={props.type}>
      <Link style={{ textDecoration: 'none', color: 'inherit',}} {...props}>
        {children}
      </Link>
    </Button>
  );
};

export default LinkButton;
