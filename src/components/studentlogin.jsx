import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { motion } from "framer-motion";
import { BookOpen, ArrowLeft, User, Lock } from "lucide-react";

const StudentLogin = ({ students, onLogin, onBack, language }) => {
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");

  const content = {
    en: {
      title: "Student Login",
      subtitle: "Enter your student ID to continue",
      studentIdLabel: "Student ID",
      studentIdPlaceholder: "Enter your ID",
      loginButton: "Start Reading",
      backButton: "Back",
      errorMessage: "Student ID not found. Please check and try again.",
      quickAccess: "Quick Access",
    },
    sw: {
      title: "Kuingia kwa Mwanafunzi",
      subtitle: "Weka nambari yako ya mwanafunzi kuendelea",
      studentIdLabel: "Nambari ya Mwanafunzi",
      studentIdPlaceholder: "Weka nambari yako",
      loginButton: "Anza Kusoma",
      backButton: "Rudi",
      errorMessage: "Nambari ya mwanafunzi haijapatikana. Tafadhali angalia na ujaribu tena.",
      quickAccess: "Ufikiaji wa Haraka",
    }
  };

  const t = content[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    const student = students.find(s => s.id === studentId);
    if (student) {
      onLogin(student);
    } else {
      setError(t.errorMessage);
    }
  };

  const handleQuickLogin = (student) => {
    onLogin(student);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="w-full max-w-4xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.backButton}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2>{t.title}</h2>
                  <p className="text-sm text-muted-foreground">{t.subtitle}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="studentId">{t.studentIdLabel}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="studentId"
                      type="text"
                      value={studentId}
                      onChange={(e) => {
                        setStudentId(e.target.value);
                        setError("");
                      }}
                      placeholder={t.studentIdPlaceholder}
                      className="pl-10"
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-destructive">{error}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" size="lg">
                  {t.loginButton}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Quick Access */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 h-full">
              <h3 className="mb-6">{t.quickAccess}</h3>
              <div className="space-y-3">
                {students.slice(0, 3).map((student) => (
                  <Card
                    key={student.id}
                    className="p-4 cursor-pointer hover:shadow-md transition-all hover:scale-105 active:scale-95 border-2"
                    onClick={() => handleQuickLogin(student)}
                    style={{ borderColor: student.avatarColor }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: student.avatarColor }}
                      >
                        <span className="text-xl">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p>{student.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Grade {student.grade}</span>
                          <span>•</span>
                          <span>Level {student.level}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm">
                          <span>{student.streakDays}</span>
                          <span>days</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{student.points} pts</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export { StudentLogin };