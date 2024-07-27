import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Get, Post } from "../../Axios/AxiosFunctions";
import Button from "../../components/Button";
import DropDown from "../../components/DropDown";
import AddRoomModal from "../../components/Modals/AddRoomModal";
import { BaseURL } from "../../config/apiUrl";
import classes from "./Dashboard.module.css";
import avatar from "../../assets/images/user.png";
import profile from "../../assets/images/profile-img.jpg";
import AddImageComponent from "../../components/AddImageComponent";
const Dashboard = () => {
  const { user } = useSelector((state) => state?.authReducer);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [roomModal, setRoomModal] = useState(false);
  console.log(user, "user");

  const fetchAllUsers = async () => {
    const url = BaseURL(`GET/users?myId=${user?._id}&search=${""}`);
    const response = await Get(url);
    if (response !== undefined) {
      setAllUsers(response?.data?.data);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const AddRoom = async (message) => {
    const url = BaseURL("POST/room");
    const params = {
      lastMessage: {
        _id: Math.random() * 1000,
        text: message,
        createdAt: new Date(),
        user: {
          _id: user?._id,
          name: `${user?.firstName} ${user?.lastName}`,
          avatar: user?.photo,
        },
      },
      user1: user?._id,
      user2: selectedUser?._id,
    };
    console.log(params, "params");
    const response = await Post(url, params);
    if (response !== undefined) {
      console.log(response, "response");
      setRoomModal(false);
    }
  };
  console.log(selectedUser, "selectedUser");
  return (
    <div className={classes.mainContainer}>
      <div className={classes.innerContainer}>
        <h1>Dashboard</h1>
        <DropDown
          options={allUsers}
          placeholder={"Users"}
          value={selectedUser}
          setter={setSelectedUser}
          OptionLabel={"firstName"}
          OptionValue={"firstName"}
        />
        <div className={classes.btnDiv}>
          <Button
            label={"Add To Room"}
            disabled={selectedUser === ""}
            onClick={() => setRoomModal(true)}
          />
        </div>
      </div>
      <AddRoomModal show={roomModal} setShow={setRoomModal} onClick={AddRoom} />
    </div>
  );
};

export default Dashboard;
