import toast from 'react-hot-toast';

export const showToast = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  info: (message) => toast(message),
  unimplemented: () => toast('Unimplemented feature, stay tuned!'),
  lessonComplete: () => toast.success('Lesson completed!'),
  xpGain: (amount) => toast.success(`+${amount} XP`),
  resetProgress: () => toast.success('Progress reset successfully'),
  correct: () => toast.success('Correct!'),
  incorrect: () => toast.error('Not quite right. Try again!')
};