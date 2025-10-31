import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FunctionSquare } from "lucide-react";

export default function FormulasPage() {
  return (
    <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-md text-center">
            <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    <FunctionSquare className="w-10 h-10 text-primary"/>
                </div>
                <CardTitle className="mt-4 text-2xl font-headline">Welcome to the Formula Library</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Select a formula from the sidebar to view its details, see a step-by-step tutorial, and watch an interactive animation.
                </p>
            </CardContent>
        </Card>
    </div>
  );
}
