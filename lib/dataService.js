import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize users.json if it doesn't exist
const usersFile = path.join(dataDir, 'users.json');
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, JSON.stringify([]));
}

export class DataService {
  static async getUsers() {
    try {
      const data = fs.readFileSync(usersFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading users:', error);
      return [];
    }
  }

  static async getUserById(id) {
    const users = await this.getUsers();
    return users.find(user => user.id === parseInt(id));
  }

  static async createUser(userData) {
    const users = await this.getUsers();
    const newUser = {
      id: Date.now(), // Simple ID generation
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    users.push(newUser);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    return newUser;
  }

  static async updateUser(id, userData) {
    const users = await this.getUsers();
    const index = users.findIndex(user => user.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('User not found');
    }
    
    users[index] = {
      ...users[index],
      ...userData,
      updatedAt: new Date().toISOString()
    };
    
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    return users[index];
  }

  static async deleteUser(id) {
    const users = await this.getUsers();
    const filteredUsers = users.filter(user => user.id !== parseInt(id));
    
    if (users.length === filteredUsers.length) {
      throw new Error('User not found');
    }
    
    fs.writeFileSync(usersFile, JSON.stringify(filteredUsers, null, 2));
    return true;
  }
}