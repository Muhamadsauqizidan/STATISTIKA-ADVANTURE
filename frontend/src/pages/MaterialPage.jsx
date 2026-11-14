import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  BookOpen,
  XCircle,
  Lightbulb,
  Trophy
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { LEVEL_CONTENT } from '../data/levelContent';
import confetti from 'canvas-confetti';

const MaterialPage = ({
  levelNumber = 1,
  onBack,
  onComplete
}) => {
  const defaultLevelData = LEVEL_CONTENT[levelNumber] || LEVEL_CONTENT[1];

  const [currentStep, setCurrentStep] = useState(0);
  const [moduleData, setModuleData] = useState(defaultLevelData);
  const [questions, setQuestions] = useState(defaultLevelData.questions);

  const [loading, setLoading] = useState(false);

  const [quizMode, setQuizMode] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [wrongAttempts, setWrongAttempts] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState([]);

  const [finishing, setFinishing] = useState(false);

  const { completeLevel } = useAuth();

  // ========================================
  // MUAT MATERI & SOAL SESUAI LEVEL
  // ========================================

  useEffect(() => {
    let isMounted = true;
    const targetLevel = LEVEL_CONTENT[levelNumber] || LEVEL_CONTENT[1];

    // Reset state setiap kali levelNumber berubah
    setCurrentStep(0);
    setQuizMode(false);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setWrongAttempts([]);
    setShowFeedback(false);
    setCorrectAnswers(0);
    setCompletedQuestions([]);
    setModuleData(targetLevel);
    setQuestions(targetLevel.questions);

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await api.getMaterialDetail(levelNumber);

        if (isMounted && res?.success && res?.data) {
          // Gunakan slides dari backend jika lengkap (> 1 slide), jika tidak pakai LEVEL_CONTENT
          const slidesToUse =
            res.data.slides && res.data.slides.length > 1
              ? res.data.slides
              : targetLevel.slides;

          // Gunakan questions dari backend jika tersedia, jika tidak pakai LEVEL_CONTENT
          const questionsToUse =
            res.data.questions && res.data.questions.length > 0
              ? res.data.questions
              : targetLevel.questions;

          setModuleData({
            levelNumber: res.data.level_number || levelNumber,
            title: res.data.title || targetLevel.title,
            subtitle: res.data.subtitle || targetLevel.subtitle,
            slides: slidesToUse
          });
          setQuestions(questionsToUse);
        }
      } catch (error) {
        // Fallback otomatis memakai targetLevel dari LEVEL_CONTENT
        if (isMounted) {
          setModuleData(targetLevel);
          setQuestions(targetLevel.questions);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDetail();

    return () => {
      isMounted = false;
    };
  }, [levelNumber]);

  // ========================================
  // NAVIGASI MATERI
  // ========================================

  const slides = moduleData.slides || defaultLevelData.slides;
  const slide = slides[currentStep] || slides[0];

  const handleNext = () => {
    if (currentStep < slides.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setQuizMode(true);
    }
  };

  // ========================================
  // VALIDASI JAWABAN
  // ========================================

  const question = questions[questionIndex];
  const isCurrentQuestionSolved = completedQuestions.includes(questionIndex);

  const handleAnswer = (index) => {
    if (isCurrentQuestionSolved) {
      return;
    }

    setSelectedAnswer(index);
    setShowFeedback(true);

    if (index === question.correct) {
      setCorrectAnswers(prev => prev + 1);
      setCompletedQuestions(prev => [
        ...prev,
        questionIndex
      ]);
    } else {
      if (!wrongAttempts.includes(index)) {
        setWrongAttempts(prev => [...prev, index]);
      }
    }
  };

  // ========================================
  // LANJUT SOAL
  // ========================================

  const handleNextQuestion = () => {
    if (!isCurrentQuestionSolved) {
      return;
    }

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setWrongAttempts([]);
      setShowFeedback(false);
    }
  };

  // ========================================
  // SELESAIKAN LEVEL
  // ========================================

  const handleFinish = async () => {
    if (
      completedQuestions.length !== questions.length ||
      finishing
    ) {
      return;
    }

    try {
      setFinishing(true);

      await completeLevel(levelNumber);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });

      onComplete();
    } catch (error) {
      console.error('Gagal menyelesaikan level:', error);
      alert('Level belum berhasil disimpan. Silakan coba kembali.');
    } finally {
      setFinishing(false);
    }
  };

  // ========================================
  // TAMPILAN LOADING
  // ========================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-3">⚙️</div>
          <p className="text-sm text-slate-400">
            Memuat materi Level {levelNumber}...
          </p>
        </div>
      </div>
    );
  }

  // ========================================
  // TAMPILAN KUIS
  // ========================================

  if (quizMode) {
    const progress =
      (completedQuestions.length / questions.length) * 100;

    return (
      <div className="w-full max-w-md mx-auto min-h-screen px-5 pt-5 pb-24 text-white">

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800 px-3 py-2 rounded-xl"
          >
            <ArrowLeft size={15} />
            Kembali
          </button>

          <span className="text-xs font-bold text-cyan-300 uppercase">
            LEVEL {levelNumber} • LATIHAN
          </span>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-5 mb-5">

          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-xs text-slate-400">
                {moduleData.title}
              </p>

              <h2 className="text-xl font-black mt-1">
                {completedQuestions.length}/{questions.length} Soal
              </h2>
            </div>

            <div className="text-3xl">🎯</div>
          </div>

          <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-5">

          <div className="flex justify-between mb-4">
            <span className="text-xs text-cyan-300 font-bold">
              SOAL {questionIndex + 1}
            </span>

            <span className="text-xs text-slate-400">
              Pilihan Ganda
            </span>
          </div>

          <h2 className="text-lg font-bold leading-relaxed mb-6">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correct;
              const isWrongAttempt = wrongAttempts.includes(index);

              let style =
                'bg-slate-900 border-slate-700 text-slate-300 hover:border-indigo-500/60';

              if (isCurrentQuestionSolved && isCorrect) {
                style =
                  'bg-emerald-950 border-emerald-500 text-emerald-200';
              } else if (isWrongAttempt) {
                style =
                  'bg-rose-950 border-rose-500 text-rose-200 opacity-75 cursor-not-allowed';
              } else if (isSelected) {
                style =
                  'bg-indigo-950 border-indigo-500 text-indigo-200';
              }

              return (
                <button
                  key={index}
                  disabled={isCurrentQuestionSolved || isWrongAttempt}
                  onClick={() => handleAnswer(index)}
                  className={`w-full p-4 rounded-xl border text-left text-sm flex gap-3 items-center transition ${style}`}
                >
                  <span className="w-7 h-7 shrink-0 rounded-lg bg-slate-800 flex items-center justify-center font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span>{option}</span>

                  {isCurrentQuestionSolved && isCorrect && (
                    <CheckCircle2
                      size={18}
                      className="ml-auto text-emerald-400 shrink-0"
                    />
                  )}

                  {isWrongAttempt && (
                    <XCircle
                      size={18}
                      className="ml-auto text-rose-400 shrink-0"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className={`mt-5 p-4 rounded-xl border text-sm ${
              isCurrentQuestionSolved
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
            }`}>
              <div className="font-bold mb-2 flex items-center gap-2">
                {isCurrentQuestionSolved ? (
                  <>
                    <CheckCircle2 size={18} />
                    Jawaban Benar!
                  </>
                ) : (
                  <>
                    <XCircle size={18} />
                    Jawaban Salah!
                  </>
                )}
              </div>

              <p className="leading-relaxed">
                {isCurrentQuestionSolved
                  ? question.explanation
                  : 'Jawaban kamu belum tepat. Silakan pilih opsi jawaban lain yang benar untuk melanjutkan ke soal berikutnya.'}
              </p>
            </div>
          )}
        </div>

        <div className="mt-5">

          {questionIndex === questions.length - 1 &&
          completedQuestions.length === questions.length ? (
            <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-5 text-center">
              <Trophy size={42} className="mx-auto text-yellow-400 mb-3" />

              <h2 className="text-xl font-black mb-2">
                Level {levelNumber} Selesai!
              </h2>

              <p className="text-sm text-emerald-200 mb-4">
                Kamu berhasil menaklukkan latihan {moduleData.title}.
              </p>

              <p className="text-xs text-slate-300 mb-4">
                Jawaban benar: {correctAnswers}/{questions.length}
              </p>

              <button
                onClick={handleFinish}
                disabled={finishing}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 font-bold disabled:opacity-50"
              >
                {finishing
                  ? 'Menyimpan progres...'
                  : 'Selesaikan Level'}
              </button>
            </div>
          ) : (
            <button
              onClick={handleNextQuestion}
              disabled={!isCurrentQuestionSolved}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-bold flex justify-center items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Soal Berikutnya
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ========================================
  // TAMPILAN MATERI
  // ========================================

  return (
    <div className="w-full max-w-md mx-auto min-h-screen pb-24 px-5 pt-4 flex flex-col justify-between text-white">

      <div>

        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-slate-400 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700"
          >
            <ArrowLeft size={15} />
            Peta
          </button>

          <span className="text-xs font-bold text-indigo-300 bg-indigo-950/60 border border-indigo-800 px-3 py-2 rounded-full">
            Level {levelNumber} • Materi {currentStep + 1}/{slides.length}
          </span>
        </div>

        <div className="flex gap-1.5 mb-5">
          {slides.map((item, index) => (
            <div
              key={index}
              className={`h-1.5 flex-1 rounded-full ${
                index <= currentStep
                  ? 'bg-gradient-to-r from-indigo-500 to-cyan-400'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        <div className="p-5 rounded-3xl bg-slate-800/90 border border-slate-700 shadow-xl">

          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300">
              {slide.badge || `Level ${levelNumber}`}
            </span>

            <span className="text-3xl">
              {slide.icon || '📘'}
            </span>
          </div>

          <h2 className="text-xl font-black mb-3">
            {slide.title}
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            {slide.content}
          </p>

          {slide.highlight && (
            <div className="p-4 rounded-xl bg-indigo-950 border border-indigo-700 text-sm text-indigo-200 mb-4">
              <Lightbulb size={17} className="inline mr-2" />
              {slide.highlight}
            </div>
          )}

          {slide.example && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-300 mb-4">
              <strong className="text-cyan-300">Contoh:</strong>
              <p className="mt-2">{slide.example}</p>
            </div>
          )}

          {slide.breakdown && (
            <div className="space-y-3">
              {slide.breakdown.map((item, index) => (
                <div
                  key={index}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-sm"
                >
                  <p className="font-bold text-cyan-300 mb-1">
                    {item.term}
                  </p>

                  <p className="text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          )}

          {slide.steps && (
            <div className="space-y-2">
              {slide.steps.map((item, index) => (
                <div
                  key={index}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          )}

          {slide.warning && (
            <div className="mt-4 p-3 rounded-xl bg-amber-950 border border-amber-800 text-sm text-amber-200">
              ⚠️ {slide.warning}
            </div>
          )}

        </div>
      </div>

      <div className="pt-5">
        <button
          onClick={handleNext}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-sm flex justify-center items-center gap-2"
        >
          {currentStep === slides.length - 1 ? (
            <>
              <BookOpen size={18} />
              Mulai {questions.length} Soal Latihan
            </>
          ) : (
            <>
              Lanjut Materi
              <ChevronRight size={18} />
            </>
          )}
        </button>
      </div>

    </div>
  );
};

export default MaterialPage;