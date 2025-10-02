import { useState, useEffect } from 'react';
import { projectService, type Project } from '../../services/projectService';
import Loading from '../../components/Loading';

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Hepsi');

  const categories = ['Hepsi', 'Otomotiv', 'Mobilya', 'Endüstri', 'İnşaat', 'Tasarım', 'Üretim'];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAllProjects();
      setProjects(data);
      setError('');
    } catch (err) {
      setError('Projeler yüklenirken bir hata oluştu');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = async (category: string) => {
    setSelectedCategory(category);
    try {
      setLoading(true);
      if (category === 'Hepsi') {
        const data = await projectService.getAllProjects();
        setProjects(data);
      } else {
        const data = await projectService.getProjectsByCategory(category);
        setProjects(data);
      }
      setError('');
    } catch (err) {
      setError('Projeler yüklenirken bir hata oluştu');
      console.error('Error filtering projects:', err);
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
            PROJELER
          </h1>
          <p className="text-xl font-mono text-gray-400 max-w-3xl">
            Tamamladığımız başarılı projeler ve referanslarımız
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-b-8 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: projects.length + '+', label: 'PROJE' },
              { number: '100+', label: 'MÜŞTERİ' },
              { number: '15', label: 'SEKTÖR' },
              { number: '%98', label: 'MEMNUNİYET' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-black mb-2">{stat.number}</div>
                <div className="text-xs font-bold tracking-widest text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-zinc-50 border-b-4 border-black sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-6 py-3 font-bold text-sm tracking-wide border-4 border-black transition-all ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-white hover:bg-black hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <Loading message="PROJELER YÜKLENİYOR..." />
          ) : error ? (
            <div className="text-center py-20">
              <div className="text-2xl font-black text-red-600 mb-4">{error}</div>
              <button
                onClick={fetchProjects}
                className="px-8 py-4 bg-black text-white font-bold"
              >
                Tekrar Dene
              </button>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl font-black mb-4">Henüz proje yok</div>
              <p className="text-gray-600 font-mono">Bu kategoride proje bulunamadı</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border-8 border-black bg-white hover:bg-black hover:text-white transition-all group cursor-pointer"
                >
                  {/* Image */}
                  <div className="aspect-square bg-zinc-200 border-b-8 border-black overflow-hidden">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-9xl font-black text-zinc-300 group-hover:text-zinc-800">
                          {project.id?.toString().padStart(2, '0')}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold tracking-widest text-gray-500 group-hover:text-gray-400">
                        {project.category}
                      </span>
                      <span className="text-xs font-bold tracking-widest text-gray-500 group-hover:text-gray-400">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black mb-3 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs text-gray-600 group-hover:text-gray-400 mb-4">
                      {project.description}
                    </p>
                    <div className="pt-4 border-t-2 border-black group-hover:border-white">
                      <span className="text-xs font-bold tracking-widest">
                        {project.client}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl sm:text-7xl font-black mb-8 tracking-tighter">
            SIRADAKİ PROJE<br />SİZİNKİ OLABİLİR
          </h2>
          <p className="text-xl font-mono text-gray-400 mb-12">
            Projelerinizi görüşmek için bizimle iletişime geçin
          </p>
          <a
            href="/public/contact"
            className="inline-block px-16 py-8 bg-white text-black font-black text-xl tracking-wide hover:bg-zinc-300 transition-all border-4 border-white"
          >
            HEMEN BAŞLAYIN →
          </a>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;