import { Button, Typography } from '@mui/material';
import { useHistory } from 'react-router';
import { useData } from '../../store/DataContext';
import Box from '@mui/material/Box';
import WizardModal from '../WizardModal';
import LinkButton from '../LinkButton';
import { formBoxStyle } from '../../styles/FormBoxStyle';

const upperSectionStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  borderBottom: 1,
  paddingBottom: '1rem',
  marginBottom: '1rem',
};

const headingBoxStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
};

const headingBoxContactStyle = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: 1,
};

const constactInfoBoxStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  width: 1,
};

const lowerSectionStyle = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  borderBottom: 1,
  paddingBottom: '1rem',
  marginBottom: '1rem',
};

const Step4 = () => {
  const { data, setValues } = useData();

  const services = data[0];
  const price = data[1];
  const discount = (+price / 0.7) * 0.3;
  const haveCoupon = data[2];

  const history = useHistory();

  const { email, name, optional, phone, carBrand } = data;

  const editHandler = (data) => {
    const finishedData = { ...data, isFinished: true };
    setValues(finishedData);
  };

  const backHandler = () => {
    history.push('/step3');
  };

  const sendHandler = (data) => {
    const finishedData = { ...data, isFinished: true };
    setValues(finishedData);
    history.push('/finish');
  };

  return (
    <WizardModal title={'Korak 4. Pregled i potvrda vašeg odabira'}>
      <Typography mt={2} mb={4} align='left' paragraph={true}>
        Molimo vas da još jednom pregledate i potvrdite unesene podatke. Ukoliko
        želite promijeniti neki od podataka, možete pritisnuti gumb za
        uređivanje pored svake od kategorija. Kada ste provjerili i potvrdili
        ispravnost svojih podataka pritisnitke gumb pošalji na dnu, za slanje
        upita za servis.
      </Typography>
      <Box sx={upperSectionStyle}>
        <Box>
          <Box sx={headingBoxStyle}>
            <Typography mt={2} mb={2} mr={4} variant='h5' fontWeight='500'>
              MODEL VOZILA
            </Typography>
            <LinkButton
              to='/'
              size='small'
              onClick={editHandler.bind(this, data)}
            >
              Uredi
            </LinkButton>
          </Box>
          <Typography mt={2} mb={2}>
            {carBrand}
          </Typography>
        </Box>
        <Box>
          <Box sx={headingBoxStyle}>
            <Typography mt={2} mb={2} mr={4} variant='h5' fontWeight='500'>
              ODABRANE USLUGE
            </Typography>
            <LinkButton
              to='/step2'
              size='small'
              onClick={editHandler.bind(this, data)}
            >
              Uredi
            </LinkButton>
          </Box>
          <Box>
            {services.map((service, i) => {
              return (
                <Box sx={headingBoxStyle} key={service.id}>
                  <Typography mt={1} mb={1} mr={2}>
                    {service.description.split('(', 1)}
                  </Typography>
                  <Typography>{service.price.toFixed(2)} KN</Typography>
                </Box>
              );
            })}
          </Box>
          {haveCoupon && (
            <Box sx={headingBoxStyle}>
              <Typography mt={1} mb={1} mr={2}>
                Popust (30%):
              </Typography>
              <Typography mt={2} mb={2}>
                -{discount.toFixed(2)} KN
              </Typography>
            </Box>
          )}
          <Box sx={headingBoxStyle}>
            <Typography mt={1} mb={1} mr={2}>
              UKUPNO:
            </Typography>
            <Typography fontWeight='600' mt={2} mb={2}>
              {`${price} KN`}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={lowerSectionStyle}>
        <Box sx={headingBoxContactStyle}>
          <Typography mt={2} mb={2} mr={4} variant='h5' fontWeight='500'>
            KONTAKT PODACI
          </Typography>
          <LinkButton
            to='/step3'
            size='small'
            onClick={editHandler.bind(this, data)}
          >
            Uredi
          </LinkButton>
        </Box>
        <Box sx={constactInfoBoxStyle}>
          <Box sx={{marginRight: '1.5rem'}}>
            <Box sx={headingBoxStyle}>
              <Typography mt={2} mb={2} mr={2}>
                Ime i prezime:
              </Typography>
              <Typography>{name}</Typography>
            </Box>
            <Box sx={headingBoxStyle}>
              <Typography mt={2} mb={2} mr={2}>
                Broj telefona:
              </Typography>
              <Typography>{phone}</Typography>
            </Box>
          </Box>
          <Box>
            <Box sx={headingBoxStyle}>
              <Typography mt={2} mb={2} mr={2}>
                Email adresa:
              </Typography>
              <Typography>{email}</Typography>
            </Box>
            <Box sx={headingBoxStyle}>
              <Typography mt={2} mb={2} mr={2}>
                Napomena:
              </Typography>
              <Typography>{optional}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={formBoxStyle}>
        <Button
          onClick={backHandler}
          variant='contained'
          style={{ marginRight: '2rem' }}
        >
          Nazad
        </Button>
        <Button
          onClick={sendHandler}
          variant='contained'
        >
          Pošalji
        </Button>
      </Box>
    </WizardModal>
  );
};

export default Step4;
