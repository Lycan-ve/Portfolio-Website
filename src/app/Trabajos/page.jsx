'use client'

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

const WorkPage = () => {

    const [selectedId, setSelectedId] = useState('');
    const items = [
      {
        id: '1',
        title: 'Card 1',
        subtitle: 'Information 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        figmaUrl: 'https://embed.figma.com/design/CvXCeCHXTo8ZNPukKb30Xt/Sastem--Carga-Familiar-?embed-host=share'
      },
      {
        id: '2',
        title: 'Card 2',
        subtitle: 'Information 2',
        description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      },
      {
        id: '3',
        title: 'Card 3',
        subtitle: 'Information 3',
        description:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
      },
      {
        id: '4',
        title: 'Card 4',
        subtitle: 'Information 4',
        description:
          'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
    ];
  
    return (
      <motion.div className="bg-black flex items-center justify-center h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <motion.div
              className={`card bg-white text-white rounded-lg shadow-md cursor-pointer transform transition-transform duration-500 hover:scale-105 ${
                selectedId === item.id ? 'card-selected' : ''
              }`}
              layoutId={`card-container-${item.id}`}
              onClick={() => setSelectedId(item.id)}
              key={item.id}
              initial={{ scale: 1 }}
              animate={{ scale: selectedId === item.id ? 1.1 : 1 }}
              //transition={{ duration: 0.3 }}
              
            >
              <div className="card-content">
                <motion.h2 className="text-xl font-bold mb-2 p-5 text-black">{item.title}</motion.h2>
                <motion.h5 className="text-sm font-bold mb-1 p-5 text-black">{item.subtitle}</motion.h5>
              </div>
            </motion.div>
          ))}
        </div>
  
        <AnimatePresence>
          {selectedId && (
  <motion.div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
    {items.map((item) => (
      item.id === selectedId && (
        <motion.div
          key={item.id}
          layoutId={`card-container-${item.id}`}
          className="bg-white rounded-lg p-6 w-full max-w-4xl h-[80vh] overflow-hidden flex flex-col"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-black">{item.title}</h2>
            <button onClick={() => setSelectedId('')} className="bg-black text-white px-4 py-2 rounded">
              Cerrar
            </button>
          </div>

          {/* El contenedor del prototipo */}
          <div className="flex-1 w-full bg-gray-100 rounded-md overflow-hidden">
            <iframe
              className="w-full h-full border-none"
              src={item.figmaUrl}
              allowFullScreen
            />
          </div>

          <p className="mt-4 text-gray-600">{item.description}</p>
        </motion.div>
      )
    ))}
  </motion.div>
)}
        </AnimatePresence>
      </motion.div>
    );
}

export default WorkPage

