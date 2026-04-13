import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { GoogleGenAI } from "@google/genai";
import { 
  Search, 
  User as UserIcon, 
  LogOut, 
  History as HistoryIcon, 
  TrendingUp, 
  ExternalLink, 
  RefreshCw,
  Newspaper,
  MoreVertical,
  Heart,
  Share2,
  Clock,
  Moon,
  Sun,
  ChevronDown,
  Mail,
  Settings,
  Check,
  Copy,
  Plus,
  Menu,
  X,
  Home,
  Bookmark,
  Zap,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import firebaseConfig from '../firebase-applet-config.json';

// --- Firebase & AI Initialization ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
const googleProvider = new GoogleAuthProvider();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// --- Types ---
interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  sourceIcon?: string;
  publishedAt: string;
  category: string;
  imageUrl?: string;
}

interface ViewHistory {
  id: string;
  title: string;
  url: string;
  viewedAt: string;
  source: string;
  imageUrl?: string;
  category?: string;
}

type Page = 'home' | 'favorites' | 'history';

// --- App Component ---
export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [history, setHistory] = useState<ViewHistory[]>([]);
  const [favorites, setFavorites] = useState<NewsItem[]>([]);
  const [subscriptions, setSubscriptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  
  // --- Auth & Theme & History Setup ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setIsAuthReady(true);
      if (u) {
        setDoc(doc(db, 'users', u.uid), {
          uid: u.uid,
          email: u.email,
          displayName: u.displayName,
          photoURL: u.photoURL,
          lastLogin: serverTimestamp()
        }, { merge: true });
      }
    });

    const savedTheme = localStorage.getItem('nexnews-theme');
    if (savedTheme === 'dark') setDarkMode(true);

    const savedHistory = localStorage.getItem('nexnews-history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    const savedFavs = localStorage.getItem('nexnews-favorites-items');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));

    const savedSubs = localStorage.getItem('nexnews-subs');
    if (savedSubs) setSubscriptions(JSON.parse(savedSubs));

    return unsubscribe;
  }, []);

  useEffect(() => {
    localStorage.setItem('nexnews-theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // --- Recommendation Engine ---
  const userInterests = useMemo(() => {
    const interests: Record<string, number> = {};
    favorites.forEach(f => {
      const cat = f.category || 'Общее';
      interests[cat] = (interests[cat] || 0) + 3;
    });
    history.forEach(h => {
      const cat = h.category || 'Общее';
      interests[cat] = (interests[cat] || 0) + 1;
    });
    return Object.entries(interests)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([cat]) => cat);
  }, [favorites, history]);

  // --- News Logic ---
  const fetchNews = useCallback(async (isLoadMore = false) => {
    if (isLoadMore) setRefreshing(true);
    else setLoading(true);

    const currentDate = new Date().toLocaleDateString('ru-RU');
    const interestsStr = userInterests.length > 0 ? userInterests.join(", ") : "главные мировые события";
    
    const prompt = `
      Ты - NexNews. Найди 15-20 САМЫХ СВЕЖИХ новостей на РУССКОМ языке за СЕГОДНЯ (${currentDate}).
      Интересы: ${interestsStr}. 
      Верни JSON массив объектов: id, title, summary, url, source, sourceIcon, publishedAt (ISO), category, imageUrl.
      Используй googleSearch. Будь краток и быстр.
    `;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
        }
      });

      const data = JSON.parse(response.text || "[]");
      if (isLoadMore) {
        setNews(prev => [...prev, ...data]);
      } else {
        setNews(data);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [userInterests]);

  useEffect(() => {
    fetchNews();
    const interval = setInterval(() => fetchNews(), 1000 * 60 * 10);
    return () => clearInterval(interval);
  }, []);

  // --- Actions ---
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setShowLogin(false);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const trackView = (item: NewsItem) => {
    const newHistory: ViewHistory[] = [
      { 
        id: item.id,
        title: item.title, 
        url: item.url, 
        viewedAt: new Date().toISOString(),
        source: item.source,
        imageUrl: item.imageUrl,
        category: item.category
      },
      ...history.filter(h => h.url !== item.url)
    ].slice(0, 50);
    
    setHistory(newHistory);
    localStorage.setItem('nexnews-history', JSON.stringify(newHistory));
    window.open(item.url, '_blank');
  };

  const toggleFavorite = (e: React.MouseEvent, item: NewsItem) => {
    e.stopPropagation();
    const isFav = favorites.some(f => f.url === item.url);
    const newFavs = isFav 
      ? favorites.filter(f => f.url !== item.url) 
      : [item, ...favorites];
    setFavorites(newFavs);
    localStorage.setItem('nexnews-favorites-items', JSON.stringify(newFavs));
  };

  const toggleSubscription = (e: React.MouseEvent, source: string) => {
    e.stopPropagation();
    const isSubbed = subscriptions.includes(source);
    const newSubs = isSubbed 
      ? subscriptions.filter(s => s !== source) 
      : [...subscriptions, source];
    setSubscriptions(newSubs);
    localStorage.setItem('nexnews-subs', JSON.stringify(newSubs));
  };

  const handleShare = async (e: React.MouseEvent, item: NewsItem) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({ title: item.title, text: item.summary, url: item.url });
      } catch (err) { console.error("Share failed:", err); }
    } else {
      navigator.clipboard.writeText(item.url);
      alert("Ссылка скопирована!");
    }
  };

  // --- UI Components ---
  if (!isAuthReady) return (
    <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center">
      <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
    </div>
  );

  const renderNewsList = (items: NewsItem[]) => (
    <div className="space-y-6">
      {items.length === 0 ? (
        <div className="text-center py-20">
          <Newspaper className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
          <p className="text-black dark:text-zinc-400">Здесь пока ничего нет</p>
        </div>
      ) : (
        items.map((item, i) => (
          <motion.article 
            key={item.id || i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-[#1e1e1e] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all group"
          >
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700">
                  {item.sourceIcon ? (
                    <img src={item.sourceIcon} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <Newspaper className="w-3 h-3 text-zinc-400" />
                  )}
                </div>
                <span className="text-xs font-bold text-black dark:text-zinc-300">{item.source}</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={(e) => toggleSubscription(e, item.source)}
                  className={`text-[10px] font-bold border px-3 py-1 rounded-full transition-colors ${
                    subscriptions.includes(item.source) 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'text-blue-600 dark:text-blue-400 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  {subscriptions.includes(item.source) ? 'Вы подписаны' : 'Подписаться'}
                </button>
                <button className="p-1 text-zinc-400 hover:text-black dark:hover:text-zinc-200">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="cursor-pointer" onClick={() => trackView(item)}>
              {item.imageUrl && (
                <div className="px-4">
                  <div className="aspect-video rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative">
                    <img 
                      src={item.imageUrl} 
                      alt="" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                    <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-md rounded-lg text-[10px] font-bold text-white uppercase tracking-wider">
                      {item.category}
                    </div>
                  </div>
                </div>
              )}
              <div className="p-4 pt-3">
                <h2 className="text-lg font-bold leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-black dark:text-white">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm text-black dark:text-zinc-400 line-clamp-2 leading-relaxed opacity-80">
                  {item.summary}
                </p>
              </div>
            </div>

            <div className="px-4 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] text-black dark:text-zinc-400 font-medium">
                <Clock className="w-3 h-3" />
                {formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true, locale: ru })}
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={(e) => toggleFavorite(e, item)}
                  className={`p-1 transition-colors ${favorites.some(f => f.url === item.url) ? 'text-red-500' : 'text-zinc-400 hover:text-red-500'}`}
                >
                  <Heart className={`w-4 h-4 ${favorites.some(f => f.url === item.url) ? 'fill-current' : ''}`} />
                </button>
                <button onClick={(e) => handleShare(e, item)} className="p-1 text-zinc-400 hover:text-blue-500 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.article>
        ))
      )}
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-[#121212] text-zinc-100' : 'bg-white text-black'} transition-colors duration-300 font-sans selection:bg-blue-500/30`}>
      
      {/* Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSidebar(false)} className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" />
            <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-[#1e1e1e] z-50 shadow-2xl border-r border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><Newspaper className="w-4 h-4 text-white" /></div>
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">NexNews</span>
                </div>
                <button onClick={() => setShowSidebar(false)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-black dark:text-white"><X className="w-5 h-5" /></button>
              </div>
              <nav className="space-y-2 flex-1">
                {[
                  { id: 'home', label: 'Главная', icon: Home },
                  { id: 'favorites', label: 'Избранное', icon: Bookmark },
                  { id: 'history', label: 'История', icon: HistoryIcon },
                ].map((item) => (
                  <button key={item.id} onClick={() => { setCurrentPage(item.id as Page); setShowSidebar(false); }} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium ${currentPage === item.id ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-black dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
                    <item.icon className="w-5 h-5" /> {item.label}
                  </button>
                ))}
              </nav>

              {/* Telegram Link */}
              <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <a 
                  href="https://t.me/brows_nexus" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all font-bold"
                >
                  <Send className="w-5 h-5" />
                  <span>Мы в телеграм</span>
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-[#121212] border-b border-zinc-200 dark:border-zinc-800 transition-colors shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setShowSidebar(true)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-black dark:text-zinc-400"><Menu className="w-6 h-6" /></button>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20"><Newspaper className="w-5 h-5 text-white" /></div>
              <span className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400 hidden sm:block">NexNews</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-black dark:text-zinc-400">
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {user ? (
              <div className="relative">
                <button onClick={() => setShowAccountMenu(!showAccountMenu)} className="flex items-center gap-1 p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                  <img src={user.photoURL || ''} className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700" alt="" />
                  <ChevronDown className={`w-4 h-4 transition-transform text-zinc-500 ${showAccountMenu ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showAccountMenu && (
                    <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute right-0 mt-2 w-72 bg-[#1e1e1e] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-50">
                      <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
                        <img src={user.photoURL || ''} className="w-12 h-12 rounded-full" alt="" />
                        <div className="overflow-hidden text-left">
                          <p className="font-bold truncate text-white">{user.displayName}</p>
                          <p className="text-xs text-zinc-400 truncate flex items-center gap-1"><Mail className="w-3 h-3" /> {user.email}</p>
                        </div>
                      </div>
                      <div className="p-2"><button onClick={() => { signOut(auth); setShowAccountMenu(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-900/20 rounded-lg transition-colors"><LogOut className="w-4 h-4" /> Выйти</button></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button onClick={() => setShowLogin(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-full transition-all shadow-md shadow-blue-600/20">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="" />
                <span className="hidden sm:inline">Войти</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black tracking-tight text-black dark:text-white">
            {currentPage === 'home' && 'Главные новости'}
            {currentPage === 'favorites' && 'Избранное'}
            {currentPage === 'history' && 'История просмотров'}
          </h1>
          {currentPage === 'home' && (
            <button onClick={() => fetchNews()} disabled={refreshing} className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1.5 rounded-full transition-all disabled:opacity-50">
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} /> Обновить
            </button>
          )}
        </div>

        {currentPage === 'home' && (
          <>
            {loading && news.length === 0 ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="bg-white dark:bg-[#1e1e1e] rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800 animate-pulse space-y-4 mb-6">
                  <div className="flex items-center gap-2"><div className="w-6 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full" /><div className="w-24 h-3 bg-zinc-200 dark:bg-zinc-700 rounded" /></div>
                  <div className="w-full aspect-video bg-zinc-200 dark:bg-zinc-700 rounded-xl" />
                  <div className="w-full h-4 bg-zinc-200 dark:bg-zinc-700 rounded" />
                </div>
              ))
            ) : renderNewsList(news)}
            <button onClick={() => fetchNews(true)} disabled={refreshing} className="w-full mt-8 py-5 bg-white dark:bg-[#1e1e1e] border border-zinc-200 dark:border-zinc-800 rounded-2xl font-black text-blue-600 dark:text-blue-400 hover:shadow-lg transition-all flex items-center justify-center gap-3">
              {refreshing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />} Загрузить еще больше новостей
            </button>
          </>
        )}
        {currentPage === 'favorites' && renderNewsList(favorites)}
        {currentPage === 'history' && (
          <div className="space-y-4">
            {history.length === 0 ? (
              <div className="text-center py-20"><HistoryIcon className="w-12 h-12 text-zinc-300 mx-auto mb-4" /><p className="text-zinc-500 dark:text-zinc-400">История пуста</p></div>
            ) : (
              history.map((h, i) => (
                <div key={i} onClick={() => window.open(h.url, '_blank')} className="bg-white dark:bg-[#1e1e1e] p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex gap-4 cursor-pointer hover:border-blue-500 transition-colors group">
                  {h.imageUrl && <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-zinc-100 dark:bg-zinc-800"><img src={h.imageUrl} className="w-full h-full object-cover" alt="" /></div>}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">{h.source}</p>
                    <h3 className="text-sm font-bold text-black dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors">{h.title}</h3>
                    <p className="text-[10px] text-black dark:text-zinc-400 mt-2">{formatDistanceToNow(new Date(h.viewedAt), { addSuffix: true, locale: ru })}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white dark:bg-[#1e1e1e] p-10 rounded-[32px] max-w-sm w-full text-center shadow-2xl border border-zinc-200 dark:border-zinc-800">
              <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mx-auto mb-8"><Newspaper className="w-10 h-10 text-blue-600" /></div>
              <h2 className="text-3xl font-black mb-3 text-black dark:text-white">NexNews</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-10 leading-relaxed">Войдите через Google, чтобы получить персональную ленту и сохранять избранное.</p>
              <button onClick={handleLogin} className="w-full flex items-center justify-center gap-4 bg-black dark:bg-white text-white dark:text-black font-black py-4 px-6 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all mb-6 shadow-xl shadow-blue-600/10">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" /> Войти с Google
              </button>
              <button onClick={() => setShowLogin(false)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-sm font-bold transition-colors">Пропустить</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
