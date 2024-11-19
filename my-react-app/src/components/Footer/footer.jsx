import { Box, Typography, Grid } from '@mui/material';

function Footer() {
    return (
        <Box sx={{ backgroundColor: '#333', color: 'white', padding: '20px 0' }}>
            <Grid container spacing={3} justifyContent="center">
                <Grid item>
                    <Typography variant="h6">About Us</Typography>
                    <Typography>Company Info</Typography>
                    <Typography>Careers</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h6">Contact</Typography>
                    <Typography>Email: info@example.com</Typography>
                    <Typography>Phone: (123) 456-7890</Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Footer;
