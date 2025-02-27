import { useEffect, useState } from "react";
import styles from "../../styles/message.module.css";
import { formatDistanceToNow, format } from "date-fns";
import { getById } from "../../apis/services/UserService";

export default function Message({ message, own, currentUser, friend }) {
  const [friendd, setFriend] = useState({});
  useEffect(() => {
    const fetchFriend = async () => {
      const res = await getById(friend);
      setFriend(res.data);
    };
    fetchFriend();
  }, []);

  const createdAt = new Date(message.createdAt);
  const timeDisplay =
    Date.now() - createdAt.getTime() < 24 * 60 * 60 * 1000
      ? formatDistanceToNow(createdAt, { addSuffix: true }) // "2 hours ago"
      : format(createdAt, "MMM d 'at' h:mm a"); // "Dec 28 at 3:45 PM"

  const imageUrl = own
    ? currentUser?.profile?.avatar?.filePath || "/noAvatar.png"
    : friendd?.profile?.avatar?.filePath || "/noAvatar.png";

  return (
    <div className={own ? `${styles.message} ${styles.own}` : styles.message}>
      <div className={styles.messageTop}>
        <img className={styles.messageImg} src={imageUrl} alt="Profile" />
        <p className={styles.messageText}>{message.text}</p>
      </div>
      <div className={styles.messageBottom}>{timeDisplay}</div>
    </div>
  );
}
