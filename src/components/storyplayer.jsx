import { useState } from 'react';
import { ttsApi, kidsApi } from '../services/api';  // Your API glue

const StoryPlayer = ({ kidId }) => {
  const [storyText, setStoryText] = useState('');  // Fetched story
  const [audioUrl, setAudioUrl] = useState(null);  // MP3 blob URL
  const [loading, setLoading] = useState(false);   // Spinner
  const [error, setError] = useState(null);

  const fetchAndPlay = async () => {
    if (!kidId) return;
    setLoading(true);
    setError(null);

    try {
      // Step 1: Fetch story (API or mock)
      const kidRes = await kidsApi.get(kidId);
      const level = kidRes.data.reading_level;
      let story = "Once in a Kenyan village, a child discovered the power of words.";  // Mock fallback
      if (level === 'intermediate') story = "An epic journey across the savanna, facing clever riddles.";

      // Real API: GET /stories/{kidId}
      // const storyRes = await fetch(`http://localhost:8000/stories/${kidId}`);  // Or use api service
      // const storyData = await storyRes.json();
      // story = storyData.story;

      setStoryText(story);

      // Step 2: Generate TTS MP3
      const ttsRes = await ttsApi.generate({
        text: story,
        kid_id: kidId,
        lang: 'en',
        slow: level === 'beginner'
      });
      
      // Blob to URL for <audio>
      const blob = new Blob([ttsRes.data], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err) {
      setError('Oops—story or audio fetch failed. Check backend?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Story Time for Kid #{kidId}</h2>
      <button
        onClick={fetchAndPlay}
        disabled={loading}
        className="w-full bg-purple-500 text-white p-3 rounded hover:bg-purple-600 disabled:opacity-50 mb-4"
      >
        {loading ? 'Loading Magic...' : 'Generate & Play Story'}
      </button>
      
      {error && <p className="text-red-500 mb-2">{error}</p>}
      
      {storyText && (
        <div className="mb-4">
          <h3 className="font-bold mb-2">Your Story:</h3>
          <p className="text-sm italic p-2 bg-gray-50 rounded">{storyText}</p>
        </div>
      )}
      
      {audioUrl && (
        <audio
          controls
          src={audioUrl}
          className="w-full"
          onEnded={() => URL.revokeObjectURL(audioUrl)}  // Cleanup memory
        >
          Your browser doesn't support audio.
        </audio>
      )}
    </div>
  );
};

export default StoryPlayer;