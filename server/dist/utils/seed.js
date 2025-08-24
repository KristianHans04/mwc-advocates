"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedServices() {
    console.log('🌱 Seeding services...');
    const services = [
        {
            title: 'Corporate Law',
            description: 'Comprehensive corporate legal services including business formation, governance, mergers and acquisitions, and compliance.',
            icon: 'building',
            features: [
                'Company incorporation and registration',
                'Corporate governance and compliance',
                'Mergers and acquisitions',
                'Commercial contracts and agreements',
                'Securities law and regulations'
            ]
        },
        {
            title: 'Litigation & Dispute Resolution',
            description: 'Expert representation in courts and tribunals, as well as alternative dispute resolution mechanisms.',
            icon: 'gavel',
            features: [
                'Civil and commercial litigation',
                'Criminal defense representation',
                'Arbitration and mediation',
                'Debt recovery and enforcement',
                'Appeals and judicial review'
            ]
        },
        {
            title: 'Property Law',
            description: 'Complete real estate legal services covering all aspects of property transactions and disputes.',
            icon: 'home',
            features: [
                'Property sales and purchases',
                'Title searches and due diligence',
                'Lease agreements and tenancy issues',
                'Property development and planning',
                'Land registration and transfers'
            ]
        },
        {
            title: 'Legal Consultancy',
            description: 'Expert legal advice and strategic counsel for individuals and businesses.',
            icon: 'lightbulb',
            features: [
                'Legal compliance audits',
                'Risk assessment and management',
                'Contract drafting and review',
                'Legal opinion letters',
                'Strategic legal planning'
            ]
        }
    ];
    for (const service of services) {
        await prisma.service.upsert({
            where: { title: service.title },
            update: service,
            create: service,
        });
    }
    console.log('✅ Services seeded successfully');
}
async function seedTestimonials() {
    console.log('🌱 Seeding testimonials...');
    const testimonials = [
        {
            name: 'John Mwangi',
            position: 'CEO',
            company: 'Tech Solutions Ltd',
            content: 'MWC Advocates provided exceptional legal support for our business incorporation. Their professionalism and attention to detail exceeded our expectations.',
            rating: 5,
            initials: 'JM',
            isActive: true
        },
        {
            name: 'Sarah Kiprotich',
            position: 'Property Developer',
            company: null,
            content: 'Outstanding representation in our property dispute case. They achieved a favorable outcome and kept us informed throughout the process.',
            rating: 5,
            initials: 'SK',
            isActive: true
        },
        {
            name: 'Robert Ochieng',
            position: 'HR Director',
            company: 'Global Enterprises',
            content: 'Professional, knowledgeable, and responsive. They helped us navigate complex employment law issues with confidence and expertise.',
            rating: 5,
            initials: 'RO',
            isActive: true
        }
    ];
    for (const testimonial of testimonials) {
        await prisma.testimonial.upsert({
            where: { name: testimonial.name },
            update: testimonial,
            create: testimonial,
        });
    }
    console.log('✅ Testimonials seeded successfully');
}
async function seedFAQs() {
    console.log('🌱 Seeding FAQs...');
    const faqs = [
        {
            question: 'What types of legal services do you offer?',
            answer: 'We offer comprehensive legal services including corporate law, litigation and dispute resolution, property law, family law, employment law, and general legal consultancy.',
            category: 'general',
            order: 1,
            isActive: true
        },
        {
            question: 'How do I schedule a consultation?',
            answer: 'You can schedule a consultation by calling us at +254702073800 or +254708792078, or by filling out our contact form on the website. We typically respond within 24 hours.',
            category: 'consultation',
            order: 2,
            isActive: true
        },
        {
            question: 'What are your consultation fees?',
            answer: 'Our consultation fees vary depending on the complexity of the matter. We offer competitive rates and will provide a fee estimate during your initial consultation.',
            category: 'fees',
            order: 3,
            isActive: true
        },
        {
            question: 'Do you handle cases outside Nairobi?',
            answer: 'Yes, we handle cases throughout Kenya. While our office is based in Nairobi, we represent clients in courts and tribunals across the country.',
            category: 'location',
            order: 4,
            isActive: true
        }
    ];
    for (const faq of faqs) {
        await prisma.fAQ.upsert({
            where: { question: faq.question },
            update: faq,
            create: faq,
        });
    }
    console.log('✅ FAQs seeded successfully');
}
async function main() {
    try {
        console.log('🚀 Starting database seeding...');
        await seedServices();
        await seedTestimonials();
        await seedFAQs();
        console.log('🎉 Database seeding completed successfully!');
    }
    catch (error) {
        console.error('❌ Database seeding failed:', error);
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
}
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map