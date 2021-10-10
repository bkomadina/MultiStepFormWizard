import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useData } from '../../store/DataContext';
import Coupon from '../Coupon';
import { useHistory } from 'react-router';
import Box from '@mui/material/Box';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import WizardModal from '../WizardModal';
import FormButton from '../form-ui/FormButton';
import Form from '../form-ui/Form';
import { SERVICES, checkServices } from '../../utils/services';
import { formBoxStyle } from '../../styles/FormBoxStyle';

const Step2 = () => {
  const [haveCoupon, setHaveCoupon] = useState(false);
  const [passedPrice, setPassedPrice] = useState(0);

  const { data, setValues } = useData();
  const isFinished = data.isFinished;

  const history = useHistory();

  const passedPriceHandler = (childData) => {
    setPassedPrice(childData);
  };

  const { handleSubmit, control } = useForm({
    defaultValues: false,
    mode: 'onChange',
  });

  const backHandler = () => {
    history.push('/');
  };

  const onSubmit = (data) => {
    const checkedServices = checkServices(data);
    const isCouponValid = data.coupon === 'Tokić123';
    const dataArray = [checkedServices, passedPrice, !!isCouponValid];
    const step2Data = {...dataArray, step2Finished: true}
    setValues(step2Data);
    isFinished ? history.push('/step4') : history.push('/step3');
  };

  const openCouponHandler = () => {
    setHaveCoupon((prevState) => !prevState);
  };

  return (
    <WizardModal title='Korak 2. Odaberite jednu ili više usluga za koje ste'>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={4}>
          {SERVICES.map((service) => {
            return (
              <FormControlLabel
                key={service.id}
                control={
                  <Controller
                    render={(props) => (
                      <Checkbox
                        onChange={(e) => props.field.onChange(e.target.checked)}
                        checked={props.field.value}
                      />
                    )}
                    control={control}
                    id={service.id}
                    key={service.id}
                    name={service.name}
                    defaultValue={false}
                  />
                }
                label={service.description}
              />
            );
          })}
        </Box>
        <Coupon
          control={control}
          haveCoupon={haveCoupon}
          onClick={openCouponHandler}
          passedPrice={passedPriceHandler}
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
            <FormButton disabled={passedPrice <= 0}>Dalje</FormButton>
          </Box>
        )}
        <Box style={formBoxStyle}></Box>
      </Form>
    </WizardModal>
  );
};

export default Step2;
