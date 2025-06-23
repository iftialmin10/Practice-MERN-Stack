import UsersList from "../components/UsersList";
import type { User } from "../components/UsersList";

const Users = () => {
  const USERS: User[] = [
    { id: "u1", name: " Ifti", image: "https://flic.kr/p/2gWtxEn", places: 3 },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
