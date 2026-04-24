
"use client";

import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import StatsSection from '@/components/stats-section';
import MythFactSection from '@/components/myth-fact-section';
import ScreeningToolsSection from '@/components/screening-tools-section';
import ExpertSection from '@/components/expert-section';
import Footer from '@/components/footer';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import FloatingDementiaButton from '@/components/floating-button';
import { db } from '@/lib/firebase';
import { ref, get } from 'firebase/database';

function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authLoading) {
      return; // Wait until Firebase auth state is confirmed
    }

    if (!user) {
      router.push('/login');
    } else {
      const userRef = ref(db, 'users/' + user.uid);
      get(userRef).then((snapshot) => {
        if (!snapshot.exists()) {
          router.push('/user-info');
        }
      });
    }
  }, [user, authLoading, router]);

  // Render the component directly. The useEffect will handle redirects.
  return (
    <div className="relative flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />

        <StatsSection />

        <div id="myths" className="py-16 sm:py-24">
          <MythFactSection />
        </div>

        <Separator className="my-12 w-1/4 mx-auto" />

        <div id="screening" className="py-16 sm:py-24">
          <ScreeningToolsSection />
        </div>

        <Separator className="my-12 w-1/4 mx-auto" />

        <div id="expert" className="pb-16 sm:pb-24">
          <ExpertSection />
        </div>
      </main>
      <Footer />
      <FloatingDementiaButton />
    </div>
  );
}

export default Dashboard;
