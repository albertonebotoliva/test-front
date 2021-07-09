import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Icon, IconButton, InputBase, Paper, Chip } from '@material-ui/core';
import useDebounce from './../../../hooks';
import IDoctor from '../../../interfaces/doctor';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    chip: {
        marginRight: 5,
        margin: 3,
        backgroundColor: "rgba(254, 97, 124, 0.8)",
        fontWeight: "bold",
        color: "white"
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

interface IProps {
    isOpen: boolean,
    setFilter: any,
    setIsOpen: any,
    selectedItems: Array<IDoctor>
}

export default function Search({ isOpen, setFilter, setIsOpen, selectedItems }: IProps): JSX.Element {
    const classes = useStyles();
    const onChange = useDebounce(setFilter);

    return (
        <Paper component="form" className={classes.root}>
            <div>
                {selectedItems && selectedItems.map((item, index) => <Chip key={index} label={item.name} className={classes.chip} />)}
            </div>
            <InputBase
                className={classes.input}
                placeholder="Search..."
                inputProps={{ 'aria-label': 'mainSearch' }}
                onChange={onChange}
            />
            <IconButton onClick={() => setIsOpen(isOpen)} className={classes.iconButton} aria-label="search">
                {isOpen
                    ? <Icon>expand_less</Icon>
                    : <Icon>expand_more</Icon>
                }
            </IconButton>
        </Paper>
    );
}