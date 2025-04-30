import { Box, Typography, Grid, Container, Link, IconButton } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1a1a1a",
        color: "white",
        padding: "60px 0 20px",
        width: "100%",
        marginTop: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              We are dedicated to providing the best service to our customers and creating innovative solutions.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Quick Links
            </Typography>
            <Link href="#" color="inherit" sx={{ display: "block", mb: 1 }}>
              Home
            </Link>
            <Link href="#" color="inherit" sx={{ display: "block", mb: 1 }}>
              Services
            </Link>
            <Link href="#" color="inherit" sx={{ display: "block", mb: 1 }}>
              Products
            </Link>
            <Link href="#" color="inherit" sx={{ display: "block", mb: 1 }}>
              Blog
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Contact Info
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              123 Business Street
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              New York, NY 10001
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: info@example.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: (123) 456-7890
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Subscribe to our newsletter for updates and exclusive offers.
            </Typography>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #444",
                  backgroundColor: "#333",
                  color: "white",
                }}
              />
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Subscribe
              </button>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: "1px solid #444",
            mt: 4,
            pt: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
