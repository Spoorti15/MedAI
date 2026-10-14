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

const respiratorySchema = z.object({
  temperature: z.number().min(35).max(42),
  cough: z.coerce.number().min(0).max(1),
  breathingRate: z.number().min(10).max(40),
  oxygenLevel: z.number().min(70).max(100),
  chestPain: z.coerce.number().min(0).max(1),
});

type RespiratoryForm = z.infer<typeof respiratorySchema>;

export default function RespiratoryDetection() {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const form = useForm<RespiratoryForm>({
    resolver: zodResolver(respiratorySchema),
    defaultValues: {
      temperature: 37,
      cough: 0,
      breathingRate: 16,
      oxygenLevel: 98,
      chestPain: 0,
    },
  });

  async function onSubmit(data: RespiratoryForm) {
    try {
      setIsAnalyzing(true);

      const response = await fetch(
        "http://localhost:8001/predict-respiratory",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

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
          name="temperature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Body Temperature: {field.value.toFixed(1)}°C
              </FormLabel>
              <FormControl>
                <Slider
                  min={35}
                  max={42}
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
          name="cough"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Presence of Cough</FormLabel>
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
          name="breathingRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Breathing Rate: {field.value} breaths/min</FormLabel>
              <FormControl>
                <Slider
                  min={10}
                  max={40}
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
          name="oxygenLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Oxygen Level: {field.value}%</FormLabel>
              <FormControl>
                <Slider
                  min={70}
                  max={100}
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
          name="chestPain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chest Pain</FormLabel>
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

        <Button type="submit" className="w-full" disabled={isAnalyzing}>
          {isAnalyzing ? "Analyzing..." : "Analyze"}
        </Button>
      </form>
    </Form>
  );
}
