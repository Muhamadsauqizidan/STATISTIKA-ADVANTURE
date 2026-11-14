
import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';

import { api } from '../services/api';
import { DEMO_STUDENTS } from '../data/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [student, setStudent] = useState(() => {
    const saved = localStorage.getItem('statistika_adventure_student');

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }

    return null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('statistika_adventure_token') || null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simpan data siswa
  useEffect(() => {
    if (student) {
      localStorage.setItem(
        'statistika_adventure_student',
        JSON.stringify(student)
      );
    } else {
      localStorage.removeItem('statistika_adventure_student');
    }
  }, [student]);

  // Simpan token
  useEffect(() => {
    if (token) {
      localStorage.setItem('statistika_adventure_token', token);
    } else {
      localStorage.removeItem('statistika_adventure_token');
    }
  }, [token]);

  // Login siswa
  const loginWithCode = async (code) => {
    setLoading(true);
    setError(null);

    const cleanedCode = (code || '').trim().toUpperCase();

    try {
      if (!cleanedCode) {
        const message = 'Masukkan kode siswa terlebih dahulu.';
        setError(message);
        return { success: false, error: message };
      }

      // 1. Login akun demo tanpa menunggu backend
      const matched = DEMO_STUDENTS.find(
        (s) => s.student_code.toUpperCase() === cleanedCode
      );

      if (matched) {
        setStudent(matched);
        setToken(`mock-jwt-token-${matched.id}`);

        return { success: true, student: matched };
      }

      // 2. Login melalui FastAPI untuk akun non-demo
      try {
        const response = await api.loginCode(cleanedCode);

        if (response?.success && response.data?.student) {
          const fetchedStudent = response.data.student;

          setStudent(fetchedStudent);
          setToken(response.data.access_token || null);

          return { success: true, student: fetchedStudent };
        }
      } catch (backendErr) {
        console.warn('Backend belum dapat dihubungi:', backendErr.message);
      }

      const message = `Kode '${cleanedCode}' tidak ditemukan. Gunakan kode demo SA8A01, SA8A02, atau SA8B01.`;

      setError(message);
      return { success: false, error: message };

    } catch (err) {
      const message = err.message || 'Terjadi kesalahan sistem';
      setError(message);

      return { success: false, error: message };

    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setStudent(null);
    setToken(null);
    setError(null);
  };

  // Tambah XP
  const addXp = (amount) => {
    if (!student) return;

    setStudent((prev) => ({
      ...prev,
      total_xp: (prev.total_xp || 0) + amount
    }));
  };

  // Selesaikan level
  const completeLevel = async (levelNumber, stars = 3) => {
    if (!student) return;

    try {
      const response = await api.completeLevel(
        student.id,
        levelNumber,
        stars
      );

      if (response?.success && response.data?.student) {
        setStudent(response.data.student);
        return response.data;
      }
    } catch (apiErr) {
      console.warn('Backend progress notice:', apiErr.message);
    }

    const completed = student.completed_levels || [];

    const updated = completed.includes(levelNumber)
      ? completed
      : [...completed, levelNumber];

    const updatedStudent = {
      ...student,
      completed_levels: updated,
      current_level: Math.min(
        8,
        Math.max(student.current_level || 1, levelNumber + 1)
      ),
      total_xp: (student.total_xp || 0) + 100
    };

    setStudent(updatedStudent);

    return {
      progress: {
        level_number: levelNumber,
        status: 'COMPLETED'
      },
      student: updatedStudent
    };
  };

  return (
    <AuthContext.Provider
      value={{
        student,
        token,
        isLoggedIn: !!student,
        loading,
        error,
        loginWithCode,
        logout,
        addXp,
        completeLevel,
        setError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
