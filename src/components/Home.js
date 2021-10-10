import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

const Home = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth='sm'>
        <Typography mt={4}  mb={4} align='center'>
          Pritisnite gumb kako biste pokrenuli konfigurator
        </Typography>
      </Container>
    </>
  );
};

export default Home;
