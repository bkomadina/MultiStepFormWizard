import { Box } from '@mui/system';

const Form = ({ children, ...props }) => {
  return (
    <Box
      component='form'
      sx={{
       '& .MuiTextField-root': { m: 1, width: '25ch' }
      }}
      noValidate
      autoComplete='off'
      {...props}
    >
      {children}
    </Box>
  );
};

export default Form;