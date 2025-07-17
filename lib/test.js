import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

console.log(process.env); 

import { getUsers } from './dataService.js';

(async () => {
  const users = await getUsers();
  console.log(users);
})();
