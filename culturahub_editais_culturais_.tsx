import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  DollarSign, 
  ExternalLink, 
  BookOpen, 
  Music, 
  Film, 
  Ticket, 
  BookMarked, 
  Palette, 
  CheckCircle2, 
  Filter,
  Send,
  Sparkles,
  Award,
  RefreshCw
} from 'lucide-react';

const CATEGORIES = ['Todos', 'Música', 'Cinema', 'Teatro', 'Literatura', 'Artes Visuais'];
const UFS = ['Todos', 'PR', 'SP', 'SC', 'Nacional'];

function Toast({ message, type, onClose }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#111827] border border-cyan-500/30 px-5 py-4 rounded-xl shadow-[0_0_30px_rgba(34,211,238,0.2)] text-white animate-fade-in">
      <CheckCircle2 className="text-cyan-400 shrink-0" size={20} />
      <p className="text-sm font-medium">{message}</p>
      <button 
        onClick={onClose}
        className="ml-3 text-slate-400 hover:text-white text-xs font-bold px-2 py-1 bg-white/5 rounded"
      >
        OK
      </button>
    </div>
  );
}

export default function App() {
  const [editais, setEditais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedUf, setSelectedUf] = useState('Todos');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  const fetchEditais = async () => {
    setLoading(true);
    try {
      const response = await fetch('./editais.json');
      if (!response.ok) throw new Error('Falha ao carregar dados');
      const data = await response.json();
      setEditais(data);
    } catch (err) {
      console.warn("Usando dados de fallback locais...", err);
      setEditais([
        { 
          id: 1, 
          title: 'Edital de Fomento – Multiartes 2026', 
          category: 'Artes Visuais', 
          value: 'Variável', 
          deadline: 'Contínuo', 
          description: 'Edital da Secretaria de Cultura do Paraná, visando projetos de fomento nas áreas de multiartes no estado.', 
          sponsor: 'Secretaria da Cultura - PR',
          url: 'https://www.cultura.pr.gov.br/',
          uf: 'PR',
          municipio: 'Curitiba'
        },
        { 
          id: 2, 
          title: 'Prêmio Spcine de Desenvolvimento de Jogos', 
          category: 'Cinema', 
          value: 'R$ 150.000', 
          deadline: '30/09/2026', 
          description: 'Apoio financeiro para o desenvolvimento de protótipos de jogos eletrônicos independentes em São Paulo.', 
          sponsor: 'Spcine / Prefeitura de SP',
          url: 'https://www.spcine.com.br/',
          uf: 'SP',
          municipio: 'São Paulo'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEditais();
  }, []);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      showNotification('E-mail cadastrado com sucesso! Você receberá novos editais.', 'success');
    }, 1500);
  };

  const filteredEditais = editais.filter(edital => {
    const matchesCategory = activeCategory === 'Todos' || edital.category === activeCategory;
    const matchesUf = selectedUf === 'Todos' || edital.uf === selectedUf;
    return matchesCategory && matchesUf;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Música': return <Music size={16} />;
      case 'Cinema': return <Film size={16} />;
      case 'Teatro': return <Ticket size={16} />;
      case 'Literatura': return <BookMarked size={16} />;
      case 'Artes Visuais': return <Palette size={16} />;
      default: return <Award size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      <header className="border-b border-white/10 bg-[#0d1322]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <Sparkles className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-wider text-white">CULTURAHUB</h1>
              <p className="text-xs text-slate-400">Portal Automatizado de Editais Culturais</p>
            </div>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 w-full md:w-auto">
            <input 
              type="email" 
              placeholder="Seu e-mail para alertas..." 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#151b2b] border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors w-full md:w-64"
            />
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-colors disabled:opacity-50 shrink-0"
            >
              {isSubmitting ? 'Salvando...' : <>Assinar <Send size={14} /></>}
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-black text-white mb-2">Editais Disponíveis</h2>
            <p className="text-slate-400">Atualizados autonomamente por raspagem de dados e Inteligência Artificial.</p>
          </div>
          <button 
            onClick={fetchEditais}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-sm transition-all"
          >
            <RefreshCw size={14} className={loading ? "animate-spin text-cyan-400" : ""} />
            Atualizar Dados
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full border transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-cyan-500/10 border-cyan-400/50 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.15)]' 
                  : 'bg-[#151b2b] border-white/5 text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              {category !== 'Todos' && getCategoryIcon(category)}
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2">
          <span className="text-sm font-medium text-slate-400 shrink-0">Filtrar por UF:</span>
          {UFS.map(uf => (
            <button
              key={uf}
              onClick={() => setSelectedUf(uf)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                selectedUf === uf 
                  ? 'bg-purple-600/20 border-purple-400 text-purple-300' 
                  : 'bg-[#151b2b] border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {uf}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400 flex flex-col items-center justify-center gap-3">
            <RefreshCw className="animate-spin text-cyan-400" size={32} />
            Carregando editais atualizados...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEditais.map(edital => {
              return (
                <div 
                  key={edital.id} 
                  className="group relative bg-[#131a2a] border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.05)] transition-all duration-300 flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4 gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 text-xs font-medium text-slate-300 border border-white/5">
                      {getCategoryIcon(edital.category)}
                      {edital.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-300 text-xs font-bold border border-purple-500/20">
                      {edital.municipio} - {edital.uf}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {edital.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-6 flex-grow line-clamp-3">
                    {edital.description}
                  </p>

                  <div className="bg-black/20 rounded-xl p-4 mb-6 border border-white/5">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-500">Patrocinador</span>
                      <span className="text-slate-200 font-medium">{edital.sponsor}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-500">Valor</span>
                      <span className="text-emerald-400 font-medium">{edital.value}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Prazo</span>
                      <span className="text-slate-200 font-medium">{edital.deadline}</span>
                    </div>
                  </div>

                  <a
                    href={edital.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl font-semibold flex justify-center items-center gap-2 transition-all duration-300 bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/20 hover:text-cyan-300"
                  >
                    Acessar Edital Completo
                    <ExternalLink size={16} className="opacity-70" />
                  </a>
                </div>
              );
            })}
          </div>
        )}
        
        {!loading && filteredEditais.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            Nenhum edital encontrado para esta combinação de categoria e UF.
          </div>
        )}
      </main>

      {notification && (
        <Toast 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}
    </div>
  );
}