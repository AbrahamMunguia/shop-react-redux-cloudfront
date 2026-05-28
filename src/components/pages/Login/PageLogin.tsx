// PageLogin.tsx
import { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../../Auth/Auth';

export default function PageLogin() {
    const navigate = useNavigate();
    const location = useLocation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const valid = await login(username, password).then(() => { console.log('Login successful'); return true; }).catch(() => { console.log('Login failed'); return false; });
        if (!valid) {
            setUsername('');
            setPassword('');
            alert('Invalid credentials');
            return;
        }
        const redirectTo =
            (location.state as any)?.from?.pathname || '/';

        navigate(redirectTo, { replace: true });
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Card sx={{ width: 400 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Admin Login
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        display="flex"
                        flexDirection="column"
                        gap={2}
                    >
                        <TextField
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                        />

                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                        />

                        <Button type="submit" variant="contained">
                            Login
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}