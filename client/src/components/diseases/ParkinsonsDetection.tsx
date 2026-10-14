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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const parkinsonsSchema = z.object({
  mdvpFo: z.coerce.number(),
  mdvpFhi: z.coerce.number(),
  mdvpFlo: z.coerce.number(),
  mdvpJitterPercent: z.coerce.number(),
  mdvpJitterAbs: z.coerce.number(),
  mdvpRAP: z.coerce.number(),
  mdvpPPQ: z.coerce.number(),
  jitterDDP: z.coerce.number(),
  mdvpShimmer: z.coerce.number(),
  mdvpShimmerDB: z.coerce.number(),
  mdvpAPQ: z.coerce.number(),
  shimmerDDA: z.coerce.number(),
  nhr: z.coerce.number(),
  hnr: z.coerce.number(),
  rpde: z.coerce.number(),
  dfa: z.coerce.number(),
  spread1: z.coerce.number(),
  spread2: z.coerce.number(),
  d2: z.coerce.number(),
  ppe: z.coerce.number(),
});

type ParkinsonsForm = z.infer<typeof parkinsonsSchema>;

export default function ParkinsonsDetection() {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const form = useForm<ParkinsonsForm>({
    resolver: zodResolver(parkinsonsSchema),
    defaultValues: {
      mdvpFo: 0,
      mdvpFhi: 0,
      mdvpFlo: 0,
      mdvpJitterPercent: 0,
      mdvpJitterAbs: 0,
      mdvpRAP: 0,
      mdvpPPQ: 0,
      jitterDDP: 0,
      mdvpShimmer: 0,
      mdvpShimmerDB: 0,
      mdvpAPQ: 0,
      shimmerDDA: 0,
      nhr: 0,
      hnr: 0,
      rpde: 0,
      dfa: 0,
      spread1: 0,
      spread2: 0,
      d2: 0,
      ppe: 0,
    },
  });

  async function onSubmit(data: ParkinsonsForm) {
    try {
      setIsAnalyzing(true);

      // 🔥 Make actual API call to backend
      const response = await fetch("http://localhost:8001/predict-parkinsons", {
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
        description: `Prediction: ${result.result}. Please consult a healthcare professional.`,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="mdvpFo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MDVP:Fo(Hz)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mdvpFhi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MDVP:Fhi(Hz)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mdvpFlo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MDVP:Flo(Hz)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mdvpJitterPercent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MDVP:Jitter(%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mdvpJitterAbs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MDVP:Jitter(Abs)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mdvpRAP"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MDVP:RAP</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mdvpPPQ"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MDVP:PPQ</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jitterDDP"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jitter:DDP</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mdvpShimmer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MDVP:Shimmer</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mdvpShimmerDB"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MDVP:Shimmer(dB)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mdvpAPQ"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MDVP:APQ</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shimmerDDA"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shimmer:DDA</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nhr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NHR</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hnr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>HNR</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rpde"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RPDE</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dfa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DFA</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="spread1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Spread1</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="spread2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Spread2</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="d2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>D2</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ppe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PPE</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full mt-6" disabled={isAnalyzing}>
          {isAnalyzing ? "Analyzing..." : "Analyze"}
        </Button>
      </form>
    </Form>
  );
}
