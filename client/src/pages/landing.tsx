import { STOCK_PHOTOS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Search, Users, Activity } from "lucide-react";

export default function Landing() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="container flex flex-col items-center text-center pt-16 md:pt-24">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          Advanced Disease Detection <br />
          <span className="text-primary">Powered by AI</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-[600px] mb-8">
          Leveraging cutting-edge artificial intelligence to provide accurate and timely disease detection.
        </p>
        <Link href="/detect">
          <Button size="lg" className="gap-2">
            Try Disease Detection <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="container">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <Search className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Detection</h3>
              <p className="text-muted-foreground">
                Advanced algorithms analyze symptoms and medical data for accurate disease detection.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Users className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-muted-foreground">
                Backed by experienced healthcare professionals and data scientists.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Activity className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Results</h3>
              <p className="text-muted-foreground">
                Get instant analysis and recommendations for your health concerns.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">State-of-the-art Technology</h2>
            <p className="text-muted-foreground mb-6">
              Our platform combines advanced machine learning algorithms with medical expertise to provide accurate disease detection and analysis.
            </p>
            <Link href="/about">
              <Button variant="outline" className="gap-2">
                Learn More <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="aspect-video rounded-lg overflow-hidden">
            <img
              src={STOCK_PHOTOS.medical[0]}
              alt="Medical Technology"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
