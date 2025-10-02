import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contactService, type ContactMessage } from '../../services/contactService';
import Loading from '../../components/Loading';

const ContactMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      let data: ContactMessage[];

      if (filter === 'unread') {
        data = await contactService.getUnreadMessages();
      } else if (filter === 'read') {
        data = await contactService.getReadMessages();
      } else {
        data = await contactService.getAllMessages();
      }

      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await contactService.markAsRead(id);
      fetchMessages();
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, isRead: true });
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bu mesajı silmek istediğinizden emin misiniz?')) {
      try {
        await contactService.deleteMessage(id);
        fetchMessages();
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage(null);
        }
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const handleSelectMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      await handleMarkAsRead(message.id!);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link to="/admin" className="text-sm font-bold text-gray-600 hover:text-black mb-2 block">
            ← ADMIN PANEL
          </Link>
          <h1 className="text-6xl font-black tracking-tighter">
            İLETİŞİM MESAJLARI
          </h1>
        </div>

        {/* Filter */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`w-full sm:w-auto px-6 py-3 font-bold text-sm tracking-wide border-4 border-black transition-all ${filter === 'all'
                ? 'bg-black text-white'
                : 'bg-white hover:bg-black hover:text-white'
              }`}
          >
            TÜMÜ ({messages.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`w-full sm:w-auto px-6 py-3 font-bold text-sm tracking-wide border-4 border-black transition-all ${filter === 'unread'
                ? 'bg-black text-white'
                : 'bg-white hover:bg-black hover:text-white'
              }`}
          >
            OKUNMAMIŞ
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`w-full sm:w-auto px-6 py-3 font-bold text-sm tracking-wide border-4 border-black transition-all ${filter === 'read'
                ? 'bg-black text-white'
                : 'bg-white hover:bg-black hover:text-white'
              }`}
          >
            OKUNMUŞ
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Messages List */}
          <div className="lg:col-span-1 space-y-4">
            {loading ? (
              <Loading message="MESAJLAR YÜKLENİYOR..." />
            ) : messages.length === 0 ? (
              <div className="text-center py-10">
                <div className="text-2xl font-black mb-2">Mesaj yok</div>
                <p className="text-sm font-mono text-gray-600">Bu kategoride mesaj bulunamadı</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => handleSelectMessage(message)}
                  className={`border-4 border-black p-4 cursor-pointer transition-all ${selectedMessage?.id === message.id
                      ? 'bg-black text-white'
                      : message.isRead
                        ? 'bg-white hover:bg-zinc-100'
                        : 'bg-yellow-50 hover:bg-yellow-100'
                    }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-black text-sm">{message.name}</h3>
                    {!message.isRead && (
                      <span className="text-xs font-bold px-2 py-1 bg-red-600 text-white">
                        YENİ
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-mono opacity-70 mb-2">{message.email}</p>
                  <p className="text-xs font-bold">{message.subject}</p>
                  <p className="text-xs font-mono mt-2 line-clamp-2">
                    {message.message}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="border-8 border-black bg-white p-8">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-3xl font-black mb-2">{selectedMessage.name}</h2>
                    <p className="font-mono text-sm text-gray-600 mb-1">
                      {selectedMessage.email}
                    </p>
                    {selectedMessage.phone && (
                      <p className="font-mono text-sm text-gray-600">
                        {selectedMessage.phone}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(selectedMessage.id!)}
                    className="px-6 py-2 bg-red-600 text-white font-bold text-sm hover:bg-red-700"
                  >
                    SİL
                  </button>
                </div>

                <div className="mb-6">
                  <div className="text-xs font-bold text-gray-500 mb-2">KONU</div>
                  <div className="px-4 py-2 bg-zinc-100 border-2 border-zinc-300 font-mono text-sm">
                    {selectedMessage.subject}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold text-gray-500 mb-2">MESAJ</div>
                  <div className="px-4 py-4 bg-zinc-100 border-2 border-zinc-300 font-mono text-sm whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t-2 border-zinc-300">
                  <p className="text-xs font-mono text-gray-500">
                    Gönderim Tarihi: {new Date(selectedMessage.createdAt!).toLocaleString('tr-TR')}
                  </p>
                </div>
              </div>
            ) : (
              <div className="border-8 border-black bg-zinc-100 p-20 text-center">
                <div className="text-4xl font-black mb-4">📧</div>
                <p className="text-xl font-black">Mesaj Seçin</p>
                <p className="text-sm font-mono text-gray-600 mt-2">
                  Soldan bir mesaj seçerek detaylarını görüntüleyin
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMessages;