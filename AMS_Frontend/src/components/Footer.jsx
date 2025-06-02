import React from "react";
import { Box, Typography, Link, Container } from "@mui/material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: "auto",
                bottom: 0,
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
            }}
        >
            <Container maxWidth="lg">
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                >
                    {"© "}
                    <Link color="inherit" href="/">
                        MediCare App
                    </Link>{" "}
                    {new Date().getFullYear()}
                    {". All rights reserved."}
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
