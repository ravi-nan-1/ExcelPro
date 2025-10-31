import FormulaSuggester from "@/components/ai/formula-suggester";
import { BrainCircuit } from "lucide-react";

export default function AiSuggesterPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="max-w-3xl mx-auto">
                <div className="text-center space-y-4 mb-12">
                     <div className="inline-block bg-primary/10 p-4 rounded-full">
                        <BrainCircuit className="w-10 h-10 text-primary"/>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight font-headline">
                        Intelligent Formula Suggester
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Stuck on a tricky problem? Describe what you want to achieve in plain English, and our AI will suggest the best Excel formula for the job.
                    </p>
                </div>

                <FormulaSuggester />

            </div>
        </div>
    );
}
