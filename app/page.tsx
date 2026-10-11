
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
export default function Home() {

  return (
    <div className="flex min-h-screen flex-col bg-linear-[135deg] from-blue-200 to-purple-200">
      <main className="flex-1">
        <section className="container mx-auto px-4 py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-black mb-6 text-6xl font-bold ">A better way to track your job application</h1>
            <p className="text-gray-700 mb-10 text-xl">Capture, organize and manage your job in one place</p>
            <div className="flex flex-col items-center gap-4">

              <Link href={'sign-up'}>
                <Button size={'lg'} className="group h-12 px-8 hover:scale-105 hover:shadow-xl font-bold tracking-wider" variant={'default'}>Start for free <ArrowRight className="transition-transform duration-300 group-hover:translate-x-2" /></Button>
              </Link>
              <p className="text-sm text-gray-500">Free forever, No credit card required</p>
            </div>
          </div>
        </section>

        {/* Hero images section with tabs */}

      </main>
    </div>
  );
}
