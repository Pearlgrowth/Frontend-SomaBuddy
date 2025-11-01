import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { BookOpen, Users, Heart, ArrowRight } from "lucide-react";

const RoleSelector = ({ onSelectRole, language }) => {
  const content = {
    en: {
      title: "How would you like to continue?",
      subtitle: "Choose your role to get started",
      student: {
        title: "I'm a Student",
        desc: "Start reading and learning",
        cta: "Start Reading"
      },
      teacher: {
        title: "I'm a Teacher",
        desc: "Manage students and track progress",
        cta: "Teacher Portal"
      },
      parent: {
        title: "I'm a Parent",
        desc: "Monitor your child's progress",
        cta: "Parent Portal"
      }
    },
    sw: {
      title: "Ungependa kuendelea vipi?",
      subtitle: "Chagua jukumu lako kuanza",
      student: {
        title: "Mimi ni Mwanafunzi",
        desc: "Anza kusoma na kujifunza",
        cta: "Anza Kusoma"
      },
      teacher: {
        title: "Mimi ni Mwalimu",
        desc: "Simamia wanafunzi na ufuatilie maendeleo",
        cta: "Kituo cha Walimu"
      },
      parent: {
        title: "Mimi ni Mzazi",
        desc: "Fuatilia maendeleo ya mtoto wako",
        cta: "Kituo cha Wazazi"
      }
    }
  };

  const t = content[language];

  const roles = [
    {
      type: 'student',
      Icon: BookOpen,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      ...t.student
    },
    {
      type: 'teacher',
      Icon: Users,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      ...t.teacher
    },
    {
      type: 'parent',
      Icon: Heart,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      ...t.parent
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="mb-2">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role, idx) => {
            const IconComponent = role.Icon;
            return (
              <motion.div
                key={role.type}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className={`p-8 text-center hover:shadow-2xl transition-all cursor-pointer group bg-gradient-to-br ${role.bgGradient} border-2 hover:border-opacity-50`}
                  onClick={() => onSelectRole(role.type)}
                >
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${role.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  
                  <h2 className="mb-3">{role.title}</h2>
                  <p className="text-muted-foreground mb-6">{role.desc}</p>
                  
                  <Button className={`w-full gap-2 bg-gradient-to-r ${role.gradient} hover:opacity-90`}>
                    {role.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { RoleSelector };