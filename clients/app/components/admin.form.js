import { useState } from 'react';
import axios from 'axios';

export default function AdminForm({ onAdminChange }) {
    const [admin, setAdmin] = useState({ id: '', name: '', email: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (admin.id) {
            await axios.put('/api/admins', admin);
        } else {
            await axios.post('/api/admins', admin);
        }
        setAdmin({ id: '', name: '', email: '' });
        onAdminChange();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Admin Name" 
                value={admin.name} 
                onChange={(e) => setAdmin({ ...admin, name: e.target.value })} 
                required 
            />
            <input 
                type="email" 
                placeholder="Admin Email" 
                value={admin.email} 
                onChange={(e) => setAdmin({ ...admin, email: e.target.value })} 
                required 
            />
            <button type="submit">Save Admin</button>
        </form>
    );
}
