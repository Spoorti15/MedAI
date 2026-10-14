import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const heartDiseaseSchema = z.object({
  age: z.number().min(0).max(120),
  sex: z.coerce.number().min(0).max(1),
  chestPainType: z.coerce.number().min(0).max(3),
  restingBP: z.number().min(80).max(200),
  cholesterol: z.number().min(100).max(600),
  fastingBS: z.coerce.number().min(0).max(1),
  restingECG: z.coerce.number().min(0).max(2),
  maxHR: z.number().min(60).max(220),
  exerciseAngina: z.coerce.number().min(0).max(1),
  oldpeak: z.number().min(-3).max(6),
  slope: z.coerce.number().min(0).max(2),
  ca: z.coerce.number().min(0).max(4),
  thal: z.coerce.number().min(0).max(3),
});

type HeartDiseaseForm = z.infer<typeof heartDiseaseSchema>;

export default function HeartDiseaseDetection() {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const form = useForm<HeartDiseaseForm>({
    resolver: zodResolver(heartDiseaseSchema),
    defaultValues: {
      age: 40,
      sex: 0,
      chestPainType: 0,
      restingBP: 120,
      cholesterol: 200,
      fastingBS: 0,
      restingECG: 0,
      maxHR: 150,
      exerciseAngina: 0,
      oldpeak: 0,
      slope: 0,
      ca: 0,
      thal: 0,
    },
  });

  async function onSubmit(data: HeartDiseaseForm) {
    try {
      setIsAnalyzing(true);

      // Send API request to backend
      const cleanedData = {
        ...data,
        age: Number(data.age),
        restingBP: Number(data.restingBP),
        cholesterol: Number(data.cholesterol),
        maxHR: Number(data.maxHR),
        oldpeak: Number(data.oldpeak),
      };

      const response = await fetch("http://localhost:8001/predict-heart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction!");
      }

      const result = await response.json();

      toast({
        title: "Analysis Complete",
        description: `Prediction: ${result.result}. Please consult with a healthcare professional.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to analyze data. Please try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age: {field.value} years</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={120}
                  step={1}
                  defaultValue={[field.value]}
                  onValueChange={([value]) => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sex</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">Female</SelectItem>
                  <SelectItem value="1">Male</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="chestPainType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chest Pain Type</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">Typical Angina</SelectItem>
                  <SelectItem value="1">Atypical Angina</SelectItem>
                  <SelectItem value="2">Non-anginal Pain</SelectItem>
                  <SelectItem value="3">Asymptomatic</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="restingBP"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resting Blood Pressure: {field.value} mm Hg</FormLabel>
              <FormControl>
                <Slider
                  min={80}
                  max={200}
                  step={1}
                  defaultValue={[field.value]}
                  onValueChange={([value]) => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cholesterol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cholesterol: {field.value} mg/dL</FormLabel>
              <FormControl>
                <Slider
                  min={100}
                  max={600}
                  step={1}
                  defaultValue={[field.value]}
                  onValueChange={([value]) => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fastingBS"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fasting Blood Sugar {">"}120 mg/dL</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">No</SelectItem>
                  <SelectItem value="1">Yes</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="restingECG"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resting ECG</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select result" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">Normal</SelectItem>
                  <SelectItem value="1">ST-T Wave Abnormality</SelectItem>
                  <SelectItem value="2">
                    Left Ventricular Hypertrophy
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxHR"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Heart Rate: {field.value} bpm</FormLabel>
              <FormControl>
                <Slider
                  min={60}
                  max={220}
                  step={1}
                  defaultValue={[field.value]}
                  onValueChange={([value]) => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="exerciseAngina"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercise Induced Angina</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">No</SelectItem>
                  <SelectItem value="1">Yes</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="oldpeak"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                ST Depression (Oldpeak): {field.value.toFixed(1)}
              </FormLabel>
              <FormControl>
                <Slider
                  min={-3}
                  max={6}
                  step={0.1}
                  defaultValue={[field.value]}
                  onValueChange={([value]) => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slope"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ST Segment Slope</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select slope" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">Upsloping</SelectItem>
                  <SelectItem value="1">Flat</SelectItem>
                  <SelectItem value="2">Downsloping</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ca"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Major Vessels</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thalassemia</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">Normal</SelectItem>
                  <SelectItem value="1">Fixed Defect</SelectItem>
                  <SelectItem value="2">Reversible Defect</SelectItem>
                  <SelectItem value="3">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isAnalyzing}>
          {isAnalyzing ? "Analyzing..." : "Analyze"}
        </Button>
      </form>
    </Form>
  );
}
