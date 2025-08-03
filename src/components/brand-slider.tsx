"use client"

import motivaLogo from '@/app/assets/images/logo_motiva.png'
import niteroiLogo from '@/app/assets/images/logo_niteroi.png'
import rioLogo from '@/app/assets/images/logo_rio.png'
import spLogo from '@/app/assets/images/logo_sp.png'
import Image from 'next/image'
import Slider from 'react-infinite-logo-slider'

interface BrandLogo {
  id: string
  name: string
  logo: typeof motivaLogo
  alt: string
}

const brands: BrandLogo[] = [
  {
    id: 'motiva',
    name: 'Motiva',
    logo: motivaLogo,
    alt: 'Motiva logo'
  },
  {
    id: 'prefeitura-rio',
    name: 'Prefeitura do Rio',
    logo: rioLogo,
    alt: 'Prefeitura do Rio logo'
  },
  {
    id: 'cidade-sp',
    name: 'Cidade de São Paulo',
    logo: spLogo,
    alt: 'Cidade de São Paulo logo'
  },
  {
    id: 'niteroi',
    name: 'Niterói',
    logo: niteroiLogo,
    alt: 'Niterói logo'
  }
]

export function BrandSlider() {
  return (
    <section className="bg-[#f5f5f0] py-16 ">
      <div className="px-4 2xl:px-16 mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Text Section - Top on mobile, Left on desktop */}
          <div className="flex-shrink-0 text-left w-full lg:w-auto">
            <h2 className="text-base leading-relaxed md:text-lg lg:text-lg text-gray-800 leading-relaxed">
              Descubra quem está construindo um <span className="text-red-600 font-semibold">novo </span><span className="text-red-600 font-semibold">caminho</span> <br/> para a mobilidade nas cidades brasileiras.
            </h2>
          </div>

          {/* Logo Slider - Bottom on mobile, Right on desktop */}
          <div className="flex-1 min-w-0 w-full lg:w-auto">
            <Slider
              width="220px"
              duration={20}
              pauseOnHover={true}
              blurBorders={true}
              blurBorderColor={'#f5f5f0'}
              toRight={false}
            >
              {brands.map((brand) => (
                <Slider.Slide key={brand.id}>
                  <div className="flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center">
                      <Image
                        width={100}
                        height={100}
                        src={brand.logo}
                        alt={brand.alt}
                        className="h-12 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                        priority={false}
                      />
                    </div>
                  </div>
                </Slider.Slide>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  )
} 