import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

interface AnalysisData {
  patientName: string;
  age: string;
  symptoms: string;
  medicalHistory: string;
  timestamp: string;
}

export const Results = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedData = localStorage.getItem('currentAnalysis');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
    
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LanguageToggle />
        <Card className="p-8 text-center">
          <p className="text-xl mb-4">{t('results.noData')}</p>
          <Button onClick={() => navigate('/input')}>{t('results.newInput')}</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <LanguageToggle />
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold mb-2" style={{ 
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {t('results.title')}
          </h2>
          <p className="text-muted-foreground">{t('results.subtitle')}</p>
        </div>

        {loading ? (
          <Card className="p-12 bg-card/50 backdrop-blur-lg border-border/50">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xl font-semibold">{t('results.analyzing')}</p>
              <p className="text-muted-foreground">{t('results.processing')}</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Patient Info Card */}
            <Card className="p-6 bg-card/50 backdrop-blur-lg border-border/50">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              {t('results.patientInfo')}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{t('results.name')}</p>
                <p className="text-lg font-semibold">{data.patientName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('results.ageLabel')}</p>
                <p className="text-lg font-semibold">{data.age} {t('results.years')}</p>
              </div>
            </div>
            </Card>

            {/* Symptoms Card */}
            <Card className="p-6 bg-card/50 backdrop-blur-lg border-border/50">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {t('results.symptomsLabel')}
              </h3>
              <p className="text-lg leading-relaxed">{data.symptoms}</p>
            </Card>

            {/* Medical History Card */}
            {data.medicalHistory && (
              <Card className="p-6 bg-card/50 backdrop-blur-lg border-border/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    {t('results.medicalHistoryLabel')}
                  </h3>
                <p className="text-lg leading-relaxed">{data.medicalHistory}</p>
              </Card>
            )}

            {/* AI Analysis Card */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-lg border-primary/30">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 7H7v6h6V7z" />
                  <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                </svg>
                {t('results.aiAnalysis')}
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-card/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">{t('results.diagnosis')}</p>
                  <p className="text-lg">{t('results.diagnosisText')}</p>
                </div>
                <div className="p-4 bg-card/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">{t('results.recommendationsLabel')}</p>
                  <ul className="list-disc list-inside space-y-2 text-lg">
                    <li>{t('results.recommendation1')}</li>
                    <li>{t('results.recommendation2')}</li>
                    <li>{t('results.recommendation3')}</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
            <Button
              onClick={() => navigate('/input')}
              variant="outline"
              className="flex-1 text-lg py-6"
            >
              {t('results.newAnalysis')}
            </Button>
            <Button
              onClick={() => navigate('/')}
              className="flex-1 text-lg py-6 font-bold"
              style={{
                background: 'var(--gradient-primary)',
                transition: 'var(--transition-smooth)'
              }}
            >
              {t('results.home')}
            </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
