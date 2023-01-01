import { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";

// 홈화면 페이지
function Home({ userObj }) {
  const [tweets, setTweets] = useState([]);
  // url 관리 하기위한 상태

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
    <div className="container">
      <TweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
