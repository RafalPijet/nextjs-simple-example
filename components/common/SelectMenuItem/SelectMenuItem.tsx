import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { MenuItem, Avatar, Typography, IconButton } from '@mui/material';
import { DeleteForever } from '@mui/icons-material';
import { setSelectedLaunch } from '../../../redux/launches/launches-slice';
import { removeLaunchFromFavorites } from '../../../redux/thunks';
import { Props, useStyles } from './SelectMenuItemStyle';

const SelectMenuItem: React.FC<Props> = (props) => {
  const { launch, isFavorites } = props;
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const selectedLaunch = useAppSelector(
    (state) => state.launches.selectedLaunch
  );
  const [isRedirect, setIsRedirect] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const rootClasses = classNames({
    [classes.root]: true,
    [classes.rootFavorites]: isFavorites,
  });

  const avatarClasses = classNames({
    [classes.avatar]: isFavorites,
  });

  useEffect(() => {
    if (
      isFavorites &&
      selectedLaunch !== null &&
      router.pathname === '/content'
    ) {
      setIsHidden(selectedLaunch.id !== launch.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLaunch]);

  useEffect(() => {
    if (isRedirect) {
      router.push('/content');
    }
  }, [isRedirect]);

  const selectItemHandling = () => {
    dispatch(setSelectedLaunch(props.launch));
    if (location.pathname === '/') {
      setIsRedirect(true);
    }
  };

  const removeLaunchHandling = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    dispatch(removeLaunchFromFavorites(launch.id));
  };

  return (
    <MenuItem
      onClick={selectItemHandling}
      className={rootClasses}
      onMouseEnter={() => setIsHidden(false)}
      onMouseLeave={() => {
        if (selectedLaunch !== null && selectedLaunch.id !== launch.id) {
          setIsHidden(true);
        }
        if (location.pathname === '/') {
          setIsHidden(true);
        }
      }}
    >
      {isFavorites && (
        <div hidden={isHidden} className={classes.hiddenContent}></div>
      )}

      <div className={classes.verticalCenter}>
        <Avatar
          src={launch.images[0].image ? launch.images[0].image : '/noImage.png'}
          alt={launch.images[0].name}
          variant="rounded"
          className={avatarClasses}
        />

        <Typography className={classes.description}>{launch.name}</Typography>
      </div>

      {isFavorites && location.pathname === '/content' && (
        <IconButton onClick={removeLaunchHandling} style={{ marginRight: 10 }}>
          <DeleteForever />
        </IconButton>
      )}
    </MenuItem>
  );
};

export default SelectMenuItem;
