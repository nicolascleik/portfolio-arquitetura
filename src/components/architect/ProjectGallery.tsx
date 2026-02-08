import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, ListFilter } from 'lucide-react';

interface Project {
  slug: string;
  data: {
    title: string;
    category: 'Residencial' | 'Comercial' | 'Urbanismo' | 'Interiores';
    location: string;
    year: number;
    area: string;
    coverImage: { src: string }; 
  };
}

interface GalleryProps {
  projects: Project[];
}

export default function ProjectGallery({ projects }: GalleryProps) {
  const [filter, setFilter] = useState('Todos');

  const categories = ['Todos', ...new Set(projects.map(p => p.data.category))];

  const filteredProjects = filter === 'Todos' 
    ? projects 
    : projects.filter(p => p.data.category === filter);

  return (
    <div className="space-y-8">
      {/* Barra de Filtros Minimalista */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
        <div className="flex items-center gap-2 text-stone-500">
          <ListFilter size={18} />
          <span className="text-sm uppercase tracking-widest">Filtrar por:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-sm transition-all duration-300 border ${
                filter === cat
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-transparent text-stone-500 border-stone-200 hover:border-stone-900 hover:text-stone-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Animado (Framer Motion) */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.a
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              href={`${import.meta.env.BASE_URL}/projects/${project.slug}`.replace('//', '/')}
              key={project.slug}
              className="group block"
            >
              <div className="relative overflow-hidden bg-stone-200 aspect-[4/3] mb-4">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                <img 
                  src={project.data.coverImage.src} 
                  alt={project.data.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Tag Flutuante */}
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium uppercase tracking-wider z-20">
                  {project.data.category}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-medium text-stone-900 group-hover:text-stone-600 transition-colors">
                  {project.data.title}
                </h3>
                <p className="text-sm text-stone-500 mt-1 flex gap-3">
                  <span>{project.data.location}</span>
                  <span className="text-stone-300">•</span>
                  <span>{project.data.year}</span>
                </p>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20 text-stone-400">
          <LayoutGrid className="mx-auto mb-4 opacity-50" size={48} />
          <p>Nenhum projeto encontrado nesta categoria.</p>
        </div>
      )}
    </div>
  );
}