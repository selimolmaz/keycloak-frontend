import api from './api';

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead?: boolean;
  createdAt?: string;
}

export const contactService = {
  // Send contact message (Public - herkes gönderebilir)
  sendMessage: async (message: ContactMessage): Promise<ContactMessage> => {
    const response = await api.post('/contact', message);
    return response.data;
  },

  // Get all messages (ADMIN only)
  getAllMessages: async (): Promise<ContactMessage[]> => {
    const response = await api.get('/contact');
    return response.data;
  },

  // Get message by ID (ADMIN only)
  getMessageById: async (id: number): Promise<ContactMessage> => {
    const response = await api.get(`/contact/${id}`);
    return response.data;
  },

  // Get unread messages (ADMIN only)
  getUnreadMessages: async (): Promise<ContactMessage[]> => {
    const response = await api.get('/contact/unread');
    return response.data;
  },

  // Get unread message count (ADMIN only)
  getUnreadMessageCount: async (): Promise<number> => {
    const response = await api.get('/contact/unread/count');
    return response.data;
  },

  // Mark message as read (ADMIN only)
  markAsRead: async (id: number): Promise<ContactMessage> => {
    const response = await api.patch(`/contact/${id}/mark-read`);
    return response.data;
  },

  // Delete message (ADMIN only)
  deleteMessage: async (id: number): Promise<void> => {
    await api.delete(`/contact/${id}`);
  },

  getReadMessages: async (): Promise<ContactMessage[]> => {
  const response = await api.get('/contact/read');
  return response.data;
},
};