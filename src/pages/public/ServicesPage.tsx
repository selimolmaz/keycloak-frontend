import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const services = [
    {
      id: '01',
      title: 'CNC LAZER KESİM',
      features: [
        'Fiber lazer teknolojisi',
        '0.1mm hassasiyet',
        '0.5mm - 25mm kalınlık aralığı',
        'Çelik, Alüminyum, Paslanmaz',
      ],
      description: 'Son teknoloji CNC lazer makinelerimizle milimetrik hassasiyette kesim işlemleri gerçekleştiriyoruz.',
    },
    {
      id: '02',
      title: 'METAL İŞLEME',
      features: [
        'CNC torna ve freze',
        'Büküm ve şekillendirme',
        'Kaynak işlemleri',
        'Yüzey işlemleri',
      ],
      description: 'Kapsamlı metal işleme hizmetleriyle projelerinizin tüm aşamalarını tek noktadan yönetiyoruz.',
    },
    {
      id: '03',
      title: 'ÖZEL TASARIM',
      features: [
        'CAD/CAM tasarım desteği',
        'Prototip üretimi',
        'Seri üretim',
        'Montaj hizmetleri',
      ],
      description: 'Fikrinizden ürüne, tasarım aşamasından seri üretime kadar tam destek sağlıyoruz.',
    },
    {
      id: '04',
      title: 'ENDÜSTRİYEL ÇÖZÜMLER',
      features: [
        'Otomotiv parçaları',
        'İnşaat elemanları',
        'Makine parçaları',
        'Özel projeler',
      ],
      description: 'Farklı sektörlere özel endüstriyel çözümler geliştiriyor ve uyguluyoruz.',
    },
  ];

  return (
    <div className="bg-zinc-50">
      {/* Hero */}
      <section className="bg-black text-white py-32 border-b-8 border-zinc-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-6xl sm:text-8xl font-black tracking-tighter mb-8">
            HİZMETLERİMİZ
          </h1>
          <p className="text-xl font-mono text-gray-400 max-w-3xl">
            Profesyonel lazer kesim ve metal işleme hizmetleri
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`border-8 border-black ${
                  index % 2 === 0 ? 'bg-white' : 'bg-black text-white'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Left Side - Info */}
                  <div className="p-12 lg:p-16">
                    <div
                      className={`text-9xl font-black mb-6 ${
                        index % 2 === 0 ? 'text-zinc-200' : 'text-zinc-800'
                      }`}
                    >
                      {service.id}
                    </div>
                    <h2 className="text-4xl font-black mb-6 tracking-tight">
                      {service.title}
                    </h2>
                    <p
                      className={`font-mono text-sm mb-8 leading-relaxed ${
                        index % 2 === 0 ? 'text-gray-600' : 'text-gray-400'
                      }`}
                    >
                      {service.description}
                    </p>
                    <Link
                      to="/public/contact"
                      className={`inline-block px-8 py-4 font-black tracking-wide transition-all border-4 ${
                        index % 2 === 0
                          ? 'bg-black text-white border-black hover:bg-zinc-800'
                          : 'bg-white text-black border-white hover:bg-zinc-200'
                      }`}
                    >
                      TEKLİF İSTEYİN →
                    </Link>
                  </div>

                  {/* Right Side - Features */}
                  <div
                    className={`p-12 lg:p-16 ${
                      index % 2 === 0 ? 'bg-zinc-50' : 'bg-zinc-900'
                    }`}
                  >
                    <h3 className="text-2xl font-black mb-8 tracking-tight">
                      ÖZELLİKLER
                    </h3>
                    <ul className="space-y-4">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className={`flex items-start font-mono text-sm ${
                            index % 2 === 0 ? 'text-gray-700' : 'text-gray-300'
                          }`}
                        >
                          <span className="mr-4 text-2xl">→</span>
                          <span className="pt-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-black text-white border-t-8 border-zinc-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-black mb-16 tracking-tighter">
            ÇALIŞMA SÜRECİMİZ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'GÖRÜŞME', desc: 'Proje detaylarını konuşuyoruz' },
              { step: '02', title: 'TASARIM', desc: 'Teknik çizim ve tasarım' },
              { step: '03', title: 'ÜRETİM', desc: 'Lazer kesim ve işleme' },
              { step: '04', title: 'TESLİMAT', desc: 'Kalite kontrol ve teslimat' },
            ].map((process) => (
              <div key={process.step} className="border-4 border-white p-8">
                <div className="text-6xl font-black mb-4 text-zinc-700">
                  {process.step}
                </div>
                <h3 className="text-xl font-black mb-3">{process.title}</h3>
                <p className="font-mono text-sm text-gray-400">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-zinc-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl sm:text-7xl font-black mb-8 tracking-tighter">
            PROJENİZE BAŞLAYALIM
          </h2>
          <p className="text-xl font-mono text-gray-600 mb-12">
            Size özel çözümler üretmek için hazırız
          </p>
          <Link
            to="/public/contact"
            className="inline-block px-16 py-8 bg-black text-white font-black text-xl tracking-wide hover:bg-zinc-800 transition-all border-4 border-black"
          >
            İLETİŞİME GEÇİN →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;