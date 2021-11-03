import { makeStyles, createStyles } from '@mui/styles';
import { container, primaryColor, secondaryColor, disabledColor } from '../../../styles/globalStyles';

export const useStyles = makeStyles(() => createStyles({
    root: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        display: "flex",
        zIndex: 1100,
        "@media (min-width: 320px)": {
            marginTop: 120
        },
        "@media (min-width: 1200px)": {
            marginTop: 0
        },
    },
    content: {
        ...container,
    },
    inputDescription: {
        position: 'absolute',
        top: '2px',
        textTransform: 'uppercase',
        fontSize: '10px',
        fontWeight: 600,
    },
    searchButton: {
        backgroundColor: primaryColor,
        margin: '10px 0',
        '&:hover': {
            backgroundColor: primaryColor
        }
    },
    selectedSearchButton: {
        backgroundColor: secondaryColor,
        '&:hover': {
            backgroundColor: secondaryColor
        }
    },
    addIcon: {
        color: '#000',
        transform: 'Rotate(45deg)'
    },
    searchIcon: {
        color: '#fff'
    },
    favoritesButtonBox: {
        position: 'relative',
        display: "flex",
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    favoritesButton: {
        "@media (min-width: 320px)": {
            bottom: '-86vw',
        },
        "@media (min-width: 414px)": {
            bottom: '-100vw',
            right: '-26px'
        },
        "@media (min-width: 768px)": {
            bottom: '-90vw',
            right: 'unset'
        },
        "@media (min-width: 992px)": {
            bottom: '-108vw',
        },
        "@media (min-width: 1200px)": {
            bottom: 'unset'
        },
        zIndex: 1,
        '& .MuiIconButton-label': {
            transition: '0.3s'
        },
        backgroundColor: secondaryColor,
        '&:hover': {
            backgroundColor: '#fff',
            '& .MuiSvgIcon-root': {
                transform: 'Rotate(360deg)',
                transition: '0.3s'
            }
        },
        '& .MuiSvgIcon-root': {
            transform: 'Rotate(0deg)',
            transition: '0.3s'
        }
    },
    favoritesButtonSelected: {
        backgroundColor: '#fff'
    },
    favoritesContentClose: {
        borderRadius: '50%',
        transform: 'scale(0)',
    },
    favoritesContentOpen: {
        transform: 'scale(1)',
        borderRadius: 'unset',
    },
    favoritesContent: {
        padding: 20,
        transitionProperty: 'all',
        transition: '.3s',
        position: 'absolute',
        height: '100vh',
        backgroundColor: secondaryColor,
        "@media (min-width: 320px)": {
            right: '-15vw',
            transformOrigin: '82% 92%',
            width: '95vw',
            top: '-67vw'
        },
        "@media (min-width: 414px)": {
            transformOrigin: '83% 88%',
            right: '-16vw',
            top: '-60vw',
            width: '80vw',
        },
        "@media (min-width: 768px)": {
            right: '-10vw',
            transformOrigin: '82% 95%',
            top: '-37vw',
            width: '60vw',
        },
        "@media (min-width: 992px)": {
            right: '-5vw',
            transformOrigin: '87% 95%',
            top: '-12vw',
            width: '50vw',
        },
        "@media (min-width: 1200px)": {
            right: '-15vw',
            transformOrigin: '35% 5%',
            width: '25vw',
            top: 0,
        },
    },
    disabled: {
        backgroundColor: `${disabledColor} !important`
    },
    addButton: {
        backgroundColor: secondaryColor,
        marginRight: 10,
        '&:hover': {
            backgroundColor: '#fff'
        },
        "@media (min-width: 320px)": {
            bottom: '-86vw',
        },
        "@media (min-width: 414px)": {
            bottom: '-100vw',
            right: '-26px'
        },
        "@media (min-width: 768px)": {
            bottom: '-90vw',
            right: 'unset'
        },
        "@media (min-width: 992px)": {
            bottom: '-108vw',
        },
        "@media (min-width: 1200px)": {
            bottom: 'unset'
        },
    },
    favoritesDescription: {
        marginTop: '100px !important',
        color: '#000',
        fontFamily: 'Roboto',
        fontSize: 34,
    },
}))

export interface Props {
    isContent: boolean;
    isPending?: boolean;
}