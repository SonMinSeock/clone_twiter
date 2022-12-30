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
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Display Name"
        value={newDisplayName}
        onChange={onChange}
      />
      <input type="submit" value="Update Profile" />
      <span>{}</span>
    </form>
  );
}

export default ProfileForm;
