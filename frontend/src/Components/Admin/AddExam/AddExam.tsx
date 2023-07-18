import * as React from 'react';
import { useState } from 'react';
import { RegistrationType } from '../../../Types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';

interface Props {
  registrations?: RegistrationType[];
}

export const BasicTable: React.FC<Props> = ({ registrations }) => {
  const [selectedRow, setSelectedRow] = useState<RegistrationType|null>(null);
  const [editData, setEditData] = useState<RegistrationType>({});

  const handleEdit = (row: RegistrationType) => {
    setSelectedRow(row);
    setEditData(row);
  };

  const handleSave = () => {
    // Additional logic to save the edited data
    setSelectedRow(null);
    setEditData({});
  };

  const handleClose = () => {
    setSelectedRow(null);
    setEditData({});
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Date and Time</TableCell>
            <TableCell>State</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {registrations?.map((row: RegistrationType) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.subject}</TableCell>
              <TableCell>{row.dateAndTime}</TableCell>
              <TableCell>{row.state}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.status ? 'Active' : 'Inactive'}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(row)}>Edit</Button>
                <Button>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal */}
      <Modal open={Boolean(selectedRow)} onClose={handleClose}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
          }}
        >
         
          
          <TextField
            label="Name"
            value={editData.name || ''}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            fullWidth
            sx={{ marginBottom: '10px' }}
          />

          <TextField
            label="Email"
            value={editData.email || ''}
            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
            fullWidth
            sx={{ marginBottom: '10px' }}
          />

          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </Modal>
    </TableContainer>
  );
};
