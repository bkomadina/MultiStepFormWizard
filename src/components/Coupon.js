import { Controller, useWatch } from 'react-hook-form';
import { Button, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';

const couponBoxStyle = {
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'flex-end',
  justifyContent: 'center',
  textAlign: 'right',
};

const couponTextStyle = {
  display: 'flex',
  flexFlow: 'row wrap',
  alignItems: 'center',
  justifyContent: 'center',
};

const calculatePrice = (results) => {
  let totalValue = 0;

  for (const service in results) {
    if (results[service] === true || results[service] === 'Tokić123') {
      if (service === 'coupon') {
        totalValue = totalValue * 0.7;
      } else {
        totalValue += +service;
      }
    }
  }
  return totalValue.toFixed(2);
};

const Coupon = ({ control, onClick, haveCoupon, passedPrice }) => {
  const results = useWatch({ control });

  const price = calculatePrice(results);

  const fullPrice = +price / 0.7;

  const discount = fullPrice * 0.3;

  passedPrice(price);

  const renderElement = (value, error) => {
    if (!!value === true) {
      if (!!error === false) {
        return (
          <Box>
            <Box>
              <Typography mt={1} mb={1} mr={2} variant='h7'>
                OSNOVICA:
              </Typography>
              <Typography mt={2} mb={2} variant='h7'>
                {fullPrice.toFixed(2)} KN
              </Typography>
            </Box>
            <Box>
              <Typography mt={1} mb={1} mr={2} variant='h7'>
                Popust (30%):
              </Typography>
              <Typography mt={2} mb={2} variant='h7'>
                -{discount.toFixed(2)} KN
              </Typography>
            </Box>
          </Box>
        );
      }
      return null;
    }
    return null;
  };

  return (
    <Box sx={couponBoxStyle}>
      {!haveCoupon ? (
        <Button onClick={onClick} syze='small'>
          Imam kupon
        </Button>
      ) : (
        <Controller
          name={'coupon'}
          control={control}
          defaultValue=''
          shouldUnregister={true}
          rules={{
            validate: (value) => value === 'Tokić123' || 'Neispravan kupon',
          }}
          render={({
            field: { value },
            field,
            fieldState: { error }
          }) => {
            return (
              <Box>
                <>
                  <Box sx={couponTextStyle}>
                    <Button onClick={onClick} syze='small'>
                      Nemam valjani kupon
                    </Button>
                    <TextField
                      {...field}
                      label='Unesite kod kupona ovdje'
                      error={!!error}
                      helperText={error?.message}
                      size='small'
                      style={{ marginRight: '0' }}
                    />
                  </Box>
                  {renderElement(value, error)}
                </>
              </Box>
            );
          }}
        />
      )}
      <Typography variant='h5' fontWeight='500' mt={2} mb={2}>
        UKUPNO: {`${price} KN`}
      </Typography>
    </Box>
  );
};

export default Coupon;
