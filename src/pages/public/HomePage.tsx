import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-zinc-50">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-black text-white border-b-8 border-zinc-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter mb-8 leading-none">
            LAZER<br />KESİM
          </h1>
          <p className="text-xl sm:text-2xl font-mono text-gray-400 mb-12 max-w-3xl mx-auto">
            Endüstriyel metal işleme ve hassas lazer kesim teknolojisi ile projelerinizi hayata geçiriyoruz
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/public/projects"
              className="px-12 py-6 bg-white text-black font-black text-lg tracking-wide hover:bg-zinc-300 transition-all border-4 border-black"
            >
              PROJELERİMİZ →
            </Link>
            <Link
              to="/public/contact"
              className="px-12 py-6 bg-transparent text-white font-black text-lg tracking-wide hover:bg-white hover:text-black transition-all border-4 border-white"
            >
              İLETİŞİME GEÇİN
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-b-8 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '15+', label: 'YIL DENEYİM' },
              { number: '500+', label: 'TAMAMLANAN PROJE' },
              { number: '100+', label: 'MUTLU MÜŞTERİ' },
              { number: '24/7', label: 'DESTEK' },
            ].map((stat, index) => (
              <div key={index} className="text-center border-4 border-black p-8 bg-zinc-50">
                <div className="text-6xl font-black mb-4">{stat.number}</div>
                <div className="text-sm font-bold tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-black text-white border-b-8 border-zinc-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl sm:text-7xl font-black mb-16 tracking-tighter">
            HİZMETLERİMİZ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'LAZER KESİM',
                desc: 'CNC lazer kesim makineleri ile milimetrik hassasiyette metal kesim işlemleri',
              },
              {
                title: 'METAL İŞLEME',
                desc: 'Profesyonel ekipmanlar ile çelik, alüminyum ve paslanmaz metal işleme',
              },
              {
                title: 'ÖZEL TASARIM',
                desc: 'Projenize özel tasarım ve üretim hizmetleri, prototipten seri üretime',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="border-4 border-white p-8 hover:bg-white hover:text-black transition-all group"
              >
                <div className="text-8xl font-black mb-4 text-zinc-800 group-hover:text-black">
                  0{index + 1}
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">{service.title}</h3>
                <p className="font-mono text-sm text-gray-400 group-hover:text-gray-700">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link
              to="/public/services"
              className="inline-block px-12 py-6 bg-white text-black font-black text-lg tracking-wide hover:bg-zinc-300 transition-all"
            >
              TÜM HİZMETLER →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-zinc-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl sm:text-7xl font-black mb-8 tracking-tighter leading-none">
            PROJENİZ İÇİN<br />HAZIR MIYIZ?
          </h2>
          <p className="text-xl font-mono text-gray-600 mb-12 max-w-2xl mx-auto">
            Lazer kesim ve metal işleme projeleriniz için bizimle iletişime geçin
          </p>
          <Link
            to="/public/contact"
            className="inline-block px-16 py-8 bg-black text-white font-black text-xl tracking-wide hover:bg-zinc-800 transition-all border-4 border-black"
          >
            TEKLİF ALIN →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;