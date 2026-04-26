
import React, { useState, useEffect } from 'react';
import { User, ShieldCheck, Mail, Lock, Eye, EyeOff, ArrowRight, Github, Chrome, ChevronLeft, Loader2, Briefcase, AtSign, ShieldAlert } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { UserData } from '../../types';
import api from '../../services/api/client';

interface AuthPageProps {
  initialMode: 'login' | 'signup';
  onBack: () => void;
  onSuccess: (user: UserData) => void;
  isRegistrationOpen?: boolean;
  isCuratorRegistrationOpen?: boolean;
}

const AuthPage: React.FC<AuthPageProps> = ({ initialMode, onBack, onSuccess, isRegistrationOpen = true, isCuratorRegistrationOpen = true }) => {
  const { mode: urlMode } = useParams<{ mode: string }>();
  const [mode, setMode] = useState<'login' | 'signup'>(() => {
    if (urlMode === 'login' || urlMode === 'signup') return urlMode as any;
    return initialMode;
  });

  useEffect(() => {
    const newMode = (urlMode === 'login' || urlMode === 'signup') ? urlMode as 'login' | 'signup' : initialMode;
    setMode(newMode);
    setRegStep(1);
    setError('');
  }, [urlMode, initialMode]);

  const [role, setRole] = useState<'student' | 'curator' | 'admin'>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Mavsumiy cheklov
  useEffect(() => {
    if (!isRegistrationOpen) {
      setMode('login');
    }
  }, [isRegistrationOpen]);

  useEffect(() => {
    if (!isCuratorRegistrationOpen && role === 'curator') {
      setRole('student');
    }
  }, [isCuratorRegistrationOpen, role]);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    field: ''
  });
  const [regStep, setRegStep] = useState(1); // 1: Username Check, 2: Full Info
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      if (!formData.username.trim() || !formData.password) {
        setError('Iltimos, username va parolni kiriting');
        return;
      }
    }

    if (mode === 'signup') {
      if (regStep === 1) {
        if (!formData.username.trim() || !formData.password) {
          setError('School21 login va parolni kiriting');
          return;
        }
        setIsLoading(true);
        try {
          const res = await api.post('auth/validate-intra/', {
            username: formData.username,
            password: formData.password
          });
          if (res.data.success) {
            setRegStep(2);
            setFormData(prev => ({
              ...prev,
              username: res.data.username || prev.username,
              name: res.data.name || prev.name,
              email: res.data.email || prev.email
            }));
          }
        } catch (err: any) {
          setError(err.response?.data?.detail || 'School21 login yoki parol noto\'g\'ri');
          console.error("Username error:", err.response?.data);
        } finally {
          setIsLoading(false);
        }
        return;
      }

      if (!formData.name.trim()) {
        setError('Ismingizni kiriting');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Email manzili noto\'g\'ri formatda');
        return;
      }
      if (role === 'curator' && !formData.field.trim()) {
        setError('Kurator sifatida sohangizni ko\'rsatishingiz kerak');
        return;
      }
    }

    setIsLoading(true);

    try {
      if (mode === 'signup') {
        await api.post('auth/register/', {
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: role,
          field: formData.field,
        });

        // After successful registration, sign in automatically
        const loginRes = await api.post('auth/login/', {
          username: formData.username,
          password: formData.password,
        });
        localStorage.setItem('access_token', loginRes.data.access);
        localStorage.setItem('refresh_token', loginRes.data.refresh);

        const meRes = await api.get('auth/me/');
        onSuccess(meRes.data as UserData);
      } else {
        const res = await api.post('auth/login/', {
          username: formData.username,
          password: formData.password,
        });
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);

        const meRes = await api.get('auth/me/');
        onSuccess(meRes.data as UserData);
      }
    } catch (err: any) {
      console.error('Submit error details:', err.response?.data);
      const data = err.response?.data;
      let errorMsg = 'Xato yuz berdi. Qayta urinib ko\'ring.';

      if (data) {
        if (typeof data === 'string') {
          errorMsg = data;
        } else if (data.detail) {
          errorMsg = data.detail;
        } else if (typeof data === 'object') {
          // Birinchi uchragan xatoni olamiz (masalan {username: ["..."]})
          const firstError = Object.entries(data)[0];
          if (firstError) {
            const [field, messages] = firstError;
            const msg = Array.isArray(messages) ? messages[0] : messages;
            errorMsg = `${field}: ${msg}`;
          }
        }
      }
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-24 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-8 duration-500">
        <button onClick={onBack} className="flex items-center space-x-2 text-slate-500 hover:text-white transition-colors mb-8 group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold">Asosiyga qaytish</span>
        </button>

        <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 border border-white/5 rounded-3xl md:rounded-[40px] p-6 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2 md:mb-3">
              {mode === 'login' ? 'Xush kelibsiz!' : 'Jamoaga qo\'shiling'}
            </h2>
            <p className="text-slate-400 text-sm font-medium">
              {mode === 'login' ? 'Buddy Team platformasiga qayting.' : 'School21dagi username va parolni kiriting.'}
            </p>
          </div>

          {mode === 'signup' && isCuratorRegistrationOpen && (
            <div className="flex p-1.5 bg-white/5 rounded-2xl mb-8 border border-white/5 shadow-inner">
              <button
                onClick={() => setRole('student')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-bold transition-all ${role === 'student' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                  }`}
              >
                <User className="w-4 h-4" />
                <span>O'quvchi</span>
              </button>
              <button
                onClick={() => setRole('curator')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-bold transition-all ${role === 'curator' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                  }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Kurator</span>
              </button>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/10 rounded-2xl text-red-400 text-xs font-bold text-center shadow-sm">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {mode === 'signup' && regStep === 2 && (
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Ismingiz</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text"
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 md:py-4 pl-12 pr-6 text-white text-sm md:text-base focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
                    placeholder="Abbos Aliyev"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Username</label>
              <div className="relative">
                <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      document.getElementById('password-input')?.focus();
                    }
                  }}
                  disabled={mode === 'signup' && regStep === 2}
                  type="text"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 md:py-4 pl-12 pr-6 text-white text-sm md:text-base focus:outline-none focus:border-indigo-500 transition-colors shadow-inner disabled:opacity-50"
                  placeholder="Username"
                />
              </div>
            </div>

            {mode === 'signup' && regStep === 2 && (
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={mode === 'signup' && regStep === 2}
                    type="email"
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 md:py-4 pl-12 pr-6 text-white text-sm md:text-base focus:outline-none focus:border-indigo-500 transition-colors shadow-inner disabled:opacity-50"
                    placeholder="example@buddy.uz"
                  />
                </div>
              </div>
            )}

            {mode === 'signup' && regStep === 2 && role === 'curator' && (
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Mutaxassisligingiz</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input name="field" value={formData.field} onChange={handleInputChange} type="text" className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 md:py-4 pl-12 pr-6 text-white text-sm md:text-base focus:outline-none focus:border-purple-500 transition-colors shadow-inner" placeholder="Frontend / UI/UX / Mobile..." />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Parol</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  id="password-input"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={mode === 'signup' && regStep === 2}
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 md:py-4 pl-12 pr-12 text-white text-sm md:text-base focus:outline-none focus:border-indigo-500 transition-colors shadow-inner disabled:opacity-50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button disabled={isLoading} className={`w-full py-4 md:py-5 rounded-2xl text-white font-black shadow-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-2 mt-4 md:mt-6 disabled:opacity-70 ${role === 'student' ? 'bg-indigo-600' : 'bg-purple-600'
              }`}>
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  <span>
                    {mode === 'login'
                      ? 'Kirish'
                      : regStep === 1
                        ? 'Keyingi bosqich'
                        : role === 'curator' ? 'So\'rov yuborish' : 'Qo\'shilish'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {isRegistrationOpen && (
            <p className="text-center text-slate-500 text-xs md:text-sm mt-8">
              {mode === 'login' ? 'Hisobingiz yo\'qmi?' : 'Hisobingiz bormi?'}
              <button
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setRegStep(1);
                }}
                className="ml-2 text-indigo-400 font-bold hover:underline"
              >
                {mode === 'login' ? 'Ro\'yxatdan o\'tish' : 'Kirish'}
              </button>
            </p>
          )}

          {!isRegistrationOpen && mode === 'login' && (
            <p className="text-center text-slate-600 text-[10px] mt-8 uppercase font-bold tracking-widest">
              Yangi mavsum qabul yopilgan. Faqat mavjud a'zolar uchun.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
