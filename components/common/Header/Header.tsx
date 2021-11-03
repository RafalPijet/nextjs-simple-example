import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import {
  Grid,
  FilledInput,
  IconButton,
  Popper,
  Grow,
  Paper,
  MenuList,
  ClickAwayListener,
  Typography,
  AppBar,
} from '@mui/material';
import { Search, Add, FavoriteBorder } from '@mui/icons-material';
import SelectMenuItem from '../SelectMenuItem/SelectMenuItem';
import {
  addLaunchToFavorites,
  getFavoritesLaunchesFromLocalStorage,
} from '../../../redux/thunks';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { loadLaunches } from '../../../redux/launches/launches-slice';
import { useStyles, Props } from './HeaderStyle';
import { Launch } from '../../../types/global';

const Header: React.FC<Props> = (props) => {
  const { isContent, isPending } = props;
  const classes = useStyles();
  const location = useRouter();
  const dispatch = useAppDispatch();
  const launches = useAppSelector((state) => state.launches.launches);
  const favorites = useAppSelector((state) => state.launches.favoriteLaunches);
  const selectedLaunch = useAppSelector(
    (state) => state.launches.selectedLaunch
  );
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLaunches, setSelectedLaunches] = useState<Launch[]>([]);
  const [addIsDisabled, setAddIsDisabled] = useState<boolean>(false);

  const searchButtonClasses = classNames({
    [classes.searchButton]: true,
    [classes.selectedSearchButton]: isSearch,
    [classes.disabled]: isPending,
  });

  const favoritesButtonClasses = classNames({
    [classes.favoritesButton]: true,
    [classes.favoritesButtonSelected]: isFavoritesOpen,
    [classes.disabled]: isPending,
  });

  const favoritesContentClasses = classNames({
    [classes.favoritesContent]: true,
    [classes.favoritesContentOpen]: isFavoritesOpen,
    [classes.favoritesContentClose]: !isFavoritesOpen,
  });

  const addButtonClasses = classNames({
    [classes.addButton]: true,
    [classes.disabled]: addIsDisabled,
  });

  useEffect(() => {
    dispatch(getFavoritesLaunchesFromLocalStorage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedLaunch !== null) {
      const result = favorites.find(
        (item: Launch) => item.id === selectedLaunch.id
      );
      setAddIsDisabled(result !== undefined || favorites.length >= 5);
    }
  }, [selectedLaunch, favorites]);

  useEffect(() => {
    setSelectedLaunches(launches);
  }, [launches]);

  useEffect(() => {
    if (isSearch && location.pathname === '/content') {
      handleClickAway();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLaunch]);

  const favoritesButtonHandling = () => {
    setIsFavoritesOpen(!isFavoritesOpen);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
    setIsSearch(false);
  };

  const searchButtonHandling = (event: React.MouseEvent<HTMLElement>) => {
    if (!isPending) {
      setAnchorEl(event.currentTarget);
      setIsSearch((previousIsSearch) => !previousIsSearch);
    }
  };

  const searchInputHandling = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined
  ) => {
    if (event !== undefined) {
      let result = launches.filter((item: Launch) =>
        item.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setSelectedLaunches(result);
    }
  };

  const addToLocalStorageHandling = () => {
    if (isContent) {
      dispatch(addLaunchToFavorites());
    }
  };

  const canBeOpen = isSearch && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <AppBar className={classes.root}>
      <Grid container className={classes.content}>
        <Grid item xs={12} sm={12} md={3}></Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FilledInput
            disabled={isPending}
            placeholder="enter the model"
            onClick={searchButtonHandling}
            onChange={searchInputHandling}
            fullWidth
            disableUnderline
            style={{
              backgroundColor: '#fff',
              margin: '30px 0',
              borderRadius: '50px',
              fontFamily: 'Roboto',
              fontSize: 14,
            }}
            startAdornment={
              <p className={classes.inputDescription}>search for a ship</p>
            }
            endAdornment={
              <IconButton className={searchButtonClasses} disabled={isPending}>
                {isSearch ? (
                  <Add className={classes.addIcon} />
                ) : (
                  <Search className={classes.searchIcon} />
                )}
              </IconButton>
            }
          />
          {!isPending && selectedLaunches.length > 0 && (
            <Popper
              id={id}
              open={isSearch}
              anchorEl={anchorEl}
              transition
              placement="bottom-start"
            >
              {({ TransitionProps }) => (
                <Grow {...TransitionProps}>
                  <Paper
                    style={{
                      borderRadius: '25px',
                      marginTop: '10px',
                      width: '100%',
                    }}
                  >
                    <ClickAwayListener onClickAway={handleClickAway}>
                      <MenuList
                        style={{
                          padding: '20px 25px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                        }}
                      >
                        {selectedLaunches.map((item: Launch) => {
                          return (
                            <SelectMenuItem
                              key={item.id}
                              launch={item}
                              isFavorites={false}
                            />
                          );
                        })}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          className={classes.favoritesButtonBox}
        >
          {isContent && (
            <IconButton
              size="small"
              className={addButtonClasses}
              onClick={addToLocalStorageHandling}
              disabled={addIsDisabled}
            >
              <Add />
            </IconButton>
          )}
          <IconButton
            className={favoritesButtonClasses}
            onClick={favoritesButtonHandling}
            disabled={isPending}
          >
            {isFavoritesOpen ? (
              <Add className={classes.addIcon} />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>
          <div className={favoritesContentClasses}>
            <Typography variant="h4" className={classes.favoritesDescription}>
              FAVORITES
            </Typography>
            <MenuList>
              {favorites.map((item: Launch) => {
                return (
                  <SelectMenuItem
                    key={item.id}
                    launch={item}
                    isFavorites={true}
                  />
                );
              })}
            </MenuList>
          </div>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Header;
