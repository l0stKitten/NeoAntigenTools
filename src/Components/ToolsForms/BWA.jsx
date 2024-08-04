// SimpleForm.jsx
import React from 'react';
import { TextField, Box, Button } from '@mui/material';

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
                label="Número de Hilos"
                name="threads"
                type='number'
                value={formData.threads}
                onChange={handleChange}
                required
            />

            <Button
                variant="contained"
            >
                Procesar
            </Button>
        </Box>
    );
};

export default SimpleFormBWA;
