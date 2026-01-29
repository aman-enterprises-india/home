import React from 'react';
import './styles.css';
import { getPayload } from 'payload';
import config from '@payload-config';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
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
          <Header companyName={CompanyInfo.siteTitle} />
          <main>{children}</main>
          <Footer companyName={CompanyInfo.siteTitle}
            phone={CompanyInfo.contactInfo?.phone}
            email={CompanyInfo.contactInfo?.email}
            address={CompanyInfo.contactInfo?.address}
            socialLinks={CompanyInfo.socialLinks} />
        </div>
      </body>
    </html>
  )
}
