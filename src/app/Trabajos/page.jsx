'use client'

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { items } from "./Stacks/items";

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

  // Función para obtener preview de Figma o Placeholder de Código
  const renderPreview = (item) => {
  if (item.category === "UX/UI") {
    return (
      <div className={`w-full h-full bg-gradient-to-br ${item.color} flex items-center justify-center p-12`}>
        <img 
          src={item.image || `https://placehold.co/600x800/111/444?text=Figma+Design`} 
          alt={item.title}
          className="w-full h-full object-contain transition-all duration-700 group-hover:scale-110 drop-shadow-2xl"
        />
        {/* Un patrón sutil de puntos para que el fondo no sea plano */}
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>
    );
  }

    // Vista previa para FRONTEND / BACKEND (Simulación de código)
    return (
      <div className="w-full h-full bg-[#0a0a0a] p-8 font-mono text-[10px] overflow-hidden opacity-40 group-hover:opacity-80 transition-opacity">
        <div className="flex gap-1.5 mb-4">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <p className="text-blue-400">class <span className="text-yellow-400">{item.title.replace(/\s/g, '')}</span> {'{'}</p>
        <p className="pl-4 text-gray-500">// Stack: {item.stack}</p>
        <p className="pl-4 text-purple-400">const<span className="text-white"> modules = [</span></p>
        {item.stack.split(',').map((tech, i) => (
          <p key={i} className="pl-8 text-green-400">"{tech.trim()}",</p>
        ))}
        <p className="pl-4 text-white">];</p>
        <p className="text-blue-400">{'}'}</p>
        {/* Un gradiente para difuminar el "código" hacia abajo */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
      </div>
    );
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
              className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden cursor-pointer bg-[#111] border border-white/5"
            >
              {/* VISTA PREVIA DINÁMICA */}
              <div className="absolute inset-0 z-0">
                {renderPreview(item)}
              </div>

              {/* Overlay de gradiente para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                <motion.span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-3">
                  {item.category}
                </motion.span>
                <motion.h2 className="text-3xl font-bold leading-none mb-2 tracking-tight">
                  {item.title}
                </motion.h2>
                <motion.p className="text-gray-400 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  Ver detalles →
                </motion.p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.main>

      {/* MODAL (Sin cambios significativos para mantener estabilidad) */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
            />

            <motion.div
              layoutId={`card-container-${selectedId}`}
              className="relative w-full max-w-6xl h-full max-h-[85vh] bg-[#121212] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col lg:flex-row"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-8 right-8 z-[110] bg-white text-black w-12 h-12 rounded-full flex items-center justify-center font-bold hover:rotate-90 transition-transform duration-300"
              >
                ✕
              </button>

              <div className="flex-[1.5] bg-black relative overflow-hidden flex items-center justify-center">
                {selectedItem.figmaUrl ? (
                  <>
                    {isIframeLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] z-10">
                        <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                      </div>
                    )}
                    <iframe
                      className="w-full h-full border-none"
                      src={selectedItem.figmaUrl}
                      onLoad={() => setIsIframeLoading(false)}
                      allowFullScreen
                    />
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center bg-[#0d0d0d]">
                    <div className="w-20 h-20 mb-6 rounded-3xl bg-blue-600/20 flex items-center justify-center">
                       <code className="text-blue-500 text-2xl font-bold">{"</>"}</code>
                    </div>
                    <div className="text-gray-500 italic text-xs tracking-widest uppercase">Repositorio y Documentación</div>
                    <div className="mt-4 text-gray-300 font-mono text-sm">{selectedItem.stack}</div>
                  </div>
                )}
              </div>

              <div className="flex-1 p-12 overflow-y-auto custom-scrollbar">
                <span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black tracking-widest uppercase mb-6">
                  {selectedItem.category}
                </span>
                <h2 className="text-4xl font-bold mb-6 tracking-tighter leading-tight">
                  {selectedItem.title}
                </h2>
                <div className="h-1 w-12 bg-blue-500 mb-8" />
                <p className="text-gray-400 text-lg leading-relaxed mb-10 font-light">
                  {selectedItem.description}
                </p>

                <div className="space-y-6 border-t border-white/5 pt-10">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Stack Principal</span>
                    <span className="text-sm text-gray-200">{selectedItem.stack}</span>
                  </div>
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