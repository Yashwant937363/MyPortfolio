// components/mycomponents/HomeComponents/ExperienceSection.tsx

import { Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const experiences = [
  {
    role: "Coding Mentor",
    company: "FTC Team Sigma 20890, RFL Academy",
    duration: "July 2025 - April 2026",
    description: [
      "Mentored students in Java, OOP concepts, DRY principles, and problem-solving techniques for robotics programming.",
      "Guided team members in developing and debugging software for FTC robotics competitions.",
      "Developed an artifact-sorting algorithm that determines the optimal shooting sequence in a single spindexer rotation, improving scoring efficiency.",
      "Implemented turret targeting logic using the robot's X-Y coordinates to calculate shooting angles for accurate autonomous scoring.",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section className="p-5 md:p-10">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-10">
        Experience
      </h3>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-12">
              {/* Timeline Dot */}
              <div className="absolute left-0 top-4 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center">
                  <Briefcase className="size-4 text-blue-400" />
                </div>
              </div>

              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h4 className="text-lg font-semibold">{exp.role}</h4>
                      <p className="text-blue-400">{exp.company}</p>
                    </div>

                    <span className="text-sm text-muted-foreground mt-2 md:mt-0">
                      {exp.duration}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2 text-muted-foreground">
                    {exp.description.map((point, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span>•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
