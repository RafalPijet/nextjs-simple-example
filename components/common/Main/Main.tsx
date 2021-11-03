import React, { useEffect } from 'react';
import Image from 'next/image';
import { Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setError } from '../../../redux/errors/errors-slice';
import { AvailableToastVariant } from '../../../types/global';
import { useStyles, Props } from './MainStyle';
import logo from '../../../public/spaceLandLogo.png';

const Main: React.FC<Props> = (props) => {
  const { children } = props;
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isError = useAppSelector((state) => state.errors.error.isError);
  const errorMessage = useAppSelector((state) => state.errors.error.message);
  const errorType = useAppSelector((state) => state.errors.error.type);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isError) {
      errorType === AvailableToastVariant.error
        ? enqueueSnackbar(errorMessage, {
            variant: AvailableToastVariant.error,
          })
        : enqueueSnackbar(errorMessage, {
            variant: AvailableToastVariant.info,
          });
    }
    dispatch(
      setError({
        isError: false,
        message: '',
        type: AvailableToastVariant.error,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={12} md={12} className={classes.logoBox}>
            <Image src={logo} alt="space-land-logo" />
          </Grid>
        </Grid>
        {children}
      </div>
    </div>
  );
};

export default Main;
