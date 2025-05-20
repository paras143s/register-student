import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardTable from '../components/DashboardTable';
import { Button, Modal, Form } from 'react-bootstrap';

const MainLayout = () => {
  const [students, setStudents] = useState([
  ]);

  const [nextId, setNextId] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', branch: '', email: '',phone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleAddStudent = () => {
    setFormData({ name: '', branch: '', email: '' ,phone:''});
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditStudent = (student) => {
    setFormData({ name: student.name, branch: student.branch, email: student.email,phone: student.phone });
    setEditId(student.id);
    setIsEditing(true);
    setShowModal(true);
  };

  // Delete student than id reassignment
  const handleDeleteStudent = (idToDelete) => {
    const updated = students.filter((student) => student.id !== idToDelete);
    const reIndexed = updated.map((student, index) => ({
      ...student,
      id: index + 1,
    }));
    setStudents(reIndexed);
    setNextId(reIndexed.length + 1);
  };

  // Remove student than Id reassignment
  const handleRemoveStudent = () => {
    const updated = students.slice(0, -1);
    const reIndexed = updated.map((student, index) => ({
      ...student,
      id: index + 1,
    }));
    setStudents(reIndexed);
    setNextId(reIndexed.length + 1);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: '', branch: '', email: '' });
    setIsEditing(false);
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setStudents(prev =>
        prev.map(student =>
          student.id === editId ? { ...student, ...formData } : student
        )
      );
    } else {
      const newStudent = { ...formData, id: nextId };
      const updated = [...students, newStudent];
      setStudents(updated);
      setNextId(updated.length + 1); // ID becomes count + 1
    }
    handleCloseModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      
      {sidebarVisible && (
        <Sidebar
          onAddStudent={handleAddStudent}
          onRemoveStudent={handleRemoveStudent}
        />
      )}

      <div className="flex-grow-1">
        <div className="p-2 border-bottom d-flex justify-content-start align-items-center">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => setSidebarVisible(!sidebarVisible)}
          >
            {sidebarVisible ? '✖ ' : '☰'}
          </Button>
          <h2 className='m-auto text-primary'>Register Student</h2>
        </div>

        <DashboardTable
          data={students}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
        />
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Update Student' : 'Add Student'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Branch</Form.Label>
              <Form.Select
              required
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              >
                <option value="">Select branch</option>
                <option value="MCA">MCA</option>
                <option value="MBA">MBA</option>
                <option value="BSC">BSC</option>
                <option value="BCA">BCA</option>
                <option value="MCA WITH FULL STACK">MCA WITH FULL STACK</option>
                <option value="MBA FINANCE">MBA FINANCE</option>
                <option value="BSC COMPUTER SCIENCE">BSC COMPUTER SCIENCE</option>
                <option value="BCA WITH WEB DEVELOPMENT">BCA WITH WEB DEVELOPMENT</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                required
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter mobile number"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {isEditing ? 'Update' : 'Add'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default MainLayout;
