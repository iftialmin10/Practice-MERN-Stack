import UsersList from "../components/UsersList";
import type { User } from "../../type";

const Users = () => {
  const USERS: User[] = [];
  return <UsersList items={USERS} />;
};

export default Users;
