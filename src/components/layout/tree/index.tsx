import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Icon, IconButton } from '@material-ui/core';
import IDoctor from '../../../interfaces/doctor';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
        alignItems: 'center',
        height: "auto"
    },
    nested: {
        paddingLeft: 20,
        background: "rgba(254, 97, 124, 0.8)",
        color: "white"
    },
    red: {
        color: "#FE617C"
    }
}));

interface IProps {
    filteredItems: Array<IDoctor>,
    openItems: any,
    selectedItems: Array<IDoctor>,
    handleSetSelectedItem: any,
    handleOpenItems: any
}

export default function Tree({ filteredItems, openItems, selectedItems, handleSetSelectedItem, handleOpenItems }: IProps): JSX.Element {
    const classes = useStyles();
    return (
        filteredItems.length > 0
            ? (
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className={classes.root}
                >
                    {
                        filteredItems.map((item, index) => (
                            <div key={index}>
                                <ListItem>
                                    <ListItemIcon>
                                        <IconButton
                                            role={"selector"}
                                            onClick={() => handleSetSelectedItem(item)}>
                                            {selectedItems.find(i => i.id === item.id) ? <Icon className={classes.red}>check_box_outline</Icon> : <Icon>check_box_outline_blank</Icon>}
                                        </IconButton>
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />
                                    {item.address && (
                                        <IconButton role={"expand"} onClick={() => handleOpenItems(openItems, item)}>
                                            {openItems[item.id] ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
                                        </IconButton>
                                    )}
                                </ListItem>
                                {openItems[item.id] && item.address && (
                                    <List
                                        component="nav"
                                        aria-labelledby="nested-list-subheader"
                                        className={classes.nested}
                                    >
                                        <ListItem>
                                            <ListItemText primary={item.address.line1} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={item.address.line2 + " " + item.address.postalCode + " " + item.address.city + ", " + item.address.country} />
                                        </ListItem>
                                    </List>
                                )}
                            </div>
                        ))
                    }
                </List>
            )
            :
            (<div></div>)
    );
}