import { useState, useEffect } from 'react';
import { galleryService, type GalleryItem } from '../../services/galleryService';

const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Hepsi');

  const categories = ['Hepsi', 'Üretim', 'Atölye', 'Makine', 'Ürün', 'Proje', 'Süreç'];

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const data = await galleryService.getAllGalleryItems();
      setGalleryItems(data);
      setError('');
    } catch (err) {
      setError('Galeri yüklenirken bir hata oluştu');
      console.error('Error fetching gallery items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = async (category: string) => {
    setSelectedCategory(category);
    try {
      setLoading(true);
      if (category === 'Hepsi') {
        const data = await galleryService.getAllGalleryItems();
        setGalleryItems(data);
      } else {
        const data = await galleryService.getGalleryItemsByCategory(category);
        setGalleryItems(data);
      }
      setError('');
    } catch (err) {
      setError('Galeri yüklenirken bir hata oluştu');
      console.error('Error filtering gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-50">
      {/* Hero */}
      <section className="bg-black text-white py-32 border-b-8 border-zinc-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-6xl sm:text-8xl font-black tracking-tighter mb-8">
            GALERİ
          </h1>
          <p className="text-xl font-mono text-gray-400 max-w-3xl">
            Üretim süreçlerimiz ve tamamlanan işlerimizden kareler
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-white border-b-8 border-black sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-6 py-3 font-bold text-sm tracking-wide border-4 border-black transition-all ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-zinc-50 hover:bg-black hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="text-4xl font-black">Yükleniyor...</div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="text-2xl font-black text-red-600 mb-4">{error}</div>
              <button
                onClick={fetchGalleryItems}
                className="px-8 py-4 bg-black text-white font-bold"
              >
                Tekrar Dene
              </button>
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl font-black mb-4">Henüz fotoğraf yok</div>
              <p className="text-gray-600 font-mono">Bu kategoride fotoğraf bulunamadı</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="group cursor-pointer"
                >
                  {/* Image */}
                  <div className="aspect-square bg-zinc-200 border-8 border-black relative overflow-hidden">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-zinc-300 group-hover:bg-black transition-all">
                        <div className="text-7xl font-black text-zinc-400 group-hover:text-zinc-700 transition-all">
                          {item.id?.toString().padStart(2, '0')}
                        </div>
                      </div>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-90 transition-all flex items-center justify-center p-6">
                      <div className="text-center">
                        <h3 className="text-white text-xl font-black mb-2">
                          {item.title}
                        </h3>
                        <span className="text-gray-400 text-xs font-bold tracking-widest">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-black text-white border-t-8 border-zinc-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-black mb-16 tracking-tighter">
            ÜRETİM SÜRECİMİZ
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Video Placeholder 1 */}
            <div className="aspect-video bg-zinc-800 border-8 border-white flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 border-8 border-white rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-2"></div>
                </div>
                <p className="font-mono text-sm text-gray-400">CNC Lazer Kesim İşlemi</p>
              </div>
            </div>

            {/* Video Placeholder 2 */}
            <div className="aspect-video bg-zinc-800 border-8 border-white flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 border-8 border-white rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-2"></div>
                </div>
                <p className="font-mono text-sm text-gray-400">Metal İşleme Süreci</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;