import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { galleryService, type GalleryItem } from '../../services/galleryService';
import FileUpload from '../../components/admin/FileUpload';

const GalleryManagement = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState<GalleryItem>({
    title: '',
    category: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const data = await galleryService.getAllGalleryItems();
      setGalleryItems(data);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await galleryService.updateGalleryItem(editingItem.id!, formData);
      } else {
        await galleryService.createGalleryItem(formData);
      }
      fetchGalleryItems();
      resetForm();
    } catch (error) {
      console.error('Error saving gallery item:', error);
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bu fotoğrafı silmek istediğinizden emin misiniz?')) {
      try {
        await galleryService.deleteGalleryItem(id);
        fetchGalleryItems();
      } catch (error) {
        console.error('Error deleting gallery item:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      imageUrl: '',
    });
    setEditingItem(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <Link to="/admin" className="text-sm font-bold text-gray-600 hover:text-black mb-2 block">
              ← ADMIN PANEL
            </Link>
            <h1 className="text-6xl font-black tracking-tighter">
              GALERİ YÖNETİMİ
            </h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-8 py-4 bg-black text-white font-black tracking-wide hover:bg-zinc-800 transition-all border-4 border-black"
          >
            {showForm ? 'İPTAL' : '+ YENİ FOTOĞRAF'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="mb-12 border-8 border-black bg-white p-8">
            <h2 className="text-3xl font-black mb-8">
              {editingItem ? 'FOTOĞRAF DÜZENLE' : 'YENİ FOTOĞRAF EKLE'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black tracking-wide mb-3">
                    BAŞLIK *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border-4 border-black font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black tracking-wide mb-3">
                    KATEGORİ *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border-4 border-black font-mono text-sm bg-white"
                  >
                    <option value="">Seçiniz</option>
                    <option value="Üretim">Üretim</option>
                    <option value="Atölye">Atölye</option>
                    <option value="Makine">Makine</option>
                    <option value="Ürün">Ürün</option>
                    <option value="Proje">Proje</option>
                    <option value="Süreç">Süreç</option>
                  </select>
                </div>
              </div>

              <FileUpload
                currentImage={formData.imageUrl}
                onUploadSuccess={(url) => setFormData({ ...formData, imageUrl: url })}
              />

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-12 py-4 bg-black text-white font-black tracking-wide hover:bg-zinc-800"
                >
                  {editingItem ? 'GÜNCELLE' : 'KAYDET'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-12 py-4 bg-zinc-200 text-black font-black tracking-wide hover:bg-zinc-300"
                >
                  İPTAL
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-20 text-2xl font-black">Yükleniyor...</div>
          ) : galleryItems.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <div className="text-4xl font-black mb-4">Henüz fotoğraf yok</div>
              <p className="text-gray-600 font-mono">Yeni fotoğraf eklemek için yukarıdaki butona tıklayın</p>
            </div>
          ) : (
            galleryItems.map((item) => (
              <div
                key={item.id}
                className="border-8 border-black bg-white group"
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden border-b-8 border-black">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-200">
                      <span className="text-4xl font-black text-zinc-400">?</span>
                    </div>
                  )}
                </div>

                {/* Info & Actions */}
                <div className="p-4">
                  <h3 className="text-lg font-black mb-1">{item.title}</h3>
                  <p className="text-xs font-mono text-gray-600 mb-4">{item.category}</p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 py-2 bg-black text-white font-bold text-xs hover:bg-zinc-800"
                    >
                      DÜZENLE
                    </button>
                    <button
                      onClick={() => handleDelete(item.id!)}
                      className="flex-1 py-2 bg-red-600 text-white font-bold text-xs hover:bg-red-700"
                    >
                      SİL
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryManagement;