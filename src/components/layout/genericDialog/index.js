import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

function GenericDialog({ open, title, description, fields = [], handleChange, handleSubmit, handleClose }) {
    return (
        <Dialog open={open} onClose={() => "handleClose"} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {description}
                </DialogContentText>
                {fields.map((field, index) => (
                    <TextField
                        key={index}
                        onChange={handleChange}
                        autoFocus={!index}
                        margin={field.margin}
                        id={field.id}
                        name={field.name}
                        label={field.label}
                        type={field.type}
                        fullWidth
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="text" color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="secondary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default GenericDialog;