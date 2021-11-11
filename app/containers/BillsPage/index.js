import React, { useEffect, useState } from 'react';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';
import { Box } from '@mui/system';
import PuffLoader from 'react-spinners/PuffLoader';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { api } from './constants.js';


export default function BillsPage() {
    const [bills, setBills] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [loading, setLoading] = useState(false);
    const [states, setStates] = useState([]);

    const searchBills = event => {
        setSelectedState(event.target.value);
        const url = `${api}/bills?j=${event.target.value}`;
        setLoading(true);
        fetch(url)
            .then(res => res.json())
            .then(billList => {
                setBills(billList);
                setLoading(false);
            });
    };

    useEffect(() => {
        const url = `${api}/jurisdictions`;
        setLoading(true);
        fetch(url)
            .then(res => res.json())
            .then(statesList => {
                setStates(statesList);
                setLoading(false)
            });
    }, [])

    return (
        <Box sx={{ minWidth: '100%' }}>
            <Box sx={{ minWidth: 120, display: 'flex', justifyContent: 'center', minHeight: '16vh' }}>
                {loading ? (
                    <PuffLoader loading={loading} size={150} />
                ) : (
                    <FormControl sx={{ minWidth: '30%' }}>
                        <InputLabel>State</InputLabel>
                        <Select
                            value={selectedState}
                            label="Select State"
                            onChange={searchBills}
                        >
                            {states.map(state => (
                                <MenuItem key={state.id} value={state.id}>
                                    {state.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            </Box>
            <TableContainer >
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Identifier</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bills.map(bill => (
                            <TableRow
                                key={bill.identifier}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {bill.title.length > 200 ? `${bill.title.substring(0, 200)}...` : bill.title}
                                </TableCell>
                                <TableCell>{bill.identifier}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
