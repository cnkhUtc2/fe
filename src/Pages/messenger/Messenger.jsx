import styles from "../../styles/messenger.module.css";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../../UserContext";
// import {
//   createMessage,
//   getConversations,
//   getMessages,
// } from "../../apis/services/ChatService";
import { useParams } from "react-router-dom";
import { getSocket } from "../../../socket";
// import { getById } from "../../apis/services/UserService";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentUser, setCurrentUSer] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = getSocket();
  const scrollRef = useRef();
  const user = useContext(UserContext);
  const { friendId } = useParams("friendId");

  useEffect(() => {
    // const fetchCurrentUser = async () => {
    //   const res = await getById(user?._id);
    //   setCurrentUSer(res.data);
    // };
    // fetchCurrentUser();
  }, []);

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
    return () => {
      socket.off("getMessage");
    };
  }, [socket]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (user?._id) {
      socket.emit("addUser", user?._id);
    }
  }, [user, socket]);

  useEffect(() => {
    // const fetchConversations = async () => {
    //   const res = await getConversations(user?._id);
    //   setConversations(res.data);
    // };
    // fetchConversations();
  }, [user?._id]);

  useEffect(() => {
    if (friendId && conversations.length) {
      const existingConversation = conversations.find((c) =>
        c.members.includes(friendId)
      );
      if (existingConversation) {
        setCurrentChat(existingConversation);
      }
    }
  }, [friendId, conversations]);

  useEffect(() => {
    // const fetchMessages = async () => {
    //   if (currentChat?._id) {
    //     const res = await getMessages(currentChat._id);
    //     setMessages(res.data);
    //   }
    // };
    // fetchMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // const message = {
    //   sender: user?._id,
    //   text: newMessage,
    //   conversation: currentChat._id,
    // };
    // const receiverId = currentChat.members.find(
    //   (member) => member !== user._id
    // );
    // socket.emit("sendMessage", {
    //   senderId: user._id,
    //   receiverId,
    //   text: newMessage,
    // });
    // const res = await createMessage(message);
    // setMessages([...messages, res.data]);
    // setNewMessage("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.messenger}>
      <div className={styles.chatMenu}>
        <div className={styles.chatMenuWrapper}>
          <input
            placeholder="Search for friends"
            className={styles.chatMenuInput}
          />
          {conversations.map((c, key) => (
            <div key={key} onClick={() => setCurrentChat(c)}>
              <Conversation conversation={c} currentUser={user} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.chatBox}>
        <div className={styles.chatBoxWrapper}>
          {currentChat ? (
            <>
              <div className={styles.chatBoxTop}>
                {messages.map((m, key) => (
                  <div key={key} ref={scrollRef}>
                    <Message
                      message={m}
                      own={m.sender === user?._id}
                      currentUser={currentUser}
                      friend={currentChat?.members.find(
                        (member) => member !== user?._id
                      )}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.chatBoxBottom}>
                <textarea
                  className={styles.chatMessageInput}
                  placeholder="write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button
                  className={styles.chatSubmitButton}
                  onClick={handleSubmit}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className={styles.noConversationText}>
              Ấn Vào Đoạn Hội Thoại Để Trò Chuyện
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
