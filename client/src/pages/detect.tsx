import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { STOCK_PHOTOS } from "@/lib/constants";
import DiabetesDetection from "@/components/diseases/DiabetesDetection";
import HeartDiseaseDetection from "@/components/diseases/HeartDiseaseDetection";
import ParkinsonsDetection from "@/components/diseases/ParkinsonsDetection";
import BreastCancerDetection from "@/components/diseases/BreastCancerDetection";
import RespiratoryDetection from "@/components/diseases/RespiratoryDetection";
import { motion, AnimatePresence } from "framer-motion";

const formVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

const TabContent = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={formVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export default function Detect() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container py-12"
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Disease Detection</h1>
        <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
          Select a disease type and enter the required parameters for AI-powered analysis.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="aspect-video rounded-lg overflow-hidden mb-6">
                <img
                  src={STOCK_PHOTOS.medical[1]}
                  alt="Medical Analysis"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
              <ol className="space-y-4 text-muted-foreground">
                <li>1. Select the type of disease to analyze</li>
                <li>2. Enter the required medical parameters</li>
                <li>3. Our AI model analyzes the data</li>
                <li>4. Get preliminary insights about possible conditions</li>
              </ol>
              <p className="mt-6 text-sm text-muted-foreground">
                Note: This tool is for informational purposes only and should not replace professional medical advice.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Disease Detection Forms */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-8"
        >
          <Tabs defaultValue="diabetes" className="w-full">
            <TabsList className="flex flex-wrap gap-2 w-full">
              <TabsTrigger value="diabetes" className="flex-1">Diabetes</TabsTrigger>
              <TabsTrigger value="heart" className="flex-1">Heart Disease</TabsTrigger>
              <TabsTrigger value="parkinsons" className="flex-1">Parkinson's</TabsTrigger>
              <TabsTrigger value="breast_cancer" className="flex-1">Breast Cancer</TabsTrigger>
              <TabsTrigger value="respiratory" className="flex-1">Respiratory</TabsTrigger>
            </TabsList>
            <div className="mt-8 overflow-y-auto max-h-[600px] p-4 rounded-lg border bg-card">
              <AnimatePresence mode="wait">
                <TabsContent value="diabetes" className="mt-0">
                  <TabContent>
                    <DiabetesDetection />
                  </TabContent>
                </TabsContent>
                <TabsContent value="heart" className="mt-0">
                  <TabContent>
                    <HeartDiseaseDetection />
                  </TabContent>
                </TabsContent>
                <TabsContent value="parkinsons" className="mt-0">
                  <TabContent>
                    <ParkinsonsDetection />
                  </TabContent>
                </TabsContent>
                <TabsContent value="breast_cancer" className="mt-0">
                  <TabContent>
                    <BreastCancerDetection />
                  </TabContent>
                </TabsContent>
                <TabsContent value="respiratory" className="mt-0">
                  <TabContent>
                    <RespiratoryDetection />
                  </TabContent>
                </TabsContent>
              </AnimatePresence>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  );
}