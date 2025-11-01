// mockData.js – From your types to JS
export const mockStudents = [
  { id: 1, name: 'Amina', age: 8, grade: 3, level: 'beginner', points: 150, totalSessions: 12, streakDays: 5, language: 'sw', avatarColor: '#3b82f6', teacherId: 1 },
  // Add more from snippets...
];

export const mockStories = [
  { id: 1, title: 'The Brave Lion', author: 'eKitabu', text: 'Once upon a time...', textSw: 'Hapo zamani...', thumbnail: 'https://example.com/lion.jpg', category: 'folktale', level: 1, points: 50, duration: '10 min', cbcAlignment: 'English CBC', completed: false, isAssigned: true, publisher: 'eKitabu' },
  // Add more...
];

export const mockSessions = [
  { id: 1, studentId: 1, storyId: 1, date: '2025-10-01', accuracy: 85, duration: 600, pointsEarned: 50 },
  // Add more...
];

export const mockErrorPatterns = [
  { type: 'vowel-swap', frequency: 5, examples: ['cat/cot', 'bat/bet'] },
  // Add more...
];

export const mockTeachers = [{ id: 1, name: 'Ms. Wanjiku', school: 'Nairobi Primary', email: 'wanjiku@school.ke' }];
export const mockParents = [{ id: 1, name: 'Mr. Kamau', email: 'kamau@email.com', children: [1] }];