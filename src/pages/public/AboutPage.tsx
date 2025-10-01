const AboutPage = () => {
  return (
    <div className="bg-zinc-50">
      {/* Hero */}
      <section className="py-32 bg-black text-white border-b-8 border-zinc-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-6xl sm:text-8xl font-black tracking-tighter mb-8">
            HAKKIMIZDA
          </h1>
          <p className="text-xl font-mono text-gray-400 max-w-3xl">
            15 yılı aşkın tecrübemiz ile endüstriyel lazer kesim ve metal işleme alanında Türkiye'nin önde gelen firmalarından biriyiz
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white border-b-8 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl font-black mb-8 tracking-tight">HİKAYEMİZ</h2>
              <div className="space-y-6 font-mono text-gray-700">
                <p>
                  2008 yılında küçük bir atölyede başlayan yolculuğumuz, bugün modern tesisimizde devam ediyor. Metal işleme tutkusu ve mükemmeliyetçi yaklaşımımız bizi bugünlere taşıdı.
                </p>
                <p>
                  Son teknoloji CNC lazer kesim makinelerimiz ve deneyimli ekibimizle, en karmaşık projeleri bile hassasiyetle hayata geçiriyoruz.
                </p>
                <p>
                  Müşteri memnuniyeti odaklı çalışma prensibimiz ve kalite standartlarımızdan asla ödün vermeme ilkemiz, bizi sektörde öne çıkaran temel değerlerimizdir.
                </p>
              </div>
            </div>
            <div className="bg-zinc-900 h-96 border-8 border-black"></div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-zinc-50 border-b-8 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-black mb-16 tracking-tight">DEĞERLERİMİZ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'KALİTE',
                desc: 'Her projede mükemmellik standardını yakalamak için çalışıyoruz',
              },
              {
                title: 'GÜVENİLİRLİK',
                desc: 'Teslim sürelerine uyum ve söz verdiğimizi yerine getirmek önceliğimiz',
              },
              {
                title: 'YENİLİK',
                desc: 'Teknolojik gelişmeleri takip ederek sürekli kendimizi geliştiriyoruz',
              },
            ].map((value, index) => (
              <div key={index} className="border-4 border-black p-8 bg-white">
                <div className="text-6xl font-black mb-4">0{index + 1}</div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">{value.title}</h3>
                <p className="font-mono text-sm text-gray-700">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-black mb-16 tracking-tight">EKİBİMİZ</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="text-center">
                <div className="bg-zinc-700 h-64 mb-6 border-4 border-white"></div>
                <h3 className="text-xl font-black mb-2">İSİM SOYAD</h3>
                <p className="font-mono text-sm text-gray-400">Pozisyon</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;