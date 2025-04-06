
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { getCategories, getAllMaterials } from '@/services/materialService';
import MaterialCard from '@/components/MaterialCard';
import { Search, Calculator, Tag, Phone } from 'lucide-react';

const Index = () => {
  const categories = getCategories();
  const featuredMaterials = getAllMaterials().slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-construction-blue to-construction-darkBlue text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find the Best Prices for Construction Materials
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              Compare prices from different suppliers and get accurate cost estimates for your building projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                className="bg-white text-construction-blue hover:bg-gray-100 h-12 px-6 text-lg"
              >
                <Link to="/materials">Browse Materials</Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="border-white text-white hover:bg-white/10 h-12 px-6 text-lg"
              >
                <Link to="/cart">Create Estimate</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How BuildPrice Helps You</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-construction-blue/10 rounded-full mb-4">
                  <Search className="h-8 w-8 text-construction-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Find Materials</h3>
                <p className="text-gray-600">
                  Search our extensive catalog of construction materials from various suppliers.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-construction-blue/10 rounded-full mb-4">
                  <Tag className="h-8 w-8 text-construction-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Compare Prices</h3>
                <p className="text-gray-600">
                  View transparent pricing and make informed decisions for your projects.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-construction-blue/10 rounded-full mb-4">
                  <Calculator className="h-8 w-8 text-construction-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Create Estimates</h3>
                <p className="text-gray-600">
                  Build a materials list and get accurate cost estimates for your projects.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-construction-blue/10 rounded-full mb-4">
                  <Phone className="h-8 w-8 text-construction-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Contact Suppliers</h3>
                <p className="text-gray-600">
                  Connect directly with material suppliers for purchases and inquiries.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Materials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Materials</h2>
            <Button asChild variant="outline">
              <Link to="/materials">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMaterials.map(material => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Browse By Category</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map(category => (
              <Link 
                key={category} 
                to={`/materials?category=${encodeURIComponent(category)}`}
                className="p-6 border rounded-lg text-center hover:bg-construction-blue/5 hover:border-construction-blue transition-colors"
              >
                <h3 className="text-lg font-medium text-construction-blue">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-construction-orange text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Browse our materials catalog and create a detailed cost estimate for your construction project today.
          </p>
          <Button 
            asChild
            className="bg-white text-construction-orange hover:bg-gray-100 h-12 px-8 text-lg"
          >
            <Link to="/materials">Get Started</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
