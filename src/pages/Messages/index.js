import React, { useEffect, useRef, useState } from "react";
import classes from "./Mesages.module.css";
import { Row, Col } from "react-bootstrap";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { msgData } from "../../config/DummyData";
import moment from "moment";
import { apiUrl, BaseURL, imageUrl, socketURL } from "../../config/apiUrl";
import { Get } from "../../Axios/AxiosFunctions";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import InputWithSend from "../../components/InputWithSend";

const Room = ({ data, selectedRoom, setSelectedRoom }) => {
  const { user } = useSelector((state) => state?.authReducer);
  const decideUser = data?.user1?._id === user?._id ? data?.user2 : data?.user1;

  return (
    <div
      className={[
        classes.mainRoomDiv,
        data?._id === selectedRoom?._id && classes.selectedRoom,
      ].join(" ")}
      onClick={() => setSelectedRoom(data)}
    >
      <div className={classes.roomImgDiv}>
        <img src={decideUser?.photo} alt="..." />
      </div>
      <div className={classes.roomDataContentDiv}>
        <div className={classes.roomData}>
          <h6>
            {decideUser?.firstName} {decideUser?.lastName}
          </h6>
          <p>{data?.lastMessage?.text}</p>
        </div>
        <div className={classes.roomTime}>
          <small>
            {moment(data?.lastMessage?.createdAt).format("hh:mm a")}
          </small>
        </div>
      </div>
    </div>
  );
};

const Messages = () => {
  const { accessToken, user } = useSelector((state) => state?.authReducer);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(false);

  const [chats, setChats] = useState([]);
  const [chatsLoading, setChatsLoading] = useState(false);

  const socket = useRef(null);

  useEffect(() => {
    getRooms();
    socket.current = io(apiUrl, { transports: ["websocket"] });
    socket.current.emit("join", user?._id);
    return () => {
      socket.current.emit("disconnected", user?._id);
    };
  }, []);

  const getRooms = async () => {
    const url = BaseURL("GET/rooms");
    setRoomsLoading(true);
    const response = await Get(url, accessToken);
    if (response !== undefined) {
      setRooms(response?.data?.data);
    }
    setRoomsLoading(false);
  };
  const getChats = async () => {
    const url = BaseURL(`GET/chats?roomId=${selectedRoom?._id}`);
    setChatsLoading(true);
    const response = await Get(url, accessToken);
    if (response !== undefined) {
      setChats(response?.data?.data);
    }
    setChatsLoading(false);
  };

  useEffect(() => {
    if (selectedRoom !== null) {
      getChats();
      socket.current.emit("chatJoin", user?._id, selectedRoom?._id);
      socket.current.emit("mark-as-read", user?._id, selectedRoom?._id);
      socket.current.on("msg", (msg) => {
        if (selectedRoom?._id === msg?.room && msg?.user?._id !== user?._id) {
          setChats((prev) => [msg, ...prev]);
          socket.current.emit("mark-as-read", user?._id, selectedRoom?._id);
        }
      });
    }
  }, [selectedRoom]);

  const sendMessage = async (e) => {
    const msgData = {
      room: selectedRoom?._id,
      text: e,
      createdAt: moment().format(),
      user: {
        _id: user?._id,
        avatar: user?.photo,
        name: `${user?.firstName} ${user?.lastName}`,
      },
    };
    socket.current.emit("sendMessage", selectedRoom?._id, user?._id, msgData);
    setChats((prev) => [msgData, ...prev]);
  };

  return (
    <div className={classes.mainContainer}>
      <Row className={classes.mainRow}>
        <Col md={3}>
          <div className={classes.roomCol}>
            {rooms?.map((item, i) => {
              return (
                <Room
                  key={i}
                  data={item}
                  selectedRoom={selectedRoom}
                  setSelectedRoom={setSelectedRoom}
                />
              );
            })}
          </div>
        </Col>
        <Col md={9}>
          <div className={classes.chatCol}>
            {selectedRoom ? (
              <>
                <div className={classes.chattingDiv}>
                  {chats?.map((item, i) => {
                    return (
                      <div
                        className={classes.msgDiv}
                        style={{
                          flexDirection:
                            item?.user?._id === user?._id && "row-reverse",
                        }}
                      >
                        <div className={classes.msgImg}>
                          <img src={item?.user?.avatar} alt="...." />
                        </div>
                        <p className={classes.msgText}>{item?.text}</p>
                      </div>
                    );
                  })}
                </div>
                <InputWithSend handleClick={sendMessage} />
              </>
            ) : (
              <div className={classes.noRoomSelected}>
                <h2>No Room Selected</h2>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Messages;
