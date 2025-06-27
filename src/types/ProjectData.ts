interface TechStackIcon {
  name: string;
  iconUrl: string;
}

export interface CodeUrl {
  title: string;
  url: string;
}

export interface ProjectData {
  name: string;
  description: string;
  images: string[];
  techstack: TechStackIcon[];
  projectCodeUrl: CodeUrl[];
  projectUrl: string;
}
