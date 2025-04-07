
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { getCategories, getAllMaterials } from '@/services/materialService';
import MaterialCard from '@/components/MaterialCard';
import { Search, Calculator, Tag, Phone, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ConstructionScene from '@/components/ConstructionScene';
import { useAuth } from '@/context/AuthContext';
import LoginModal from '@/components/LoginModal';

const MotionLink = motion(Link);
const MotionCard = motion(Card);

const Index = () => {
  const categories = getCategories();
  const featuredMaterials = getAllMaterials().slice(0, 4);
  const { isAuthenticated } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);

  const handleEstimateClick = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-construction-blue to-construction-darkBlue text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
          <motion.div 
            className="max-w-3xl lg:w-1/2 mb-8 lg:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find the Best Prices for Construction Materials
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              Compare prices from different suppliers and get accurate cost estimates for your building projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  asChild
                  className="bg-white text-construction-blue hover:bg-gray-100 h-12 px-6 text-lg"
                >
                  <Link to="/materials">Browse Materials</Link>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isAuthenticated ? (
                  <Button 
                    asChild
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10 h-12 px-6 text-lg"
                  >
                    <Link to="/cart">Create Estimate</Link>
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10 h-12 px-6 text-lg"
                    onClick={() => setIsLoginModalOpen(true)}
                  >
                    Create Estimate
                  </Button>
                )}
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 ml-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ConstructionScene />
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">How BuildPrice Helps You</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <MotionCard 
              className="text-center p-6 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <CardContent className="pt-6">
                <motion.div 
                  className="mx-auto w-16 h-16 flex items-center justify-center bg-construction-blue/10 rounded-full mb-4"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Search className="h-8 w-8 text-construction-blue" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">Find Materials</h3>
                <p className="text-gray-600">
                  Search our extensive catalog of construction materials from various suppliers.
                </p>
              </CardContent>
            </MotionCard>
            
            <MotionCard 
              className="text-center p-6 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <CardContent className="pt-6">
                <motion.div 
                  className="mx-auto w-16 h-16 flex items-center justify-center bg-construction-blue/10 rounded-full mb-4"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Tag className="h-8 w-8 text-construction-blue" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">Compare Prices</h3>
                <p className="text-gray-600">
                  View transparent pricing and make informed decisions for your projects.
                </p>
              </CardContent>
            </MotionCard>
            
            <MotionCard 
              className="text-center p-6 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <CardContent className="pt-6">
                <motion.div 
                  className="mx-auto w-16 h-16 flex items-center justify-center bg-construction-blue/10 rounded-full mb-4"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Calculator className="h-8 w-8 text-construction-blue" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">Create Estimates</h3>
                <p className="text-gray-600">
                  Build a materials list and get accurate cost estimates for your projects.
                </p>
              </CardContent>
            </MotionCard>
            
            <MotionCard 
              className="text-center p-6 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <CardContent className="pt-6">
                <motion.div 
                  className="mx-auto w-16 h-16 flex items-center justify-center bg-construction-blue/10 rounded-full mb-4"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Phone className="h-8 w-8 text-construction-blue" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">Contact Suppliers</h3>
                <p className="text-gray-600">
                  Connect directly with material suppliers for purchases and inquiries.
                </p>
              </CardContent>
            </MotionCard>
          </div>
        </div>
      </section>

      {/* Featured Materials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <motion.h2 
              className="text-3xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Featured Materials
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild variant="outline">
                <Link to="/materials" className="flex items-center">
                  View All 
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMaterials.map((material, index) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <MaterialCard material={material} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Browse By Category
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <MotionLink 
                key={category} 
                to={`/materials?category=${encodeURIComponent(category)}`}
                className="p-6 border rounded-lg text-center hover:bg-construction-blue/5 hover:border-construction-blue transition-colors"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
                }}
              >
                <h3 className="text-lg font-medium text-construction-blue">{category}</h3>
              </MotionLink>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-construction-orange to-[#ff5823] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Start Your Project?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Browse our materials catalog and create a detailed cost estimate for your construction project today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAuthenticated ? (
              <Button 
                asChild
                className="bg-white text-construction-orange hover:bg-gray-100 h-12 px-8 text-lg"
              >
                <Link to="/materials">Get Started</Link>
              </Button>
            ) : (
              <Button 
                className="bg-white text-construction-orange hover:bg-gray-100 h-12 px-8 text-lg"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Get Started
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      <LoginModal isOpen={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />
    </Layout>
  );
};

export default Index;
