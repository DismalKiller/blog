import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";

export default async function Projects() {
  interface Tag {
    name: string;
    color: string | null;
    icon: string | null;
  }

  interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    url: string | null;
    githubUrl: string | null;
    tags: string;
    createdAt: Date;
    updatedAt: Date;
    tagInfo: Tag[];
  }

  let projects = await prisma.$queryRaw<Project[]>`
    SELECT p.*, 
      GROUP_CONCAT(
        JSON_OBJECT(
          'name', t.name,
          'color', t.color,
          'icon', t.icon
        )
      ) as tagInfo
    FROM Project p 
    LEFT JOIN Tag t ON FIND_IN_SET(t.id, p.tags)
    GROUP BY p.id
  `;
  projects = projects.map((project) => ({
    ...project,
    tagInfo: project.tagInfo ? JSON.parse(`[${project.tagInfo}]`) : [],
  }));
  return (
    <div className="container space-y-8 py-12 m-auto">
      <h1 className="text-4xl font-bold text-center">我的项目</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{project.title}</CardTitle>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={60}
                  height={60}
                  className="filter invert dark:invert-0"
                />
              </div>
              <div className="text-xs text-muted-foreground">
                {project.tagInfo.map(
                  (tag) =>
                    tag.name && (
                      <span
                        key={tag.name}
                        className={`mr-2 px-2 py-1 rounded-full bg-primary/10 ${
                          tag.color ? `bg-[${tag.color}]` : ""
                        }`}
                      >
                        {tag.icon ? (
                          <Image
                            src={tag.icon}
                            alt={tag.name}
                            width={16}
                            height={16}
                          />
                        ) : null}
                        {tag.name}
                      </span>
                    )
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {project.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between gap-4">
              <div>
                {project.url ? (
                  <Button asChild>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Preview
                    </a>
                  </Button>
                ) : (
                  <div className="w-[100px]" />
                )}
              </div>
              <div>
                {project.githubUrl ? (
                  <Button variant="outline" asChild>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      Source
                    </a>
                  </Button>
                ) : (
                  <div className="w-[100px]" />
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
