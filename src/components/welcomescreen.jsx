import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { motion } from "framer-motion";  // Note: Snippet has "motion/react" – use "framer-motion"
import { BookOpen, Mic, Star, Sparkles, Globe, Brain, Map, Trophy } from "lucide-react";

const WelcomeScreen = ({ onGetStarted, language, onLanguageChange }) => {
  const content = {
    en: {
      title: "Welcome to SomaBuddy",
      subtitle: "Your AI Reading Companion",
      tagline: "Transforming reading from a struggle into an empowering adventure",
      getStarted: "Get Started",
      forParents: "For Parents & Teachers",
      features: [
        { Icon: Mic, title: "Voice-First Learning", desc: "Read aloud with AI support" },
        { Icon: Brain, title: "AI Personalization", desc: "Adapts to your reading style" },
        { Icon: Map, title: "Kenyan Stories", desc: "Local folktales & adventures" },
        { Icon: Trophy, title: "Fun & Rewards", desc: "Earn points and badges" },
      ],
    },
    sw: {
      title: "Karibu SomaBuddy",
      subtitle: "Rafiki Wako wa Kusoma",
      tagline: "Kubadilisha kusoma kuwa safari ya nguvu",
      getStarted: "Anza Sasa",
      forParents: "Kwa Wazazi na Walimu",
      features: [
        { Icon: Mic, title: "Kujifunza kwa Sauti", desc: "Soma kwa sauti na msaada wa AI" },
        { Icon: Brain, title: "Kibinafsi cha AI", desc: "Inakifaa na mtindo wako" },
        { Icon: Map, title: "Hadithi za Kenya", desc: "Hadithi za asili na safari" },
        { Icon: Trophy, title: "Furaha na Tuzo", desc: "Pata pointi na beji" },
      ],
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1656266463511-2456b9640f66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY2hpbGQlMjByZWFkaW5nfGVufDF8fHx8MTc2MjAxMzY4NXww&ixlib=rb-4.1.0&q=80&w=1080')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Language Toggle */}
          <div className="flex justify-end mb-4">
            <Card className="p-2 flex items-center gap-2 bg-white/80 backdrop-blur-sm">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className={`text-sm ${language === 'en' ? 'opacity-100' : 'opacity-50'}`}>
                English
              </span>
              <Switch
                checked={language === 'sw'}
                onCheckedChange={(checked) => onLanguageChange(checked ? 'sw' : 'en')}
              />
              <span className={`text-sm ${language === 'sw' ? 'opacity-100' : 'opacity-50'}`}>
                Kiswahili
              </span>
            </Card>
          </div>

          {/* Hero Section */}
          <div className="text-center space-y-6 mb-12 pt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {t.title}
                </h1>
                <p className="text-xl text-muted-foreground">{t.subtitle}</p>
              </div>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                {t.tagline}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <Badge variant="secondary" className="gap-1 bg-white/80 backdrop-blur-sm">
                  <Sparkles className="w-3 h-3" />
                  AI-Powered
                </Badge>
                <Badge variant="secondary" className="gap-1 bg-white/80 backdrop-blur-sm">
                  <BookOpen className="w-3 h-3" />
                  Dyslexia-Friendly
                </Badge>
                <Badge variant="secondary" className="gap-1 bg-white/80 backdrop-blur-sm">
                  <Star className="w-3 h-3" />
                  CBC Aligned
                </Badge>
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {t.features.map((feature, idx) => {
              const IconComponent = feature.Icon;
              return (
                <Card
                  key={idx}
                  className="p-6 text-center hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </Card>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button size="lg" onClick={onGetStarted} className="gap-2 px-8 shadow-lg">
              <Sparkles className="w-5 h-5" />
              {t.getStarted}
            </Button>
            <Button size="lg" variant="outline" className="gap-2 px-8 bg-white/80 backdrop-blur-sm">
              <BookOpen className="w-5 h-5" />
              {t.forParents}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            <Card className="p-4 text-center bg-white/80 backdrop-blur-sm">
              <div className="text-3xl">10%</div>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? 'Kids with dyslexia' : 'Watoto wenye dyslexia'}
              </p>
            </Card>
            <Card className="p-4 text-center bg-white/80 backdrop-blur-sm">
              <div className="text-3xl">40%</div>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? 'Literacy gains' : 'Maboresho kusoma'}
              </p>
            </Card>
            <Card className="p-4 text-center bg-white/80 backdrop-blur-sm">
              <div className="text-3xl">100+</div>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? 'Stories available' : 'Hadithi zinapatikana'}
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};


export default WelcomeScreen;
