import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { IconButton, Grid } from '@mui/material';
import Header from '../components/common/Header/Header';
import Main from '../components/common/Main/Main';
import LaunchesList from '../components/features/LaunchesList/LaunchesList';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  getLaunches,
  launchesSelector,
} from '../redux/launches/launches-api-slice';
import { useStyles } from '../styles/MainPageStyle';

const Home: NextPage = () => {
  const classes = useStyles();
  const { isPending } = useAppSelector(launchesSelector);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(6);

  useEffect(() => {
    dispatch(getLaunches(page));
  }, [page]);

  const selectPageHandling = (value: number) => {
    if (value !== page) {
      setPage(value);
      window.scroll(0, 0);
    }
  };

  return (
    <div>
      <Head>
        <title>Space Land Main Page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta
          name="description"
          content="Space Land main page of simple example"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header isContent={false} isPending={isPending} />
        <Main>
          <LaunchesList isPending={isPending} />
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
                className={
                  page === 16 ? classes.buttonSelected : classes.button
                }
                disabled={isPending}
              >
                02
              </IconButton>
            </Grid>
          </Grid>
        </Main>
      </div>
    </div>
  );
};

export default Home;
