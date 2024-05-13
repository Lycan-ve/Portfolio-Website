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
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {items.map((item) => (
                item.id === selectedId && (
                  <motion.div
                    className="bg-white rounded-lg p-4 shadow-md max-w-lg mx-auto"
                    layoutId={`card-container-${item.id}`}
                    key={item.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                  >
                    <motion.div className="relative">
                      <motion.button
                        className="absolute top-2 right-2 py-1 px-2 text-center text-white bg-black rounded-md"
                        onClick={() => setSelectedId('')}
                      >
                        Cerrar
                      </motion.button>
                      <motion.h2 className="text-xl font-bold mb-2 text-black">{item.title}</motion.h2>
                      <motion.h5 className="text-sm font-bold mb-1 text-black">{item.subtitle}</motion.h5>
                      <motion.p className="text-md text-black mb-4">{item.description}</motion.p>
                      <motion.p
                        className="text-md text-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Additional content can go here!
                      </motion.p>
                    </motion.div>
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

