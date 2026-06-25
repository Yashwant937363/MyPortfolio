import { GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const education = [
  {
    degree: "Bachelor of Science in Information Technology",
    institution: "M.L. Dahanukar College of Commerce",
    duration: "May 2025",
    score: "CGPA: 8.02",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "St. Joseph Junior College, Virar",
    duration: "March 2022",
    score: "64.00%",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "St. Joseph High School, Virar",
    duration: "March 2020",
    score: "81.00%",
  },
];

export default function EducationSection() {
  return (
    <section className="p-5 md:p-10">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-10">
        Education
      </h3>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center shrink-0">
                  <GraduationCap className="size-5 text-blue-400" />
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{edu.degree}</h4>

                  <p className="text-blue-400">{edu.institution}</p>

                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>{edu.duration}</span>
                    <span>{edu.score}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
