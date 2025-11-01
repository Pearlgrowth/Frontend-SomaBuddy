import { useState } from "react";
import { WelcomeScreen } from "./components/welcomescreen";
import { RoleSelector } from "./components/RoleSelector";
import { StudentLogin } from "./components/studentlogin";
import { StoryLibrary } from "./components/StoryLibrary";
import { ReadingSession } from "./components/ReadingSession";
import { ProgressDashboard } from "./components/ProgressDashboard";
import { TeacherDashboard } from "./components/TeacherDashboard";
import { ParentDashboard } from "./components/ParentDashboard";
import { Button } from "./components/ui/button";
import { BarChart3 } from "lucide-react";
import { mockStudents, mockStories, mockSessions, mockErrorPatterns, mockTeachers, mockParents } from "./lib/mockdata";
import { toast } from "sonner";  // Toasts

// JSX: No types – use plain objects
const Screen = {  // Enum-like for screens
  welcome: 'welcome',
  'role-select': 'role-select',
  'student-login': 'student-login',
  'story-library': 'story-library',
  'reading-session': 'reading-session',
  progress: 'progress',
  'teacher-dashboard': 'teacher-dashboard',
  'parent-dashboard': 'parent-dashboard'
};

const UserRole = { student: 'student', teacher: 'teacher', parent: 'parent' };  // For roles

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(Screen.welcome);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [currentParent, setCurrentParent] = useState(null);
  const [currentStory, setCurrentStory] = useState(null);
  const [language, setLanguage] = useState('en');
  const [students, setStudents] = useState(mockStudents);

  const handleGetStarted = () => {
    setCurrentScreen(Screen['role-select']);
  };

  const handleRoleSelect = (role) => {
    if (role === UserRole.student) {
      setCurrentScreen(Screen['student-login']);
    } else if (role === UserRole.teacher) {
      setCurrentTeacher(mockTeachers[0]);
      setCurrentScreen(Screen['teacher-dashboard']);
      toast.success('Welcome, ' + mockTeachers[0].name);
    } else if (role === UserRole.parent) {
      setCurrentParent(mockParents[0]);
      setCurrentScreen(Screen['parent-dashboard']);
      toast.success('Welcome, ' + mockParents[0].name);
    }
  };

  const handleStudentLogin = (student) => {
    setCurrentStudent(student);
    setLanguage(student.language);
    setCurrentScreen(Screen['story-library']);
    toast.success(
      language === 'en' 
        ? `Welcome back, ${student.name}!` 
        : `Karibu tena, ${student.name}!`
    );
  };

  const handleSelectStory = (story) => {
    setCurrentStory(story);
    setCurrentScreen(Screen['reading-session']);
  };

  const handleSessionComplete = (accuracy, pointsEarned) => {
    if (currentStudent) {
      const updatedStudents = students.map(student => 
        student.id === currentStudent.id 
          ? {
              ...student,
              points: student.points + pointsEarned,
              totalSessions: student.totalSessions + 1,
              streakDays: student.streakDays + 1,
            }
          : student
      );
      setStudents(updatedStudents);
      
      const updatedStudent = updatedStudents.find(s => s.id === currentStudent.id);
      if (updatedStudent) {
        setCurrentStudent(updatedStudent);
      }

      toast.success(
        language === 'en'
          ? `Great job! You earned ${pointsEarned} points!`
          : `Kazi nzuri! Umepata pointi ${pointsEarned}!`
      );
    }
    setCurrentScreen(Screen['story-library']);
  };

  const handleBackToRoleSelect = () => {
    setCurrentStudent(null);
    setCurrentTeacher(null);
    setCurrentParent(null);
    setCurrentScreen(Screen['role-select']);
  };

  const handleBackToStudentLogin = () => {
    setCurrentScreen(Screen['student-login']);
  };

  const handleBackToLibrary = () => {
    setCurrentScreen(Screen['story-library']);
  };

  const handleViewProgress = () => {
    setCurrentScreen(Screen.progress);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    toast.success(
      lang === 'en'
        ? 'Language changed to English'
        : 'Lugha imebadilishwa kuwa Kiswahili'
    );
  };

  // Filter sessions for current student
  const currentStudentSessions = currentStudent 
    ? mockSessions.filter(s => s.studentId === currentStudent.id)
    : [];

  return (
    <div className="min-h-screen">
      {/* Progress Button (floating - only for students) */}
      {currentStudent && currentScreen !== Screen.welcome && currentScreen !== Screen['role-select'] && currentScreen !== Screen.progress && (
        <Button
          onClick={handleViewProgress}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50"
          size="icon"
        >
          <BarChart3 className="w-6 h-6" />
        </Button>
      )}

      {/* Screen Routing */}
      {currentScreen === Screen.welcome && (
        <WelcomeScreen
          onGetStarted={handleGetStarted}
          language={language}
          onLanguageChange={handleLanguageChange}
        />
      )}

      {currentScreen === Screen['role-select'] && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
          <RoleSelector
            onSelectRole={handleRoleSelect}
            language={language}
          />
        </div>
      )}

      {currentScreen === Screen['student-login'] && (
        <StudentLogin
          students={students}
          onLogin={handleStudentLogin}
          onBack={handleBackToRoleSelect}
          language={language}
        />
      )}

      {currentScreen === Screen['story-library'] && currentStudent && (
        <StoryLibrary
          stories={mockStories}
          currentStudent={currentStudent}
          onSelectStory={handleSelectStory}
          onBack={handleBackToStudentLogin}
        />
      )}

      {currentScreen === Screen['reading-session'] && currentStudent && currentStory && (
        <ReadingSession
          story={currentStory}
          currentStudent={currentStudent}
          onComplete={handleSessionComplete}
          onBack={handleBackToLibrary}
        />
      )}

      {currentScreen === Screen.progress && currentStudent && (
        <ProgressDashboard
          currentStudent={currentStudent}
          sessions={currentStudentSessions}
          errorPatterns={mockErrorPatterns}
          onBack={handleBackToLibrary}
        />
      )}

      {currentScreen === Screen['teacher-dashboard'] && currentTeacher && (
        <TeacherDashboard
          teacher={currentTeacher}
          students={students}
          stories={mockStories}
          sessions={mockSessions}
          onBack={handleBackToRoleSelect}
        />
      )}

      {currentScreen === Screen['parent-dashboard'] && currentParent && (
        <ParentDashboard
          parent={currentParent}
          students={students}
          sessions={mockSessions}
          stories={mockStories}
          onBack={handleBackToRoleSelect}
        />
      )}
    </div>
  );
}
