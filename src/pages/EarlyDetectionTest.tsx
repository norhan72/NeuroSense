import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const formSchema = z.object({
  // Section 1: Voice
  q1: z.boolean().default(false),
  q1a: z.boolean().default(false),
  q1b: z.boolean().default(false),
  q1c: z.boolean().default(false),
  q1d: z.boolean().default(false),
  q2: z.boolean().default(false),
  q2a: z.boolean().default(false),
  q2b: z.boolean().default(false),
  
  // Section 2: Movement
  q3: z.boolean().default(false),
  q3a: z.boolean().default(false),
  q3b: z.boolean().default(false),
  q3c: z.boolean().default(false),
  q4: z.boolean().default(false),
  q4a: z.boolean().default(false),
  q4b: z.boolean().default(false),
  q5: z.boolean().default(false),
  q5a: z.boolean().default(false),
  q5b: z.boolean().default(false),
  
  // Section 3: Vision
  q6: z.boolean().default(false),
  q6a: z.boolean().default(false),
  q6b: z.boolean().default(false),
  q6c: z.boolean().default(false),
  q7: z.boolean().default(false),
  q7a: z.boolean().default(false),
  q7b: z.boolean().default(false),
  
  // Section 4: Cognitive
  q8: z.boolean().default(false),
  q8a: z.boolean().default(false),
  q8b: z.boolean().default(false),
  q9: z.boolean().default(false),
  q9a: z.boolean().default(false),
  q9b: z.boolean().default(false),
  
  // Section 5: Pain
  q10: z.boolean().default(false),
  q10a: z.boolean().default(false),
  q10b: z.boolean().default(false),
  q11: z.boolean().default(false),
  q11a: z.boolean().default(false),
  q11b: z.boolean().default(false),
  
  // Section 6: Mood
  q12: z.boolean().default(false),
  q12a: z.boolean().default(false),
  q12b: z.boolean().default(false),
  q13: z.boolean().default(false),
  q13a: z.boolean().default(false),
  q13b: z.boolean().default(false),
  
  // Section 7: History
  q14: z.boolean().default(false),
  q14a: z.boolean().default(false),
  q14b: z.boolean().default(false),
  q15: z.boolean().default(false),
  q15a: z.boolean().default(false),
  q15b: z.boolean().default(false),
});

export default function EarlyDetectionTest() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      q1: false, q1a: false, q1b: false, q1c: false, q1d: false,
      q2: false, q2a: false, q2b: false,
      q3: false, q3a: false, q3b: false, q3c: false,
      q4: false, q4a: false, q4b: false,
      q5: false, q5a: false, q5b: false,
      q6: false, q6a: false, q6b: false, q6c: false,
      q7: false, q7a: false, q7b: false,
      q8: false, q8a: false, q8b: false,
      q9: false, q9a: false, q9b: false,
      q10: false, q10a: false, q10b: false,
      q11: false, q11a: false, q11b: false,
      q12: false, q12a: false, q12b: false,
      q13: false, q13a: false, q13b: false,
      q14: false, q14a: false, q14b: false,
      q15: false, q15a: false, q15b: false,
    },
  });

  const watchedValues = form.watch();

  const calculateScore = (values: z.infer<typeof formSchema>) => {
    let score = 0;
    
    // Main questions (1 point each)
    const mainQuestions = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14', 'q15'];
    mainQuestions.forEach(q => {
      if (values[q as keyof typeof values]) score += 1;
    });
    
    // Sub questions (0.5 points each)
    const allKeys = Object.keys(values) as (keyof typeof values)[];
    const subQuestions = allKeys.filter(key => key.length > 2); // Sub questions have format like q1a, q1b
    subQuestions.forEach(q => {
      if (values[q]) score += 0.5;
    });
    
    return score;
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const score = calculateScore(values);
    setTotalScore(score);
    setShowResults(true);
    
    localStorage.setItem('earlyDetectionResults', JSON.stringify({
      answers: values,
      score,
      timestamp: new Date().toISOString()
    }));
    
    if (score >= 6) {
      toast.warning(t('early.consultRecommended'));
    } else {
      toast.success(t('early.resultsSaved'));
    }
  };

  const QuestionItem = ({ 
    name, 
    label, 
    subQuestions 
  }: { 
    name: keyof z.infer<typeof formSchema>; 
    label: string; 
    subQuestions?: { name: keyof z.infer<typeof formSchema>; label: string }[] 
  }) => {
    const showSub = watchedValues[name];
    
    return (
      <div className="space-y-3 p-4 bg-muted/20 rounded-lg border border-border/30">
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex items-center space-x-3 space-x-reverse space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-base font-semibold cursor-pointer">
                {label}
              </FormLabel>
            </FormItem>
          )}
        />
        
        {showSub && subQuestions && subQuestions.length > 0 && (
          <div className="mr-8 space-y-2 pt-2 border-r-2 border-primary/30 pr-4">
            {subQuestions.map((subQ) => (
              <FormField
                key={subQ.name}
                control={form.control}
                name={subQ.name}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3 space-x-reverse space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm cursor-pointer">
                      {subQ.label}
                    </FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6">
      <Card className="max-w-4xl mx-auto p-8 bg-card/50 backdrop-blur-lg border-border/50">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2" style={{ 
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {t('early.title')}
          </h1>
          <p className="text-muted-foreground">{t('early.subtitle')}</p>
        </div>

        {showResults && (
          <div className={`mb-6 p-6 rounded-lg border-2 ${
            totalScore >= 6 
              ? 'bg-destructive/10 border-destructive' 
              : 'bg-green-500/10 border-green-500'
          }`}>
            <div className="flex items-start gap-3">
              {totalScore >= 6 ? (
                <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
              ) : (
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              )}
              <div>
                <h3 className="text-xl font-bold mb-2">{t('early.result')} {totalScore} {t('early.points')}</h3>
                {totalScore >= 6 ? (
                  <p className="text-base">
                    {t('early.highRisk')}
                    <strong> {t('early.consultDoctor')}</strong>
                  </p>
                ) : (
                  <p className="text-base">
                    {t('early.lowRisk')}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Section 1: Voice */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                {t('early.section1')}
              </h2>
              <div className="space-y-4">
                <QuestionItem
                  name="q1"
                  label={t('early.q1')}
                  subQuestions={[
                    { name: "q1a", label: t('early.q1a') },
                    { name: "q1b", label: t('early.q1b') },
                    { name: "q1c", label: t('early.q1c') },
                    { name: "q1d", label: t('early.q1d') },
                  ]}
                />
                <QuestionItem
                  name="q2"
                  label={t('early.q2')}
                  subQuestions={[
                    { name: "q2a", label: t('early.q2a') },
                    { name: "q2b", label: t('early.q2b') },
                  ]}
                />
              </div>
            </div>

            {/* Section 2: Movement */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                {t('early.section2')}
              </h2>
              <div className="space-y-4">
                <QuestionItem
                  name="q3"
                  label={t('early.q3')}
                  subQuestions={[
                    { name: "q3a", label: t('early.q3a') },
                    { name: "q3b", label: t('early.q3b') },
                    { name: "q3c", label: t('early.q3c') },
                  ]}
                />
                <QuestionItem
                  name="q4"
                  label={t('early.q4')}
                  subQuestions={[
                    { name: "q4a", label: t('early.q4a') },
                    { name: "q4b", label: t('early.q4b') },
                  ]}
                />
                <QuestionItem
                  name="q5"
                  label={t('early.q5')}
                  subQuestions={[
                    { name: "q5a", label: t('early.q5a') },
                    { name: "q5b", label: t('early.q5b') },
                  ]}
                />
              </div>
            </div>

            {/* Section 3: Vision */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                {t('early.section3')}
              </h2>
              <div className="space-y-4">
                <QuestionItem
                  name="q6"
                  label={t('early.q6')}
                  subQuestions={[
                    { name: "q6a", label: t('early.q6a') },
                    { name: "q6b", label: t('early.q6b') },
                    { name: "q6c", label: t('early.q6c') },
                  ]}
                />
                <QuestionItem
                  name="q7"
                  label={t('early.q7')}
                  subQuestions={[
                    { name: "q7a", label: t('early.q7a') },
                    { name: "q7b", label: t('early.q7b') },
                  ]}
                />
              </div>
            </div>

            {/* Section 4: Cognitive */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                {t('early.section4')}
              </h2>
              <div className="space-y-4">
                <QuestionItem
                  name="q8"
                  label={t('early.q8')}
                  subQuestions={[
                    { name: "q8a", label: t('early.q8a') },
                    { name: "q8b", label: t('early.q8b') },
                  ]}
                />
                <QuestionItem
                  name="q9"
                  label={t('early.q9')}
                  subQuestions={[
                    { name: "q9a", label: t('early.q9a') },
                    { name: "q9b", label: t('early.q9b') },
                  ]}
                />
              </div>
            </div>

            {/* Section 5: Pain */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                {t('early.section5')}
              </h2>
              <div className="space-y-4">
                <QuestionItem
                  name="q10"
                  label={t('early.q10')}
                  subQuestions={[
                    { name: "q10a", label: t('early.q10a') },
                    { name: "q10b", label: t('early.q10b') },
                  ]}
                />
                <QuestionItem
                  name="q11"
                  label={t('early.q11')}
                  subQuestions={[
                    { name: "q11a", label: t('early.q11a') },
                    { name: "q11b", label: t('early.q11b') },
                  ]}
                />
              </div>
            </div>

            {/* Section 6: Mood */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                {t('early.section6')}
              </h2>
              <div className="space-y-4">
                <QuestionItem
                  name="q12"
                  label={t('early.q12')}
                  subQuestions={[
                    { name: "q12a", label: t('early.q12a') },
                    { name: "q12b", label: t('early.q12b') },
                  ]}
                />
                <QuestionItem
                  name="q13"
                  label={t('early.q13')}
                  subQuestions={[
                    { name: "q13a", label: t('early.q13a') },
                    { name: "q13b", label: t('early.q13b') },
                  ]}
                />
              </div>
            </div>

            {/* Section 7: History */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                {t('early.section7')}
              </h2>
              <div className="space-y-4">
                <QuestionItem
                  name="q14"
                  label={t('early.q14')}
                  subQuestions={[
                    { name: "q14a", label: t('early.q14a') },
                    { name: "q14b", label: t('early.q14b') },
                  ]}
                />
                <QuestionItem
                  name="q15"
                  label={t('early.q15')}
                  subQuestions={[
                    { name: "q15a", label: t('early.q15a') },
                    { name: "q15b", label: t('early.q15b') },
                  ]}
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/input')}
                className="flex-1 text-lg py-6"
              >
                {t('input.back')}
              </Button>
              <Button
                type="submit"
                className="flex-1 text-lg py-6 font-bold"
                style={{
                  background: 'var(--gradient-primary)',
                  transition: 'var(--transition-smooth)'
                }}
              >
                {t('early.submitForm')}
              </Button>
            </div>
          </form>
        </Form>

        <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border/30">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p>{t('disability.disclaimer')}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
