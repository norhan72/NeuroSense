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
      toast.warning("يُنصح بمراجعة طبيب أعصاب لإجراء فحوصات إضافية");
    } else {
      toast.success("تم حفظ النتائج بنجاح");
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
            استبيان التحليل المبكر
          </h1>
          <p className="text-muted-foreground">اجب على الأسئلة التالية بدقة للحصول على تقييم مبدئي</p>
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
                <h3 className="text-xl font-bold mb-2">النتيجة: {totalScore} نقطة</h3>
                {totalScore >= 6 ? (
                  <p className="text-base">
                    قد تكون لديك أعراض أولية مشابهة لمرض التصلّب المتعدد. 
                    <strong> يُنصح بمراجعة طبيب أعصاب لإجراء فحوصات إضافية.</strong>
                  </p>
                ) : (
                  <p className="text-base">
                    الأعراض المذكورة ليست مؤشرًا قويًا للمرض، لكن يُنصح بمتابعة طبيب إذا تفاقمت الأعراض.
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
             القسم 1: الصوت والنُطق
              </h2>
              <div className="space-y-4">
                <QuestionItem
                  name="q1"
                  label="هل لاحظت مؤخرًا إن صوتك اتغيّر؟"
                  subQuestions={[
                    { name: "q1a", label: "هل بقى صوتك أهدى أو فيه بُحّة ملحوظة؟" },
                    { name: "q1b", label: "هل بتحس إنك بتحتاج تبذل مجهود علشان تتكلم بصوت واضح؟" },
                    { name: "q1c", label: "هل في لحظات بتحس إن نطق الحروف بيتغير أو مش مضبوط زي قبل؟" },
                    { name: "q1d", label: "هل صوتك بيتغير حسب وقت اليوم (أسوأ الصبح أو بالليل)؟" },
                  ]}
                />
                <QuestionItem
                  name="q2"
                  label="هل لاحظت إن نغمة صوتك أو طبقة الصوت بتتهزّ أو بتتغير بشكل غير طبيعي؟"
                  subQuestions={[
                    { name: "q2a", label: "هل التغيّر ده مستمر ولا بيظهر بس لما تتعب؟" },
                    { name: "q2b", label: "هل بيحصل كمان لما تتوتر أو تبذل مجهود؟" },
                  ]}
                />
              </div>
            </div>

            {/* Section 2: Movement */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                 القسم 2: الحركة والإحساس
              </h2>
              <div className="space-y-4">
                <QuestionItem
                  name="q3"
                  label="هل بيجيلك وخز أو تنميل في إيدك أو رجلك؟"
                  subQuestions={[
                    { name: "q3a", label: "هل التنميل بيستمر أكتر من 24 ساعة؟" },
                    { name: "q3b", label: "هل بيتكرر في نفس المكان أو بيتنقل؟" },
                    { name: "q3c", label: "هل بيزيد مع الحرارة أو التعب؟" },
                  ]}
                />
                <QuestionItem
                  name="q4"
                  label="هل بتحس بضعف مفاجئ أو مؤقت في ذراعك أو رجلك؟"
                  subQuestions={[
                    { name: "q4a", label: "هل الضعف بيمنعك مؤقتًا من أداء مهام بسيطة؟" },
                    { name: "q4b", label: "هل بتحس إن الإحساس بالعضلة بيرجع بعد وقت؟" },
                  ]}
                />
                <QuestionItem
                  name="q5"
                  label="هل حصل إنك فقدت توازنك فجأة أو حسيت إن الأرض بتلف؟"
                  subQuestions={[
                    { name: "q5a", label: "هل بتحصل النوبات دي أثناء المشي أو الوقوف فقط؟" },
                    { name: "q5b", label: "هل بتحس إنك لازم تمسك حاجة علشان ما تقعش؟" },
                  ]}
                />
              </div>
            </div>

            {/* Section 3: Vision */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                 القسم 3: الرؤية
              </h2>
              <div className="space-y-4">
                <QuestionItem
                  name="q6"
                  label="هل حصل إن نظرك ضعف فجأة أو شُفت ضباب قدام عينك؟"
                  subQuestions={[
                    { name: "q6a", label: "هل في عين واحدة فقط؟" },
                    { name: "q6b", label: "هل بتحس بألم في العين وقت الحركة؟" },
                    { name: "q6c", label: "هل رجع نظرك طبيعي بعد أيام أو لسه متأثر؟" },
                  ]}
                />
                <QuestionItem
                  name="q7"
                  label="هل بتشوف ومضات أو بقع ضوء غريبة أحيانًا؟"
                  subQuestions={[
                    { name: "q7a", label: "هل بتحصل مع إجهاد العين؟" },
                    { name: "q7b", label: "هل بتيجي في نفس العين أو بتتنقل؟" },
                  ]}
                />
              </div>
            </div>

            {/* Section 4: Cognitive */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                 القسم 4: التركيز والطاقة
              </h2>
              <div className="space-y-4">
                <QuestionItem
                  name="q8"
                  label="هل بتنسى حاجات بسيطة أكتر من الأول؟"
                  subQuestions={[
                    { name: "q8a", label: "هل النسيان بيأثر على الشغل أو الدراسة؟" },
                    { name: "q8b", label: "هل بيزيد مع التعب أو قلة النوم؟" },
                  ]}
                />
                <QuestionItem
                  name="q9"
                  label="هل طاقتك اليومية قلت حتى لو بتنام كويس؟"
                  subQuestions={[
                    { name: "q9a", label: "هل بتحس بإرهاق ذهني (مش بس تعب جسدي)؟" },
                    { name: "q9b", label: "هل التعب بيزيد مع الجو الحار؟" },
                  ]}
                />
              </div>
            </div>

            {/* Section 5: Pain */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                 القسم 5: الألم والتحكم في الجسم
              </h2>
              <div className="space-y-4">
                <QuestionItem
                  name="q10"
                  label="هل بتحس بألم غريب (زي لسعة كهربا أو حرقان) بدون سبب واضح؟"
                  subQuestions={[
                    { name: "q10a", label: "هل الألم بيظهر في نفس المنطقة؟" },
                    { name: "q10b", label: "هل بيزيد مع الحركة أو لمس الجلد؟" },
                  ]}
                />
                <QuestionItem
                  name="q11"
                  label="هل بتواجه صعوبة في التحكم في البول أو بتحس بحاجة مفاجئة للتبول؟"
                  subQuestions={[
                    { name: "q11a", label: "هل بتحصل بشكل متكرر؟" },
                    { name: "q11b", label: "هل بتصاحبها تنميل أسفل الظهر أو البطن؟" },
                  ]}
                />
              </div>
            </div>

            {/* Section 6: Mood */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                 القسم 6: المزاج والنوم
              </h2>
              <div className="space-y-4">
                <QuestionItem
                  name="q12"
                  label="هل مزاجك بيتغير بسرعة أو بتحس باكتئاب أو قلق مؤخرًا؟"
                  subQuestions={[
                    { name: "q12a", label: "هل التغيرات دي بدأت مع الأعراض الجسدية؟" },
                    { name: "q12b", label: "هل بتحس إن نومك اتأثر؟" },
                  ]}
                />
                <QuestionItem
                  name="q13"
                  label="هل نومك بقى متقطع أو بتصحى أكتر من مرة في الليل بدون سبب؟"
                  subQuestions={[
                    { name: "q13a", label: "هل السبب ألم أو تنميل أو تقلصات في الرجل؟" },
                    { name: "q13b", label: "هل بتحس بتعب في اليوم التالي حتى لو نمت كفاية؟" },
                  ]}
                />
              </div>
            </div>

            {/* Section 7: History */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                القسم 7: التاريخ المرضي والعائلة
              </h2>
              <div className="space-y-4">
                <QuestionItem
                  name="q14"
                  label="هل في حد من عيلتك مصاب بمرض التصلّب المتعدد أو أمراض مناعة؟"
                  subQuestions={[
                    { name: "q14a", label: "قريب من الدرجة الأولى؟ (أب، أم، أخ، أخت)" },
                    { name: "q14b", label: "هل عنده أعراض مشابهة لأعراضك؟" },
                  ]}
                />
                <QuestionItem
                  name="q15"
                  label="هل سبق وعملت أشعة رنين على المخ أو النخاع الشوكي؟"
                  subQuestions={[
                    { name: "q15a", label: "هل الطبيب قالك إن فيه التهابات أو بقع بيضاء في النخاع أو المخ؟" },
                    { name: "q15b", label: "هل اتقالك إن الحالة ممكن تكون MS أو اشتباه؟" },
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
                رجوع
              </Button>
              <Button
                type="submit"
                className="flex-1 text-lg py-6 font-bold"
                style={{
                  background: 'var(--gradient-primary)',
                  transition: 'var(--transition-smooth)'
                }}
              >
                حساب النتيجة
              </Button>
            </div>
          </form>
        </Form>

        <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border/30">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p>هذا الاستبيان للتقييم المبدئي فقط وليس بديلاً عن الاستشارة الطبية</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
