import Image from 'next/image'
import Link from 'next/link'

const projetosItems = [
  {
    title: "Geoportal",
    href: "/projetos/geoportal",
    description: "Visualize dados espaciais de mobilidade urbana em um mapa interativo com diversas camadas temáticas",
  },
  {
    title: "Catálogo de Dados",
    href: "/projetos/catalago-de-dados",
    description: "Navegue por um catálogo interativo com dados de mobilidade de diversas cidades brasileiras.",
  },
  {
    title: "Dashboard PEMOB",
    href: "/projetos/dashboard",
    description: "Visualize dados espaciais de mobilidade urbana em um mapa interativo com diversas camadas temáticas",
  },
  {
    title: "Dados PEMOB",
    href: "/projetos/tabela",
    description: "Explore indicadores de mobilidade de diferentes cidades brasileiras em uma tabela interativa.",
  },
]

const publicacoesItems = [
  {
    title: "Livros",
    href: "/publicacoes?tipo=livros",
    description: "Explore nossa coleção de livros sobre mobilidade urbana e desenvolvimento sustentável",
  },
  {
    title: "Policy Papers",
    href: "/publicacoes?tipo=policy_paper",
    description: "Acesse Policy Papers sobre mobilidade urbana",
  },
  // {
  //   title: "Notas técnicas",
  //   href: "/publicacoes?tipo=notas",
  //   description: "Consulte notas técnicas e documentos especializados em mobilidade",
  // },
]

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 ">
      <div className="px-4 2xl:px-16">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          
          {/* Left Section - Logo and Text */}
          <div className="flex flex-col items-start gap-4">
            <Image
              src="/logo-preto.png"
              alt="Observatório Nacional de Mobilidade Sustentável"
              width={400}
              height={80}
              className=""
            />
          </div>

          {/* Right Section - Navigation */}
          <nav className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="flex flex-col gap-2">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
              >
                Home
              </Link>
            </div>

            {/* Dados de mobilidade dropdown */}
            <div className="flex flex-col gap-2">
              <span className="text-gray-600 text-sm font-medium">Mobilidade em dados</span>
              <div className="flex flex-col gap-1">
                {projetosItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="text-gray-500 hover:text-gray-700 transition-colors text-xs"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Link 
                href="/sobre" 
                className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
              >
                Sobre
              </Link>
            </div>

            {/* Publicações dropdown */}
            <div className="flex flex-col gap-2">
              <span className="text-gray-600 text-sm font-medium">Publicações</span>
              <div className="flex flex-col gap-1">
                {publicacoesItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="text-gray-500 hover:text-gray-700 transition-colors text-xs"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Link 
                href="/pesquisas" 
                className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
              >
                Pesquisas
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <Link 
                href="/eventos" 
                className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
              >
                Eventos
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link 
                href="/videos" 
                className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
              >
                Vídeos
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <Link 
                href="/noticias" 
                className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
              >
                Notícias
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <Link 
                href="/cursos" 
                className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
              >
                Cursos
              </Link>
            </div>
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
