interface IProps {
    handleClose: any,
    handleChange: any,
    handleSubmit: any
}

const config = ({ handleClose, handleChange, handleSubmit }: IProps) => ({
    title: "Book a doctor!",
    description: "Please enter your contact information here to create a 1 hour appointment with the doctor.",
    open: false,
    fields: [
        { margin: "dense", name: "name", id: "name", label: "Name", type: "text" },
        { margin: "dense", name: "email", id: "email", label: "Email Address", type: "email" },
        { margin: "dense", name: "phone", id: "phone", label: "Phone Number", type: "text" },
    ],
    handleClose,
    handleChange,
    handleSubmit
});

export default config;