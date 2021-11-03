import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { Paper, Typography, Grid, Button } from '@mui/material';
import { useAppDispatch } from '../../../redux/hooks';
import { cutText } from '../../../functions';
import { setSelectedLaunch } from '../../../redux/launches/launches-slice';
import { useStyles, Props } from './LaunchItemStyle';
import noImage from '../../../public/noImage.png';

const LaunchItem: React.FC<Props> = (props) => {
  const { name, date, images, description } = props.launch;
  const { isContent, launch } = props;
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const dateFormat = new Date(date).toLocaleString();
  const [isRedirect, setIsRedirect] = useState<boolean>(false);

  const rootClasses = classNames({
    [classes.root]: true,
    [classes.settingHeight]: !isContent,
  });

  const contentClasses = classNames({
    [classes.columnBetween]: true,
    [classes.setHeight]: !isContent,
  });

  useEffect(() => {
    if (isRedirect) {
      router.push('/content');
    }
  }, [isRedirect]);

  const selectItemHandling = () => {
    dispatch(setSelectedLaunch(launch));
    setIsRedirect(true);
  };

  return (
    <Grid item xs={12} sm={12} md={4} className={classes.main}>
      <Paper className={rootClasses} elevation={0}>
        <Grid container style={{ height: '100%' }}>
          <Grid item xs={12} sm={12} md={12} className={contentClasses}>
            <div>
              <div
                className={classes.imageBox}
                style={{
                  backgroundImage: `url(${
                    images.length ? images[0].image : noImage
                  })`,
                }}
              ></div>
              <Typography align="left" className={classes.date}>
                {dateFormat.substring(0, 10)}
              </Typography>
              <Typography align="left" className={classes.name}>
                {name !== null && name.length ? name : "Name isn't available"}
              </Typography>
              <Typography align="left" className={classes.description}>
                {description !== null && description.length
                  ? isContent
                    ? description
                    : cutText(description, 300)
                  : "Description isn't available"}
              </Typography>
            </div>
            {!isContent && (
              <div className={classes.rowCenter}>
                <Button
                  className={classes.button}
                  variant="outlined"
                  onClick={selectItemHandling}
                >
                  Read more
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default LaunchItem;
