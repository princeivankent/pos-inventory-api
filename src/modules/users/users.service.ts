import { Injectable } from '@nestjs/common';

export type User = {
  id: string;
  username: string;
  password: string;
};

// TODO: Should get this from the database
const users: User[] = [
  { id: '1', username: 'john', password: '12345' },
  { id: '2', username: 'maria', password: '12345' },
];

@Injectable()
export class UsersService {
  async findUserByUsername(username: string): Promise<User | undefined> {
    return users.find(user => user.username === username);
  }
}
