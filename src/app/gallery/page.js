'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Image as ImageIcon, 
  Video, 
  Play, 
  X, 
  Calendar, 
  FolderOpen, 
  Maximize2 
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const MEDIA_BY_LANG = {
  am: [
    {
      id: 1,
      type: 'photo',
      title: 'የአዲሱ የመጀመሪያ ደረጃ ትምህርት ቤት የምረቃ ሥነ-ሥርዓት',
      category: 'ልማት',
      date: 'ነሐሴ 15, 2018',
      src: '/images/news-1.jpg',
      description: 'የወረዳው አስተዳደር ከአካባቢው ማህበረሰብ ጋር በመተባበር ያስገነባው ትምህርት ቤት ምረቃ።',
    },
    {
      id: 2,
      type: 'photo',
      title: 'የ2018/19 በጀት ዓመት የህዝብ ውይይት መድረክ',
      category: 'መልካም አስተዳደር',
      date: 'ነሐሴ 12, 2018',
      src: '/images/news-2.jpg',
      description: 'የሁሉም ቀበሌ ነዋሪዎች እና ተወካዮች የተሳተፉበት ዓመታዊ ዕቅድ ግምገማ።',
    },
    {
      id: 3,
      type: 'photo',
      title: 'የክረምት በጎ ፈቃድ አገልግሎት እና የአቅመ ደካሞች ቤት እድሳት',
      category: 'ማኅበራዊ',
      date: 'ነሐሴ 08, 2018',
      src: '/images/news-1.jpg',
      description: 'በወረዳው ወጣቶች የተከናወነ የ15 ቤቶች እድሳትና የጽዳት ዘመቻ።',
    },
    {
      id: 4,
      type: 'video',
      title: 'የወረዳው የ6 ወራት የልማትና የመልካም አስተዳደር አፈፃፀም ዶክመንተሪ',
      category: 'ዶክመንተሪ',
      date: 'ነሐሴ 05, 2018',
      src: '/images/news-1.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'በወረዳው ባለፉት 6 ወራት የተከናወኑ ዋና ዋና የልማት ፕሮጀክቶች አጭር ቅኝት።',
    },
    {
      id: 5,
      type: 'photo',
      title: 'የአረንጓዴ አሻራ ችግኝ ተከላ መርሐግብር',
      category: 'አካባቢ ጥበቃ',
      date: 'ሐምሌ 28, 2018',
      src: '/images/news-2.jpg',
      description: 'በወረዳው በተለያዩ ቀበሌዎች የተካሄደ የህዝብ የችግኝ ተከላ ዘመቻ።',
    },
    {
      id: 6,
      type: 'video',
      title: 'የወረዳው ዋና አስተዳዳሪ ወቅታዊ መልእክት እና የጋዜጣዊ መግለጫ',
      category: 'መግለጫ',
      date: 'ሐምሌ 20, 2018',
      src: '/images/news-1.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'ስለ አዲሱ የበጀት ዓመት አቅጣጫዎች የተሰጠ ማብራሪያ።',
    },
  ],
  en: [
    {
      id: 1,
      type: 'photo',
      title: 'Inauguration Ceremony of New Primary School',
      category: 'Development',
      date: 'Aug 21, 2026',
      src: '/images/news-1.jpg',
      description: 'Official opening of the modern primary school built in partnership with the local community.',
    },
    {
      id: 2,
      type: 'photo',
      title: 'Fiscal Year Public Consultation Forum',
      category: 'Good Governance',
      date: 'Aug 18, 2026',
      src: '/images/news-2.jpg',
      description: 'Annual strategic planning and public consultation forum with Kebele representatives.',
    },
    {
      id: 3,
      type: 'photo',
      title: 'Summer Volunteer Program & Eldercare Home Renovation',
      category: 'Social Services',
      date: 'Aug 14, 2026',
      src: '/images/news-1.jpg',
      description: 'Youth voluntary campaign completing renovations on 15 residential units for vulnerable families.',
    },
    {
      id: 4,
      type: 'video',
      title: '6-Month Sub-City Development Documentary',
      category: 'Documentary',
      date: 'Aug 11, 2026',
      src: '/images/news-1.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Comprehensive video overview of municipal achievements, infrastructure, and good governance.',
    },
    {
      id: 5,
      type: 'photo',
      title: 'Green Legacy Tree Planting Campaign',
      category: 'Environment',
      date: 'Aug 04, 2026',
      src: '/images/news-2.jpg',
      description: 'Mass citizen tree planting campaign conducted across various local kebeles.',
    },
    {
      id: 6,
      type: 'video',
      title: 'Sub-City Chief Administrator Press Briefing',
      category: 'Briefing',
      date: 'Jul 26, 2026',
      src: '/images/news-1.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Official announcement and operational directions for the upcoming fiscal quarter.',
    },
  ],
  or: [
    {
      id: 1,
      type: 'photo',
      title: 'Sirna Eebba Mana Barumsaa Sadarkaa Tokkoffaa Haaraa',
      category: 'Misooma',
      date: 'Hagayya 15, 2018',
      src: '/images/news-1.jpg',
      description: 'Mana barumsaa bulchiinsi aanaa uummata waliin ijaare eebbisiisuu.',
    },
    {
      id: 2,
      type: 'photo',
      title: 'Waltajjii Marii Uummataa Bara Baajataa',
      category: 'Bulchiinsa Gaarii',
      date: 'Hagayya 12, 2018',
      src: '/images/news-2.jpg',
      description: 'Gamaggama karoora waggaa jiraattonni gandoolee hundaa irratti hirmaatan.',
    },
    {
      id: 3,
      type: 'photo',
      title: 'Tajaajila Arjoomtummaa Gannaatiin Mana Haaromsuu',
      category: 'Hawaasummaa',
      date: 'Hagayya 08, 2018',
      src: '/images/news-1.jpg',
      description: 'Duula qulqullinaa fi mana harka qalleeyyii 15 haaromsuu dargaggootaan raawwatame.',
    },
    {
      id: 4,
      type: 'video',
      title: 'Dookimantarii Hojii Misoomaa Ji\'oota 6',
      category: 'Dookimantarii',
      date: 'Hagayya 05, 2018',
      src: '/images/news-1.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Pirojektoota misoomaa fi bulchiinsa gaarii ji\'oota 6 darban keessatti raawwataman.',
    },
    {
      id: 5,
      type: 'photo',
      title: 'Sagantaa Dhaabbii Biqiltuu Ashaaraa Magariisaa',
      category: 'Eegumsa Naannoo',
      date: 'Adoolessa 28, 2018',
      src: '/images/news-2.jpg',
      description: 'Duula dhaabbii biqiltuu uummataatiin gandoolee aanaa keessatti geggeeffame.',
    },
    {
      id: 6,
      type: 'video',
      title: 'Ibsa Gaazexeessummaa fi Ergaa Bulchaa Ol\'aanaa Aanaa',
      category: 'Ibsa',
      date: 'Adoolessa 20, 2018',
      src: '/images/news-1.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Kallattiiwwan bara baajataa haaraa ilaalchisee ibsa kenname.',
    },
  ]
};

export default function GalleryPage() {
  const { t, language } = useLanguage();
  const g = t.gallery;

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const mediaItems = MEDIA_BY_LANG[language] || MEDIA_BY_LANG.am;

  const filterTabs = [
    { label: g.allMedia, value: 'all' },
    { label: g.photosOnly, value: 'photo' },
    { label: g.videosOnly, value: 'video' },
  ];

  const filteredMedia = mediaItems.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.type === selectedFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Breadcrumb & Header */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
            <Link href="/" className="hover:text-blue-700 transition-colors">{g.breadcrumbHome}</Link>
            <span>/</span>
            <span className="text-blue-700">{g.breadcrumbGallery}</span>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1 text-xs font-bold text-blue-800">
              <FolderOpen className="w-4 h-4 text-blue-700" />
              <span>{g.title}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              {g.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              {g.subtitle}
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center">
          <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm gap-1">
            {filterTabs.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedFilter === filter.value
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {filter.value === 'photo' && <ImageIcon className="w-4 h-4" />}
                {filter.value === 'video' && <Video className="w-4 h-4" />}
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Image Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Overlay Badge */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="rounded-full bg-slate-900/80 backdrop-blur-sm px-3 py-1 text-[11px] font-bold text-white flex items-center gap-1.5">
                    {item.type === 'video' ? (
                      <>
                        <Video className="w-3.5 h-3.5 text-red-400" />
                        <span>{g.videosOnly}</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                        <span>{g.photosOnly}</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Video Play Icon / Photo Zoom Icon Overlay */}
                <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    {item.type === 'video' ? (
                      <Play className="w-6 h-6 fill-current text-red-600 ml-1" />
                    ) : (
                      <Maximize2 className="w-5 h-5 text-blue-700" />
                    )}
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <time>{item.date}</time>
                    <span>•</span>
                    <span className="text-blue-700 font-semibold">{item.category}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 line-clamp-2 transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Video Modal */}
      {activeModalItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setActiveModalItem(null)}
        >
          <div 
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-10 rounded-full bg-slate-800/80 hover:bg-slate-700 p-2 text-white transition-colors"
              aria-label={g.closeModal}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Media Content */}
            <div className="relative aspect-video w-full bg-black">
              {activeModalItem.type === 'video' ? (
                <iframe
                  src={activeModalItem.videoUrl}
                  title={activeModalItem.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <Image
                  src={activeModalItem.src}
                  alt={activeModalItem.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              )}
            </div>

            {/* Modal Caption Info */}
            <div className="p-6 space-y-2 bg-slate-900">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="rounded-md bg-blue-600/30 text-blue-300 px-2.5 py-0.5 font-semibold">
                  {activeModalItem.category}
                </span>
                <span>{activeModalItem.date}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {activeModalItem.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeModalItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}