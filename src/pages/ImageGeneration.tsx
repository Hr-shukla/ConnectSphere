import React, { useState } from 'react';
import { Wand2, Download, Loader } from 'lucide-react';

const ImageGeneration: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // For demo purposes, use a placeholder image service
      const imageUrl = `https://picsum.photos/512/512?random=${Date.now()}`;
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `connectsphere-generated-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wand2 size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            AI Image Generator
          </h1>
          <p className="text-gray-600">
            Create stunning images from text descriptions using artificial intelligence
          </p>
        </div>

        <form onSubmit={handleGenerate} className="mb-8">
          <div className="mb-4">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
              Describe what you want to create
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A serene mountain landscape with a crystal clear lake reflecting the snow-capped peaks at sunset"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all"
              rows={4}
              maxLength={1000}
            />
            <p className="text-sm text-gray-500 mt-1">
              {prompt.length}/1000 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={!prompt.trim() || isGenerating}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <Loader className="animate-spin" size={20} />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Wand2 size={20} />
                <span>Generate Image</span>
              </>
            )}
          </button>
        </form>

        {isGenerating && (
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
            <p className="text-gray-600">Creating your masterpiece...</p>
            <p className="text-sm text-gray-500 mt-1">This usually takes 10-30 seconds</p>
          </div>
        )}

        {generatedImage && !isGenerating && (
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Image</h3>
            <div className="relative group">
              <img
                src={generatedImage}
                alt="Generated artwork"
                className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                <button
                  onClick={handleDownload}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white text-gray-900 px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg"
                >
                  <Download size={18} />
                  <span>Download</span>
                </button>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 mb-2">Prompt used:</p>
              <p className="text-gray-800 italic bg-white p-3 rounded border">"{prompt}"</p>
            </div>
          </div>
        )}

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-2">💡 Tips for better results:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Be specific about colors, lighting, and mood</li>
            <li>• Include artistic styles (e.g., "photorealistic", "oil painting", "digital art")</li>
            <li>• Mention composition details (e.g., "close-up", "wide shot", "aerial view")</li>
            <li>• Add quality descriptors (e.g., "high resolution", "detailed", "professional")</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageGeneration;