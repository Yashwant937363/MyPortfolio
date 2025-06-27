import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { CodeUrl, ProjectData } from "@/types/ProjectData";

import React from "react";

interface ProjectDialogProps {
  project: ProjectData;
}

const ProjectDialog: React.FC<ProjectDialogProps> = ({ project }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">See More</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{project.name}</DialogTitle>
        </DialogHeader>
        <p>{project.description}</p>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Screenshots
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2"></div>
        {project.images.map((url) => (
          <img src={url} />
        ))}
        <DialogFooter>
          <DialogClose asChild>
            <CodeButtonDropDown codeUrls={project.projectCodeUrl} />
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() =>
                window.open(
                  project.projectUrl,
                  "_blank",
                  "noreferrer, noopener"
                )
              }
            >
              Visit Website
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;

interface CodeButtonDropDownProps {
  codeUrls: CodeUrl[];
}

const CodeButtonDropDown: React.FC<CodeButtonDropDownProps> = ({
  codeUrls,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">See Code</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {codeUrls.map((codeUrl) => (
          <DropdownMenuItem
            onClick={() =>
              window.open(codeUrl.url, "_blank", "noopener,noreferrer")
            }
          >
            {codeUrl.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
