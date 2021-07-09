import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

interface IProps {
    open: boolean,
    title: string,
    description: string,
    fields: Array<any>,
    handleChange: any,
    handleSubmit: any,
    handleClose: any
}

function GenericDialog({ open, title, description, fields = [], handleChange, handleSubmit, handleClose }: IProps): JSX.Element {
    return (
        <Dialog open={open} onClose={() => "handleClose"} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {description}
                </DialogContentText>
                {fields.map((field: any, index: number) => (
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