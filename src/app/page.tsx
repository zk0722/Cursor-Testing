'use client';

import { useState, useEffect } from 'react';
import { MapPinIcon, MagnifyingGlassIcon, SparklesIcon, CalendarIcon, ClockIcon, HeartIcon, CameraIcon, ShoppingBagIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';
import { generateTravelPhoto } from '../lib/generateTravelPhoto';

export default function Home() {
  const [departure, setDeparture] = useState('Shanghai');
  const [destination, setDestination] = useState('');
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(['classic']);
  const [duration, setDuration] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [travelPhoto, setTravelPhoto] = useState<string | null>(null);
  const [isGeneratingPhoto, setIsGeneratingPhoto] = useState(false);
  const [showAllPreferences, setShowAllPreferences] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const preferences = [
    { id: 'classic', label: '经典路线', icon: '🏛️' },
    { id: 'food', label: '美食', icon: '🍜' },
    { id: 'shopping', label: '逛街购物', icon: '🛍️' },
    { id: 'family', label: '家庭亲子', icon: '👨‍👩‍👧‍👦' },
    { id: 'niche', label: '小众探索', icon: '🗺️' },
    { id: 'nature', label: '自然风光', icon: '🏔️' },
    { id: 'art', label: '艺术文艺', icon: '🎨' },
    { id: 'photo', label: '拍照出片', icon: '📸' },
  ];

  const togglePreference = (prefId: string) => {
    setSelectedPreferences(prev => 
      prev.includes(prefId) 
        ? prev.filter(p => p !== prefId)
        : [...prev, prefId]
    );
  };

  useEffect(() => {
    const generatePhoto = async () => {
      setIsGeneratingPhoto(true);
      try {
        const photoUrl = await generateTravelPhoto();
        if (photoUrl) {
          setTravelPhoto(photoUrl);
        }
      } catch (error) {
        console.error('Failed to generate travel photo:', error);
      } finally {
        setIsGeneratingPhoto(false);
      }
    };

    generatePhoto();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header with hero image overlay */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        {travelPhoto && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("${travelPhoto}")`
            }}
          ></div>
        )}
        {!travelPhoto && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        )}
        {isGeneratingPhoto && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="flex items-center space-x-2 text-white">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span className="text-sm">生成旅行美图中...</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-6">
          <div className="text-center bg-black/20 backdrop-blur-sm rounded-2xl px-6 py-4">
            <h1 className="text-3xl font-bold mb-2 drop-shadow-lg">途际</h1>
            <p className="text-lg opacity-90 mb-1 drop-shadow-md">AI智能，高效可靠行程安排</p>
            <p className="text-sm opacity-75 drop-shadow-sm">大模型全网热门搜索</p>
          </div>
        </div>
        
        {/* Floating travel icons */}
        <div className="absolute top-8 right-8 opacity-20">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            ✈️
          </div>
        </div>
        <div className="absolute bottom-8 left-8 opacity-20">
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
            🏖️
          </div>
        </div>
      </div>

      <div className="px-6 -mt-8 relative z-20">
                {/* Trip Planning Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          {/* Departure */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">出发地</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">{departure}</span>
              <span className="text-gray-400">&gt;</span>
            </div>
          </div>

          {/* Destination */}
          <div className="relative mb-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">目的地</span>
            </div>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="国家/城市"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Duration & Time - Collapsible */}
          <div className="bg-gray-50 rounded-xl">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <CalendarIcon className="w-5 h-5 text-blue-500" />
                <span className="font-medium">游玩天数</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="text-sm">选择时间</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${showDatePicker ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            {showDatePicker && (
              <div className="px-4 pb-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">出发日期</label>
                    <input 
                      type="date"
                      className="w-full p-3 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">返程日期</label>
                    <input 
                      type="date"
                      className="w-full p-3 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">游玩天数</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5, '7+'].map((days) => (
                      <button
                        key={days}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-purple-500 hover:text-purple-600 transition-colors text-sm"
                      >
                        {days === '7+' ? '7+天' : `${days}天`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Special Requests */}
          <div className="mt-4">
            <div className="relative">
              <div className="absolute left-4 top-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded text-xs font-medium">
                  AI
                </div>
              </div>
              <textarea
                placeholder="问问特殊要求"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full pl-16 pr-4 py-4 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all resize-none"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Travel Preferences */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <HeartIcon className="w-5 h-5 text-pink-500 mr-2" />
            旅行偏好
          </h3>
          <div className="grid grid-cols-2 gap-3 mb-3">
            {preferences.slice(0, showAllPreferences ? preferences.length : 3).map((pref) => (
              <button
                key={pref.id}
                onClick={() => togglePreference(pref.id)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  selectedPreferences.includes(pref.id)
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{pref.icon}</span>
                  <span className="text-sm font-medium">{pref.label}</span>
                </div>
              </button>
            ))}
            {!showAllPreferences && preferences.length > 3 && (
              <button
                onClick={() => setShowAllPreferences(true)}
                className="p-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 hover:border-purple-300 hover:text-purple-600 transition-all flex items-center justify-center"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">更多选项</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
            )}
          </div>
          {showAllPreferences && (
            <div className="flex justify-center">
              <button
                onClick={() => setShowAllPreferences(false)}
                className="text-sm text-gray-500 hover:text-purple-600 transition-colors flex items-center space-x-1"
              >
                <span>收起</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        


        {/* CTA Button */}
        <div className="mb-6">
          <button className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2">
            <SparklesIcon className="w-5 h-5" />
            <span>开始智能规划</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex">
          <button className="flex-1 py-4 px-6 flex flex-col items-center space-y-1 text-purple-600">
            <MapPinIcon className="w-6 h-6" />
            <span className="text-xs font-medium">行程</span>
          </button>
          <button className="flex-1 py-4 px-6 flex flex-col items-center space-y-1 text-gray-400">
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-xs">我</span>
            </div>
            <span className="text-xs">我的</span>
          </button>
        </div>
      </div>

      {/* Floating action hint */}
      <div className="fixed bottom-24 right-6">
        <div className="bg-white rounded-full p-3 shadow-lg border animate-pulse">
          <CameraIcon className="w-6 h-6 text-purple-500" />
        </div>
      </div>
    </div>
  );
}
