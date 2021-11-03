import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Head from 'next/head';
import { IconButton, Grid } from '@mui/material';
import Header from '../components/common/Header/Header';
import Main from '../components/common/Main/Main';
import LaunchesList from '../components/features/LaunchesList/LaunchesList';
import { useAppDispatch } from '../redux/hooks';
import { useFetchLaunchesPerPageQuery } from '../redux/launches/launches-api-slice';
import { addLaunch, resetLaunch } from '../redux/launches/launches-slice';
import { setError } from '../redux/errors/errors-slice';
import { Launch, Ship, AvailableToastVariant } from '../types/global';
import { useStyles } from '../styles/MainPageStyle';

const Home: NextPage = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(6);
  const [isPending, setIsPending] = useState<boolean>(false);

  const { data, isFetching, isSuccess, isError } =
    useFetchLaunchesPerPageQuery(page);

  useEffect(() => {
    setIsPending(isFetching);
    if (isSuccess) fetchingLaunchesHandling();
    if (isError)
      dispatch(
        setError({
          isError: true,
          message: 'Something went wrong!',
          type: AvailableToastVariant.error,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isSuccess, isFetching, isError]);

  const fetchingLaunchesHandling = () => {
    if (data) {
      dispatch(resetLaunch([]));
      const result: Launch[] = data.map((item: any) => {
        return {
          id: item.id,
          name: item.mission_name,
          description: item.details,
          date: item.launch_date_local,
          images: item.ships,
        };
      });
      result.forEach(async (item: Launch) => {
        if (item.images.length) {
          setIsPending(true);
          try {
            const response: AxiosResponse = await axios.get(
              `https://api.spacex.land/rest/ship/${item.images[0].id}`
            );
            let fechedShip: any = response.data;
            if (fechedShip) {
              let image: Ship = {
                id: item.id,
                name: fechedShip.name,
                image: fechedShip.image,
              };
              item.images = [image];
              dispatch(addLaunch(item));
            }
          } catch (err: any) {
            if (err.response.data.message) {
              dispatch(
                setError({
                  isError: true,
                  message: `Error!!! ${err.response.data.message}`,
                  type: AvailableToastVariant.error,
                })
              );
            } else {
              dispatch(
                setError({
                  isError: true,
                  message: 'Something went wrong!',
                  type: AvailableToastVariant.error,
                })
              );
            }
          }
          setIsPending(false);
        }
      });
    }
  };

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
