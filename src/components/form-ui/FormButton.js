import Button from '@mui/material/Button';

const FormButton = ({ children, ...props }) => {
  return (
    <Button type='submit' variant='contained' {...props}>
      {children}
    </Button>
  );
};

export default FormButton;
