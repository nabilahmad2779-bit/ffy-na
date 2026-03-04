
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Routes, Route, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Image as ImageIcon, Users, 
  Settings, LogOut, Plus, Search, MoreVertical, 
  ChevronRight, ExternalLink, Globe, Shield, 
  Edit, Trash2, CheckCircle, Clock, AlertCircle
} from 'lucide-react';

// --- Sub-components for Dashboard ---

const DashboardOverview: React.FC = () => {
  const [stats, setStats] = useState({ posts: 0, media: 0, users: 0 });
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsRes = await fetch('/api/posts');
        const posts = await postsRes.json();
        setRecentPosts(posts.slice(0, 5));
        setStats({ posts: posts.length, media: 0, users: 1 });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-zinc-500">Loading metrics...</div>;

  return (
    <div className="p-6 md:p-10 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Posts', value: stats.posts, icon: <FileText className="text-cyan-400" />, color: 'bg-cyan-500/10' },
          { label: 'Media Files', value: stats.media, icon: <ImageIcon className="text-purple-400" />, color: 'bg-purple-500/10' },
          { label: 'Active Users', value: stats.users, icon: <Users className="text-emerald-400" />, color: 'bg-emerald-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-zinc-900 border border-white/5 rounded-3xl p-8 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center`}>
                {stat.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Real-time</span>
            </div>
            <h3 className="text-4xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white font-heading tracking-tight">Recent Content</h3>
          <Link to="/admin/posts" className="text-cyan-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-black/20">
                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Title</th>
                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Status</th>
                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Author</th>
                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentPosts.map((post) => (
                <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-6">
                    <span className="text-white font-bold block mb-1">{post.title}</span>
                    <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">/{post.slug}</span>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                      post.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="p-6 text-zinc-400 text-sm">{post.author_name || 'Admin'}</td>
                  <td className="p-6 text-zinc-500 text-xs font-mono">{new Date(post.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PostManagement: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('forte_token')}` }
      });
      if (res.ok) fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 md:p-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold text-white font-heading tracking-tight mb-2">Content Repository</h2>
          <p className="text-zinc-500 text-sm">Manage all your articles and pages from here.</p>
        </div>
        <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all active:scale-95">
          <Plus size={18} /> Create New Post
        </button>
      </div>

      <div className="bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-black/20">
                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Post Title</th>
                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Status</th>
                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Author</th>
                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-6">
                    <span className="text-white font-bold block mb-1">{post.title}</span>
                    <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">/{post.slug}</span>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                      post.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="p-6 text-zinc-400 text-sm">{post.author_name || 'Admin'}</td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Main Dashboard Layout ---

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('forte_user');
    const token = localStorage.getItem('forte_token');
    
    if (!token || !storedUser) {
      navigate('/admin/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('forte_token');
    localStorage.removeItem('forte_user');
    navigate('/admin/login');
  };

  if (!user) return null;

  const menuItems = [
    { label: 'Overview', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Posts', path: '/admin/posts', icon: <FileText size={20} /> },
    { label: 'Media Library', path: '/admin/media', icon: <ImageIcon size={20} /> },
    { label: 'User Management', path: '/admin/users', icon: <Users size={20} /> },
    { label: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className="w-72 bg-zinc-950 border-r border-white/5 flex flex-col hidden lg:flex">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center text-black font-black italic">F</div>
            <div>
              <h1 className="text-white font-bold font-heading tracking-tight">Forte-FY CMS</h1>
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600">v1.0.0 Stable</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group ${
                location.pathname === item.path 
                ? 'bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/10' 
                : 'text-zinc-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className={location.pathname === item.path ? 'text-black' : 'text-zinc-600 group-hover:text-cyan-400 transition-colors'}>
                {item.icon}
              </span>
              <span className="text-sm uppercase tracking-widest font-bold">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="bg-zinc-900/50 rounded-3xl p-5 mb-4 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-white font-bold">
                {user.username[0].toUpperCase()}
              </div>
              <div>
                <p className="text-white text-sm font-bold truncate max-w-[120px]">{user.username}</p>
                <p className="text-[9px] font-black uppercase tracking-widest text-cyan-500">{user.role}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
          <div className="flex justify-center gap-4">
            <Link to="/" className="text-zinc-600 hover:text-white transition-colors"><Globe size={16} /></Link>
            <Link to="/admin/settings" className="text-zinc-600 hover:text-white transition-colors"><Shield size={16} /></Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-950/50">
        {/* Header */}
        <header className="h-20 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 md:px-10 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <h2 className="text-white font-bold uppercase tracking-[0.2em] text-xs">
              {menuItems.find(m => m.path === location.pathname)?.label || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
              <input 
                type="text" 
                placeholder="Search repository..." 
                className="bg-black/40 border border-white/5 rounded-full py-2 pl-12 pr-6 text-xs text-white focus:border-cyan-500/50 transition-all outline-none w-64"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Plus size={16} />
              </div>
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/5 flex items-center justify-center text-zinc-500">
                <MoreVertical size={16} />
              </div>
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/posts" element={<PostManagement />} />
            <Route path="/media" element={<div className="p-10 text-zinc-500">Media Library coming soon...</div>} />
            <Route path="/users" element={<div className="p-10 text-zinc-500">User Management coming soon...</div>} />
            <Route path="/settings" element={<div className="p-10 text-zinc-500">System Settings coming soon...</div>} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
