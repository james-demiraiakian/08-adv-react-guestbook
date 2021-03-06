import React, { useState } from 'react';
import useDarkMode from 'use-dark-mode';
import { v4 as uuid } from 'uuid';
import { useEntries } from '../../context/EntryContext';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';

export default function User() {
  const [username, setUsername] = useState('');
  const [userEntry, setUserEntry] = useState('');
  const { user, setUser } = useUser();
  const { entries, setEntries } = useEntries();
  const darkMode = useDarkMode();
  const auth = useAuth();
  const email = auth.user.email;

  function updateUser() {
    if (!userEntry) return;
    setUser(username);
    setEntries([...entries, { username, message: userEntry, id: uuid() }]);
    setUserEntry('');
  }

  const submit = (e) => {
    e.preventDefault();
    updateUser();
  };

  return (
    <div>
      <form onSubmit={submit}>
        {!user && (
          <div className="username-box">
            <p htmlFor="username">User Name: {email}</p>
          </div>
        )}
        <div className="entry-box">
          <label htmlFor="user-entry">Entry: </label>
          <input
            className={darkMode.value ? 'input-dark-mode' : 'button-light-mode'}
            type="text"
            id="user-entry"
            value={userEntry}
            onChange={(e) => setUserEntry(e.target.value)}
          />
        </div>
        <button className={darkMode.value ? 'button-dark-mode' : 'button-light-mode'} type="submit">
          Sign Guestbook
        </button>
        {user && (
          <button
            className={darkMode.value ? 'button-dark-mode' : 'button-light-mode'}
            type="button"
            onClick={() => {
              setUser('');
              setUsername('');
            }}
          >
            Not you?
          </button>
        )}
      </form>
    </div>
  );
}
