"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Lightbulb } from "lucide-react";

export default function FloatingDementiaButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/about-dementia")}
      size="lg"
      className="fixed bottom-8 right-8 bg-gradient-to-r from-[#AEECEF] to-[#E6F7FA] text-gray-800 rounded-full shadow-lg hover:scale-105 transition-transform duration-150 ease-out font-semibold z-50"
    >
      Learn More About Dementia <Lightbulb className="ml-2" />
    </Button>
  );
}
