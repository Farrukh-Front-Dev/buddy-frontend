export const isValidUrl = (url: string): boolean => {
  if (!url) return true;
  try {
    const pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return pattern.test(url.trim());
  } catch {
    return false;
  }
};

export const toDateTimeLocal = (dateStr: string): string => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  } catch {
    return '';
  }
};

export const formatMeetingDay = (val: string): string => {
  if (!val) return "Belgilanmagan";
  try {
    const date = new Date(val);
    return date.toLocaleString('uz-UZ', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return val;
  }
};

export const getUserStatusStyle = (status: string): string => {
  switch (status) {
    case 'active':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'inactive':
      return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    case 'pending':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    default:
      return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
};

export const getRoleStyle = (role: string): string => {
  switch (role) {
    case 'admin':
      return 'bg-red-500/10 text-red-400 border-red-500/20';
    case 'curator':
      return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    default:
      return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
  }
};

export const getStatusStyle = (status: string): string => {
  switch (status) {
    case 'Hal qilindi':
      return 'bg-green-500/10 text-green-400 border-green-500/20';
    case 'Bajarmadi':
      return 'bg-red-500/10 text-red-400 border-red-500/20';
    case 'Bajarilmoqda':
      return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
    case 'Kutilmoqda':
      return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    default:
      return 'bg-white/10 text-white border-white/20';
  }
};
