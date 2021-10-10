import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useData } from '../../store/DataContext';
import WizardModal from '../WizardModal';
import Form from '../form-ui/Form';
import { TextField } from '@mui/material';
import FormButton from '../form-ui/FormButton';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { formBoxStyle } from '../../styles/FormBoxStyle';

const schema = yup
  .object({
    name: yup
      .string()
      .required('Molim unesite ime i prezime')
      .matches(
        /^[a-žA-Ž ]*$/i,
        // /^[a-z ,.'-]+$/i,
        'Molim unesite ime i prezime bez posebnih znakova'
      ),
    email: yup.string().required('Molim unesite email adresu').email(
      // /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      'Molim unesite ispravnu email adresu'
    ),
    phone: yup
      .string()
      .required('Molim unesite broj telefona')
      .matches(/^[0-9]{6,12}$/g, 'Minimalno 6, maksimalno 12 znamenki'),
  })
  .required();

const Step3 = () => {
  const { data, setValues } = useData();
  const isFinished = data.isFinished;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {name: data.name, email: data.email, phone: data.phone, optional: data.optional},
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const history = useHistory();

  const backHandler = () => {
    history.push('/step2');
  };

  const onSubmit = (data) => {
    const step3Data = {...data, step3Finished: true}
    setValues(step3Data);
    history.push('/step4');
  };

  return (
    <WizardModal title={'Korak 3. Vaši kontakt podaci'}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name={'name'}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Ime i prezime*'
              error={!!errors.name}
              helperText={errors?.name?.message}
            />
          )}
        />
        <Controller
          name={'email'}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Email adresa*'
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
          )}
        />
        <Controller
          name={'phone'}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Broj telefona*'
              error={!!errors?.phone}
              helperText={errors?.phone?.message}
            />
          )}
        />
        <Controller
          name={'optional'}
          control={control}
          render={({ field }) => (
            <TextField {...field} label='Napomena (opcionalno)' />
          )}
        />
        {isFinished ? (
          <Box sx={formBoxStyle}>
            <FormButton>Gotovo</FormButton>
          </Box>
        ) : (
          <Box sx={formBoxStyle}>
            <Button
              onClick={backHandler}
              variant='contained'
              style={{ marginRight: '2rem' }}
            >
              Nazad
            </Button>
            <FormButton>Dalje</FormButton>
          </Box>
        )}
      </Form>
    </WizardModal>
  );
};

export default Step3;
