import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Typography, Grid, Button } from '@mui/material';
import Header from '../components/common/Header/Header';
import Main from '../components/common/Main/Main';
import LaunchItem from '../components/common/LaunchItem/LaunchItem';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setSelectedLaunch } from '../redux/launches/launches-slice';
import { useStyles } from '../styles/ContentPageStyle';

const ContentPage: NextPage = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const selectedLaunch = useAppSelector(
    (state) => state.launches.selectedLaunch
  );
  const [isRedirect, setIsRedirect] = useState<boolean>(false);

  useEffect(() => {
    if (isRedirect) {
      router.push('/');
    }
  }, [isRedirect]);

  const selectItemHandling = () => {
    setTimeout(() => {
      setIsRedirect(true);
      dispatch(setSelectedLaunch(null));
    }, 500);
  };

  return (
    <div>
      <Head>
        <title>Space Land Content Page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta
          name="description"
          content="Space Land content page of simple example"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header isContent={true} />
        <Main>
          <Grid container justifyContent="center" style={{ width: '100%' }}>
            <Grid item xs={12} sm={12} md={12} className={classes.root}>
              <div className={classes.center}>
                {selectedLaunch !== null ? (
                  <LaunchItem launch={selectedLaunch} isContent={true} />
                ) : (
                  <Typography>Nothing to show</Typography>
                )}
              </div>
              <div className={classes.center}>
                <Button
                  className={classes.button}
                  variant="outlined"
                  onClick={selectItemHandling}
                >
                  Back
                </Button>
              </div>
            </Grid>
          </Grid>
        </Main>
      </div>
    </div>
  );
};

export default ContentPage;
