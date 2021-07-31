/**
 * @interface User
 * This interface enforces that objects and lists with the Users type should follow all the type rules that are set in this interface.
 */
export interface User {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'Dr'|'Mr'|'Mrs'|'Miss'|'Ms';
  password: string;
}
