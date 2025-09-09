import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setConversations, setMessages } from '../store/slices/messagesSlice';
import ConversationList from '../components/Messages/ConversationList';
import ChatWindow from '../components/Messages/ChatWindow';

const Messages: React.FC = () => {
  const { conversations, activeConversation } = useSelector((state: RootState) => state.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (activeConversation) {
      loadMessages(activeConversation);
    }
  }, [activeConversation]);

  const loadConversations = async () => {
    try {
      // Mock conversations data
      const mockConversations = [
        {
          id: '1',
          participant: {
            id: '2',
            username: 'sarahsmith',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarahsmith',
          },
          lastMessage: {
            id: 'msg-1',
            senderId: '2',
            content: 'Hey! How are you doing?',
            timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          },
          unreadCount: 2,
        },
        {
          id: '2',
          participant: {
            id: '3',
            username: 'techguru',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=techguru',
          },
          lastMessage: {
            id: 'msg-2',
            senderId: '3',
            content: 'Thanks for sharing that article!',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          },
          unreadCount: 0,
        },
        {
          id: '3',
          participant: {
            id: '4',
            username: 'creativemind',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=creativemind',
          },
          lastMessage: {
            id: 'msg-3',
            senderId: '1',
            content: 'Looking forward to collaborating!',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          },
          unreadCount: 0,
        },
      ];

      dispatch(setConversations(mockConversations));
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      // Mock messages data based on conversation
      const mockMessagesData: { [key: string]: any[] } = {
        '1': [
          {
            id: 'msg-1-1',
            senderId: '2',
            content: 'Hey! How are you doing?',
            timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
          },
          {
            id: 'msg-1-2',
            senderId: '1',
            content: 'I\'m doing great! Just finished working on a new project. How about you?',
            timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
          },
          {
            id: 'msg-1-3',
            senderId: '2',
            content: 'That sounds exciting! I\'d love to hear more about it.',
            timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          },
        ],
        '2': [
          {
            id: 'msg-2-1',
            senderId: '1',
            content: 'Did you see that new framework announcement?',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
          },
          {
            id: 'msg-2-2',
            senderId: '3',
            content: 'Yes! It looks really promising. The performance improvements are impressive.',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5).toISOString(),
          },
          {
            id: 'msg-2-3',
            senderId: '3',
            content: 'Thanks for sharing that article!',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          },
        ],
        '3': [
          {
            id: 'msg-3-1',
            senderId: '4',
            content: 'I saw your design work in your portfolio. Amazing stuff!',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
          },
          {
            id: 'msg-3-2',
            senderId: '1',
            content: 'Thank you! I really appreciate that. Would you be interested in collaborating on something?',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.5).toISOString(),
          },
          {
            id: 'msg-3-3',
            senderId: '1',
            content: 'Looking forward to collaborating!',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          },
        ],
      };

      const messages = mockMessagesData[conversationId] || [];
      dispatch(setMessages(messages));
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-[calc(100vh-140px)] flex overflow-hidden">
      <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
        <ConversationList />
      </div>
      <div className="hidden md:flex md:flex-1">
        <ChatWindow />
      </div>
    </div>
  );
};

export default Messages;