import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 ">
      <div className="px-4 2xl:px-16">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          
          {/* Left Section - Logo and Text */}
          <div className="flex flex-col items-start gap-4">
            <Image
              src="/logo-preto.png"
              alt="Observatório Nacional de Mobilidade Sustentável"
              width={80}
              height={80}
              className="w-50 md:w-65 h-auto"
            />
          </div>

          {/* Right Section - Navigation */}
          <nav className="flex flex-wrap gap-6 lg:gap-8">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
            >
              Home
            </Link>
            <Link 
              href="/publicacoes" 
              className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
            >
              Publicações
            </Link>
            <Link 
              href="/eventos" 
              className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
            >
              Eventos
            </Link>
            <Link 
              href="/videos" 
              className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
            >
              Vídeos
            </Link>
            <Link 
              href="/noticias" 
              className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
            >
              Notícias
            </Link>
            <Link 
              href="/cursos" 
              className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
            >
              Cursos
            </Link>
            <Link 
              href="/contato" 
              className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
            >
              Contato
            </Link>
          </nav>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="mt-8 border-gray-200">
          <div className="text-left text-gray-500 text-xs">
            <p>&copy; 2025 Observatório Nacional de Mobilidade Sustentável. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
