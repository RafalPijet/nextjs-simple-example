import { makeStyles, createStyles } from '@mui/styles';
import { Launch } from '../../../types/global';

export const useStyles = makeStyles(() => createStyles({
    root: {
        width: '100%',
        justifyContent: 'space-between',
        margin: '5px 0',
        position: 'relative',
        paddingLeft: 0
    },
    rootFavorites: {
        margin: '10px 0px',
        '&:hover .MuiAvatar-root': {
            border: '2px solid #000'
        },
        '&:hover .MuiButtonBase-root': {
            backgroundColor: '#fff'
        },
        '&:hover': {
            backgroundColor: 'inherit'
        }
    },
    description: {
        paddingLeft: 10,
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#000'
    },
    avatar: {
        width: 56,
        height: 56,
        border: '2px solid #fff'
    },
    verticalCenter: {
        display: 'flex',
        alignItems: 'center'
    },
    hiddenContent: {
        position: 'absolute',
        backgroundColor: '#eeeeee',
        width: '100%',
        height: '120%',
        borderRadius: 25,
        transform: 'translate(30px)',
        zIndex: -1,
    }
}))

export interface Props {
    launch: Launch;
    isFavorites: boolean;
}