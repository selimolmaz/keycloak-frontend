import { useState } from 'react';
import { contactService, type ContactMessage } from '../../services/contactService';

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      await contactService.sendMessage(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      // Success mesajını 5 saniye sonra kaldır
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-zinc-50">
      {/* Hero */}
      <section className="bg-black text-white py-32 border-b-8 border-zinc-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-6xl sm:text-8xl font-black tracking-tighter mb-8">
            İLETİŞİM
          </h1>
          <p className="text-xl font-mono text-gray-400 max-w-3xl">
            Projeleriniz için bizimle iletişime geçin
          </p>
        </div>
      </section>

      {/* Success Message */}
      {success && (
        <div className="fixed top-24 right-4 z-50 animate-fade-in">
          <div className="bg-green-500 text-white px-8 py-4 border-4 border-black font-black">
            ✓ MESAJINIZ BAŞARIYLA GÖNDERİLDİ!
          </div>
        </div>
      )}

      {/* Contact Info & Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="text-5xl font-black mb-12 tracking-tighter">
                BİZE ULAŞIN
              </h2>

              <div className="space-y-8">
                {/* Address */}
                <div className="border-8 border-black p-8 bg-white">
                  <div className="text-4xl font-black mb-4">📍</div>
                  <h3 className="text-xl font-black mb-3">ADRES</h3>
                  <p className="font-mono text-sm text-gray-700">
                    Sanayi Mahallesi<br />
                    Metal İşleme Bölgesi No: 42<br />
                    42000 Konya, Türkiye
                  </p>
                </div>

                {/* Phone */}
                <div className="border-8 border-black p-8 bg-white">
                  <div className="text-4xl font-black mb-4">📞</div>
                  <h3 className="text-xl font-black mb-3">TELEFON</h3>
                  <p className="font-mono text-sm text-gray-700">
                    +90 (XXX) XXX XX XX<br />
                    +90 (XXX) XXX XX XX
                  </p>
                </div>

                {/* Email */}
                <div className="border-8 border-black p-8 bg-white">
                  <div className="text-4xl font-black mb-4">✉️</div>
                  <h3 className="text-xl font-black mb-3">E-POSTA</h3>
                  <p className="font-mono text-sm text-gray-700">
                    info@lazer.com<br />
                    satis@lazer.com
                  </p>
                </div>

                {/* Working Hours */}
                <div className="border-8 border-black p-8 bg-black text-white">
                  <div className="text-4xl font-black mb-4">⏰</div>
                  <h3 className="text-xl font-black mb-3">ÇALIŞMA SAATLERİ</h3>
                  <p className="font-mono text-sm text-gray-400">
                    Pazartesi - Cuma: 08:00 - 18:00<br />
                    Cumartesi: 09:00 - 15:00<br />
                    Pazar: Kapalı
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-5xl font-black mb-12 tracking-tighter">
                MESAJ GÖNDERİN
              </h2>

              {error && (
                <div className="mb-6 p-4 bg-red-500 text-white border-4 border-black font-bold">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-black tracking-wide mb-3">
                    AD SOYAD *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-6 py-4 border-4 border-black font-mono text-sm focus:outline-none focus:ring-4 focus:ring-black disabled:bg-gray-200"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-black tracking-wide mb-3">
                    E-POSTA *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-6 py-4 border-4 border-black font-mono text-sm focus:outline-none focus:ring-4 focus:ring-black disabled:bg-gray-200"
                    placeholder="email@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-black tracking-wide mb-3">
                    TELEFON
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-6 py-4 border-4 border-black font-mono text-sm focus:outline-none focus:ring-4 focus:ring-black disabled:bg-gray-200"
                    placeholder="+90 (XXX) XXX XX XX"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-black tracking-wide mb-3">
                    KONU *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-6 py-4 border-4 border-black font-mono text-sm focus:outline-none focus:ring-4 focus:ring-black bg-white disabled:bg-gray-200"
                  >
                    <option value="">Konu seçiniz</option>
                    <option value="quote">Teklif Talebi</option>
                    <option value="info">Bilgi Talebi</option>
                    <option value="support">Teknik Destek</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-black tracking-wide mb-3">
                    MESAJINIZ *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    rows={6}
                    className="w-full px-6 py-4 border-4 border-black font-mono text-sm focus:outline-none focus:ring-4 focus:ring-black resize-none disabled:bg-gray-200"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-12 py-6 bg-black text-white font-black text-lg tracking-wide hover:bg-zinc-800 transition-all border-4 border-black disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'GÖNDERİLİYOR...' : 'GÖNDER →'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-black border-t-8 border-zinc-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-black mb-12 tracking-tighter text-white">
            KONUM
          </h2>
          
          {/* Map Placeholder */}
          <div className="aspect-video bg-zinc-800 border-8 border-white flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-8xl font-black mb-4 text-zinc-700">📍</div>
              <p className="font-mono text-sm text-gray-400">
                Harita buraya eklenecek
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;