import { STOCK_PHOTOS } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="container py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
          We're dedicated to revolutionizing healthcare through artificial intelligence and expert analysis.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="aspect-video rounded-lg overflow-hidden">
          <img
            src={STOCK_PHOTOS.about[0]}
            alt="Our Mission"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground">
            To make advanced disease detection accessible to everyone through innovative technology and artificial intelligence. We believe in empowering individuals with the tools they need to make informed decisions about their health.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="pt-6">
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src={STOCK_PHOTOS.team[0]}
                  alt="Development Team"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Development Team</h3>
              <p className="text-muted-foreground">
                Our skilled developers work tirelessly to create and maintain our cutting-edge disease detection platform.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src={STOCK_PHOTOS.team[1]}
                  alt="Medical Experts"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Medical Experts</h3>
              <p className="text-muted-foreground">
                Experienced healthcare professionals ensure the accuracy and reliability of our disease detection system.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
