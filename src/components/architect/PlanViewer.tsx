import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PlanViewerProps {
  pdfUrl: string;
  title: string;
}

export default function PlanViewer({ pdfUrl, title }: PlanViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className={`transition-all duration-300 ${
        isFullScreen 
            ? 'fixed inset-0 z-50 bg-stone-100 w-full h-full p-4 overflow-auto flex flex-col' 
            : 'bg-stone-100 p-8 rounded-lg border border-stone-200 shadow-inner relative'
    }`}>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
            <h3 className="text-xl font-medium text-stone-900 flex items-center gap-2">
                <button 
                    onClick={() => setIsFullScreen(!isFullScreen)} 
                    className="hover:text-stone-600 transition-colors cursor-pointer"
                    title={isFullScreen ? "Minimizar" : "Tela Cheia"}
                >
                    {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>
                Pranchas Técnicas
            </h3>
            <p className="text-sm text-stone-500">{title} — Página {pageNumber} de {numPages}</p>
        </div>

        {/* Controles */}
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-stone-200">
            <button onClick={() => setScale(s => Math.max(0.5, s - 0.2))} className="p-2 hover:bg-stone-100 rounded-full text-stone-600"><ZoomOut size={18} /></button>
            <span className="text-xs font-mono w-12 text-center">{(scale * 100).toFixed(0)}%</span>
            <button onClick={() => setScale(s => Math.min(2.5, s + 0.2))} className="p-2 hover:bg-stone-100 rounded-full text-stone-600"><ZoomIn size={18} /></button>
            
            <div className="w-px h-4 bg-stone-300 mx-2"></div>

            <button disabled={pageNumber <= 1} onClick={() => setPageNumber(p => p - 1)} className="p-2 hover:bg-stone-100 rounded-full text-stone-600 disabled:opacity-30"><ChevronLeft size={18} /></button>
            <button disabled={pageNumber >= numPages} onClick={() => setPageNumber(p => p + 1)} className="p-2 hover:bg-stone-100 rounded-full text-stone-600 disabled:opacity-30"><ChevronRight size={18} /></button>
        </div>
      </div>

      <div className={`overflow-auto bg-white border border-stone-200 p-4 shadow-lg ${isFullScreen ? 'flex-1' : 'min-h-[500px]'}`}>
        <div className="w-fit mx-auto">
            <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<div className="p-10 text-stone-400 animate-pulse">Carregando planta arquitetônica...</div>}
                error={<div className="p-10 text-red-400">Erro ao carregar PDF. Verifique o caminho do arquivo.</div>}
            >
                <Page 
                    pageNumber={pageNumber} 
                    scale={scale} 
                    renderTextLayer={false} 
                    renderAnnotationLayer={false}
                    className="shadow-md"
                />
            </Document>
        </div>
      </div>
    </div>
  );
}