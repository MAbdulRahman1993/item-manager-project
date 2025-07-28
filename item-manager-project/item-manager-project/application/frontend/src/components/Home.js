import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const { user, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleCreateItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/items', formData);
      setItems([response.data, ...items]);
      setFormData({ title: '', description: '' });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/items/${editingItem._id}`, formData);
      setItems(items.map(item => item._id === editingItem._id ? response.data : item));
      setFormData({ title: '', description: '' });
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`http://localhost:5000/api/items/${itemId}`);
        setItems(items.filter(item => item._id !== itemId));
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const startEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
    });
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setFormData({ title: '', description: '' });
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1>Item Manager</h1>
          <div className="user-info">
            <span>Welcome, {user?.username}!</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="home-main">
        <div className="actions-bar">
          <button 
            onClick={() => setShowCreateForm(true)} 
            className="create-button"
          >
            + Add New Item
          </button>
        </div>

        {showCreateForm && (
          <div className="form-overlay">
            <div className="form-modal">
              <h3>Create New Item</h3>
              <form onSubmit={handleCreateItem}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    required
                    placeholder="Enter item title"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    placeholder="Enter item description"
                    rows="3"
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="submit-button">
                    Create Item
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowCreateForm(false)}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {editingItem && (
          <div className="form-overlay">
            <div className="form-modal">
              <h3>Edit Item</h3>
              <form onSubmit={handleUpdateItem}>
                <div className="form-group">
                  <label htmlFor="edit-title">Title</label>
                  <input
                    type="text"
                    id="edit-title"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    required
                    placeholder="Enter item title"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-description">Description</label>
                  <textarea
                    id="edit-description"
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    placeholder="Enter item description"
                    rows="3"
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="submit-button">
                    Update Item
                  </button>
                  <button 
                    type="button" 
                    onClick={cancelEdit}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="items-grid">
          {items.length === 0 ? (
            <div className="empty-state">
              <p>No items yet. Create your first item!</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item._id} className="item-card">
                <div className="item-header">
                  <h3>{item.title}</h3>
                  <div className="item-actions">
                    <button 
                      onClick={() => startEdit(item)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteItem(item._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {item.description && (
                  <p className="item-description">{item.description}</p>
                )}
                <div className="item-footer">
                  <small>
                    Created: {new Date(item.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Home; 