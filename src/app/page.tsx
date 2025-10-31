import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit, Wrench } from 'lucide-react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images.json';

export default function Home() {
  const heroImage = placeholderImages.find(img => img.id === 'hero-background');

  return (
    <div className="flex flex-col">
      <section className="relative w-full py-24 md:py-32 lg:py-40 bg-card">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover opacity-10"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="container mx-auto px-4 md:px-6 text-center relative">
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-headline">
              Master Excel, One Formula at a Time
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Your ultimate guide to mastering Excel. Learn with interactive tutorials, a real-time simulator, and AI-powered suggestions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/formulas">
                  Explore Formulas <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/ai-suggester">AI Formula Suggester</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Wrench className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-headline">Interactive Tutorials</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Learn by doing. Our step-by-step interactive tutorials and live Excel simulator make complex formulas easy to understand. Visualize how each function works in real-time.
                </CardDescription>
                <Button variant="link" asChild className="p-0 mt-4 h-auto">
                  <Link href="/formulas">
                    Start Learning <ArrowRight className="ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <BrainCircuit className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-headline">Intelligent Formula Suggestion</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Stuck on a problem? Describe what you want to achieve, and our AI will suggest the best formula for the job, complete with a detailed explanation of how it works.
                </CardDescription>
                <Button variant="link" asChild className="p-0 mt-4 h-auto">
                  <Link href="/ai-suggester">
                    Try the AI Suggester <ArrowRight className="ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
