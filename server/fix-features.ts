/**
 * Fix corrupted features data in Supabase database
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixFeaturesData() {
  console.log('🔧 Fixing corrupted features data...');
  
  try {
    // Get all services
    const services = await prisma.service.findMany();
    console.log(`Found ${services.length} services to fix`);
    
    for (const service of services) {
      console.log(`Fixing service: ${service.title}`);
      
      let cleanFeatures: string[] = [];
      
      // Define correct features for each service
      switch (service.title) {
        case 'Corporate Law':
          cleanFeatures = [
            'Company incorporation and registration',
            'Corporate governance and compliance',
            'Mergers and acquisitions',
            'Commercial contracts and agreements',
            'Securities law and regulations'
          ];
          break;
        case 'Litigation & Dispute Resolution':
          cleanFeatures = [
            'Civil and commercial litigation',
            'Alternative dispute resolution',
            'Arbitration and mediation',
            'Contract disputes',
            'Employment law disputes'
          ];
          break;
        case 'Real Estate Law':
          cleanFeatures = [
            'Property transactions and conveyancing',
            'Lease agreements and landlord-tenant law',
            'Land acquisition and development',
            'Property disputes and litigation',
            'Zoning and planning applications'
          ];
          break;
        case 'Employment Law':
          cleanFeatures = [
            'Employment contracts and policies',
            'Workplace investigations',
            'Discrimination and harassment claims',
            'Wrongful termination cases',
            'Labor relations and union matters'
          ];
          break;
        case 'Intellectual Property':
          cleanFeatures = [
            'Trademark registration and protection',
            'Copyright law and enforcement',
            'Patent applications and prosecution',
            'IP licensing agreements',
            'Trade secret protection'
          ];
          break;
        case 'Family Law':
          cleanFeatures = [
            'Divorce and separation proceedings',
            'Child custody and support',
            'Spousal support and alimony',
            'Property division and asset protection',
            'Adoption and guardianship'
          ];
          break;
        case 'Criminal Defense':
          cleanFeatures = [
            'White-collar crime defense',
            'Drug offense representation',
            'DUI and traffic violations',
            'Assault and battery cases',
            'Appeals and post-conviction relief'
          ];
          break;
        case 'Estate Planning':
          cleanFeatures = [
            'Wills & Testaments',
            'Trust Creation & Management',
            'Probate Administration',
            'Estate Tax Planning',
            'Power of Attorney',
            'Guardianship Matters'
          ];
          break;
        default:
          console.log(`Unknown service: ${service.title}`);
          continue;
      }
      
      // Update the service with clean features
      await prisma.service.update({
        where: { id: service.id },
        data: { features: cleanFeatures }
      });
      
      console.log(`✅ Fixed ${service.title} with ${cleanFeatures.length} features`);
    }
    
    console.log('🎉 All services fixed successfully!');
    
  } catch (error) {
    console.error('❌ Error fixing features data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixFeaturesData();
