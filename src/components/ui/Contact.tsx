import { useState } from 'react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  const [status, setStatus] = useState('');

  // Formspree temporario
  const FORMSPREE_URL = "https://formspree.io/f/temporario"; 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
        const response = await fetch(FORMSPREE_URL, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            setStatus('success');
            form.reset();
        } else {
            setStatus('error');
        }
    } catch (error) {
        setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-stone-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Informações de Contato */}
        <div>
            <h2 className="text-3xl font-light text-stone-900 mb-6">Vamos conversar sobre seu projeto?</h2>
            <p className="text-stone-600 mb-12">
                Preencha o formulário ou entre em contato direto pelos canais abaixo. Atendemos em todo o Brasil.
            </p>

            <div className="space-y-6">
                <a href="https://wa.me/5579999999999" target="_blank" className="flex items-center gap-4 text-stone-600 hover:text-stone-900 transition-colors">
                    <div className="w-12 h-12 bg-white flex items-center justify-center border border-stone-200">
                        <Phone size={20} />
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-widest text-stone-400">WhatsApp / Telefone</p>
                        <p className="font-medium">+55 (79) 99999-9999</p>
                    </div>
                </a>

                <div className="flex items-center gap-4 text-stone-600">
                    <div className="w-12 h-12 bg-white flex items-center justify-center border border-stone-200">
                        <Mail size={20} />
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-widest text-stone-400">Email</p>
                        <p className="font-medium">contato@arqstudio.com</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-stone-600">
                    <div className="w-12 h-12 bg-white flex items-center justify-center border border-stone-200">
                        <MapPin size={20} />
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-widest text-stone-400">Escritório</p>
                        <p className="font-medium">Aracaju, Sergipe</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Formulário */}
        <div className="bg-white p-8 md:p-12 shadow-xl shadow-stone-200/50">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Nome</label>
                    <input type="text" name="name" required className="w-full bg-stone-50 border-b border-stone-300 p-3 focus:outline-none focus:border-stone-900 transition-colors" placeholder="Seu nome completo" />
                </div>
                
                <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Email</label>
                    <input type="email" name="email" required className="w-full bg-stone-50 border-b border-stone-300 p-3 focus:outline-none focus:border-stone-900 transition-colors" placeholder="seu@email.com" />
                </div>

                <div>
                    <label htmlFor="message" className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Mensagem</label>
                    <textarea name="message" rows={4} required className="w-full bg-stone-50 border-b border-stone-300 p-3 focus:outline-none focus:border-stone-900 transition-colors" placeholder="Conte um pouco sobre seu projeto..."></textarea>
                </div>

                <button 
                    type="submit" 
                    disabled={status === 'sending'}
                    className="w-full bg-stone-900 text-white py-4 uppercase tracking-widest text-sm hover:bg-stone-800 transition-all flex justify-center items-center gap-2 disabled:opacity-70"
                >
                    {status === 'sending' ? 'Enviando...' : (
                        <>Enviar Mensagem <Send size={16} /></>
                    )}
                </button>

                {status === 'success' && <p className="text-green-600 text-sm text-center">Mensagem enviada com sucesso!</p>}
                {status === 'error' && <p className="text-red-600 text-sm text-center">Erro ao enviar. Tente pelo WhatsApp.</p>}
            </form>
        </div>

      </div>
    </section>
  );
}