import React from 'react';
import './styles.css';
import { getPayload } from 'payload';
import config from '@payload-config';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config });
  const CompanyInfo = await payload.findGlobal({
    slug: 'company-settings'
  });

  const siteName = CompanyInfo.siteTitle || 'Aman Enterprises';

  return {
    title: {
      default: `${siteName} - Quality Electrical Products & Solutions`,
      template: `%s | ${siteName}`,
    },
    description: 'Your trusted partner for quality electrical products and solutions. We offer a wide range of electrical components, wires, switches, and more.',
    keywords: ['electrical products', 'electrical solutions', 'wires', 'switches', 'electrical components', 'Aman Enterprises'],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    metadataBase: new URL('https://aman-enterprises.com'),
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: siteName,
      title: `${siteName} - Quality Electrical Products & Solutions`,
      description: 'Your trusted partner for quality electrical products and solutions.',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${siteName} - Quality Electrical Products & Solutions`,
      description: 'Your trusted partner for quality electrical products and solutions.',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const payload = await getPayload({ config });

  const CompanyInfo = await payload.findGlobal({
    slug: 'company-settings'
  });
  return (
    <html lang="en">
      <body>
        <div className='flex min-h-screen flex-col'>
          <Header companyName={CompanyInfo.siteTitle} gstNo={CompanyInfo.GSTNo} />
          <main>{children}</main>
          <Footer companyName={CompanyInfo.siteTitle}
            phone={CompanyInfo.contactInfo?.phone}
            email={CompanyInfo.contactInfo?.email}
            address={CompanyInfo.contactInfo?.address}
            gstNo={CompanyInfo.GSTNo}
            msmeNo={CompanyInfo.MSMENo}
            socialLinks={CompanyInfo.socialLinks} />
        </div>
      </body>
    </html>
  )
}
