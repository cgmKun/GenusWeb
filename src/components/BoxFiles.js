import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, uploaded, last_modified) {
    return { name, uploaded, last_modified };
}

const rows = [
    createData('Reporte 20 de Junio', '28/06/2021', '18/12/2021'),
    createData('Reporte 30 de Junio', '28/06/2021', '18/12/2021'),
    createData('Reporte 21 de Noviembre', '28/06/2021', '18/12/2021'),
    createData('Reporte 21 de Noviembre', '28/06/2021', '18/12/2021'),
    createData('Reporte 21 de Noviembre', '28/06/2021', '18/12/2021'),
];

export default function BoxFiles() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        {/*<StyledTableCell align="right">Name</StyledTableCell>*/}
                        <StyledTableCell align="right">Uploaded</StyledTableCell>
                        <StyledTableCell align="right">Last modified</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.uploaded}</StyledTableCell>
                            <StyledTableCell align="right">{row.last_modified}</StyledTableCell>
                            {/*<StyledTableCell align="right">{row.carbs}</StyledTableCell>
                    <StyledTableCell align="right">{row.protein}</StyledTableCell>*/} 
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
