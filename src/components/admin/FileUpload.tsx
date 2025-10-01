import { useState } from 'react';
import axios from 'axios';
import keycloak from '../../keycloak';

interface FileUploadProps {
  onUploadSuccess: (fileUrl: string) => void;
  currentImage?: string;
}

const FileUpload = ({ onUploadSuccess, currentImage }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Sadece resim dosyaları yüklenebilir');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Dosya boyutu 10MB\'dan küçük olmalı');
      return;
    }

    try {
      setUploading(true);
      setError('');

      // Create FormData
      const formData = new FormData();
      formData.append('file', file);

      // Upload file
      const response = await axios.post(
        'http://localhost:8081/api/files/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${keycloak.token}`,
          },
        }
      );

      const fileUrl = `http://localhost:8081${response.data.fileDownloadUri}`;
      setPreview(fileUrl);
      onUploadSuccess(fileUrl);
    } catch (err) {
      setError('Dosya yüklenirken bir hata oluştu');
      console.error('File upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-black tracking-wide mb-3">
        GÖRSEL YÜKLE
      </label>

      {/* Preview */}
      {preview && (
        <div className="border-4 border-black p-4 bg-zinc-100">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover border-2 border-zinc-300"
          />
          <p className="text-xs font-mono text-gray-600 mt-2 break-all">
            {preview}
          </p>
        </div>
      )}

      {/* Upload Input */}
      <div className="border-4 border-dashed border-black p-8 text-center bg-white hover:bg-zinc-50 transition-all">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer font-bold text-sm tracking-wide"
        >
          {uploading ? (
            <span>YÜKLENIYOR...</span>
          ) : (
            <>
              <span className="block text-4xl mb-4">📁</span>
              <span className="block mb-2">DOSYA SEÇ VEYA SÜRÜKLE</span>
              <span className="text-xs text-gray-500 font-mono">
                Max 10MB, sadece resim dosyaları
              </span>
            </>
          )}
        </label>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-500 text-white border-4 border-black font-bold text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;