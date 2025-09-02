/**
 * Database seed script for MWC Advocates
 * Seeds the database with initial data for services, testimonials, and other content
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data (in development)
  if (process.env.NODE_ENV === 'development') {
    console.log('🧹 Clearing existing data...');
    await prisma.contactSubmission.deleteMany();
    await prisma.testimonial.deleteMany();
    await prisma.service.deleteMany();
  }

  // Seed Services
  console.log('📋 Seeding services...');
  const services = await prisma.service.createMany({
    data: [
      {
        title: 'Corporate Law',
        description: 'Comprehensive legal services for businesses of all sizes, from startups to established corporations.',
        icon: 'Building2',
        features: [
          'Business Formation & Registration',
          'Corporate Governance',
          'Mergers & Acquisitions',
          'Commercial Contracts',
          'Compliance & Regulatory Affairs',
          'Corporate Restructuring'
        ]
      },
      {
        title: 'Contract Law',
        description: 'Expert contract drafting, review, and dispute resolution to protect your business interests.',
        icon: 'FileText',
        features: [
          'Contract Drafting & Review',
          'Purchase & Sale Agreements',
          'Employment Contracts',
          'Non-Disclosure Agreements',
          'Service Agreements',
          'Contract Disputes & Enforcement'
        ]
      },
      {
        title: 'Employment Law',
        description: 'Protecting both employers and employees with comprehensive employment law services.',
        icon: 'Users',
        features: [
          'Employment Contracts',
          'Workplace Policies',
          'Wrongful Termination',
          'Discrimination Claims',
          'Labor Relations',
          'Employee Benefits'
        ]
      },
      {
        title: 'Real Estate Law',
        description: 'Complete legal support for all your real estate transactions and property matters.',
        icon: 'Home',
        features: [
          'Property Purchase & Sale',
          'Lease Agreements',
          'Property Development',
          'Zoning & Land Use',
          'Real Estate Disputes',
          'Title Searches & Insurance'
        ]
      },
      {
        title: 'Estate Planning',
        description: 'Secure your family\'s future with comprehensive estate planning and probate services.',
        icon: 'Shield',
        features: [
          'Wills & Testaments',
          'Trust Creation & Management',
          'Probate Administration',
          'Estate Tax Planning',
          'Power of Attorney',
          'Guardianship Matters'
        ]
      },
      {
        title: 'Family Law',
        description: 'Compassionate legal support for family matters during difficult times.',
        icon: 'Heart',
        features: [
          'Divorce & Separation',
          'Child Custody & Support',
          'Adoption Services',
          'Prenuptial Agreements',
          'Domestic Violence Protection',
          'Family Mediation'
        ]
      },
      {
        title: 'Personal Injury',
        description: 'Fighting for your rights and maximum compensation in personal injury cases.',
        icon: 'AlertTriangle',
        features: [
          'Motor Vehicle Accidents',
          'Workplace Injuries',
          'Medical Malpractice',
          'Slip & Fall Cases',
          'Product Liability',
          'Insurance Claims'
        ]
      },
      {
        title: 'Criminal Defense',
        description: 'Experienced criminal defense representation protecting your rights and freedom.',
        icon: 'Scale',
        features: [
          'Criminal Defense',
          'DUI/DWI Defense',
          'White Collar Crimes',
          'Appeals',
          'Expungement Services',
          'Bail & Bond Hearings'
        ]
      }
    ]
  });

  console.log(`✅ Created ${services.count} services`);

  // Seed Testimonials
  console.log('💬 Seeding testimonials...');
  const testimonials = await prisma.testimonial.createMany({
    data: [
      {
        name: 'Sarah Johnson',
        position: 'CEO',
        company: 'Tech Innovations Inc.',
        content: 'MWC Advocates provided exceptional legal guidance during our company merger. Their expertise in corporate law and attention to detail made the entire process smooth and successful. I highly recommend their services.',
        rating: 5,
        initials: 'SJ',
        isActive: true
      },
      {
        name: 'Michael Chen',
        position: 'Business Owner',
        company: 'Chen Construction',
        content: 'When I needed help with employment contracts and regulatory compliance, MWC Advocates delivered professional, thorough service. They explained everything clearly and protected my business interests perfectly.',
        rating: 5,
        initials: 'MC',
        isActive: true
      },
      {
        name: 'Emily Rodriguez',
        position: 'Property Developer',
        company: 'Rodriguez Real Estate',
        content: 'The real estate law expertise at MWC Advocates is outstanding. They handled our complex property development project flawlessly, navigating zoning issues and contracts with remarkable skill.',
        rating: 5,
        initials: 'ER',
        isActive: true
      },
      {
        name: 'David Thompson',
        position: 'Private Client',
        company: '',
        content: 'After a serious car accident, MWC Advocates fought tirelessly for my rights. They secured a settlement that exceeded my expectations and provided compassionate support throughout the process.',
        rating: 5,
        initials: 'DT',
        isActive: true
      },
      {
        name: 'Jennifer Williams',
        position: 'Entrepreneur',
        company: 'Williams Marketing Agency',
        content: 'Starting my business seemed overwhelming until I found MWC Advocates. Their corporate law team guided me through business formation, contracts, and compliance. Truly professional service.',
        rating: 5,
        initials: 'JW',
        isActive: true
      },
      {
        name: 'Robert Martinez',
        position: 'Family Client',
        company: '',
        content: 'During our divorce proceedings, MWC Advocates provided not just legal expertise but genuine compassion. They protected our children\'s interests while achieving a fair resolution for our family.',
        rating: 5,
        initials: 'RM',
        isActive: true
      },
      {
        name: 'Lisa Anderson',
        position: 'Estate Planning Client',
        company: '',
        content: 'The estate planning services at MWC Advocates gave our family peace of mind. They created a comprehensive plan that protects our assets and ensures our wishes will be honored.',
        rating: 5,
        initials: 'LA',
        isActive: true
      },
      {
        name: 'James Wilson',
        position: 'Startup Founder',
        company: 'Wilson Tech Solutions',
        content: 'From incorporation to investment agreements, MWC Advocates has been our trusted legal partner. Their understanding of startup needs and business law is exceptional.',
        rating: 5,
        initials: 'JW',
        isActive: true
      },
      {
        name: 'Maria Garcia',
        position: 'HR Director',
        company: 'Garcia Consulting',
        content: 'MWC Advocates helped us navigate complex employment law issues with professionalism and expertise. Their guidance on workplace policies and compliance has been invaluable.',
        rating: 5,
        initials: 'MG',
        isActive: true
      },
      {
        name: 'Thomas Brown',
        position: 'Real Estate Investor',
        company: 'Brown Properties',
        content: 'The contract review and negotiation services provided by MWC Advocates saved me thousands on my property investments. Their attention to detail is remarkable.',
        rating: 5,
        initials: 'TB',
        isActive: true
      }
    ]
  });

  console.log(`✅ Created ${testimonials.count} testimonials`);

  // Sample contact submissions (for testing)
  console.log('📧 Seeding sample contact submissions...');
  const contacts = await prisma.contactSubmission.createMany({
    data: [
      {
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '555-0123',
        subject: 'Business Formation Inquiry',
        message: 'I am starting a new tech company and need help with business formation and legal compliance. Could we schedule a consultation?'
      },
      {
        name: 'Amanda Davis',
        email: 'amanda.davis@example.com',
        phone: '555-0456',
        subject: 'Real Estate Contract Review',
        message: 'I need assistance reviewing a commercial lease agreement for my new restaurant. The terms seem complex and I want to ensure my interests are protected.'
      },
      {
        name: 'Carlos Rivera',
        email: 'carlos.rivera@example.com',
        phone: '555-0789',
        subject: 'Employment Law Question',
        message: 'I believe I was wrongfully terminated from my position. I would like to discuss my situation and understand my legal options.'
      }
    ]
  });

  console.log(`✅ Created ${contacts.count} sample contact submissions`);

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   • ${services.count} Services created`);
  console.log(`   • ${testimonials.count} Testimonials created`);
  console.log(`   • ${contacts.count} Sample contact submissions created`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
