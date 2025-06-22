import UsersList from "../components/UsersList";

const Users = () => {
  const User = [{ id: "u1", name: " Ifti", image: "", places: 3 }];
  return <UsersList items={Users} />;
};

export default Users;
