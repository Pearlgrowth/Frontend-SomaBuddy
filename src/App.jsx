import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';  // New: Smooth magic
import { PlusIcon, SpeakerWaveIcon, MicrophoneIcon } from '@heroicons/react/24/outline';  // Icons
import { kidsApi } from './services/api';

function App() {
  const [kids, setKids] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [selectedKidId, setSelectedKidId] = useState(null);
  const [loading, setLoading] = useState(true);  // New: Fade-in loader

  useEffect(() => {
    const loadKids = async () => {
      try {
        const res = await kidsApi.list();
        setKids(res.data.kids || []);
      } catch (err) {
        console.error('Kids fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };
    loadKids();
  }, []);

  const handleCreate = async () => {
    if (!name || !age) return;
    try {
      const res = await kidsApi.create({ name, age });
      setKids([...kids, { id: res.data.kid_id, name, age, reading_level: 'beginner', progress_score: 0, error_log: [] }]);
      setName(''); setAge(0);
    } catch (err) {
      alert('Create oops—check connection!');
    }
  };

  // New: Skeleton loader for empty/authentic feel
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-purple-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-purple-800">Loading SomaBuddy magic...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-purple-100 p-4 md:p-8">  {/* Authentic savanna gradient */}
      <header className="text-center mb-8">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-800 to-orange-600 bg-clip-text text-transparent mb-2"
        >
          SomaBuddy
        </motion.h1>
        <p className="text-lg text-gray-700 italic">Your AI reading adventure in Kenya 🇰🇪</p>
      </header>
      
      {/* Create Form – Terracotta accents */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-md mx-auto mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200"  // Glassmorphism for modern feel
      >
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-purple-800">
          <PlusIcon className="h-6 w-6 mr-2 text-orange-500" />
          Add Brave Learner
        </h2>
        <input
          type="text"
          placeholder="Kid's Name (e.g., Amina)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent"
        />
        <input
          type="number"
          placeholder="Age (7-12)"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent"
        />
        <button 
          onClick={handleCreate} 
          disabled={!name || !age}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-xl hover:from-orange-600 hover:to-red-600 disabled:opacity-50 font-semibold flex items-center justify-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create & Start Journey
        </button>
      </motion.div>

      {/* Kid Grid – Motion cards */}
      <div className="grid gap-6 max-w-6xl mx-auto">
        <AnimatePresence>  {/* Animates adds/removes */}
          {kids.map((kid) => (
            <motion.div
              key={kid.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ scale: 1.02 }}  // Subtle lift on hover
              whileTap={{ scale: 0.98 }}   // Tap feedback
              onClick={() => setSelectedKidId(kid.id)}
              className={`p-6 rounded-2xl shadow-md cursor-pointer transition-all duration-300 border-2 ${
                selectedKidId === kid.id 
                  ? 'border-green-400 bg-green-50'  // Selected glow
                  : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
              }`}
            >
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-orange-400 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">{kid.name.charAt(0).toUpperCase()}</span>  {/* Avatar initial */}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{kid.name}</h3>
                  <p className="text-sm text-gray-600">Age {kid.age} | {kid.reading_level} level</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Progress</span>
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" 
                        style={{ width: `${Math.min((kid.progress_score || 0) / 100 * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-green-700">{(kid.progress_score || 0).toFixed(0)}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 flex items-center">
                  <MicrophoneIcon className="h-4 w-4 mr-1 text-red-400" />
                  {kid.error_log?.length || 0} voice challenges logged
                </p>
              </div>
              {selectedKidId === kid.id && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 text-sm font-semibold text-green-600 flex items-center"
                >
                  <SpeakerWaveIcon className="h-4 w-4 mr-1" />
                  Ready for story time! ▶
                </motion.p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* StoryPlayer – Render if selected (from last chat, stubbed for now) */}
      {selectedKidId && (
        <div className="mt-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4 text-purple-800">Adventure Awaits!</h2>
          <p className="text-center text-gray-600 mb-6">Tap your kid to start a personalized reading session.</p>
          {/* <StoryPlayer kidId={selectedKidId} /> – Add full component next */}
        </div>
      )}

      {kids.length === 0 && !loading && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mt-8"
        >
          <p className="text-xl text-gray-500 mb-4">No young explorers yet?</p>
          <p className="text-sm text-gray-400">Create your first kid above to unlock stories and voice magic.</p>
        </motion.div>
      )}
    </div>
  );
}

export default App;