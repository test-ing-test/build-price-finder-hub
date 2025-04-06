
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Building, Users, ShieldCheck, Globe } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-6">About BuildPrice</h1>
          <p className="text-xl text-construction-gray">
            Connecting builders and homeowners with accurate pricing information for construction materials.
          </p>
        </div>
        
        {/* Our Mission */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-4">Transparency in Construction Pricing</h3>
              <p className="text-lg text-construction-gray mb-4">
                At BuildPrice, we believe that transparent pricing information is essential for making informed decisions about construction projects.
              </p>
              <p className="text-lg text-construction-gray">
                Our platform brings together pricing data from multiple suppliers, making it easy for builders, contractors, and homeowners to compare costs and plan their projects with confidence.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt="Construction workers reviewing plans" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
        
        {/* Values */}
        <section className="mb-16 bg-gray-50 py-16 -mx-4 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardContent className="pt-8 pb-6 px-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-construction-blue/10 mb-4">
                    <Building className="h-8 w-8 text-construction-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Quality</h3>
                  <p className="text-construction-gray">
                    We thoroughly vet all suppliers and materials listed on our platform to ensure quality information.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-8 pb-6 px-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-construction-blue/10 mb-4">
                    <Users className="h-8 w-8 text-construction-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Community</h3>
                  <p className="text-construction-gray">
                    We build connections between suppliers, contractors, and homeowners for better project outcomes.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-8 pb-6 px-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-construction-blue/10 mb-4">
                    <ShieldCheck className="h-8 w-8 text-construction-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Trust</h3>
                  <p className="text-construction-gray">
                    We provide reliable, up-to-date pricing information you can count on for your projects.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-8 pb-6 px-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-construction-blue/10 mb-4">
                    <Globe className="h-8 w-8 text-construction-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                  <p className="text-construction-gray">
                    We promote sustainable building practices and materials that are good for the planet.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-construction-blue rounded-full w-12 h-12 flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Browse Materials</h3>
              <p className="text-construction-gray">
                Search our extensive catalog of construction materials categorized by type, use, and brand.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-construction-blue rounded-full w-12 h-12 flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Create Estimates</h3>
              <p className="text-construction-gray">
                Add materials to your cart to generate detailed cost estimates for your construction projects.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-construction-blue rounded-full w-12 h-12 flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Contact Suppliers</h3>
              <p className="text-construction-gray">
                Connect directly with material suppliers using the provided contact information.
              </p>
            </div>
          </div>
        </section>
        
        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Do you sell construction materials?</h3>
                <p className="text-construction-gray">
                  No, BuildPrice is not a retailer or supplier. We provide pricing information and connect you with suppliers who sell the materials. We do not handle transactions or deliveries.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">How accurate are the prices?</h3>
                <p className="text-construction-gray">
                  We strive to maintain accurate pricing information, but prices may vary based on location, quantity, special promotions, and other factors. Always confirm final pricing with suppliers before making purchase decisions.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Can I order materials directly from your website?</h3>
                <p className="text-construction-gray">
                  No, you cannot place orders through our platform. BuildPrice serves as an information resource. You'll need to contact suppliers directly using the information provided to place orders.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">How often are prices updated?</h3>
                <p className="text-construction-gray">
                  We work with suppliers to update prices regularly, but market conditions can change rapidly. Always verify current pricing with suppliers before finalizing your project budget.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
