import { makeStyles, createStyles } from '@mui/styles';
import { secondaryColor } from '../styles/globalStyles';

export const useStyles = makeStyles(() => createStyles({
    root: {
        padding: '20px 0',
        marginTop: 100,
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    button: {
        color: secondaryColor,
        borderColor: secondaryColor,
        borderRadius: 25
    },
    center: {
        display: 'flex',
        justifyContent: 'center'
    }
}))