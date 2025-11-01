import { useState, useEffect } from 'react';
import { kidsApi } from './services/api';

function App() {
  const [kids, setKids] = useState([]);  // State: List of kids
  const [name, setName] = useState('');  // Temp for create form
  const [age, setAge] = useState(0);

  // Load kids on mount
  useEffect(() => {
    kidsApi.list().then(res => setKids(res.data.kids || []));
  }, []);

  const handleCreate = async () => {
    if (!name || !age) return;
    try {
      const res = await kidsApi.create({ name, age });
      setKids([...kids, { id: res.data.kid_id, name, age, reading_level: 'beginner' }]);
      setName(''); setAge(0);
    } catch (err) {
      alert('Create failed—check backend!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-800">SomaBuddy Dashboard</h1>
      
      {/* Create Form */}
      <div className="max-w-md mx-auto mb-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add New Kid</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="w-full p-2 mb-2 border rounded"
        />
        <button onClick={handleCreate} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Create Kid
        </button>
      </div>

      {/* Kid List */}
      <div className="grid gap-4 max-w-4xl mx-auto">
        {kids.map(kid => (
          <div key={kid.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">{kid.name} (Age {kid.age})</h3>
            <p>Level: {kid.reading_level} | Progress: {kid.progress_score}/100</p>
            <p>Errors: {kid.error_log?.length || 0} logged</p>
            <button className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
              Start Session → {/* Later: Nav to /session/{kid.id} */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;