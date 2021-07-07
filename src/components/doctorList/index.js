import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Search from '../layout/search';
import Tree from '../layout/tree';

const useStyles = makeStyles({
    margin: {
        marginTop: 12
    },
    logo: {
        height: 60
    }
});

function DoctorList({ isOpen, selectedItems, filteredItems, openItems, handleSetSelectedItem, handleOpenItems, setFilter, setIsOpen }) {
    const classes = useStyles();

    return (
        <>
            <div className={classes.logo}>
                <img src="joovence-logo.png" alt="logo" width="70%" />
            </div>
            <Search
                isOpen={isOpen}
                selectedItems={selectedItems}
                setFilter={setFilter}
                setIsOpen={setIsOpen}
            />
            {isOpen && (
                <Paper className={classes.margin}>
                    <Tree
                        filteredItems={filteredItems}
                        selectedItems={selectedItems}
                        openItems={openItems}
                        handleSetSelectedItem={handleSetSelectedItem}
                        handleOpenItems={handleOpenItems}
                    />
                </Paper>
            )}
        </>
    );
}

export default DoctorList;
