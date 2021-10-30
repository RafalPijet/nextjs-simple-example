import { ReactNode } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { container } from '../../../styles/globalStyles'

export const useStyles = makeStyles(() => createStyles({
    container: {
        ...container,
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: "1500px",
        overflow: "hidden",
        position: "relative",
        backgroundPosition: "top center",
        backgroundSize: "cover",
        margin: "0",
        padding: "0",
        border: "0",
        alignItems: "center",
        backgroundImage: "url('/background.jpg')",
        "&:before": {
            background: "rgba(0, 0, 0, 0.2)"
        },
    },
    logoBox: {
        "@media (min-width: 400px)": {
            display: 'flex',
            justifyContent: 'center'
        },
        "@media (min-width: 1200px)": {
            justifyContent: 'flex-start'
        },
    }
}))

export interface Props {
    children: ReactNode;
}