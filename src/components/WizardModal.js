import { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import ModalContext from '../store/modal-context';

const styleTitleBox = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const styleTitle = {
  fontWeight: 'light',
  paddingRight: '0',
};

const WizardModal = ({ children, ...props }) => {
  const ctx = useContext(ModalContext);
  const matches = useMediaQuery('(min-width:400px)');

  return (
    <Container maxWidth='sm'>
      <Button
        onClick={ctx.openModal}
        variant='contained'
        style={{ margin: '0 auto', display: 'flex' }}
      >
        Pokreni Konfigurator
      </Button>
      <Dialog {...props} open={ctx.modalOpen} fullWidth={true} maxWidth='md'>
        <Box sx={styleTitleBox}>
          {matches && (
            <IconButton style={{ visibility: 'hidden', marginLeft: '13px' }}>
              <CloseIcon />
            </IconButton>
          )}
          <DialogTitle sx={styleTitle}>Konfigurator servisa</DialogTitle>
          <IconButton onClick={ctx.closeModal} style={{ marginRight: '13px' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <Typography variant='h6' mb={2}>
            {props.title}
          </Typography>
          {children}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default WizardModal;
