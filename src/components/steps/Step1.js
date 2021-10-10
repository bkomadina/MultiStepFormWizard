import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Form from '../form-ui/Form';
import WizardModal from '../WizardModal';
import FormButton from '../form-ui/FormButton';
import Box from '@mui/material/Box';
import { useData } from '../../store/DataContext';
import { formBoxStyle } from '../../styles/FormBoxStyle';
import CAR_BRANDS from '../../utils/carBrands';

const schema = yup
  .object({
    carBrand: yup.string().required('Molim izaberite proizvođača vozila'),
  })
  .required();

const Step1 = () => {
  const { data, setValues } = useData();
  const isFinished = data.isFinished;
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const history = useHistory();

  const onSubmit = (data) => {
    const step1Data = {...data, step1Finished: true}
    setValues(step1Data);
    isFinished ? history.push('/step4') : history.push('/step2');
  };

  return (
    <WizardModal title={'Korak 1. Odaberite proizvođača vašeg vozila'}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='carBrand'
          control={control}
          render={({ field }) => (
            <FormControl {...field} component='fieldset'>
              <RadioGroup
                row
                aria-label='carBrand'
                name='row-radio-buttons-group'
              >
                {CAR_BRANDS.map((car, i) => (
                  <FormControlLabel
                    key={i}
                    value={car}
                    control={<Radio />}
                    label={car}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}
        />

        {isFinished ? (
          <Box sx={formBoxStyle}>
            <FormButton>Gotovo</FormButton>
          </Box>
        ) : (
          <Box sx={formBoxStyle}>
            <FormButton disabled={!isValid}>Dalje</FormButton>
          </Box>
        )}
      </Form>
    </WizardModal>
  );
};

export default Step1;
