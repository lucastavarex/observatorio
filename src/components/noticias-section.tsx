"use client"

import { getHomeNews } from "@/lib/data/news"
import { Plus } from "lucide-react"
import Link from "next/link"

export function NoticiasSection() {
  const newsData = getHomeNews()

  const handleNewsClick = (link?: string) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section className="py-16 bg-gray-50 pb-24">
      <div>
        {/* Header */}
        <Link href="/noticias">
        <h5 className="text-[#2F2C2C] text-sm px-4 lg:px-16">Ver mais</h5>
        </Link>
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-medium px-4 lg:px-16 text-gray-900 mb-10">
        <Link href="/noticias">
          Notícias
        </Link>
        </h2>

        {/* News List */}
        <div className="space-y-0">
          <div className="border-t border-gray-200 mx-4 lg:px-16" />
          {newsData.map((item, index) => (
            <div key={item.id}>
                                                           <div 
                                className={`flex items-start py-8 group hover:bg-black md:hover:bg-black transition-all duration-300 ${item.link ? 'cursor-pointer' : 'cursor-default'}`}
                                onClick={() => handleNewsClick(item.link)}
                              >
                                 {/* Plus Icon */}
                 <div className="flex-shrink-0 mr-4 mt-1 px-4 lg:px-16">
                   <Plus className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                 </div>

                                 {/* News Title */}
                 <div className="flex-1 min-w-0">
                   <h3 className="text-sm md:text-base text-gray-900 group-hover:text-white leading-relaxed pr-4 transition-colors duration-300">
                     {item.title}
                   </h3>
                 </div>

                                 {/* Source and Date */}
                 <div className="flex-shrink-0 flex flex-col md:flex-row md:gap-36 text-right mx-4 lg:mx-16">
                   <p className="text-sm text-gray-500 group-hover:text-white transition-colors duration-300">{item.source}</p>
                   <p className="text-sm text-gray-500 group-hover:text-white transition-colors duration-300">{item.date}</p>
                 </div>
              </div>

              {/* Divider - only show if not the last item */}
              {/* {index < newsData.length - 1 && ( */}
                <div className="border-b border-gray-200 mx-4 lg:px-16" />
              {/* )} */}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
