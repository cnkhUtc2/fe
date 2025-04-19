import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Chip,
    IconButton,
    Tooltip,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';
import {
    Check as CheckIcon,
    Close as CloseIcon,
    Visibility as ViewIcon
} from '@mui/icons-material';
import apiClient from '../../apis/AxiosConfiguration';

const HelpRequests = () => {
    const [requests, setRequests] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            // Đính kèm token Bearer để tránh 403 Forbidden
            const token = localStorage.getItem('token');
            const config = token
                ? { headers: { Authorization: `Bearer ${token}` } }
                : {};
            const response = await apiClient.get('/front/tickets', config);
            setRequests(response.data);
        } catch (error) {
            if (error.response?.status === 403) {
                alert('Bạn không có quyền truy cập. Vui lòng đăng nhập lại.');
                console.error('Error fetching requests:', error.response?.data);

            }
        } finally {
            setLoading(false);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleViewRequest = (request) => {
        setSelectedRequest(request);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedRequest(null);
    };

    const handleStatusChange = async (requestId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const config = token
                ? { headers: { Authorization: `Bearer ${token}` } }
                : {};
            await apiClient.put(
                `/front/tickets/${requestId}`,
                { status: newStatus },
                config
            );
            fetchRequests();
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Cập nhật trạng thái thất bại.');
        }
    };

    const getStatusChip = (status) => {
        const statusColors = {
            OPEN: { color: 'warning', label: 'Đang mở' },
            IN_PROGRESS: { color: 'info', label: 'Đang xử lý' },
            RESOLVED: { color: 'success', label: 'Đã giải quyết' },
            CLOSED: { color: 'error', label: 'Đã đóng' }
        };

        const statusInfo = statusColors[status] || { color: 'default', label: status };
        return <Chip label={statusInfo.label} color={statusInfo.color} size="small" />;
    };

    if (loading) {
        return <Typography>Đang tải dữ liệu...</Typography>;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Quản lý yêu cầu hỗ trợ
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tiêu đề</TableCell>
                            <TableCell>Mục đích</TableCell>
                            <TableCell>Địa điểm</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Ngày tạo</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requests
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((request) => (
                                <TableRow key={request._id}>
                                    <TableCell>{request._id}</TableCell>
                                    <TableCell>{request.title}</TableCell>
                                    <TableCell>{request.purpose}</TableCell>
                                    <TableCell>{request.location}</TableCell>
                                    <TableCell>{getStatusChip(request.status)}</TableCell>
                                    <TableCell>
                                        {new Date(request.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title="Xem chi tiết">
                                            <IconButton onClick={() => handleViewRequest(request)}>
                                                <ViewIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Chấp nhận">
                                            <IconButton
                                                onClick={() =>
                                                    handleStatusChange(request._id, 'IN_PROGRESS')
                                                }
                                            >
                                                <CheckIcon color="success" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Từ chối">
                                            <IconButton
                                                onClick={() =>
                                                    handleStatusChange(request._id, 'CLOSED')
                                                }
                                            >
                                                <CloseIcon color="error" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={requests.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="md"
                fullWidth
            >
                {selectedRequest && (
                    <>
                        <DialogTitle>Chi tiết yêu cầu hỗ trợ</DialogTitle>
                        <DialogContent>
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Thông tin cơ bản
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: 2
                                    }}
                                >
                                    <TextField
                                        label="Tiêu đề"
                                        value={selectedRequest.title}
                                        fullWidth
                                        disabled
                                    />
                                    <TextField
                                        label="Mục đích"
                                        value={selectedRequest.purpose}
                                        fullWidth
                                        disabled
                                    />
                                    <TextField
                                        label="Địa điểm"
                                        value={selectedRequest.location}
                                        fullWidth
                                        disabled
                                    />
                                    <TextField
                                        label="Trạng thái"
                                        value={selectedRequest.status}
                                        fullWidth
                                        disabled
                                    />
                                </Box>
                                <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
                                    Mô tả chi tiết
                                </Typography>
                                <TextField
                                    label="Mô tả"
                                    value={selectedRequest.description}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    disabled
                                />
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Đóng</Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    );
};

export default HelpRequests;
