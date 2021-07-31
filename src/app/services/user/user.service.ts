import { Injectable } from '@angular/core';
import { last } from 'rxjs/operators';
import { User } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  KEY = 'users';
  constructor() { }

  /**
   * 
   * @returns an array of type User
   * This function reads all of the users from localStorage, if nothing is found it'll add an initial user to the
   * localStorage key and recursively call itself again to read the users again.
   */
  getAll(): User[] {
    const users = JSON.parse(localStorage.getItem(this.KEY));

    if(!users) {
      const initialUser: User = {
        id: 1,
        title: 'Title',
        firstName: 'Name',
        lastName: 'Surname',
        email: 'example@email.com',
        role: 'Dr',
        password: 'example'
      };
      this.addUser(initialUser);
      this.getAll();
    }

    return users;
  }

  /**
   * 
   * @param id {number} This id should correspond to an id in the Users arrayd ifound will be returned;
   * @returns an object of type User
   */
  getUserById(id: number): User {
    const users: User[] = JSON.parse(localStorage.getItem(this.KEY));
    return users.find(x => x.id === id);
  }

  /**
   * 
   * @param newUser {User} This object would be the new user to be added into the list of users
   * @returns void, this function has the sole responsibility to add to the list of users.
   */
  addUser(newUser: User): void {
    const users: User[] = JSON.parse(localStorage.getItem(this.KEY));

    if (!users) {
      localStorage.setItem(this.KEY, JSON.stringify([newUser]));
      return;
    }

    let lastId = Math.max(...users.map(x => x.id));
    newUser.id = lastId++;
    localStorage.setItem(this.KEY, JSON.stringify([...users, newUser]));
  }

  /**
   * This function updates a specific user's information
   * @param updated {User} This object would be the updated user object that will override the current user with the same id
   */
  updateUser(updated: User): void {
    const users: User[] = JSON.parse(localStorage.getItem(this.KEY));
    const index = users.findIndex(x => x.id == updated.id);

    if(index > -1) {
      users.splice(index, 1);
      users.push(updated);
      localStorage.setItem(this.KEY, JSON.stringify([...users]));
    }
  }

  /**
   * This function reads all the current users, finds the user to be deleted and deletes the user if found.
   * @param toDelete {User} This object would be deleted from the user list based on the id
   */
  deleteUser(toDelete: User): void {
    const users: User[] = JSON.parse(localStorage.getItem(this.KEY));
    const index = users.findIndex(x => x.id == toDelete.id);

    if(index > -1) {
      users.splice(index, 1);
      localStorage.setItem(this.KEY, JSON.stringify([...users]));
    }
  }
}
