'use client'

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { items } from "./Stacks/items";
import { CodeCanvas } from "./components/CodeCanvas";

const categories = ["TODOS", "UX/UI", "FRONTEND", "BACKEND"];

const WorkPage = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState("TODOS");
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  const filteredItems = filter === "TODOS" 
    ? items 
    : items.filter(item => item.category === filter);

  const selectedItem = items.find(item => item.id === selectedId);

  useEffect(() => {
    if (selectedId) setIsIframeLoading(true);
  }, [selectedId]);

  const renderPreview = (item) => {
  // Si es UX/UI, mostramos la imagen
  if (item.category === "UX/UI") {
    return (
      <div className={`w-full h-full bg-gradient-to-br ${item.color} flex items-center justify-center p-12 relative`}>
        <img 
          src={item.image || `https://placehold.co/600x800/111/444?text=Design`} 
          alt={item.title}
          className="w-full h-full object-contain transition-all duration-700 group-hover:scale-110 drop-shadow-2xl z-10"
        />
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>
    );
  }

  // Para BACKEND o FRONTEND, enviamos el item al CodeCanvas
  // Solo si el item existe
  return <CodeCanvas item={item} isPreview={true} />;
};

  return (
    <div className="bg-[#080808] min-h-screen text-white font-sans selection:bg-blue-500/30">
      
      <header className="max-w-6xl mx-auto pt-20 pb-12 px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-black mb-10 tracking-tighter"
        >
          WORK<span className="text-blue-600">.</span>
        </motion.h1>

        <nav className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-2.5 rounded-full text-xs font-bold tracking-widest transition-all border ${
                filter === cat 
                ? "bg-white text-black border-white scale-105 shadow-lg shadow-white/10" 
                : "bg-transparent text-gray-500 border-white/10 hover:border-white/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </header>

      <motion.main layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 pb-20">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              layoutId={`card-container-${item.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setSelectedId(item.id)}
              className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden cursor-pointer bg-[#111] border border-white/5 shadow-2xl"
            >
              <div className="absolute inset-0 z-0">{renderPreview(item)}</div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                <motion.span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-3">
                  {item.category}
                </motion.span>
                <motion.h2 className="text-3xl font-bold leading-none mb-2 tracking-tight">
                  {item.title}
                </motion.h2>
                <motion.p className="text-gray-400 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  Explorar Proyecto →
                </motion.p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.main>

      <AnimatePresence>
        {selectedId && selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
            />

            <motion.div
              layoutId={`card-container-${selectedId}`}
              className="relative w-full max-w-6xl h-full max-h-[85vh] bg-[#121212] rounded-[3rem] overflow-hidden border border-white/10 flex flex-col lg:flex-row shadow-[0_0_100px_rgba(0,0,0,1)]"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-8 right-8 z-[110] bg-white text-black w-12 h-12 rounded-full flex items-center justify-center font-bold hover:rotate-90 transition-transform duration-500"
              >
                ✕
              </button>

              <div className="flex-[1.5] bg-black relative overflow-hidden">
                {selectedItem.figmaUrl ? (
                  <iframe className="w-full h-full border-none" src={selectedItem.figmaUrl} allowFullScreen />
                ) : (
                  <CodeCanvas item={selectedItem} isPreview={false} />
                )}
              </div>

              <div className="flex-1 p-12 overflow-y-auto custom-scrollbar bg-[#121212]">
                <span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black tracking-widest uppercase mb-6">
                  {selectedItem.category}
                </span >
                <h2 className="text-5xl font-bold mb-6 tracking-tighter">{selectedItem.title}</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-10 font-light">{selectedItem.description}</p>

                <div className="space-y-8 border-t border-white/5 pt-10">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Technologies</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.stack.split(',').map(tech => (
                        <span key={tech} className="px-3 py-1 bg-white/5 rounded-md text-xs text-gray-300 border border-white/5">{tech.trim()}</span>
                      ))}
                    </div>
                  </div>
                  {selectedItem.repoUrl && (
                    <a href={selectedItem.repoUrl} target="_blank" className="inline-block w-full py-4 bg-white text-black text-center rounded-2xl font-bold hover:bg-blue-500 hover:text-white transition-colors">
                      Ver en GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkPage;