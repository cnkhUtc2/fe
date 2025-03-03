import { useEffect, useState } from "react";
import styles from "../../styles/conversation.module.css";
import { getById } from "../../apis/services/UserService";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const fetchUser = async () => {
      const res = await getById(friendId);
      setUser(res.data);
    };
    fetchUser();
  }, [currentUser, conversation]);

  return (
    <div className={styles.conversation}>
      <img
        className={styles.conversationImg}
        src={user?.profile?.avatar?.filePath || "/noAvatar.png"}
        alt=""
      />
      <span className={styles.conversationName}>{user?.name}</span>
    </div>
  );
}
