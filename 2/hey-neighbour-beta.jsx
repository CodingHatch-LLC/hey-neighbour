import React, { useState } from 'react';
import { Calendar, Bell, ShoppingBag, Camera, Sparkles, User, CreditCard, MapPin, Heart, Share2, Search, X, Plus, Trash2, Edit } from 'lucide-react';

const HeyNeighbourBeta = () => {
  // State Management
  const [userType, setUserType] = useState(null);
  const [currentView, setCurrentView] = useState('login');
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Upload Management
  const [uploadedImages, setUploadedImages] = useState({
    outfits: [],
    products: [],
    banners: [],
    fashion: [],
    restaurants: [],
    profilePics: []
  });
  
  // Event Management
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Summer Nights Festival',
      date: 'Jul 15, 2026',
      location: 'Downtown Park',
      price: 85,
      image: '🎵',
      bannerUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200',
      category: 'Music',
      description: 'Three days of incredible live music under the stars',
      attendees: 245
    },
    {
      id: 2,
      name: 'Food & Wine Gala',
      date: 'Aug 2, 2026',
      location: 'Waterfront Venue',
      price: 120,
      image: '🍷',
      bannerUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200',
      category: 'Food',
      description: 'Premium wines and gourmet cuisine from local chefs',
      attendees: 180
    },
    {
      id: 3,
      name: 'Art Exhibition Opening',
      date: 'Jul 28, 2026',
      location: 'City Gallery',
      price: 45,
      image: '🎨',
      bannerUrl: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=1200',
      category: 'Art',
      description: 'Contemporary art from emerging local artists',
      attendees: 95
    }
  ]);
  
  // Vendor Products
  const [vendorProducts, setVendorProducts] = useState([
    { 
      id: 1, 
      name: 'Artisan Coffee Blend', 
      price: 18, 
      vendor: 'Bean Scene',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
      link: 'https://example.com/coffee',
      inStock: true,
      category: 'Food & Beverage'
    },
    { 
      id: 2, 
      name: 'Handmade Jewelry Set', 
      price: 65, 
      vendor: 'Crafted Co.',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
      link: 'https://example.com/jewelry',
      inStock: true,
      category: 'Fashion'
    }
  ]);
  
  // Shopping Cart
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  
  // Date Night State
  const [budget, setBudget] = useState(150);
  const [celebration, setCelebration] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedBeautyTreatments, setSelectedBeautyTreatments] = useState([]);
  const [selectedEntertainment, setSelectedEntertainment] = useState([]);
  
  // Social Media & Playlists
  const [playlists, setPlaylists] = useState({
    spotify: '',
    apple: '',
    youtube: ''
  });
  
  const [socialMediaLinks, setSocialMediaLinks] = useState({
    instagram: '',
    facebook: '',
    twitter: '',
    pinterest: '',
    hashtags: ''
  });
  
  // User Profile
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });
  
  // Payment Methods
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, last4: '4242', expiry: '12/25', isDefault: true },
    { id: 2, last4: '8888', expiry: '09/26', isDefault: false }
  ]);
  
  // Upload Handler
  const handleImageUpload = (category, files) => {
    const fileArray = Array.from(files);
    const newImages = fileArray.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
      file: file,
      uploadedAt: new Date().toISOString()
    }));
    
    setUploadedImages(prev => ({
      ...prev,
      [category]: [...prev[category], ...newImages]
    }));
    
    return newImages;
  };

  const removeUploadedImage = (category, imageId) => {
    setUploadedImages(prev => ({
      ...prev,
      [category]: prev[category].filter(img => img.id !== imageId)
    }));
  };
  
  // Cart Functions
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  
  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };
  
  const updateCartQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(0, item.quantity + delta);
        return newQty === 0 ? null : { ...item, quantity: newQty };
      }
      return item;
    }).filter(Boolean));
  };
  
  // Product Management
  const addProduct = (productData) => {
    const newProduct = {
      id: Date.now(),
      ...productData,
      vendor: 'Your Store',
      inStock: true
    };
    setVendorProducts(prev => [...prev, newProduct]);
  };
  
  const deleteProduct = (productId) => {
    setVendorProducts(prev => prev.filter(p => p.id !== productId));
  };
  
  // Event Management
  const addEvent = (eventData) => {
    const newEvent = {
      id: Date.now(),
      ...eventData,
      attendees: 0
    };
    setEvents(prev => [...prev, newEvent]);
  };

  // Beauty Treatments Options
  const beautyTreatments = {
    'Hair Services': [
      { id: 'haircut', name: 'Haircut & Styling' },
      { id: 'color', name: 'Hair Color' },
      { id: 'blowout', name: 'Blowout' },
      { id: 'treatment', name: 'Hair Treatment' }
    ],
    'Spa & Massage': [
      { id: 'swedish', name: 'Swedish Massage' },
      { id: 'deep-tissue', name: 'Deep Tissue Massage' },
      { id: 'hot-stone', name: 'Hot Stone Massage' },
      { id: 'aromatherapy', name: 'Aromatherapy' },
      { id: 'couples-massage', name: 'Couples Massage' }
    ],
    'Facial & Skincare': [
      { id: 'facial', name: 'Classic Facial' },
      { id: 'chemical-peel', name: 'Chemical Peel' },
      { id: 'microdermabrasion', name: 'Microdermabrasion' },
      { id: 'hydrafacial', name: 'HydraFacial' }
    ],
    'Wellness': [
      { id: 'yoga', name: 'Yoga Session' },
      { id: 'meditation', name: 'Meditation Class' },
      { id: 'therapy', name: 'Therapy/Counseling' }
    ],
    'Beauty Services': [
      { id: 'manicure', name: 'Manicure' },
      { id: 'pedicure', name: 'Pedicure' },
      { id: 'makeup', name: 'Makeup Application' }
    ]
  };

  // Entertainment Options
  const entertainmentOptions = {
    'Live Music': [
      { id: 'jazz', name: 'Jazz' },
      { id: 'blues', name: 'Blues' },
      { id: 'classical', name: 'Classical' },
      { id: 'rock', name: 'Rock/Indie' }
    ],
    'Performing Arts': [
      { id: 'comedy', name: 'Comedy Show' },
      { id: 'theater', name: 'Theater/Play' },
      { id: 'musical', name: 'Musical' },
      { id: 'opera', name: 'Opera' }
    ],
    'Activities': [
      { id: 'movie', name: 'Movie Theater' },
      { id: 'art-gallery', name: 'Art Gallery' },
      { id: 'museum', name: 'Museum' },
      { id: 'wine-tasting', name: 'Wine Tasting' }
    ],
    'Nightlife': [
      { id: 'lounge', name: 'Lounge/Bar' },
      { id: 'cocktail-bar', name: 'Cocktail Bar' },
      { id: 'speakeasy', name: 'Speakeasy' }
    ]
  };

  const toggleBeautyTreatment = (treatmentId) => {
    setSelectedBeautyTreatments(prev => 
      prev.includes(treatmentId)
        ? prev.filter(id => id !== treatmentId)
        : [...prev, treatmentId]
    );
  };

  const toggleEntertainment = (entertainmentId) => {
    setSelectedEntertainment(prev =>
      prev.includes(entertainmentId)
        ? prev.filter(id => id !== entertainmentId)
        : [...prev, entertainmentId]
    );
  };

  // LOGIN SCREEN
  const LoginScreen = () => (
    <div className="min-h-screen bg-white">
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-black rounded-full mb-6">
              <span className="text-white text-3xl">👋</span>
            </div>
            <h1 className="text-5xl font-light text-black tracking-tight mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              HEY NEIGHBOUR
            </h1>
            <p className="text-gray-600 text-sm tracking-wide uppercase" style={{ letterSpacing: '0.1em' }}>
              Your Community Event Platform
            </p>
            <p className="text-xs text-gray-500 mt-2">BETA v1.0</p>
          </div>

          {/* Navigation Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => { setUserType('attendee'); setCurrentView('home'); }}
              className="w-full bg-black text-white py-4 px-6 font-light tracking-wide uppercase text-sm hover:bg-gray-800 transition"
            >
              Sign in as Attendee
            </button>
            
            <button
              onClick={() => { setUserType('vendor'); setCurrentView('vendor-dashboard'); }}
              className="w-full bg-black text-white py-4 px-6 font-light tracking-wide uppercase text-sm hover:bg-gray-800 transition"
            >
              Sign in as Vendor
            </button>
            
            <button
              onClick={() => { setUserType('host'); setCurrentView('host-dashboard'); }}
              className="w-full bg-black text-white py-4 px-6 font-light tracking-wide uppercase text-sm hover:bg-gray-800 transition"
            >
              Sign in as Event Host
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-xs text-gray-500 tracking-widest uppercase">Or continue with</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social Sign-In */}
          <div className="flex gap-3">
            <button className="flex-1 border border-gray-300 py-3 px-4 hover:border-black transition flex items-center justify-center gap-2">
              <span className="font-semibold text-sm">Google</span>
            </button>
            <button className="flex-1 border border-gray-300 py-3 px-4 hover:border-black transition flex items-center justify-center gap-2">
              <span className="font-semibold text-sm">Apple</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // HOME PAGE (ATTENDEE)
  const AttendeeHome = () => (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-light" style={{ fontFamily: 'Georgia, serif' }}>HEY NEIGHBOUR</h1>
            <p className="text-gray-400 text-xs uppercase tracking-wide">Beta v1.0</p>
          </div>
          <div className="flex gap-3">
            <Bell size={20} />
            <User size={20} onClick={() => setCurrentView('profile')} className="cursor-pointer" />
          </div>
        </div>
        <h2 className="text-xl font-light">Where Are We Going This Summer?</h2>
      </div>

      {/* Featured Event */}
      <div className="px-6 py-8">
        <h2 className="text-sm tracking-widest uppercase text-gray-500 mb-4">Featured</h2>
        <div className="relative overflow-hidden cursor-pointer group" onClick={() => {
          setSelectedEvent(events[0]);
          setCurrentView('event-detail');
        }}>
          <img
            src={events[0].bannerUrl}
            alt={events[0].name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white text-2xl font-light mb-1" style={{ fontFamily: 'Georgia, serif' }}>{events[0].name}</h3>
            <p className="text-white/80 text-sm">{events[0].description}</p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['All', 'Music', 'Food', 'Art', 'Nightlife', 'Networking'].map((cat, idx) => (
            <button
              key={idx}
              className={`flex-shrink-0 px-4 py-2 text-xs tracking-wide border transition ${
                idx === 0 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-black border-gray-300 hover:border-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="px-6">
        <h2 className="text-sm tracking-widest uppercase text-gray-500 mb-4">Upcoming Events</h2>
        <div className="space-y-4">
          {events.map(event => (
            <div
              key={event.id}
              onClick={() => { setSelectedEvent(event); setCurrentView('event-detail'); }}
              className="border border-gray-200 overflow-hidden cursor-pointer hover:border-black transition group"
            >
              <div className="flex">
                <div className="relative w-40 h-40 flex-shrink-0 overflow-hidden bg-gray-100">
                  <img
                    src={event.bannerUrl}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-light text-xl text-black mb-2" style={{ fontFamily: 'Georgia, serif' }}>{event.name}</h3>
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                      <Calendar size={12} />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <MapPin size={12} />
                      {event.location}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <span className="text-lg font-light">${event.price}</span>
                    <span className="text-xs text-gray-500">{event.attendees} attending</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex justify-around">
          {[
            { icon: Calendar, label: 'Events', active: true, view: 'home' },
            { icon: Heart, label: 'Date Night', active: false, view: 'date-night' },
            { icon: ShoppingBag, label: 'Shop', active: false, view: 'shop' },
            { icon: User, label: 'Profile', active: false, view: 'profile' }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="text-center cursor-pointer group"
              onClick={() => item.view && setCurrentView(item.view)}
            >
              <item.icon
                size={20}
                strokeWidth={1.5}
                className={`mx-auto mb-1 ${item.active ? 'text-black' : 'text-gray-400 group-hover:text-black'} transition`}
              />
              <p className={`text-xs font-light ${item.active ? 'text-black' : 'text-gray-400 group-hover:text-black'}`}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // EVENT DETAIL PAGE
  const EventDetail = () => {
    if (!selectedEvent) return null;

    return (
      <div className="min-h-screen bg-white pb-24">
        {/* Banner */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={selectedEvent.bannerUrl}
            alt={selectedEvent.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
          
          <button
            onClick={() => setCurrentView('home')}
            className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-8">
          <h1 className="text-3xl font-light text-black mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            {selectedEvent.name}
          </h1>
          <p className="text-gray-600 mb-6">{selectedEvent.description}</p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-gray-400" />
              <span>{selectedEvent.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-gray-400" />
              <span>{selectedEvent.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <User size={20} className="text-gray-400" />
              <span>{selectedEvent.attendees} people attending</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 bg-black text-white py-4 text-sm tracking-wide uppercase hover:bg-gray-800 transition">
              Buy Ticket - ${selectedEvent.price}
            </button>
            <button className="bg-gray-100 text-black px-6 py-4 hover:bg-gray-200 transition">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // DATE NIGHT PAGE
  const DateNightPage = () => (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="relative border-b border-gray-200 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200" 
            alt="Date Night"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <button onClick={() => setCurrentView('home')} className="text-gray-600 hover:text-black">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
              
              <div>
                <h1 className="text-3xl font-light text-black" style={{ fontFamily: 'Georgia, serif' }}>
                  Date Night
                </h1>
                <p className="text-gray-500 text-xs tracking-wide uppercase mt-1">Plan Your Perfect Evening</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        {/* Banner */}
        <div className="mb-8 border border-gray-200 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200"
            alt="Romantic Dinner"
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Budget Slider */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-light text-black" style={{ fontFamily: 'Georgia, serif' }}>
              What's Your Budget?
            </h2>
            <span className="text-2xl font-light text-black" style={{ fontFamily: 'Georgia, serif' }}>
              ${budget}
            </span>
          </div>
          <input
            type="range"
            min="20"
            max="500"
            value={budget}
            onChange={(e) => setBudget(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>$20</span>
            <span>$500</span>
          </div>
        </div>

        {/* Celebration Type */}
        <div className="mb-8">
          <h2 className="text-2xl font-light text-black mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            What Are We Celebrating?
          </h2>
          <select
            value={celebration}
            onChange={(e) => setCelebration(e.target.value)}
            className="w-full px-4 py-4 border border-gray-300 text-black bg-white focus:outline-none focus:border-black transition text-lg"
          >
            <option value="">Select an Occasion...</option>
            <option value="quick-meeting">Just A Quick Meeting</option>
            <option value="solo">Solo Date</option>
            <option value="self-care">Self Care</option>
            <option value="first-date">1st Date</option>
            <option value="anniversary">Anniversary</option>
            <option value="birthday">Birthday</option>
            <option value="just-because">Just Because</option>
          </select>
        </div>

        {/* Cuisine */}
        <div className="mb-8">
          <h2 className="text-xl font-light text-black mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Cuisine Preference
          </h2>
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="w-full px-4 py-4 border border-gray-300 text-black bg-white focus:outline-none focus:border-black transition"
          >
            <option value="">Any Cuisine</option>
            <option value="italian">Italian</option>
            <option value="french">French</option>
            <option value="japanese">Japanese</option>
            <option value="mexican">Mexican</option>
            <option value="indian">Indian</option>
            <option value="thai">Thai</option>
          </select>
        </div>

        {/* Beauty Treatments (for Solo/Self-Care) */}
        {(celebration === 'solo' || celebration === 'self-care') && (
          <div className="mb-8">
            <h2 className="text-xl font-light text-black mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Beauty & Wellness Treatments
            </h2>
            <p className="text-xs text-gray-500 mb-4">Select multiple treatments</p>
            
            <div className="border border-gray-300 max-h-96 overflow-y-auto">
              {Object.entries(beautyTreatments).map(([category, treatments]) => (
                <div key={category} className="border-b border-gray-200 last:border-b-0">
                  <div className="bg-gray-50 px-4 py-2">
                    <p className="text-xs tracking-widest uppercase text-gray-600 font-semibold">
                      {category}
                    </p>
                  </div>
                  <div className="p-2">
                    {treatments.map(treatment => (
                      <label 
                        key={treatment.id}
                        className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50 transition"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBeautyTreatments.includes(treatment.id)}
                          onChange={() => toggleBeautyTreatment(treatment.id)}
                          className="w-4 h-4 accent-black mr-3"
                        />
                        <span className="text-sm text-black font-light">{treatment.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {selectedBeautyTreatments.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedBeautyTreatments.map(id => {
                  const treatment = Object.values(beautyTreatments).flat().find(t => t.id === id);
                  return (
                    <span key={id} className="bg-black text-white px-3 py-1 text-xs rounded-full flex items-center gap-2">
                      {treatment?.name}
                      <button onClick={() => toggleBeautyTreatment(id)}>×</button>
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Entertainment */}
        <div className="mb-8">
          <h2 className="text-xl font-light text-black mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Entertainment Options
          </h2>
          <p className="text-xs text-gray-500 mb-4">Select multiple activities</p>
          
          <div className="border border-gray-300 max-h-96 overflow-y-auto">
            {Object.entries(entertainmentOptions).map(([category, options]) => (
              <div key={category} className="border-b border-gray-200 last:border-b-0">
                <div className="bg-gray-50 px-4 py-2">
                  <p className="text-xs tracking-widest uppercase text-gray-600 font-semibold">
                    {category}
                  </p>
                </div>
                <div className="p-2">
                  {options.map(option => (
                    <label 
                      key={option.id}
                      className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50 transition"
                    >
                      <input
                        type="checkbox"
                        checked={selectedEntertainment.includes(option.id)}
                        onChange={() => toggleEntertainment(option.id)}
                        className="w-4 h-4 accent-black mr-3"
                      />
                      <span className="text-sm text-black font-light">{option.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {selectedEntertainment.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedEntertainment.map(id => {
                const entertainment = Object.values(entertainmentOptions).flat().find(e => e.id === id);
                return (
                  <span key={id} className="bg-black text-white px-3 py-1 text-xs rounded-full flex items-center gap-2">
                    {entertainment?.name}
                    <button onClick={() => toggleEntertainment(id)}>×</button>
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Suggestions */}
        {celebration && (
          <div className="border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-light text-black mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Your Curated Experience
            </h3>
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-6">
                <p className="text-xs tracking-widest uppercase text-gray-500 mb-2">Dining</p>
                <div className="aspect-video overflow-hidden bg-gray-100 mb-3">
                  <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600" alt="Restaurant" className="w-full h-full object-cover" />
                </div>
                <h4 className="text-lg font-light text-black mb-2">The Garden Bistro</h4>
                <p className="text-sm text-gray-600 mb-2">Contemporary dining with seasonal menu</p>
                <p className="text-black font-light mb-3">Estimated: ${Math.floor(budget * 0.6)}</p>
                <button className="w-full bg-black text-white py-3 text-xs tracking-widest uppercase hover:bg-gray-800 transition">
                  Book Table
                </button>
              </div>

              <div>
                <p className="text-xs tracking-widest uppercase text-gray-500 mb-2">Entertainment</p>
                <div className="aspect-video overflow-hidden bg-gray-100 mb-3">
                  <img src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600" alt="Event" className="w-full h-full object-cover" />
                </div>
                <h4 className="text-lg font-light text-black mb-2">Jazz Under The Stars</h4>
                <p className="text-sm text-gray-600 mb-2">Live music at the waterfront</p>
                <p className="text-black font-light mb-3">Estimated: ${Math.floor(budget * 0.4)}</p>
                <button className="w-full bg-black text-white py-3 text-xs tracking-widest uppercase hover:bg-gray-800 transition">
                  Book Tickets
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Outfit Gallery */}
        <div className="border border-gray-200 p-6">
          <h3 className="text-xl font-light text-black mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Date Night Outfit Gallery
          </h3>
          <p className="text-sm text-gray-600 mb-4">Share your date night style inspiration</p>
          
          <label className="block">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                const uploaded = handleImageUpload('outfits', e.target.files);
                alert(`${uploaded.length} outfit photo(s) uploaded successfully!`);
              }}
            />
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6 hover:border-black transition cursor-pointer">
              <Camera size={40} className="text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 font-light mb-1">Upload your outfit photos</p>
              <p className="text-xs text-gray-500">Click to browse or drag and drop</p>
            </div>
          </label>

          <div className="grid grid-cols-3 gap-2">
            {uploadedImages.outfits.map(img => (
              <div key={img.id} className="relative aspect-square overflow-hidden bg-gray-100 group">
                <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                <button
                  onClick={() => removeUploadedImage('outfits', img.id)}
                  className="absolute top-2 right-2 bg-black/70 text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  ×
                </button>
              </div>
            ))}
            
            {uploadedImages.outfits.length === 0 && [1, 2, 3].map((idx) => (
              <div key={idx} className="aspect-square bg-gray-100 flex items-center justify-center">
                <Camera size={24} className="text-gray-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex justify-around">
          {[
            { icon: Calendar, label: 'Events', view: 'home' },
            { icon: Heart, label: 'Date Night', active: true },
            { icon: ShoppingBag, label: 'Shop', view: 'shop' },
            { icon: User, label: 'Profile', view: 'profile' }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="text-center cursor-pointer"
              onClick={() => item.view && setCurrentView(item.view)}
            >
              <item.icon size={20} className={item.active ? 'text-black' : 'text-gray-400'} />
              <p className={`text-xs ${item.active ? 'text-black' : 'text-gray-400'}`}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // SHOP PAGE
  const ShopPage = () => {
    const vendors = [
      { id: 1, name: 'Bean Scene', category: 'Coffee & Tea', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400' },
      { id: 2, name: 'Crafted Co.', category: 'Handmade Jewelry', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400' },
      { id: 3, name: 'Fresh Bites', category: 'Organic Snacks', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400' }
    ];

    return (
      <div className="min-h-screen bg-white pb-24">
        {/* Banner */}
        <div className="relative h-64 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200" alt="Shopping" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-light text-white" style={{ fontFamily: 'Georgia, serif' }}>Shop</h1>
          </div>
        </div>

        {/* Header */}
        <div className="border-b border-gray-200 bg-white">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => setCurrentView('home')} className="text-gray-600 hover:text-black">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
              <div className="relative cursor-pointer" onClick={() => setShowCart(true)}>
                <ShoppingBag size={20} className="text-gray-600" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </div>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search vendors, products..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {['All', 'Date Night', 'Concert Ready', 'Fashion', 'Food'].map((cat, idx) => (
                <button
                  key={idx}
                  className={`flex-shrink-0 px-4 py-2 text-xs border transition ${
                    idx === 0 ? 'bg-black text-white' : 'bg-white text-black border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="px-6 py-8">
          <h2 className="text-sm tracking-widest uppercase text-gray-500 mb-4">Featured Products</h2>
          <div className="grid grid-cols-2 gap-4">
            {vendorProducts.map(product => (
              <div key={product.id} className="border border-gray-200 overflow-hidden group">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                </div>
                <div className="p-4">
                  <h3 className="font-light text-black mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{product.vendor}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-light">${product.price}</span>
                    <span className="text-xs text-green-600">{product.inStock ? 'In Stock' : 'Out'}</span>
                  </div>
                  <button 
                    onClick={() => {
                      addToCart(product);
                      alert(`Added ${product.name} to cart!`);
                    }}
                    className="w-full bg-black text-white py-2 text-xs uppercase hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Modal */}
        {showCart && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
            <div className="bg-white w-full max-w-2xl rounded-t-3xl max-h-[80vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-6 flex justify-between">
                <h2 className="text-2xl font-light" style={{ fontFamily: 'Georgia, serif' }}>Cart ({cart.length})</h2>
                <button onClick={() => setShowCart(false)} className="text-gray-600">✕</button>
              </div>
              <div className="p-6">
                {cart.length === 0 ? (
                  <p className="text-center text-gray-600 py-12">Cart is empty</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className="border p-4 flex gap-4 mb-3">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                        <div className="flex-1">
                          <h3 className="font-light">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.vendor}</p>
                          <p className="text-lg font-light">${item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button 
                              onClick={() => updateCartQuantity(item.id, -1)}
                              className="w-6 h-6 border border-gray-300 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button 
                              onClick={() => updateCartQuantity(item.id, 1)}
                              className="w-6 h-6 border border-gray-300 flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                    <div className="border p-6 my-6">
                      <h3 className="mb-4 font-light">Fulfillment</h3>
                      <label className="flex p-3 border mb-3 cursor-pointer">
                        <input type="radio" name="fulfillment" defaultChecked className="mr-3" />
                        <div><p className="font-light">Pickup</p><p className="text-xs text-gray-600">Schedule from vendors</p></div>
                      </label>
                      <label className="flex p-3 border mb-3 cursor-pointer">
                        <input type="radio" name="fulfillment" className="mr-3" />
                        <div><p className="font-light">Delivery</p><p className="text-xs text-gray-600">Combined delivery</p></div>
                      </label>
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <input type="date" className="px-4 py-2 border focus:border-black" />
                        <input type="time" className="px-4 py-2 border focus:border-black" />
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span className="font-light">${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
                      </div>
                      <button className="w-full bg-black text-white py-4 uppercase hover:bg-gray-800 transition">
                        Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Nav */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-4">
          <div className="flex justify-around">
            {[
              { icon: Calendar, label: 'Events', view: 'home' },
              { icon: Heart, label: 'Date Night', view: 'date-night' },
              { icon: ShoppingBag, label: 'Shop', active: true },
              { icon: User, label: 'Profile', view: 'profile' }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="text-center cursor-pointer"
                onClick={() => item.view && setCurrentView(item.view)}
              >
                <item.icon size={20} className={item.active ? 'text-black' : 'text-gray-400'} />
                <p className={`text-xs ${item.active ? 'text-black' : 'text-gray-400'}`}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // PROFILE PAGE
  const ProfilePage = () => (
    <div className="min-h-screen bg-white pb-24">
      <div className="relative border-b border-gray-200 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=1200" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="relative p-6">
          <div className="flex justify-between items-center">
            <button onClick={() => setCurrentView('home')} className="text-gray-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <h1 className="text-3xl font-light text-black" style={{ fontFamily: 'Georgia, serif' }}>Profile</h1>
            <div className="w-5"></div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4 overflow-hidden">
            {uploadedImages.profilePics.length > 0 ? (
              <img 
                src={uploadedImages.profilePics[uploadedImages.profilePics.length - 1].url} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={48} className="text-gray-400" />
            )}
          </div>
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                handleImageUpload('profilePics', e.target.files);
                alert('Profile picture uploaded!');
              }}
            />
            <span className="text-sm font-light uppercase text-black hover:underline">
              Change Photo
            </span>
          </label>
        </div>

        {/* Personal Info */}
        <div className="border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-light text-black mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Personal Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase text-gray-500 mb-2">Full Name</label>
              <input
                type="text"
                value={userProfile.name}
                onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-500 mb-2">Email</label>
              <input
                type="email"
                value={userProfile.email}
                onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                placeholder="john@example.com"
                className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-500 mb-2">Phone</label>
              <input
                type="tel"
                value={userProfile.phone}
                onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-light text-black" style={{ fontFamily: 'Georgia, serif' }}>
              Payment Methods
            </h2>
            <button className="text-xs uppercase text-black hover:underline">Add New</button>
          </div>
          <div className="space-y-3">
            {paymentMethods.map(method => (
              <div key={method.id} className="border p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard size={20} />
                  <div>
                    <p>•••• •••• •••• {method.last4}</p>
                    <p className="text-xs text-gray-500">Expires {method.expiry}</p>
                  </div>
                </div>
                <input 
                  type="radio" 
                  name="payment" 
                  checked={method.isDefault}
                  onChange={() => {
                    setPaymentMethods(paymentMethods.map(m => ({
                      ...m,
                      isDefault: m.id === method.id
                    })));
                  }}
                  className="accent-black" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button 
            onClick={() => {
              setCurrentView('login');
              setUserType(null);
            }}
            className="w-full bg-white text-black py-3 text-xs uppercase border border-gray-300 hover:border-black transition"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-4">
        <div className="flex justify-around">
          {[
            { icon: Calendar, label: 'Events', view: 'home' },
            { icon: Heart, label: 'Date Night', view: 'date-night' },
            { icon: ShoppingBag, label: 'Shop', view: 'shop' },
            { icon: User, label: 'Profile', active: true }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="text-center cursor-pointer"
              onClick={() => item.view && setCurrentView(item.view)}
            >
              <item.icon size={20} className={item.active ? 'text-black' : 'text-gray-400'} />
              <p className={`text-xs ${item.active ? 'text-black' : 'text-gray-400'}`}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // VENDOR DASHBOARD
  const VendorDashboard = () => {
    const [newProduct, setNewProduct] = useState({
      name: '',
      price: '',
      link: '',
      category: ''
    });

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="relative bg-black text-white shadow-lg overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200" alt="Store" className="w-full h-full object-cover" />
          </div>
          <div className="relative p-6">
            <button onClick={() => setCurrentView('login')} className="absolute top-6 left-4 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-center">Vendor Dashboard</h1>
            <p className="text-gray-300 text-center text-sm">Manage your products & sales</p>
          </div>
        </div>

        <div className="p-6">
          {/* Add Product */}
          <div className="bg-black rounded-2xl shadow-lg p-6 mb-6 text-white">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <ShoppingBag size={20} />
              Add New Product
            </h3>
            
            <div className="space-y-3 mb-4">
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                className="w-full px-4 py-2 rounded-lg text-black"
              />
              <input
                type="number"
                placeholder="Price ($)"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                className="w-full px-4 py-2 rounded-lg text-black"
              />
              <input
                type="url"
                placeholder="Product Page Link"
                value={newProduct.link}
                onChange={(e) => setNewProduct({...newProduct, link: e.target.value})}
                className="w-full px-4 py-2 rounded-lg text-black"
              />
              
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    handleImageUpload('products', e.target.files);
                  }}
                />
                <div className="border-2 border-dashed border-white/30 rounded-lg p-4 text-center hover:border-white/60 cursor-pointer">
                  <Camera size={24} className="text-white/70 mx-auto mb-2" />
                  <p className="text-sm text-white/80">Upload Product Images</p>
                </div>
              </label>
              
              {uploadedImages.products.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {uploadedImages.products.slice(-3).map(img => (
                    <div key={img.id} className="relative w-16 h-16 group">
                      <img src={img.url} alt={img.name} className="w-full h-full object-cover rounded" />
                      <button
                        onClick={() => removeUploadedImage('products', img.id)}
                        className="absolute -top-1 -right-1 bg-white text-black w-5 h-5 rounded-full text-xs opacity-0 group-hover:opacity-100"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              onClick={() => {
                if (newProduct.name && newProduct.price) {
                  addProduct({
                    ...newProduct,
                    price: parseFloat(newProduct.price),
                    image: uploadedImages.products.length > 0 
                      ? uploadedImages.products[uploadedImages.products.length - 1].url
                      : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
                  });
                  setNewProduct({ name: '', price: '', link: '', category: '' });
                  alert('Product added successfully!');
                }
              }}
              className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 w-full"
            >
              Add Product
            </button>
          </div>

          {/* Product List */}
          <h2 className="text-xl font-bold mb-4">Your Products</h2>
          <div className="space-y-3">
            {vendorProducts.map(product => (
              <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="flex">
                  <div className="w-24 h-24 flex-shrink-0 bg-gray-100">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.vendor}</p>
                      {product.link && (
                        <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                          View Product →
                        </a>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-black text-lg">${product.price}</p>
                      <span className={`text-xs ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                        {product.inStock ? 'In Stock' : 'Out'}
                      </span>
                      <div className="flex gap-2 mt-2">
                        <button 
                          onClick={() => deleteProduct(product.id)}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // HOST DASHBOARD
  const HostDashboard = () => {
    const [newEvent, setNewEvent] = useState({
      name: '',
      date: '',
      location: '',
      price: '',
      description: ''
    });

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="relative bg-black text-white shadow-lg overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <img src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1200" alt="Event" className="w-full h-full object-cover" />
          </div>
          <div className="relative p-6">
            <button onClick={() => setCurrentView('login')} className="absolute top-6 left-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-center">Event Host Portal</h1>
            <p className="text-gray-300 text-center text-sm">Create & manage your events</p>
          </div>
        </div>

        <div className="p-6">
          {/* Banner Upload */}
          <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Camera size={24} />
              Event Banner
            </h3>
            <label className="block">
              <input
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => {
                  handleImageUpload('banners', e.target.files);
                  alert('Banner uploaded!');
                }}
              />
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-4 hover:border-black cursor-pointer">
                <div className="text-4xl mb-3">🎬</div>
                <p className="text-gray-600 font-semibold mb-1">Upload event banner</p>
                <p className="text-xs text-gray-500">MP4, MOV, PNG, JPG up to 50MB</p>
              </div>
            </label>
            
            {uploadedImages.banners.length > 0 && (
              <div className="space-y-2 mb-4">
                {uploadedImages.banners.slice(-2).map(img => (
                  <div key={img.id} className="relative border rounded-lg overflow-hidden">
                    <img src={img.url} alt={img.name} className="w-full h-32 object-cover" />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <span className="bg-black/70 text-white px-2 py-1 text-xs rounded">{img.name}</span>
                      <button
                        onClick={() => removeUploadedImage('banners', img.id)}
                        className="bg-red-600 text-white w-6 h-6 rounded"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Playlist Links */}
          <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              🎵 Event Playlist
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Spotify Playlist URL"
                value={playlists.spotify}
                onChange={(e) => setPlaylists({...playlists, spotify: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl focus:border-black"
              />
              <input
                type="text"
                placeholder="Apple Music URL"
                value={playlists.apple}
                onChange={(e) => setPlaylists({...playlists, apple: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl focus:border-black"
              />
              <input
                type="text"
                placeholder="YouTube Playlist URL"
                value={playlists.youtube}
                onChange={(e) => setPlaylists({...playlists, youtube: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl focus:border-black"
              />
            </div>
            <button className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 w-full mt-4">
              Save Playlist Links
            </button>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              📱 Fashion Inspiration
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Instagram Post URL</label>
                <input
                  type="url"
                  placeholder="https://instagram.com/p/..."
                  value={socialMediaLinks.instagram}
                  onChange={(e) => setSocialMediaLinks({...socialMediaLinks, instagram: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Pinterest Board</label>
                <input
                  type="url"
                  placeholder="https://pinterest.com/..."
                  value={socialMediaLinks.pinterest}
                  onChange={(e) => setSocialMediaLinks({...socialMediaLinks, pinterest: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Hashtags</label>
                <input
                  type="text"
                  placeholder="#EventFashion #SummerStyle"
                  value={socialMediaLinks.hashtags}
                  onChange={(e) => setSocialMediaLinks({...socialMediaLinks, hashtags: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:border-black"
                />
              </div>
            </div>
            <button className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 w-full mt-4">
              Connect Social Feeds
            </button>
          </div>

          {/* Fashion Gallery */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Sparkles className="text-pink-500" />
              Fashion Inspiration Gallery
            </h3>
            <label className="block">
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  handleImageUpload('fashion', e.target.files);
                  alert('Fashion photos uploaded!');
                }}
              />
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-4 hover:border-pink-400 cursor-pointer">
                <Camera size={40} className="text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 font-semibold mb-1">Upload fashion inspiration</p>
                <p className="text-xs text-gray-500">Multiple images supported</p>
              </div>
            </label>
            
            {uploadedImages.fashion.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                {uploadedImages.fashion.map(img => (
                  <div key={img.id} className="relative aspect-square overflow-hidden rounded-lg group">
                    <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeUploadedImage('fashion', img.id)}
                      className="absolute top-1 right-1 bg-black/70 text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg w-full">
              Upload Fashion Photos ({uploadedImages.fashion.length})
            </button>
          </div>
        </div>
      </div>
    );
  };

  // RENDER
  if (currentView === 'login') return <LoginScreen />;
  if (currentView === 'home') return <AttendeeHome />;
  if (currentView === 'event-detail') return <EventDetail />;
  if (currentView === 'date-night') return <DateNightPage />;
  if (currentView === 'shop') return <ShopPage />;
  if (currentView === 'profile') return <ProfilePage />;
  if (currentView === 'vendor-dashboard') return <VendorDashboard />;
  if (currentView === 'host-dashboard') return <HostDashboard />;

  return <LoginScreen />;
};

export default HeyNeighbourBeta;
