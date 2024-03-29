import React from 'react';
import ChatHeader from './ChatHeader';
import ChatContainer from './ChatContainer';
import MessageBar from './MessageBar';

const Chat = () => {
  return (
    <div className={`border-conversation-border border-l w-full bg-conversation-panel-background flex flex-col z-10 h-screen`}>
      <ChatHeader />
      <ChatContainer />
      <MessageBar />
    </div>
  );
}

export default Chat;
