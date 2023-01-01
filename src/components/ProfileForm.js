import { updateProfile } from "firebase/auth";
import { useState } from "react";

function ProfileForm({ userObj, refreshUser }) {
  const [newDisplayName, setDisplayName] = useState(userObj.displayName);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: newDisplayName });
    }
    refreshUser();
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setDisplayName(value);
  };
  return (
    <form onSubmit={onSubmit} className="profileForm">
      <input
        type="text"
        placeholder="Display Name"
        value={newDisplayName}
        onChange={onChange}
        autoFocus
        className="formInput"
      />
      <input
        type="submit"
        value="Update Profile"
        className="formBtn"
        style={{ marginTop: 10 }}
      />
      <span>{}</span>
    </form>
  );
}

export default ProfileForm;
