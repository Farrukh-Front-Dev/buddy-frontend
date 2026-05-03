import { useState } from 'react';
import api from '../../../services/api/client';
import { UserData } from '../../../types';

interface FormData {
  name: string;
  username: string;
  email: string;
  password: string;
  field: string;
}

interface UseAuthFormProps {
  mode: 'login' | 'signup';
  role: 'student' | 'curator' | 'admin';
  onSuccess: (user: UserData) => void;
}

export const useAuthForm = ({ mode, role, onSuccess }: UseAuthFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    username: '',
    email: '',
    password: '',
    field: ''
  });
  const [regStep, setRegStep] = useState(1);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateStep1 = () => {
    if (!formData.username.trim() || !formData.password) {
      setError('School21 login va parolni kiriting');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.name.trim()) {
      setError('Ismingizni kiriting');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email manzili noto\'g\'ri formatda');
      return false;
    }
    if (role === 'curator' && !formData.field.trim()) {
      setError('Kurator sifatida sohangizni ko\'rsatishingiz kerak');
      return false;
    }
    return true;
  };

  const validateLogin = () => {
    if (!formData.username.trim() || !formData.password) {
      setError('Iltimos, username va parolni kiriting');
      return false;
    }
    return true;
  };

  const handleStep1Submit = async () => {
    if (!validateStep1()) return;

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
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!validateStep2()) return;

    setIsLoading(true);
    try {
      await api.post('auth/register/', {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: role,
        field: formData.field,
      });

      const loginRes = await api.post('auth/login/', {
        username: formData.username,
        password: formData.password,
      });
      localStorage.setItem('access_token', loginRes.data.access);
      localStorage.setItem('refresh_token', loginRes.data.refresh);

      const meRes = await api.get('auth/me/');
      onSuccess(meRes.data as UserData);
    } catch (err: any) {
      const data = err.response?.data;
      let errorMsg = 'Xato yuz berdi. Qayta urinib ko\'ring.';

      if (data) {
        if (typeof data === 'string') {
          errorMsg = data;
        } else if (data.detail) {
          errorMsg = data.detail;
        } else if (typeof data === 'object') {
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

  const handleLogin = async () => {
    if (!validateLogin()) return;

    setIsLoading(true);
    try {
      const res = await api.post('auth/login/', {
        username: formData.username,
        password: formData.password,
      });
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);

      const meRes = await api.get('auth/me/');
      onSuccess(meRes.data as UserData);
    } catch (err: any) {
      const data = err.response?.data;
      let errorMsg = 'Xato yuz berdi. Qayta urinib ko\'ring.';

      if (data) {
        if (typeof data === 'string') {
          errorMsg = data;
        } else if (data.detail) {
          errorMsg = data.detail;
        }
      }
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      await handleLogin();
    } else if (regStep === 1) {
      await handleStep1Submit();
    } else {
      await handleSignup();
    }
  };

  const resetForm = () => {
    setRegStep(1);
    setError('');
  };

  return {
    formData,
    regStep,
    error,
    isLoading,
    handleInputChange,
    handleSubmit,
    resetForm
  };
};
