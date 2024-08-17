import ImageContainer from "@/components/ui/image-container";
import React from "react";

export default function AccountTab() {
  return (
    <div className="mb-6">
      <p className="text-sm text-neutral-300">
        I'm a software developer with a passion for building efficient and
        scalable web applications. With expertise in VueJS, NextJS, and Laravel,
        I enjoy crafting user-friendly interfaces and robust backend systems. My
        journey in tech started with a fascination for how things work behind
        the scenes, which led me to dive deep into coding and software
        architecture. I thrive on solving complex problems and am constantly
        exploring new technologies to enhance my skill set. My recent projects
        include developing a versatile note-taking platform and optimizing
        backend performance using Golang. When I'm not coding, you can find me
        contributing to open-source projects or experimenting with new
        frameworks to stay ahead in this fast-paced industry. I’m always eager
        to collaborate with like-minded professionals and take on challenging
        projects that push the boundaries of what’s possible in web development.
      </p>
      <ImageContainer
        className="w-full aspect-video mt-4"
        src="https://images.unsplash.com/photo-1710306973761-717ec384efd3?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </div>
  );
}
