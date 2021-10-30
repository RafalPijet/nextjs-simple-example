import { makeStyles, createStyles } from '@mui/styles';
import { secondaryColor, primaryColor } from './globalStyles';

export const useStyles = makeStyles(() => createStyles({
    button: {
        border: `2px solid ${secondaryColor}`,
        color: secondaryColor,
        margin: '0 5px',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, .7)',
            color: primaryColor
        }
    },
    buttonSelected: {
        border: `2px solid ${secondaryColor}`,
        backgroundColor: secondaryColor,
        color: "#000",
        margin: '0 5px',
        '&:hover': {
            backgroundColor: secondaryColor,
            color: "#000"
        }
    }
}))