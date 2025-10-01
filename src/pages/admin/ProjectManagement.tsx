import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectService, type Project } from '../../services/projectService';
import FileUpload from '../../components/admin/FileUpload';

const ProjectManagement = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    client: '',
    category: '',
    year: new Date().getFullYear().toString(),
    imageUrl: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await projectService.updateProject(editingProject.id!, formData);
      } else {
        await projectService.createProject(formData);
      }
      fetchProjects();
      resetForm();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData(project);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      try {
        await projectService.deleteProject(id);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      client: '',
      category: '',
      year: new Date().getFullYear().toString(),
      imageUrl: '',
    });
    setEditingProject(null);
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
              PROJE YÖNETİMİ
            </h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-8 py-4 bg-black text-white font-black tracking-wide hover:bg-zinc-800 transition-all border-4 border-black"
          >
            {showForm ? 'İPTAL' : '+ YENİ PROJE'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="mb-12 border-8 border-black bg-white p-8">
            <h2 className="text-3xl font-black mb-8">
              {editingProject ? 'PROJE DÜZENLE' : 'YENİ PROJE EKLE'}
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
                    MÜŞTERİ *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
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
                    <option value="Otomotiv">Otomotiv</option>
                    <option value="Mobilya">Mobilya</option>
                    <option value="Endüstri">Endüstri</option>
                    <option value="İnşaat">İnşaat</option>
                    <option value="Tasarım">Tasarım</option>
                    <option value="Üretim">Üretim</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-black tracking-wide mb-3">
                    YIL *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-3 border-4 border-black font-mono text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-black tracking-wide mb-3">
                  AÇIKLAMA *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border-4 border-black font-mono text-sm resize-none"
                />
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
                  {editingProject ? 'GÜNCELLE' : 'KAYDET'}
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

        {/* Projects List */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-20 text-2xl font-black">Yükleniyor...</div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl font-black mb-4">Henüz proje yok</div>
              <p className="text-gray-600 font-mono">Yeni proje eklemek için yukarıdaki butona tıklayın</p>
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="border-8 border-black bg-white p-6 hover:bg-zinc-50 transition-all"
              >
                <div className="flex gap-6">
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-32 h-32 object-cover border-4 border-black"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-black mb-2">{project.title}</h3>
                        <p className="text-sm font-mono text-gray-600">
                          {project.client} • {project.category} • {project.year}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="px-6 py-2 bg-black text-white font-bold text-sm hover:bg-zinc-800"
                        >
                          DÜZENLE
                        </button>
                        <button
                          onClick={() => handleDelete(project.id!)}
                          className="px-6 py-2 bg-red-600 text-white font-bold text-sm hover:bg-red-700"
                        >
                          SİL
                        </button>
                      </div>
                    </div>
                    <p className="font-mono text-sm text-gray-700">{project.description}</p>
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

export default ProjectManagement;