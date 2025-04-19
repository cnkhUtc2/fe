import React, { useState } from 'react';
import {
    Box,
    Drawer,
    Toolbar,
    Typography,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Help as HelpIcon,
    AttachMoney as DonateIcon,
    Image as MediaIcon,
    Logout as LogoutIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import HelpRequests from './HelpRequests';

const drawerWidth = 240;

const menuItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, id: 'dashboard' },
    { label: 'Quản lý yêu cầu hỗ trợ', icon: <HelpIcon />, id: 'help-requests' },
    { label: 'Quản lý người dùng', icon: <PeopleIcon />, id: 'users' },
    { label: 'Quản lý donate', icon: <DonateIcon />, id: 'donations' },
    { label: 'Quản lý media', icon: <MediaIcon />, id: 'media' }
];

export default function AdminDashboard({ open, onClose }) {
    const [activeItem, setActiveItem] = useState('help-requests');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        onClose();
        navigate('/signin');
    };

    const renderContent = () => {
        switch (activeItem) {
            case 'help-requests':
                return <HelpRequests />;
            case 'dashboard':
                return <Typography variant="h4">Dashboard Content</Typography>;
            case 'users':
                return <Typography variant="h4">Users Content</Typography>;
            case 'donations':
                return <Typography variant="h4">Donations Content</Typography>;
            case 'media':
                return <Typography variant="h4">Media Content</Typography>;
            default:
                return <Typography variant="h4">Select a menu item</Typography>;
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xl"
            fullWidth
            PaperProps={{
                sx: {
                    height: '90vh',
                    maxHeight: '90vh',
                    margin: '5vh auto',
                    borderRadius: 2
                }
            }}
        >
            <DialogContent dividers sx={{ p: 0, display: 'flex', height: '100%' }}>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            position: 'relative',
                            height: '100%'
                        },
                    }}
                >
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Typography variant="h6" noWrap>
                            Admin Panel
                        </Typography>
                        <IconButton
                            edge="end"
                            onClick={onClose}
                            sx={{ display: { xs: 'block', sm: 'none' } }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />

                    <List>
                        {menuItems.map(({ label, icon, id }) => (
                            <ListItem key={id} disablePadding>
                                <ListItemButton
                                    selected={activeItem === id}
                                    onClick={() => setActiveItem(id)}
                                >
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText primary={label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleLogout}>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Đăng xuất" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
                <Box sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
                    {renderContent()}
                </Box>
            </DialogContent>
        </Dialog>
    );
}