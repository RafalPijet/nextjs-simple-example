import React from 'react';
import { Grid, CircularProgress } from '@mui/material';
import LaunchItem from '../../common/LaunchItem/LaunchItem';
import { useAppSelector } from '../../../redux/hooks';
import { Launch } from '../../../types/global';
import { useStyles, Props } from './LaunchesListStyle';

const LaunchesList: React.FC<Props> = (props) => {
  const { isPending } = props;
  const classes = useStyles();
  const launches = useAppSelector((state) => state.launches.launches);

  return (
    <Grid container className={classes.root}>
      {!isPending ? (
        launches.map((item: Launch) => {
          return <LaunchItem key={item.id} launch={item} isContent={false} />;
        })
      ) : (
        <CircularProgress className={classes.spiner} />
      )}
    </Grid>
  );
};

export default LaunchesList;
