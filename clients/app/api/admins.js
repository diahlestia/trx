import { admins } from '../../data/admins'; // Tempatkan data admin di sini

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(admins);
    } else if (req.method === 'POST') {
        const newAdmin = req.body;
        admins.push(newAdmin);
        res.status(201).json(newAdmin);
    } else if (req.method === 'PUT') {
        const { id, ...updatedAdmin } = req.body;
        const index = admins.findIndex(admin => admin.id === id);
        if (index !== -1) {
            admins[index] = { ...admins[index], ...updatedAdmin };
            res.status(200).json(admins[index]);
        } else {
            res.status(404).json({ message: 'Admin not found' });
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.body;
        const index = admins.findIndex(admin => admin.id === id);
        if (index !== -1) {
            admins.splice(index, 1);
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Admin not found' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
