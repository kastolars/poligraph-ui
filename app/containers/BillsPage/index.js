import React, { useState } from 'react';
import List from '@mui/material/List';
import { FormControl, InputLabel, ListItem, ListItemText, MenuItem, Select } from '@mui/material';
import { api } from './constants.js';
import { Box } from '@mui/system';
import PuffLoader from "react-spinners/PuffLoader";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const states = [
    { id: "ca", name: "California" },
    { id: "il", name: "Illinois" },
    { id: "ny", name: "New York" },
    { id: "tx", name: "Texas" },
]

const testBills = [
    { identifier: "bill1", title: "Bill 1" },
    { identifier: "bill2", title: "Bill 2" },
    { identifier: "bill3", title: "Bill 3" },
    { identifier: "bill4", title: "Bill 4" },
]

export default function BillsPage() {

    const [bills, setBills] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [billsLoading, setBillsLoading] = useState(false);

    const searchBills = event => {
        setSelectedState(event.target.value);
        const url = `${api}/bills?j=${event.target.value}`;
        setBillsLoading(true);
        fetch(url)
            .then(res => res.json())
            .then(billList => {
                setBills(billList);
                setBillsLoading(false);
            })
    }

    return (
        <Box sx={{ minWidth: '100%' }}>
            <Box sx={{ minWidth: 120, display: "flex", justifyContent: "center" }}>
                {billsLoading ? <PuffLoader loading={billsLoading} size={150} /> :
                    <FormControl sx={{ minWidth: "30%" }}>
                        <InputLabel >State</InputLabel>
                        <Select
                            value={selectedState}
                            label="Select State"
                            onChange={searchBills}
                        >
                            {states.map(state => <MenuItem key={state.id} value={state.id}>{state.name}</MenuItem>)}
                        </Select>
                    </FormControl>}
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} >
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell >Identifier</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bills.map(bill => (
                            <TableRow
                                key={bill.identifier}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{bill.title}</TableCell>
                                <TableCell >{bill.identifier}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box >
    )
}