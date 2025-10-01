import api from './api';

export interface GalleryItem {
  id?: number;
  title: string;
  category: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export const galleryService = {
  // Get all gallery items
  getAllGalleryItems: async (): Promise<GalleryItem[]> => {
    const response = await api.get('/gallery');
    return response.data;
  },

  // Get gallery item by ID
  getGalleryItemById: async (id: number): Promise<GalleryItem> => {
    const response = await api.get(`/gallery/${id}`);
    return response.data;
  },

  // Get gallery items by category
  getGalleryItemsByCategory: async (category: string): Promise<GalleryItem[]> => {
    const response = await api.get(`/gallery/category/${category}`);
    return response.data;
  },

  // Create gallery item (ADMIN only)
  createGalleryItem: async (item: GalleryItem): Promise<GalleryItem> => {
    const response = await api.post('/gallery', item);
    return response.data;
  },

  // Update gallery item (ADMIN only)
  updateGalleryItem: async (id: number, item: GalleryItem): Promise<GalleryItem> => {
    const response = await api.put(`/gallery/${id}`, item);
    return response.data;
  },

  // Delete gallery item (ADMIN only)
  deleteGalleryItem: async (id: number): Promise<void> => {
    await api.delete(`/gallery/${id}`);
  },
};