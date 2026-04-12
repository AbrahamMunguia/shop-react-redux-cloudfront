import { Box, Button, Typography } from "@mui/material";

export default function ErrorPage() {
    return <Box py={3} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <Typography variant="h4">Not found or not allowed</Typography>
        <Typography>Please check the URL or try again later</Typography>
        <Button variant="contained" color="error" href="/">
            Go to home
        </Button>
    </Box>
}