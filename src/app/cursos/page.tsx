"use client";

import { Header } from "@/components/header";
import { courses } from "@/lib/data/courses";
import { Course } from "@/lib/types/course";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Cursos() {
  return (
    <div className="bg-[#f9f9f6]">
      <Header className="bg-[#f9f9f6]" />

      <div className="px-4 2xl:px-16 py-20 pb-30">
        {/* Título e linha com quadrado */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-4xl font-medium leading-none">Formação baseada em dados</h2>
            <p className="text-4xl text-gray-400 leading-none font-medium">e evidências para diferentes públicos</p>
          </div>
          <div className="hidden md:block h-[1.2px] flex-grow mx-16 bg-gray-300" />
          <div className="hidden md:block w-4 h-4 bg-[#F7A703]" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {courses.map((course: Course) => (
            <div
              key={course.id}
              className="relative rounded-xl overflow-hidden group h-[400px] cursor-pointer"
              onClick={() => {
                if (course.href) {
                  window.open(course.href, '_blank', 'noopener,noreferrer');
                }
              }}
            >
              <Image
                src={course.image}
                alt={course.title}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-white text-xl font-semibold leading-snug">
                  {course.title}
                </h3>
                <p className="text-gray-300 text-sm mt-2">
                  {course.description}
                </p>
                <div className="absolute bottom-4 right-4">
                  <ArrowRight className="text-white" size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
