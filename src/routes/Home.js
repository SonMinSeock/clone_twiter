import { useEffect, useState } from "react";
import { dbService } from "fbase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import Tweet from "components/Tweet";

// 홈화면 페이지
function Home({ userObj }) {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "tweet"), {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setTweet("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  useEffect(() => {
    // query 질의문
    const q = query(
      collection(dbService, "tweet"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setTweets(newArray);
    });
  }, []);

  console.log(tweets);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          placeholder="What's on your mind?"
          type="text"
          maxLength={120}
        />
        <input type="submit" value="Tweet" />
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
