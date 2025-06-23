import "./UserItem.css";
import type { User } from "./UsersList";

const UserItem = (props: User) => {
  return (
    <ul className="user-item">
      <div className="user-item__content">
        <div className="user-item__image">
          <img src={props.image} alt={props.name} />
        </div>
        <div className="user-item__info">
          <h2>{props.name}</h2>
          <h3>
            {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}{" "}
          </h3>
        </div>
      </div>
    </ul>
  );
};

export default UserItem;
