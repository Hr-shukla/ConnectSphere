import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setActiveConversation } from '../../store/slices/messagesSlice';
import { Conversation } from '../../store/slices/messagesSlice';
import { formatDistanceToNow } from '../../utils/dateUtils';

const ConversationList: React.FC = () => {
  const { conversations, activeConversation } = useSelector((state: RootState) => state.messages);
  const dispatch = useDispatch();

  const handleSelectConversation = (conversationId: string) => {
    dispatch(setActiveConversation(conversationId));
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => handleSelectConversation(conversation.id)}
            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
              activeConversation === conversation.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={
                    conversation.participant.avatar ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${conversation.participant.username}`
                  }
                  alt={conversation.participant.username}
                  className="w-12 h-12 rounded-full border-2 border-gray-200"
                />
                {conversation.unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {conversation.unreadCount}
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                  {conversation.participant.username}
                </p>
                {conversation.lastMessage && (
                  <>
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage.content}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatDistanceToNow(new Date(conversation.lastMessage.timestamp))} ago
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {conversations.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <p>No conversations yet</p>
            <p className="text-sm">Start following people to send them messages!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;