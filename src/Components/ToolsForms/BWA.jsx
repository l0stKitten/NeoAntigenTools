// SimpleForm.jsx
import React from 'react';
import { TextField, Box } from '@mui/material';

const SimpleFormBWA = ({ formData, onFormDataChange}) => {    
    const handleChange = (e) => {
        const { name, value } = e.target;
    
        onFormDataChange({
            ...formData,
            [name]: value
          })
      };
    
    return (
        <Box 
            component="form" 
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 300, margin: '0 auto', mt:2 }}
        >
            <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            />
            <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            />
        </Box>
    );
};

export default SimpleFormBWA;
