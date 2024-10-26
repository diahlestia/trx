import axios from 'axios';
import { useEffect, useState } from 'react';

export default function AdminList() {
    const [admins, setAdmins] = useState([]);

    const fetchAdmins = async () => {
        const response = await axios.get('/api/admins');
        setAdmins(response.data);
    };

    const handleDelete = async (id) => {
        await axios.delete('/api/admins', { data: { id } });
        fetchAdmins();
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    return (
        <div>
            <h2>Admin List</h2>
            <ul>
                {admins.map(admin => (
                    <li key={admin.id}>
                        {admin.name} - {admin.email}
                        <button onClick={() => handleDelete(admin.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
