import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FileText, X, ZoomIn, ZoomOut, Download } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function CVModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState(1.0);
  
  const pdfUrl = "/portfolio-arquitetura/assets/curriculo.pdf";

  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    if (window.innerWidth < 768) {
        setScale(0.6); 
    } else {
        setScale(1.2);
    }
  }, [isOpen]);

  return (
    <>
      {/* 1. O BOTÃO QUE FICA NA TELA (Substitui o antigo link) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-3 hover:bg-stone-700 transition-colors uppercase text-sm tracking-widest cursor-pointer"
      >
        <FileText size={18} />
        Ver Currículo
      </button>

      {/* 2. O MODAL (Só aparece se isOpen === true) */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            
            {/* Fundo Escuro (Backdrop) */}
            <div 
                className="absolute inset-0 bg-stone-900/90 backdrop-blur-sm transition-opacity"
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Conteúdo do Modal */}
            <div className="relative bg-stone-100 w-full max-w-4xl max-h-[90vh] rounded-lg shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
                
                {/* Barra de Topo */}
                <div className="flex justify-between items-center p-4 border-b border-stone-200 bg-white">
                    <h3 className="text-stone-900 font-medium flex items-center gap-2">
                        <FileText size={20} /> Currículo Profissional
                    </h3>
                    
                    <div className="flex items-center gap-2">
                        {/* Botão de Download (caso a pessoa queira guardar) */}
                        <a href={pdfUrl} download className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full" title="Baixar PDF">
                            <Download size={20} />
                        </a>
                        
                        {/* Botão Fechar */}
                        <button onClick={() => setIsOpen(false)} className="p-2 text-stone-500 hover:text-red-600 hover:bg-stone-100 rounded-full">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Área do PDF (Com Scroll) */}
                <div className="flex-1 overflow-auto bg-stone-200 p-4 flex justify-center">
                    <Document
                        file={pdfUrl}
                        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                        loading={<div className="text-stone-500 mt-10">Carregando documento...</div>}
                        error={<div className="text-red-500 mt-10">Erro ao carregar PDF. Verifique o arquivo.</div>}
                    >
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page 
                                key={`page_${index + 1}`} 
                                pageNumber={index + 1} 
                                scale={scale}
                                className="mb-4 shadow-lg"
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                            />
                        ))}
                    </Document>
                </div>

                {/* Barra de Controle Inferior (Zoom) */}
                <div className="bg-white p-3 border-t border-stone-200 flex justify-center gap-4">
                    <button onClick={() => setScale(s => Math.max(0.5, s - 0.1))} className="p-2 hover:bg-stone-100 rounded text-stone-600"><ZoomOut size={20}/></button>
                    <span className="py-2 text-sm font-mono min-w-[3rem] text-center">{(scale * 100).toFixed(0)}%</span>
                    <button onClick={() => setScale(s => Math.min(2.0, s + 0.1))} className="p-2 hover:bg-stone-100 rounded text-stone-600"><ZoomIn size={20}/></button>
                </div>

            </div>
        </div>
      )}
    </>
  );
}