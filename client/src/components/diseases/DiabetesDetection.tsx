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

const diabetesSchema = z.object({
  gender: z.string(),
  age: z.number().min(0).max(120),
  hypertension: z.coerce.number().min(0).max(1),
  heartDisease: z.coerce.number().min(0).max(1),
  bmi: z.number().min(10).max(50),
  hba1cLevel: z.number().min(3).max(9),
  bloodGlucoseLevel: z.number().min(70).max(300),
});

type DiabetesForm = z.infer<typeof diabetesSchema>;

export default function DiabetesDetection() {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const form = useForm<DiabetesForm>({
    resolver: zodResolver(diabetesSchema),
    defaultValues: {
      gender: "",
      age: 30,
      hypertension: 0,
      heartDisease: 0,
      bmi: 25,
      hba1cLevel: 5,
      bloodGlucoseLevel: 100,
    },
  });

  async function onSubmit(data: DiabetesForm) {
    try {
      setIsAnalyzing(true);

      // Explicitly send cleaned numeric + string data
      const cleanedData = {
        gender: data.gender,
        age: Number(data.age),
        hypertension: Number(data.hypertension),
        heartDisease: Number(data.heartDisease),
        bmi: Number(data.bmi),
        hba1cLevel: Number(data.hba1cLevel),
        bloodGlucoseLevel: Number(data.bloodGlucoseLevel),
      };

      const response = await fetch("http://localhost:8001/predict-diabetes", {
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
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

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
          name="hypertension"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hypertension</FormLabel>
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
          name="heartDisease"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Heart Disease</FormLabel>
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
          name="bmi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>BMI: {field.value.toFixed(1)} kg/m²</FormLabel>
              <FormControl>
                <Slider
                  min={10}
                  max={50}
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
          name="hba1cLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HbA1c Level: {field.value.toFixed(1)} %</FormLabel>
              <FormControl>
                <Slider
                  min={3}
                  max={9}
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
          name="bloodGlucoseLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blood Glucose Level: {field.value} mg/dL</FormLabel>
              <FormControl>
                <Slider
                  min={70}
                  max={300}
                  step={1}
                  defaultValue={[field.value]}
                  onValueChange={([value]) => field.onChange(value)}
                />
              </FormControl>
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
