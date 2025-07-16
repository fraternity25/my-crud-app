import { DataService } from '../../../lib/dataService';

export default async function handler(req, res) {
  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case 'GET':
      try {
        const user = await DataService.getUserById(id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
      }
      break;

    case 'PUT':
      try {
        const { name, email } = req.body;
        
        if (!name || !email) {
          return res.status(400).json({ error: 'Name and email are required' });
        }
        
        const updatedUser = await DataService.updateUser(id, { name, email });
        res.status(200).json(updatedUser);
      } catch (error) {
        if (error.message === 'User not found') {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(500).json({ error: 'Failed to update user' });
      }
      break;

    case 'DELETE':
      try {
        await DataService.deleteUser(id);
        res.status(204).end();
      } catch (error) {
        if (error.message === 'User not found') {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(500).json({ error: 'Failed to delete user' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}