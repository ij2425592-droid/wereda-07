import Image from 'next/image';

export default function ArticleCard({ article, imageUrl }) {
  return (
    <div className="relative h-56 w-full overflow-hidden rounded-2xl">
      <Image
        src={imageUrl}
        alt={article.title}
        fill
        // 1. የስክሪን ስፋት መጠን (Responsive Loading)
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        
        // 2. የምስሉ ጥራት (75-80% ጥራቱን ጠብቆ መጠኑን በከፍተኛ ሁኔታ ይቀንሳል)
        quality={80}
        
        // 3. ከስክሪን በታች ያሉ ምስሎች ቀስ ብለው እንዲጫኑ (Lazy Loading)
        loading="lazy"
        
        className="object-cover"
      />
    </div>
  );
}