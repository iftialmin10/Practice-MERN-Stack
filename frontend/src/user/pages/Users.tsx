import UsersList from "../components/UsersList";
import type { User } from "../../type";

const Users = () => {
  const USERS: User[] = [
    {
      id: "u1",
      name: " Ifti",
      image: "https://picsum.photos/id/237/200/300",
      places: 3,
    },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
