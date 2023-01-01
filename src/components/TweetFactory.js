import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storageService, dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

function TweetFactory({ userObj }) {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    if (tweet === "") {
      return;
    }
    let attachmentUrl = "";
    if (attachment !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(fileRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(response.ref);
      //console.log(attachmentUrl);
    }

    await addDoc(collection(dbService, "tweet"), {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    });
    setTweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  const onClearAttachment = () => setAttachment("");

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;

    // 파일 관련정보 저장
    const theFile = files[0];

    // 웹 브라우저에 사진 출력 해보기.
    // 브라우저 API인 FileReader 클래스 이용
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div>
        <input
          value={tweet}
          className="factoryInput__input"
          onChange={onChange}
          placeholder="What's on your mind?"
          type="text"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label for="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      <input type="submit" value="Tweet" />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            width="50px"
            height="50px"
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
}

export default TweetFactory;
