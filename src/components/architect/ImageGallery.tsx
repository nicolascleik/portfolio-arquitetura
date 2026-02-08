import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface ImageGalleryProps {
  images: Array<{ src: string; alt?: string }>;
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="py-12">
      <h3 className="text-2xl font-light text-stone-900 mb-8 border-l-4 border-stone-900 pl-4">
        Galeria do Projeto
      </h3>

      {/* Grid de Imagens (Miniaturas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, i) => (
          <div 
            key={i}
            className="group relative aspect-[4/3] cursor-pointer overflow-hidden bg-stone-200"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
          >
            {/* Imagem */}
            <img 
              src={image.src} 
              alt={image.alt || `Imagem ${i + 1} do projeto`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Overlay com ícone de Zoom (Indica que é clicável) */}
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                <span className="bg-white/90 text-stone-900 px-4 py-2 text-xs uppercase tracking-widest font-medium">
                    Ampliar
                </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox (Tela Cheia) */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map(img => ({ src: img.src }))}
        plugins={[Zoom]} 
        styles={{ container: { backgroundColor: "rgba(28, 25, 23, 0.95)" } }}
      />
    </div>
  );
}