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
import { Slider } from "@/components/ui/slider";

const breastCancerSchema = z.object({
  radius: z.number().min(0).max(50),
  texture: z.number().min(0).max(50),
  perimeter: z.number().min(0).max(200),
  area: z.number().min(0).max(2500),
  smoothness: z.number().min(0).max(1),
  compactness: z.number().min(0).max(1),
  concavity: z.number().min(0).max(1),
});

type BreastCancerForm = z.infer<typeof breastCancerSchema>;

export default function BreastCancerDetection() {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const form = useForm<BreastCancerForm>({
    resolver: zodResolver(breastCancerSchema),
    defaultValues: {
      radius: 15,
      texture: 20,
      perimeter: 100,
      area: 750,
      smoothness: 0.5,
      compactness: 0.5,
      concavity: 0.5,
    },
  });

  // 🔥 UPDATED FUNCTION: Real API call to backend!
  /*async function onSubmit(data: BreastCancerForm) {
    try {
      setIsAnalyzing(true);

      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction!");
      }

      const result = await response.json();

      toast({
        title: "Analysis Complete",
        description: `Prediction: ${result.result}. Please consult a healthcare professional for accurate diagnosis.`,
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
  }*/
  async function onSubmit(data: BreastCancerForm) {
    try {
      setIsAnalyzing(true);

      // Convert all to numbers explicitly:
      const cleanedData = {
        radius: Number(data.radius),
        texture: Number(data.texture),
        perimeter: Number(data.perimeter),
        area: Number(data.area),
        smoothness: Number(data.smoothness),
        compactness: Number(data.compactness),
        concavity: Number(data.concavity),
      };

      const response = await fetch("http://localhost:8001/predict", {
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
        description: `Prediction: ${result.result}. Please consult a healthcare professional for accurate diagnosis.`,
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
        {/** Radius */}
        <FormField
          control={form.control}
          name="radius"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mean Radius: {field.value.toFixed(2)}</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={50}
                  step={0.01}
                  defaultValue={[field.value]}
                  onValueChange={([value]) => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/** Texture */}
        <FormField
          control={form.control}
          name="texture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mean Texture: {field.value.toFixed(2)}</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={50}
                  step={0.01}
                  defaultValue={[field.value]}
                  onValueChange={([value]) => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/** Perimeter */}
        <FormField
          control={form.control}
          name="perimeter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mean Perimeter: {field.value.toFixed(2)}</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={200}
                  step={0.1}
                  defaultValue={[field.value]}
                  onValueChange={([value]) => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/** Area */}
        <FormField
          control={form.control}
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mean Area: {field.value.toFixed(2)}</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={2500}
                  step={1}
                  defaultValue={[field.value]}
                  onValueChange={([value]) => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/** Smoothness */}
        <FormField
          control={form.control}
          name="smoothness"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mean Smoothness: {field.value.toFixed(3)}</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={1}
                  step={0.001}
                  defaultValue={[field.value]}
                  onValueChange={([value]) => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/** Compactness */}
        <FormField
          control={form.control}
          name="compactness"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mean Compactness: {field.value.toFixed(3)}</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={1}
                  step={0.001}
                  defaultValue={[field.value]}
                  onValueChange={([value]) => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/** Concavity */}
        <FormField
          control={form.control}
          name="concavity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mean Concavity: {field.value.toFixed(3)}</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={1}
                  step={0.001}
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
