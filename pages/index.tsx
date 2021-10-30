import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Grid } from '@mui/material';
import Header from '../components/common/Header/Header';
import Main from '../components/common/Main/Main';
import LaunchesList from '../components/features/LaunchesList/LaunchesList';
import { getPending, resetRequest } from '../redux/actions/requestActions';
import { getLaunchesRequest } from '../redux/thunks';
import { useStyles } from '../styles/MainPageStyle';

const Home: NextPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isPending = useSelector(getPending);
  const [page, setPage] = useState<number>(6);

  useEffect(() => {
    dispatch(resetRequest());
    dispatch(getLaunchesRequest(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const selectPageHandling = (value: number) => {
    if (value !== page) {
      setPage(value);
      window.scroll(0, 0);
    }
  };

  return (
    <div>
      <Header isContent={false} />
      <Main>
        <LaunchesList />
        <Grid container justifyContent="center">
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '30px 0',
            }}
          >
            <IconButton
              onClick={() => selectPageHandling(6)}
              className={page === 6 ? classes.buttonSelected : classes.button}
              disabled={isPending}
            >
              01
            </IconButton>
            <IconButton
              onClick={() => selectPageHandling(16)}
              className={page === 16 ? classes.buttonSelected : classes.button}
              disabled={isPending}
            >
              02
            </IconButton>
          </Grid>
        </Grid>
      </Main>
    </div>
  );
};

export default Home;
