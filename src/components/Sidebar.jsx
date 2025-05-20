import React from 'react';
import { Nav } from 'react-bootstrap';

const Sidebar = ({ onAddStudent, onRemoveStudent }) => (
    <div
    className="bg-light p-3 h-100 border-end"
    style={{ width: '250px', minHeight: '100vh' }}
    >
    <h4>Dashboard</h4>
    <Nav className="flex-column mt-4 pt-4">
        <Nav.Link onClick={onAddStudent}>Add Student</Nav.Link>
        <hr />
        <Nav.Link onClick={onRemoveStudent}>Remove Last Student</Nav.Link>
        <hr />
        <Nav.Link href="#">Help</Nav.Link>
        <hr />
    </Nav>
  </div>
);

export default Sidebar;
