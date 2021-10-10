import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import WizardModal from '../WizardModal';

const Finish = () => {
  return (
    <WizardModal title={''}>
      <Typography variant='h6' mt={2} mb={2} align='center'>
        Vaša prijava je uspješno poslana
      </Typography>
      <Typography paragraph={true} align='center'>
        Vaša prijava je uspješno poslana i zaprimljena. Kontaktirati ćemo vas u
        najkraćem mogućem roku. Hvala vam.
      </Typography>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}
      >
        <Button href='/' variant='contained'>
          Zatvori
        </Button>
      </Box>
    </WizardModal>
  );
};

export default Finish;
