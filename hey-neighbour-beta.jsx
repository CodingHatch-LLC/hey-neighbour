import React, { useState } from 'react';
import { Calendar, Bell, ShoppingBag, Camera, Sparkles, User, CreditCard, MapPin, Heart, Share2, Search, X, Plus, Trash2, Edit } from 'lucide-react';

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
// Palette: Deep Plum + Warm Amber + Blush Cream
// Feel: Upscale community app, editorial warmth, boutique vibes

const HeyNeighbourBeta = () => {
  const [userType, setUserType] = useState(null);
  const [currentView, setCurrentView] = useState('login');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [uploadedImages, setUploadedImages] = useState({
    outfits: [], products: [], banners: [], fashion: [], restaurants: [], profilePics: []
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const [events, setEvents] = useState([
    // Music (3)
    { id: 1, name: 'Summer Nights Festival', date: 'Jul 15, 2026', location: 'Downtown Park', price: 85, bannerUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200', category: 'Music', description: 'Three days of incredible live music under the stars', attendees: 245 },
    { id: 2, name: 'Jazz & Soul Evening', date: 'Jul 22, 2026', location: 'The Blue Room', price: 55, bannerUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200', category: 'Music', description: 'An intimate evening of jazz and soul with local legends', attendees: 130 },
    { id: 3, name: 'Rooftop DJ Night', date: 'Aug 8, 2026', location: 'Sky Lounge', price: 40, bannerUrl: 'public/images/music.jpeg', category: 'Music', description: 'Dance the night away under the stars with top DJs', attendees: 310 },
    // Food (3)
    { id: 4, name: 'Food & Wine Gala', date: 'Aug 2, 2026', location: 'Waterfront Venue', price: 120, bannerUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200', category: 'Food', description: 'Premium wines and gourmet cuisine from local chefs', attendees: 180 },
    { id: 5, name: 'Street Food Festival', date: 'Aug 10, 2026', location: 'City Square', price: 15, bannerUrl: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=1200', category: 'Food', description: 'Over 50 vendors serving global street food delights', attendees: 620 },
    { id: 6, name: 'Farm to Table Dinner', date: 'Aug 20, 2026', location: 'Green Acres Farm', price: 95, bannerUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200', category: 'Food', description: 'A sustainable dining experience with local farmers', attendees: 60 },
    // Art (3)
    { id: 7, name: 'Art Exhibition Opening', date: 'Jul 28, 2026', location: 'City Gallery', price: 45, bannerUrl: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=1200', category: 'Art', description: 'Contemporary art from emerging local artists', attendees: 95 },
    { id: 9, name: 'Pottery & Ceramics Fair', date: 'Aug 15, 2026', location: 'Craft Studio', price: 30, bannerUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200', category: 'Art', description: 'Local ceramicists showcase and sell their finest work', attendees: 75 },
    // Nightlife (3)
    { id: 10, name: 'Neon Glow Party', date: 'Jul 19, 2026', location: 'Club Orbit', price: 35, bannerUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200', category: 'Nightlife', description: 'UV paint, neon lights and electric vibes all night long', attendees: 400 },
    { id: 11, name: 'Speakeasy Cocktail Night', date: 'Aug 1, 2026', location: 'The Hidden Bar', price: 50, bannerUrl: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200', category: 'Nightlife', description: 'Craft cocktails in a secret 1920s-style speakeasy venue', attendees: 80 },
    { id: 12, name: 'Rooftop Wine & Stars', date: 'Aug 18, 2026', location: 'The Terrace', price: 65, bannerUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200', category: 'Nightlife', description: 'Sip premium wines while gazing at the city skyline', attendees: 120 },
    // Networking (3)
    { id: 13, name: 'Creative Founders Mixer', date: 'Jul 24, 2026', location: 'The Co-Lab', price: 25, bannerUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200', category: 'Networking', description: 'Connect with creative entrepreneurs and founders', attendees: 150 },
    { id: 14, name: 'Women in Business Brunch', date: 'Aug 7, 2026', location: 'The Ivy Room', price: 40, bannerUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200', category: 'Networking', description: 'Inspiring conversations over brunch with local leaders', attendees: 90 },
    { id: 15, name: 'Tech & Innovation Summit', date: 'Aug 22, 2026', location: 'Innovation Hub', price: 75, bannerUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200', category: 'Networking', description: 'Explore the future of tech with industry pioneers', attendees: 280 },
  ]);

  const [vendorProducts, setVendorProducts] = useState([
    { id: 1, name: 'Artisan Coffee Blend', price: 18, vendor: 'Bean Scene', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400', link: 'https://example.com/coffee', inStock: true, category: 'Food & Beverage' },
    { id: 2, name: 'Handmade Jewelry Set', price: 65, vendor: 'Crafted Co.', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400', link: 'https://example.com/jewelry', inStock: true, category: 'Fashion' }
  ]);

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [budget, setBudget] = useState(150);
  const [celebration, setCelebration] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedBeautyTreatments, setSelectedBeautyTreatments] = useState([]);
  const [selectedEntertainment, setSelectedEntertainment] = useState([]);
  const [playlists, setPlaylists] = useState({ spotify: '', apple: '', youtube: '' });
  const [socialMediaLinks, setSocialMediaLinks] = useState({ instagram: '', facebook: '', twitter: '', pinterest: '', hashtags: '' });
  const [userProfile, setUserProfile] = useState({ name: '', email: '', phone: '', location: '' });
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, last4: '4242', expiry: '12/25', isDefault: true },
    { id: 2, last4: '8888', expiry: '09/26', isDefault: false }
  ]);

  const handleImageUpload = (category, files) => {
    const fileArray = Array.from(files);
    const newImages = fileArray.map(file => ({ id: Date.now() + Math.random(), name: file.name, url: URL.createObjectURL(file), file, uploadedAt: new Date().toISOString() }));
    setUploadedImages(prev => ({ ...prev, [category]: [...prev[category], ...newImages] }));
    return newImages;
  };

  const removeUploadedImage = (category, imageId) => {
    setUploadedImages(prev => ({ ...prev, [category]: prev[category].filter(img => img.id !== imageId) }));
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => setCart(prev => prev.filter(item => item.id !== productId));

  const updateCartQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) { const newQty = Math.max(0, item.quantity + delta); return newQty === 0 ? null : { ...item, quantity: newQty }; }
      return item;
    }).filter(Boolean));
  };

  const addProduct = (productData) => {
    setVendorProducts(prev => [...prev, { id: Date.now(), ...productData, vendor: 'Your Store', inStock: true }]);
  };

  const deleteProduct = (productId) => setVendorProducts(prev => prev.filter(p => p.id !== productId));

  const addEvent = (eventData) => setEvents(prev => [...prev, { id: Date.now(), ...eventData, attendees: 0 }]);

  const beautyTreatments = {
    'Hair Services': [{ id: 'haircut', name: 'Haircut & Styling' }, { id: 'color', name: 'Hair Color' }, { id: 'blowout', name: 'Blowout' }, { id: 'treatment', name: 'Hair Treatment' }],
    'Spa & Massage': [{ id: 'swedish', name: 'Swedish Massage' }, { id: 'deep-tissue', name: 'Deep Tissue Massage' }, { id: 'hot-stone', name: 'Hot Stone Massage' }, { id: 'aromatherapy', name: 'Aromatherapy' }, { id: 'couples-massage', name: 'Couples Massage' }],
    'Facial & Skincare': [{ id: 'facial', name: 'Classic Facial' }, { id: 'chemical-peel', name: 'Chemical Peel' }, { id: 'microdermabrasion', name: 'Microdermabrasion' }, { id: 'hydrafacial', name: 'HydraFacial' }],
    'Wellness': [{ id: 'yoga', name: 'Yoga Session' }, { id: 'meditation', name: 'Meditation Class' }, { id: 'therapy', name: 'Therapy/Counseling' }],
    'Beauty Services': [{ id: 'manicure', name: 'Manicure' }, { id: 'pedicure', name: 'Pedicure' }, { id: 'makeup', name: 'Makeup Application' }]
  };

  const entertainmentOptions = {
    'Live Music': [{ id: 'jazz', name: 'Jazz' }, { id: 'blues', name: 'Blues' }, { id: 'classical', name: 'Classical' }, { id: 'rock', name: 'Rock/Indie' }],
    'Performing Arts': [{ id: 'comedy', name: 'Comedy Show' }, { id: 'theater', name: 'Theater/Play' }, { id: 'musical', name: 'Musical' }, { id: 'opera', name: 'Opera' }],
    'Activities': [{ id: 'movie', name: 'Movie Theater' }, { id: 'art-gallery', name: 'Art Gallery' }, { id: 'museum', name: 'Museum' }, { id: 'wine-tasting', name: 'Wine Tasting' }],
    'Nightlife': [{ id: 'lounge', name: 'Lounge/Bar' }, { id: 'cocktail-bar', name: 'Cocktail Bar' }, { id: 'speakeasy', name: 'Speakeasy' }]
  };

  const toggleBeautyTreatment = (id) => setSelectedBeautyTreatments(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const toggleEntertainment = (id) => setSelectedEntertainment(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  // ─── SHARED STYLES ──────────────────────────────────────────────────────────
  const styles = {
    // Colors
    plum: '#2D1B4E',
    plumLight: '#3D2860',
    amber: '#E8A838',
    amberLight: '#F5C76E',
    blush: '#FDF6EE',
    coral: '#E85D3A',
    sage: '#7A9E7E',
    cream: '#FAF5ED',
    textDark: '#1A0E2E',
    textMid: '#6B5C7C',
    textLight: '#9B8FAD',
  };

  const BottomNav = ({ active }) => (
    <div style={{ background: styles.plum, borderTop: `1px solid ${styles.plumLight}` }}
      className="fixed bottom-0 left-0 right-0 px-6 py-3 z-40">
      <div className="flex justify-around max-w-lg mx-auto">
        {[
          { icon: Calendar, label: 'Events', view: 'home' },
          { icon: Heart, label: 'Date Night', view: 'date-night' },
          { icon: ShoppingBag, label: 'Shop', view: 'shop' },
          { icon: User, label: 'Profile', view: 'profile' }
        ].map((item) => (
          <button key={item.label} onClick={() => setCurrentView(item.view)}
            className="flex flex-col items-center gap-1 transition-all"
            style={{ opacity: active === item.view ? 1 : 0.5 }}>
            <div style={{
              background: active === item.view ? styles.amber : 'transparent',
              borderRadius: '12px',
              padding: '6px 14px',
              transition: 'all 0.2s'
            }}>
              <item.icon size={18} color={active === item.view ? styles.plum : 'white'} strokeWidth={1.8} />
            </div>
            <span style={{ fontSize: '10px', color: active === item.view ? styles.amber : 'rgba(255,255,255,0.5)', fontWeight: active === item.view ? '600' : '400', letterSpacing: '0.05em' }}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  // ─── LOGIN SCREEN ────────────────────────────────────────────────────────────
  const LoginScreen = () => (
    <div style={{ background: `linear-gradient(160deg, ${styles.plum} 0%, #1A0E2E 60%, #0D0820 100%)`, minHeight: '100vh' }}
      className="flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">

      {/* Decorative orbs */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', background: `radial-gradient(circle, ${styles.amber}22 0%, transparent 70%)`, borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '250px', height: '250px', background: `radial-gradient(circle, ${styles.coral}18 0%, transparent 70%)`, borderRadius: '50%' }} />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-12">
          <div style={{ background: `linear-gradient(135deg, ${styles.amber}, ${styles.coral})`, borderRadius: '24px', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: `0 16px 48px ${styles.amber}44` }}>
            <span style={{ fontSize: '36px' }}>👋</span>
          </div>
          <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: '42px', fontWeight: '300', color: 'white', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '8px' }}>
            Hey<br /><span style={{ color: styles.amber }}>Neighbour</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Your Community Event Platform
          </p>
          <span style={{ display: 'inline-block', marginTop: '8px', background: `${styles.amber}22`, color: styles.amberLight, fontSize: '10px', letterSpacing: '0.1em', padding: '4px 10px', borderRadius: '20px', border: `1px solid ${styles.amber}44` }}>
            BETA v1.0
          </span>
        </div>

        {/* Sign in buttons */}
        <div className="space-y-3 mb-8">
          {[
            { label: 'Continue as Attendee', type: 'attendee', view: 'home', icon: '🎟️' },
            { label: 'Continue as Vendor', type: 'vendor', view: 'vendor-dashboard', icon: '🛍️' },
            { label: 'Continue as Event Host', type: 'host', view: 'host-dashboard', icon: '🎪' },
          ].map((btn) => (
            <button key={btn.type}
              onClick={() => { setUserType(btn.type); setCurrentView(btn.view); }}
              style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px', padding: '16px 20px', color: 'white', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s', backdropFilter: 'blur(8px)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = `${styles.amber}66`; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}>
              <span style={{ fontSize: '20px' }}>{btn.icon}</span>
              <span style={{ flex: 1, textAlign: 'left', fontSize: '14px', fontWeight: '500', letterSpacing: '0.02em' }}>{btn.label}</span>
              <span style={{ color: styles.amber, fontSize: '18px' }}>→</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.15)' }} />
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', letterSpacing: '0.1em' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.15)' }} />
        </div>

        <div className="flex gap-3">
          {['Google', 'Apple'].map(provider => (
            <button key={provider}
              style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px', color: 'white', fontSize: '13px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}>
              {provider === 'Google' ? '🔍' : '🍎'} {provider}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── ATTENDEE HOME ───────────────────────────────────────────────────────────
  const AttendeeHome = () => {
    const filteredEvents = events.filter(event => {
      const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
      const matchesSearch = searchQuery === '' ||
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    const featuredEvent = filteredEvents[0] || events[0];

    return (
    <div style={{ background: styles.cream, minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${styles.plum}, #1A0E2E)`, padding: '20px 24px 28px' }}>
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '22px', color: 'white', fontWeight: '300', letterSpacing: '-0.01em' }}>
              Hey <span style={{ color: styles.amber }}>Neighbour</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Beta v1.0</p>
          </div>
          <div className="flex gap-3 items-center">
            <button style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>
              <Bell size={16} color="white" />
            </button>
            <button onClick={() => setCurrentView('profile')}
              style={{ background: `linear-gradient(135deg, ${styles.amber}, ${styles.coral})`, borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>
              <User size={16} color="white" />
            </button>
          </div>
        </div>

        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '26px', color: 'white', fontWeight: '300', lineHeight: 1.2 }}>
          Where Are We Going<br />This Summer?
        </h2>

        {/* Search — FUNCTIONAL */}
        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '14px', padding: '4px 16px', display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px', border: '1px solid rgba(255,255,255,0.15)' }}>
          <Search size={16} color="rgba(255,255,255,0.5)" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, venues..."
            style={{ background: 'none', border: 'none', outline: 'none', color: 'white', fontSize: '14px', padding: '10px 0', flex: 1, caretColor: styles.amber }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: '16px' }}>×</button>
          )}
        </div>
      </div>

      {/* Categories — FUNCTIONAL */}
      <div style={{ padding: '20px 24px 0' }}>
        <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {['All', 'Music', 'Food', 'Art', 'Nightlife', 'Networking'].map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                flexShrink: 0, padding: '8px 18px', borderRadius: '50px', fontSize: '12px', fontWeight: '600',
                letterSpacing: '0.05em', cursor: 'pointer', transition: 'all 0.2s', border: 'none',
                background: isActive ? `linear-gradient(135deg, ${styles.amber}, ${styles.coral})` : 'white',
                color: isActive ? 'white' : styles.textMid,
                boxShadow: isActive ? `0 4px 12px ${styles.amber}44` : '0 2px 8px rgba(0,0,0,0.06)',
                transform: isActive ? 'scale(1.05)' : 'scale(1)'
              }}>
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Event */}
      {filteredEvents.length > 0 && (
      <div style={{ padding: '20px 24px 0' }}>
        <p style={{ color: styles.textLight, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: '600', marginBottom: '12px' }}>Featured</p>
        <div style={{ borderRadius: '20px', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 8px 32px rgba(45,27,78,0.15)', position: 'relative' }}
          onClick={() => { setSelectedEvent(featuredEvent); setCurrentView('event-detail'); }}>
          <img src={featuredEvent.bannerUrl} alt={featuredEvent.name} style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,14,46,0.85) 0%, transparent 50%)' }} />
          <div style={{ position: 'absolute', top: '16px', right: '16px', background: `${styles.amber}`, borderRadius: '20px', padding: '4px 12px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: styles.plum }}>{featuredEvent.category}</span>
          </div>
          <div style={{ position: 'absolute', bottom: 0, padding: '20px' }}>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '22px', color: 'white', fontWeight: '300', marginBottom: '6px' }}>{featuredEvent.name}</h3>
            <div className="flex items-center gap-3">
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>📅 {featuredEvent.date}</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>📍 {featuredEvent.location}</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span style={{ color: styles.amber, fontSize: '20px', fontWeight: '700' }}>{featuredEvent.price === 0 ? 'FREE' : `$${featuredEvent.price}`}</span>
              <span style={{ background: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '11px', padding: '4px 10px', borderRadius: '20px', backdropFilter: 'blur(8px)' }}>
                {featuredEvent.attendees} attending
              </span>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Upcoming Events */}
      <div style={{ padding: '24px 24px 0' }}>
        <div className="flex items-center justify-between mb-3">
          <p style={{ color: styles.textLight, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: '600' }}>
            {activeCategory === 'All' ? 'All Events' : activeCategory}
            <span style={{ marginLeft: '8px', background: `${styles.plum}15`, color: styles.plum, padding: '2px 8px', borderRadius: '20px', fontSize: '10px' }}>{filteredEvents.length}</span>
          </p>
        </div>

        {filteredEvents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 24px', background: 'white', borderRadius: '20px' }}>
            <p style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</p>
            <p style={{ color: styles.textMid, fontSize: '15px', fontWeight: '600' }}>No events found</p>
            <p style={{ color: styles.textLight, fontSize: '13px', marginTop: '4px' }}>Try a different search or category</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              style={{ marginTop: '16px', background: `linear-gradient(135deg, ${styles.plum}, ${styles.plumLight})`, color: 'white', padding: '10px 24px', borderRadius: '50px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
              Clear Filters
            </button>
          </div>
        ) : (
        <div className="space-y-3">
          {filteredEvents.map(event => (
            <div key={event.id}
              onClick={() => { setSelectedEvent(event); setCurrentView('event-detail'); }}
              style={{ background: 'white', borderRadius: '18px', overflow: 'hidden', cursor: 'pointer', display: 'flex', boxShadow: '0 2px 12px rgba(45,27,78,0.08)', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(45,27,78,0.15)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 12px rgba(45,27,78,0.08)'}>
              <img src={event.bannerUrl} alt={event.name} style={{ width: '100px', height: '100px', objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ padding: '14px 16px', flex: 1 }}>
                <div style={{ display: 'inline-block', background: `${styles.plum}15`, color: styles.plum, fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '10px', marginBottom: '6px', letterSpacing: '0.05em' }}>
                  {event.category}
                </div>
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '15px', color: styles.textDark, fontWeight: '400', marginBottom: '4px', lineHeight: 1.3 }}>{event.name}</h3>
                <p style={{ color: styles.textLight, fontSize: '11px', marginBottom: '4px' }}>📅 {event.date} · 📍 {event.location}</p>
                <div className="flex items-center justify-between mt-2">
                  <span style={{ color: styles.plum, fontSize: '16px', fontWeight: '700' }}>{event.price === 0 ? 'FREE' : `$${event.price}`}</span>
                  <span style={{ color: styles.textLight, fontSize: '11px' }}>{event.attendees} going</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>

      <BottomNav active="home" />
    </div>
    );
  };

  // ─── EVENT DETAIL ────────────────────────────────────────────────────────────
  const EventDetail = () => {
    if (!selectedEvent) return null;
    return (
      <div style={{ background: styles.cream, minHeight: '100vh', paddingBottom: '100px' }}>
        <div style={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
          <img src={selectedEvent.bannerUrl} alt={selectedEvent.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,14,46,0.9) 0%, transparent 50%)' }} />
          <button onClick={() => setCurrentView('home')}
            style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', color: 'white' }}>
            ←
          </button>
          <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px' }}>
            <span style={{ background: styles.amber, color: styles.plum, fontSize: '11px', fontWeight: '700', padding: '4px 12px', borderRadius: '20px' }}>{selectedEvent.category}</span>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: 'white', fontWeight: '300', marginTop: '8px', lineHeight: 1.2 }}>{selectedEvent.name}</h1>
          </div>
        </div>

        <div style={{ padding: '24px' }}>
          <p style={{ color: styles.textMid, fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>{selectedEvent.description}</p>

          <div style={{ background: 'white', borderRadius: '20px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 12px rgba(45,27,78,0.08)' }}>
            {[
              { icon: '📅', label: 'Date', value: selectedEvent.date },
              { icon: '📍', label: 'Location', value: selectedEvent.location },
              { icon: '👥', label: 'Attending', value: `${selectedEvent.attendees} people` }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 0', borderBottom: i < 2 ? '1px solid #f0eaf8' : 'none' }}>
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <div>
                  <p style={{ color: styles.textLight, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600' }}>{item.label}</p>
                  <p style={{ color: styles.textDark, fontSize: '14px', fontWeight: '500' }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button style={{ flex: 1, background: `linear-gradient(135deg, ${styles.plum}, ${styles.plumLight})`, color: 'white', padding: '18px', borderRadius: '16px', fontSize: '15px', fontWeight: '600', border: 'none', cursor: 'pointer', boxShadow: `0 8px 24px ${styles.plum}44` }}>
              Buy Ticket · ${selectedEvent.price}
            </button>
            <button style={{ background: 'white', padding: '18px', borderRadius: '16px', border: 'none', cursor: 'pointer', boxShadow: '0 2px 12px rgba(45,27,78,0.08)' }}>
              <Share2 size={20} color={styles.plum} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ─── DATE NIGHT PAGE ─────────────────────────────────────────────────────────
  const DateNightPage = () => (
    <div style={{ background: styles.cream, minHeight: '100vh', paddingBottom: '100px' }}>
      <div style={{ background: `linear-gradient(135deg, ${styles.coral}, #C0392B)`, padding: '24px 24px 32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
        <button onClick={() => setCurrentView('home')} style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', color: 'white', marginBottom: '16px' }}>←</button>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '34px', color: 'white', fontWeight: '300', lineHeight: 1.1 }}>Date<br />Night ✨</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginTop: '6px' }}>Plan Your Perfect Evening</p>
      </div>

      <div style={{ padding: '24px' }}>
        {/* Budget */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '22px', marginBottom: '16px', boxShadow: '0 2px 12px rgba(45,27,78,0.08)' }}>
          <div className="flex justify-between items-center mb-4">
            <p style={{ color: styles.textDark, fontSize: '16px', fontWeight: '600' }}>Your Budget</p>
            <span style={{ background: `linear-gradient(135deg, ${styles.amber}, ${styles.coral})`, color: 'white', fontSize: '18px', fontWeight: '700', padding: '6px 16px', borderRadius: '50px' }}>${budget}</span>
          </div>
          <input type="range" min="20" max="500" value={budget} onChange={(e) => setBudget(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: styles.coral }} />
          <div className="flex justify-between" style={{ marginTop: '6px' }}>
            <span style={{ color: styles.textLight, fontSize: '11px' }}>$20</span>
            <span style={{ color: styles.textLight, fontSize: '11px' }}>$500</span>
          </div>
        </div>

        {/* Celebration */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '22px', marginBottom: '16px', boxShadow: '0 2px 12px rgba(45,27,78,0.08)' }}>
          <p style={{ color: styles.textDark, fontSize: '16px', fontWeight: '600', marginBottom: '14px' }}>What Are We Celebrating?</p>
          <select value={celebration} onChange={(e) => setCelebration(e.target.value)}
            style={{ width: '100%', padding: '14px 16px', borderRadius: '14px', border: `2px solid ${celebration ? styles.coral : '#f0eaf8'}`, fontSize: '14px', color: styles.textDark, background: 'white', outline: 'none', cursor: 'pointer' }}>
            <option value="">Select an occasion...</option>
            <option value="quick-meeting">Just A Quick Meeting</option>
            <option value="solo">Solo Date</option>
            <option value="self-care">Self Care</option>
            <option value="first-date">1st Date</option>
            <option value="anniversary">Anniversary 💕</option>
            <option value="birthday">Birthday 🎂</option>
            <option value="just-because">Just Because</option>
          </select>
        </div>

        {/* Cuisine */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '22px', marginBottom: '16px', boxShadow: '0 2px 12px rgba(45,27,78,0.08)' }}>
          <p style={{ color: styles.textDark, fontSize: '16px', fontWeight: '600', marginBottom: '14px' }}>Cuisine Preference</p>
          <select value={selectedCuisine} onChange={(e) => setSelectedCuisine(e.target.value)}
            style={{ width: '100%', padding: '14px 16px', borderRadius: '14px', border: '2px solid #f0eaf8', fontSize: '14px', color: styles.textDark, background: 'white', outline: 'none', cursor: 'pointer' }}>
            <option value="">Any Cuisine</option>
            <option value="italian">Italian 🍝</option>
            <option value="french">French 🥐</option>
            <option value="japanese">Japanese 🍱</option>
            <option value="mexican">Mexican 🌮</option>
            <option value="indian">Indian 🍛</option>
            <option value="thai">Thai 🥢</option>
          </select>
        </div>

        {/* Beauty Treatments */}
        {(celebration === 'solo' || celebration === 'self-care') && (
          <div style={{ background: 'white', borderRadius: '20px', padding: '22px', marginBottom: '16px', boxShadow: '0 2px 12px rgba(45,27,78,0.08)' }}>
            <p style={{ color: styles.textDark, fontSize: '16px', fontWeight: '600', marginBottom: '6px' }}>Beauty & Wellness 💆</p>
            <p style={{ color: styles.textLight, fontSize: '12px', marginBottom: '16px' }}>Select multiple treatments</p>
            <div style={{ maxHeight: '280px', overflowY: 'auto', borderRadius: '14px', border: '2px solid #f0eaf8' }}>
              {Object.entries(beautyTreatments).map(([category, treatments]) => (
                <div key={category}>
                  <div style={{ background: '#f8f4ff', padding: '8px 16px' }}>
                    <p style={{ color: styles.plum, fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{category}</p>
                  </div>
                  {treatments.map(treatment => (
                    <label key={treatment.id} style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', cursor: 'pointer', gap: '10px', borderBottom: '1px solid #f8f4ff' }}>
                      <input type="checkbox" checked={selectedBeautyTreatments.includes(treatment.id)} onChange={() => toggleBeautyTreatment(treatment.id)} style={{ accentColor: styles.coral }} />
                      <span style={{ fontSize: '13px', color: styles.textDark }}>{treatment.name}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
            {selectedBeautyTreatments.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedBeautyTreatments.map(id => {
                  const treatment = Object.values(beautyTreatments).flat().find(t => t.id === id);
                  return (
                    <span key={id} style={{ background: `linear-gradient(135deg, ${styles.coral}, #C0392B)`, color: 'white', fontSize: '11px', padding: '4px 10px', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {treatment?.name}
                      <button onClick={() => toggleBeautyTreatment(id)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '14px', lineHeight: 1 }}>×</button>
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Entertainment */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '22px', marginBottom: '16px', boxShadow: '0 2px 12px rgba(45,27,78,0.08)' }}>
          <p style={{ color: styles.textDark, fontSize: '16px', fontWeight: '600', marginBottom: '6px' }}>Entertainment 🎭</p>
          <p style={{ color: styles.textLight, fontSize: '12px', marginBottom: '16px' }}>Select multiple activities</p>
          <div style={{ maxHeight: '280px', overflowY: 'auto', borderRadius: '14px', border: '2px solid #f0eaf8' }}>
            {Object.entries(entertainmentOptions).map(([category, options]) => (
              <div key={category}>
                <div style={{ background: '#f8f4ff', padding: '8px 16px' }}>
                  <p style={{ color: styles.plum, fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{category}</p>
                </div>
                {options.map(option => (
                  <label key={option.id} style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', cursor: 'pointer', gap: '10px', borderBottom: '1px solid #f8f4ff' }}>
                    <input type="checkbox" checked={selectedEntertainment.includes(option.id)} onChange={() => toggleEntertainment(option.id)} style={{ accentColor: styles.plum }} />
                    <span style={{ fontSize: '13px', color: styles.textDark }}>{option.name}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Curated Suggestions */}
        {celebration && (
          <div style={{ background: `linear-gradient(135deg, ${styles.plum}, #1A0E2E)`, borderRadius: '20px', padding: '22px', marginBottom: '16px', boxShadow: `0 8px 24px ${styles.plum}44` }}>
            <p style={{ color: styles.amber, fontSize: '11px', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>✨ Curated For You</p>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', color: 'white', fontWeight: '300', marginBottom: '20px' }}>Your Perfect Evening</h3>

            {[
              { label: 'Dining', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600', name: 'The Garden Bistro', desc: 'Contemporary dining with seasonal menu', cost: Math.floor(budget * 0.6), btn: 'Book Table' },
              { label: 'Entertainment', img: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600', name: 'Jazz Under The Stars', desc: 'Live music at the waterfront', cost: Math.floor(budget * 0.4), btn: 'Book Tickets' }
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: i === 0 ? '20px' : 0, paddingBottom: i === 0 ? '20px' : 0, borderBottom: i === 0 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>{item.label}</p>
                <img src={item.img} alt={item.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '14px', marginBottom: '12px' }} />
                <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '500', marginBottom: '4px' }}>{item.name}</h4>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginBottom: '8px' }}>{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span style={{ color: styles.amber, fontSize: '16px', fontWeight: '700' }}>~${item.cost}</span>
                  <button style={{ background: styles.amber, color: styles.plum, fontSize: '12px', fontWeight: '700', padding: '8px 16px', borderRadius: '50px', border: 'none', cursor: 'pointer' }}>{item.btn}</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Outfit Gallery */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '22px', boxShadow: '0 2px 12px rgba(45,27,78,0.08)' }}>
          <p style={{ color: styles.textDark, fontSize: '16px', fontWeight: '600', marginBottom: '6px' }}>Date Night Outfits 👗</p>
          <p style={{ color: styles.textLight, fontSize: '12px', marginBottom: '16px' }}>Share your style inspiration</p>
          <label>
            <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => { handleImageUpload('outfits', e.target.files); alert('Photos uploaded!'); }} />
            <div style={{ border: `2px dashed #e0d8f0`, borderRadius: '16px', padding: '28px', textAlign: 'center', cursor: 'pointer', marginBottom: '14px' }}>
              <Camera size={28} color={styles.textLight} style={{ margin: '0 auto 8px' }} />
              <p style={{ color: styles.textMid, fontSize: '13px', fontWeight: '500' }}>Upload outfit photos</p>
              <p style={{ color: styles.textLight, fontSize: '11px' }}>Tap to browse</p>
            </div>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {uploadedImages.outfits.map(img => (
              <div key={img.id} style={{ position: 'relative', aspectRatio: '1', borderRadius: '12px', overflow: 'hidden' }}>
                <img src={img.url} alt={img.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button onClick={() => removeUploadedImage('outfits', img.id)} style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.6)', color: 'white', width: '22px', height: '22px', borderRadius: '50%', border: 'none', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
              </div>
            ))}
            {uploadedImages.outfits.length === 0 && [1, 2, 3].map(i => (
              <div key={i} style={{ aspectRatio: '1', borderRadius: '12px', background: '#f8f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Camera size={20} color="#d0c8e0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="date-night" />
    </div>
  );

  // ─── SHOP PAGE ───────────────────────────────────────────────────────────────
  const ShopPage = () => {
    const vendors = [
      { id: 1, name: 'Bean Scene', category: 'Coffee & Tea', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400' },
      { id: 2, name: 'Crafted Co.', category: 'Handmade Jewelry', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400' },
      { id: 3, name: 'Fresh Bites', category: 'Organic Snacks', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400' }
    ];

    return (
      <div style={{ background: styles.cream, minHeight: '100vh', paddingBottom: '100px' }}>
        {/* Header */}
        <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200" alt="Shopping" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${styles.plum}dd, transparent)` }} />
          <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', color: 'white', fontWeight: '300' }}>Shop</h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Support local vendors</p>
            </div>
            <button onClick={() => setShowCart(true)}
              style={{ background: styles.amber, borderRadius: '50%', width: '46px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', position: 'relative', boxShadow: `0 4px 16px ${styles.amber}66` }}>
              <ShoppingBag size={20} color={styles.plum} />
              {cart.length > 0 && (
                <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: styles.coral, color: 'white', width: '18px', height: '18px', borderRadius: '50%', fontSize: '10px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cart.length}</span>
              )}
            </button>
          </div>
        </div>

        <div style={{ padding: '20px 24px' }}>
          {/* Vendors */}
          <p style={{ color: styles.textLight, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: '600', marginBottom: '12px' }}>Local Vendors</p>
          <div className="flex gap-3 overflow-x-auto pb-3 mb-6" style={{ scrollbarWidth: 'none' }}>
            {vendors.map(vendor => (
              <div key={vendor.id} style={{ flexShrink: 0, width: '120px', cursor: 'pointer' }}>
                <div style={{ borderRadius: '16px', overflow: 'hidden', height: '100px', marginBottom: '8px' }}>
                  <img src={vendor.image} alt={vendor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <p style={{ color: styles.textDark, fontSize: '12px', fontWeight: '600' }}>{vendor.name}</p>
                <p style={{ color: styles.textLight, fontSize: '10px' }}>{vendor.category}</p>
              </div>
            ))}
          </div>

          {/* Products */}
          <p style={{ color: styles.textLight, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: '600', marginBottom: '12px' }}>Products</p>
          <div className="grid grid-cols-2 gap-4">
            {vendorProducts.map(product => (
              <div key={product.id} style={{ background: 'white', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(45,27,78,0.08)' }}>
                <div style={{ position: 'relative' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '10px', left: '10px', background: product.inStock ? styles.sage : styles.coral, color: 'white', fontSize: '10px', fontWeight: '700', padding: '3px 8px', borderRadius: '20px' }}>
                    {product.inStock ? 'In Stock' : 'Out'}
                  </div>
                </div>
                <div style={{ padding: '14px' }}>
                  <p style={{ color: styles.textLight, fontSize: '10px', fontWeight: '600', marginBottom: '4px' }}>{product.vendor}</p>
                  <h3 style={{ color: styles.textDark, fontSize: '13px', fontWeight: '600', marginBottom: '8px', lineHeight: 1.3 }}>{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span style={{ color: styles.plum, fontSize: '16px', fontWeight: '700' }}>${product.price}</span>
                    <button onClick={() => addToCart(product)}
                      style={{ background: `linear-gradient(135deg, ${styles.plum}, ${styles.plumLight})`, color: 'white', width: '32px', height: '32px', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 12px ${styles.plum}44` }}>
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Modal */}
        {showCart && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(26,14,46,0.6)', zIndex: 50, display: 'flex', alignItems: 'flex-end', backdropFilter: 'blur(4px)' }}>
            <div style={{ background: 'white', width: '100%', maxWidth: '640px', margin: '0 auto', borderRadius: '24px 24px 0 0', maxHeight: '80vh', overflowY: 'auto' }}>
              <div style={{ position: 'sticky', top: 0, background: 'white', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0eaf8' }}>
                <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '22px', color: styles.textDark, fontWeight: '400' }}>Cart ({cart.length})</h2>
                <button onClick={() => setShowCart(false)} style={{ background: '#f0eaf8', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', color: styles.plum, fontWeight: 'bold' }}>✕</button>
              </div>
              <div style={{ padding: '20px 24px' }}>
                {cart.length === 0 ? (
                  <p style={{ textAlign: 'center', color: styles.textLight, padding: '40px 0' }}>Your cart is empty 🛍️</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} style={{ display: 'flex', gap: '14px', marginBottom: '16px', background: '#faf8ff', borderRadius: '16px', padding: '14px', alignItems: 'center' }}>
                        <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '12px' }} />
                        <div style={{ flex: 1 }}>
                          <p style={{ color: styles.textDark, fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>{item.name}</p>
                          <p style={{ color: styles.textLight, fontSize: '11px' }}>{item.vendor}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => updateCartQuantity(item.id, -1)} style={{ background: '#e8e0f0', width: '24px', height: '24px', borderRadius: '50%', border: 'none', cursor: 'pointer', color: styles.plum, fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                            <span style={{ color: styles.textDark, fontSize: '13px', fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                            <button onClick={() => updateCartQuantity(item.id, 1)} style={{ background: '#e8e0f0', width: '24px', height: '24px', borderRadius: '50%', border: 'none', cursor: 'pointer', color: styles.plum, fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ color: styles.plum, fontSize: '15px', fontWeight: '700' }}>${item.price * item.quantity}</p>
                          <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: styles.coral, marginTop: '4px' }}><Trash2 size={14} /></button>
                        </div>
                      </div>
                    ))}
                    <div style={{ background: '#f8f4ff', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
                      <p style={{ color: styles.textDark, fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Fulfillment</p>
                      {[{ label: 'Pickup', desc: 'Schedule from vendors' }, { label: 'Delivery', desc: 'Combined delivery' }].map((opt, i) => (
                        <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: 'white', borderRadius: '12px', marginBottom: '8px', cursor: 'pointer' }}>
                          <input type="radio" name="fulfillment" defaultChecked={i === 0} style={{ accentColor: styles.plum }} />
                          <div><p style={{ fontSize: '13px', color: styles.textDark, fontWeight: '500' }}>{opt.label}</p><p style={{ fontSize: '11px', color: styles.textLight }}>{opt.desc}</p></div>
                        </label>
                      ))}
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <input type="date" style={{ padding: '10px', borderRadius: '12px', border: '2px solid #e8e0f0', fontSize: '13px', color: styles.textDark, outline: 'none' }} />
                        <input type="time" style={{ padding: '10px', borderRadius: '12px', border: '2px solid #e8e0f0', fontSize: '13px', color: styles.textDark, outline: 'none' }} />
                      </div>
                    </div>
                    <div style={{ borderTop: '2px solid #f0eaf8', paddingTop: '16px' }}>
                      <div className="flex justify-between mb-4">
                        <span style={{ color: styles.textMid, fontSize: '14px' }}>Subtotal</span>
                        <span style={{ color: styles.textDark, fontSize: '16px', fontWeight: '700' }}>${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
                      </div>
                      <button style={{ width: '100%', background: `linear-gradient(135deg, ${styles.plum}, ${styles.plumLight})`, color: 'white', padding: '18px', borderRadius: '16px', fontSize: '15px', fontWeight: '600', border: 'none', cursor: 'pointer', boxShadow: `0 8px 24px ${styles.plum}44` }}>
                        Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <BottomNav active="shop" />
      </div>
    );
  };

  // ─── PROFILE PAGE ────────────────────────────────────────────────────────────
  const ProfilePage = () => (
    <div style={{ background: styles.cream, minHeight: '100vh', paddingBottom: '100px' }}>
      <div style={{ background: `linear-gradient(135deg, ${styles.plum}, #1A0E2E)`, padding: '24px 24px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', background: `radial-gradient(circle, ${styles.amber}22 0%, transparent 70%)`, borderRadius: '50%' }} />
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setCurrentView('home')} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', color: 'white' }}>←</button>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '22px', color: 'white', fontWeight: '300' }}>Profile</h1>
          <div style={{ width: '38px' }} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: `linear-gradient(135deg, ${styles.amber}, ${styles.coral})`, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid rgba(255,255,255,0.3)', overflow: 'hidden' }}>
            {uploadedImages.profilePics.length > 0
              ? <img src={uploadedImages.profilePics[uploadedImages.profilePics.length - 1].url} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <User size={32} color="white" />}
          </div>
          <label style={{ cursor: 'pointer' }}>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => { handleImageUpload('profilePics', e.target.files); }} />
            <span style={{ color: styles.amberLight, fontSize: '12px', textDecoration: 'underline' }}>Change Photo</span>
          </label>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        {/* Personal Info */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '22px', marginBottom: '16px', boxShadow: '0 2px 12px rgba(45,27,78,0.08)' }}>
          <p style={{ color: styles.textDark, fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Personal Information</p>
          <div className="space-y-4">
            {[
              { label: 'Full Name', key: 'name', type: 'text', placeholder: 'John Doe' },
              { label: 'Email', key: 'email', type: 'email', placeholder: 'john@example.com' },
              { label: 'Phone', key: 'phone', type: 'tel', placeholder: '+1 (555) 123-4567' }
            ].map(field => (
              <div key={field.key}>
                <p style={{ color: styles.textLight, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600', marginBottom: '6px' }}>{field.label}</p>
                <input type={field.type} value={userProfile[field.key]} onChange={(e) => setUserProfile({ ...userProfile, [field.key]: e.target.value })} placeholder={field.placeholder}
                  style={{ width: '100%', padding: '13px 16px', borderRadius: '14px', border: '2px solid #f0eaf8', fontSize: '14px', color: styles.textDark, outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = styles.plum} onBlur={e => e.target.style.borderColor = '#f0eaf8'} />
              </div>
            ))}
          </div>
          <button style={{ width: '100%', background: `linear-gradient(135deg, ${styles.plum}, ${styles.plumLight})`, color: 'white', padding: '14px', borderRadius: '14px', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', marginTop: '16px', boxShadow: `0 4px 16px ${styles.plum}44` }}>
            Save Changes
          </button>
        </div>

        {/* Payment Methods */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '22px', marginBottom: '16px', boxShadow: '0 2px 12px rgba(45,27,78,0.08)' }}>
          <div className="flex justify-between items-center mb-4">
            <p style={{ color: styles.textDark, fontSize: '16px', fontWeight: '600' }}>Payment Methods</p>
            <button style={{ color: styles.plum, fontSize: '12px', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>+ Add New</button>
          </div>
          {paymentMethods.map(method => (
            <div key={method.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', background: '#faf8ff', borderRadius: '14px', marginBottom: '8px' }}>
              <div style={{ background: `linear-gradient(135deg, ${styles.plum}, ${styles.plumLight})`, borderRadius: '10px', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CreditCard size={16} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: styles.textDark, fontSize: '13px', fontWeight: '600' }}>•••• •••• •••• {method.last4}</p>
                <p style={{ color: styles.textLight, fontSize: '11px' }}>Expires {method.expiry}</p>
              </div>
              <input type="radio" name="payment" checked={method.isDefault} onChange={() => setPaymentMethods(paymentMethods.map(m => ({ ...m, isDefault: m.id === method.id })))} style={{ accentColor: styles.plum }} />
            </div>
          ))}
        </div>

        <button onClick={() => { setCurrentView('login'); setUserType(null); }}
          style={{ width: '100%', background: 'white', color: styles.coral, padding: '14px', borderRadius: '14px', fontSize: '14px', fontWeight: '600', border: `2px solid ${styles.coral}44`, cursor: 'pointer' }}>
          Log Out
        </button>
      </div>

      <BottomNav active="profile" />
    </div>
  );

  // ─── VENDOR DASHBOARD ────────────────────────────────────────────────────────
  const VendorDashboard = () => {
    const [newProduct, setNewProduct] = useState({ name: '', price: '', link: '', category: '' });
    const fileInputRef = React.useRef(null);

    return (
      <div style={{ background: styles.cream, minHeight: '100vh' }}>
        <div style={{ background: `linear-gradient(135deg, ${styles.sage}, #4A7A5A)`, padding: '24px 24px 32px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
          <button onClick={() => setCurrentView('login')} style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', color: 'white', marginBottom: '16px' }}>←</button>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '30px', color: 'white', fontWeight: '300' }}>Vendor<br />Dashboard 🛍️</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginTop: '6px' }}>Manage your products & sales</p>
        </div>

        <div style={{ padding: '24px' }}>
          {/* Add Product */}
          <div style={{ background: `linear-gradient(135deg, ${styles.plum}, #1A0E2E)`, borderRadius: '20px', padding: '22px', marginBottom: '20px', boxShadow: `0 8px 24px ${styles.plum}44` }}>
            <p style={{ color: styles.amber, fontSize: '11px', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>+ Add New Product</p>
            <div className="space-y-3">
              {[
                { placeholder: 'Product Name', key: 'name', type: 'text' },
                { placeholder: 'Price ($)', key: 'price', type: 'number' },
                { placeholder: 'Product Page Link', key: 'link', type: 'url' }
              ].map(field => (
                <input key={field.key} type={field.type} placeholder={field.placeholder} value={newProduct[field.key]}
                  onChange={(e) => setNewProduct({ ...newProduct, [field.key]: e.target.value })}
                  style={{ width: '100%', padding: '13px 16px', borderRadius: '14px', border: 'none', fontSize: '14px', color: styles.textDark, outline: 'none', boxSizing: 'border-box', background: 'rgba(255,255,255,0.95)' }} />
              ))}

              {/* Fixed upload button using ref */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleImageUpload('products', e.target.files);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                style={{ width: '100%', border: '2px dashed rgba(255,255,255,0.4)', borderRadius: '14px', padding: '20px', textAlign: 'center', cursor: 'pointer', background: 'rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <Camera size={24} color="rgba(255,255,255,0.7)" />
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: '500', margin: 0 }}>
                  {uploadedImages.products.length > 0 ? `${uploadedImages.products.length} image(s) selected ✓` : 'Tap to Upload Product Images'}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', margin: 0 }}>JPG, PNG supported</p>
              </button>

              {/* Preview uploaded images */}
              {uploadedImages.products.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {uploadedImages.products.slice(-4).map(img => (
                    <div key={img.id} style={{ position: 'relative', width: '64px', height: '64px' }}>
                      <img src={img.url} alt={img.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px', border: '2px solid rgba(255,255,255,0.3)' }} />
                      <button
                        onClick={() => removeUploadedImage('products', img.id)}
                        style={{ position: 'absolute', top: '-6px', right: '-6px', background: styles.coral, color: 'white', width: '18px', height: '18px', borderRadius: '50%', border: 'none', cursor: 'pointer', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => { if (newProduct.name && newProduct.price) { addProduct({ ...newProduct, price: parseFloat(newProduct.price), image: uploadedImages.products.length > 0 ? uploadedImages.products[uploadedImages.products.length - 1].url : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' }); setNewProduct({ name: '', price: '', link: '', category: '' }); alert('Product added!'); } }}
              style={{ width: '100%', background: styles.amber, color: styles.plum, padding: '14px', borderRadius: '14px', fontSize: '14px', fontWeight: '700', border: 'none', cursor: 'pointer', marginTop: '16px', boxShadow: `0 4px 16px ${styles.amber}44` }}>
              Add Product
            </button>
          </div>

          {/* Product List */}
          <p style={{ color: styles.textLight, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: '600', marginBottom: '12px' }}>Your Products</p>
          <div className="space-y-3">
            {vendorProducts.map(product => (
              <div key={product.id} style={{ background: 'white', borderRadius: '18px', overflow: 'hidden', display: 'flex', boxShadow: '0 2px 12px rgba(45,27,78,0.08)' }}>
                <img src={product.image} alt={product.name} style={{ width: '90px', height: '90px', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ padding: '14px', flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ color: styles.textDark, fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>{product.name}</p>
                    <p style={{ color: styles.textLight, fontSize: '11px', marginBottom: '4px' }}>{product.vendor}</p>
                    {product.link && <a href={product.link} target="_blank" rel="noopener noreferrer" style={{ color: styles.sage, fontSize: '11px' }}>View →</a>}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ color: styles.plum, fontSize: '16px', fontWeight: '700' }}>${product.price}</p>
                    <span style={{ color: product.inStock ? styles.sage : styles.coral, fontSize: '10px', fontWeight: '600' }}>{product.inStock ? '✓ In Stock' : '✗ Out'}</span>
                    <div style={{ marginTop: '6px' }}>
                      <button onClick={() => deleteProduct(product.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: styles.coral }}><Trash2 size={15} /></button>
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

  // ─── HOST DASHBOARD ──────────────────────────────────────────────────────────
  const HostDashboard = () => {
    const [newEvent, setNewEvent] = useState({ name: '', date: '', location: '', price: '', description: '' });

    return (
      <div style={{ background: styles.cream, minHeight: '100vh' }}>
        <div style={{ background: `linear-gradient(135deg, #1A0E2E, ${styles.plum})`, padding: '24px 24px 32px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', background: `radial-gradient(circle, ${styles.amber}22, transparent 70%)`, borderRadius: '50%' }} />
          <button onClick={() => setCurrentView('login')} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', color: 'white', marginBottom: '16px' }}>←</button>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '30px', color: 'white', fontWeight: '300' }}>Event Host<br />Portal 🎪</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginTop: '6px' }}>Create & manage your events</p>
        </div>

        <div style={{ padding: '24px' }}>
          {/* Banner Upload */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '22px', marginBottom: '16px', boxShadow: '0 2px 12px rgba(45,27,78,0.08)' }}>
            <p style={{ color: styles.textDark, fontSize: '16px', fontWeight: '600', marginBottom: '14px' }}>🎬 Event Banner</p>
            <label>
              <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => { handleImageUpload('banners', e.target.files); alert('Banner uploaded!'); }} />
              <div style={{ border: `2px dashed #e0d8f0`, borderRadius: '16px', padding: '28px', textAlign: 'center', cursor: 'pointer' }}>
                <span style={{ fontSize: '32px', display: 'block', marginBottom: '8px' }}>🎬</span>
                <p style={{ color: styles.textMid, fontSize: '13px', fontWeight: '500' }}>Upload event banner</p>
                <p style={{ color: styles.textLight, fontSize: '11px' }}>MP4, MOV, PNG, JPG up to 50MB</p>
              </div>
            </label>
            {uploadedImages.banners.length > 0 && (
              <div className="mt-3 space-y-2">
                {uploadedImages.banners.slice(-2).map(img => (
                  <div key={img.id} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
                    <img src={img.url} alt={img.name} style={{ width: '100%', height: '120px', objectFit: 'cover', display: 'block' }} />
                    <button onClick={() => removeUploadedImage('banners', img.id)} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Playlist */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '22px', marginBottom: '16px', boxShadow: '0 2px 12px rgba(45,27,78,0.08)' }}>
            <p style={{ color: styles.textDark, fontSize: '16px', fontWeight: '600', marginBottom: '14px' }}>🎵 Event Playlist</p>
            <div className="space-y-3">
              {[
                { placeholder: 'Spotify Playlist URL', key: 'spotify' },
                { placeholder: 'Apple Music URL', key: 'apple' },
                { placeholder: 'YouTube Playlist URL', key: 'youtube' }
              ].map(field => (
                <input key={field.key} type="text" placeholder={field.placeholder} value={playlists[field.key]}
                  onChange={(e) => setPlaylists({ ...playlists, [field.key]: e.target.value })}
                  style={{ width: '100%', padding: '13px 16px', borderRadius: '14px', border: '2px solid #f0eaf8', fontSize: '14px', color: styles.textDark, outline: 'none', boxSizing: 'border-box' }} />
              ))}
            </div>
            <button style={{ width: '100%', background: `linear-gradient(135deg, ${styles.plum}, ${styles.plumLight})`, color: 'white', padding: '14px', borderRadius: '14px', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', marginTop: '14px' }}>Save Playlist Links</button>
          </div>

          {/* Fashion Inspiration */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '22px', marginBottom: '16px', boxShadow: '0 2px 12px rgba(45,27,78,0.08)' }}>
            <p style={{ color: styles.textDark, fontSize: '16px', fontWeight: '600', marginBottom: '14px' }}>📱 Fashion Inspiration</p>
            <div className="space-y-3">
              {[
                { label: 'Instagram Post URL', key: 'instagram', placeholder: 'https://instagram.com/p/...' },
                { label: 'Pinterest Board', key: 'pinterest', placeholder: 'https://pinterest.com/...' },
                { label: 'Hashtags', key: 'hashtags', placeholder: '#EventFashion #SummerStyle' }
              ].map(field => (
                <div key={field.key}>
                  <p style={{ color: styles.textLight, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600', marginBottom: '6px' }}>{field.label}</p>
                  <input type="text" placeholder={field.placeholder} value={socialMediaLinks[field.key]}
                    onChange={(e) => setSocialMediaLinks({ ...socialMediaLinks, [field.key]: e.target.value })}
                    style={{ width: '100%', padding: '13px 16px', borderRadius: '14px', border: '2px solid #f0eaf8', fontSize: '14px', color: styles.textDark, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
            </div>
            <button style={{ width: '100%', background: `linear-gradient(135deg, ${styles.coral}, #C0392B)`, color: 'white', padding: '14px', borderRadius: '14px', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', marginTop: '14px' }}>Connect Social Feeds</button>
          </div>

          {/* Fashion Gallery */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '22px', boxShadow: '0 2px 12px rgba(45,27,78,0.08)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} color={styles.coral} />
              <p style={{ color: styles.textDark, fontSize: '16px', fontWeight: '600' }}>Fashion Gallery</p>
            </div>
            <label>
              <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => { handleImageUpload('fashion', e.target.files); }} />
              <div style={{ border: `2px dashed #e0d8f0`, borderRadius: '16px', padding: '24px', textAlign: 'center', cursor: 'pointer', marginBottom: '14px' }}>
                <Camera size={28} color={styles.textLight} style={{ margin: '0 auto 8px' }} />
                <p style={{ color: styles.textMid, fontSize: '13px', fontWeight: '500' }}>Upload fashion inspiration</p>
                <p style={{ color: styles.textLight, fontSize: '11px' }}>Multiple images supported</p>
              </div>
            </label>
            {uploadedImages.fashion.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                {uploadedImages.fashion.map(img => (
                  <div key={img.id} style={{ position: 'relative', aspectRatio: '1', borderRadius: '12px', overflow: 'hidden' }}>
                    <img src={img.url} alt={img.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button onClick={() => removeUploadedImage('fashion', img.id)} style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.6)', color: 'white', width: '22px', height: '22px', borderRadius: '50%', border: 'none', cursor: 'pointer', fontSize: '12px' }}>×</button>
                  </div>
                ))}
              </div>
            )}
            <button style={{ width: '100%', background: `linear-gradient(135deg, ${styles.coral}, #C0392B)`, color: 'white', padding: '14px', borderRadius: '14px', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', boxShadow: `0 4px 16px ${styles.coral}44` }}>
              Upload Fashion Photos ({uploadedImages.fashion.length})
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ─── RENDER ──────────────────────────────────────────────────────────────────
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