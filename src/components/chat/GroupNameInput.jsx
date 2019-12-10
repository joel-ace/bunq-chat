import React, { useState, useContext } from 'react';

import AppContext from 'context';
import { serializeObjKeysToString } from 'helpers/app';
import { createGroupConversation } from 'actions/chatActions';

const GroupNameInput = () => {
  const [input, setInput] = useState({});
  const {
    dispatch,
    state: {
      groupChatSelectedUsers,
    },
  } = useContext(AppContext);

  const handleSubmit = async () => {
    const userIds = serializeObjKeysToString(groupChatSelectedUsers);
    createGroupConversation(dispatch, {
      name: input.groupName,
      users: userIds,
    });
  };

  const handleInputChange = (event) => {
    event.persist();
    setInput(
      () => ({ ...input, [event.target.name]: event.target.value })
    );
  };

  return (
    <div className="input-group">
      <input
        type="text"
        name="groupName"
        className="form-control"
        onChange={handleInputChange}
        placeholder="Enter a group name"
      />
      <span className="input-group-addon">
        <button
          className="btn btn-info"
          disabled={!input.groupName}
          type="button"
          onClick={handleSubmit}
          style={{ margin: '0px' }}
        >
          <i className="fa fa-send" />
        </button>
      </span>
    </div>
  );
};

export default GroupNameInput;
