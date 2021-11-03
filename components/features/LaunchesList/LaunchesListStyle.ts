import { makeStyles, createStyles } from '@mui/styles';
import { secondaryColor } from '../../../styles/globalStyles';

export const useStyles = makeStyles(() => createStyles({
    root: {
        marginTop: 100,
        justifyContent: 'center',
        minHeight: '100vh',
        alignItems: 'center'
    },
    spiner: {
        color: secondaryColor
    },
}))

export interface Props {
    isPending: boolean;
}