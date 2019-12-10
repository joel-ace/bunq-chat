import React, { useContext } from 'react';

import AppContext from 'context';
import { setDisplaySidebarComponent } from 'actions/chatActions';
import { SIDEBAR_DISPLAY_OPTIONS } from 'src/constants';

import Button from 'components/common/Button';

const SidebarTop = () => {
  const { dispatch, state } = useContext(AppContext);
  const { displaySidebarComponent } = state;

  const handleClick = (displayComponent) => {
    setDisplaySidebarComponent(dispatch, displayComponent);
  };

  return (
    <div className="top flex-container-mobile">
      {
        displaySidebarComponent === SIDEBAR_DISPLAY_OPTIONS.conversations
          ? (
            <>
              <Button icon="fa fa-users" onClick={() => handleClick(SIDEBAR_DISPLAY_OPTIONS.groupChat)} />
              <Button icon="fa fa-comments" onClick={() => handleClick(SIDEBAR_DISPLAY_OPTIONS.personalChat)} />
            </>
          ) : (
            <Button icon="fa fa-arrow-left" onClick={() => handleClick(SIDEBAR_DISPLAY_OPTIONS.conversations)} />
          )
      }
    </div>
  );
};

export default SidebarTop;
