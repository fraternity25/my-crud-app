// lib/dataService.js
import { Pool } from 'pg';

const pool = new Pool(); // Uses .env.local vars

export async function getUsers() {
  const res = await pool.query('SELECT * FROM users ORDER BY id ASC');
  return res.rows;
}

export async function getUserById(id) {
  const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return res.rows[0];
}

export async function createUser(user) {
  try {
    const { name, email } = user;
    const res = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    return res.rows[0];
  }
  catch(error) {
    if (error.code === '23505') {
      // 23505: unique_violation in PostgreSQL
      throw new Error('A user with this email already exists.');
    }
    throw error;
  }
  
}

export async function updateUser(id, user) {
  try {
    const { name, email } = user;
    const res = await pool.query(
      `UPDATE users SET name = $1, email = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *`,
      [name, email, id]
    );
    return res.rows[0];
  }
  catch(error) {
    if (error.code === '23505') {
      // 23505: unique_violation in PostgreSQL
      throw new Error('A user with this email already exists.');
    }
    throw error;
  }
}

export async function deleteUser(id) {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
}


/*import fs from 'fs';
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
}*/