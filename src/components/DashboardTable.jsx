import React, { useState } from "react";
import { Table, Form, Button } from "react-bootstrap";

const DashboardTable = ({ data, onEdit, onDelete }) => {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-3">
      <Form.Control
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3 "
      />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Branch</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user) => (
            <tr key={user.id} >
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.branch}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Button
                variant="none"
                size="sm"
                className="me-2"
                onClick={() => onEdit(user)}
                >
                ✏️
                </Button>
                <Button
                variant="none"
                size="sm"
                onClick={() => onDelete(user.id)}
                >
                ✖
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DashboardTable;
