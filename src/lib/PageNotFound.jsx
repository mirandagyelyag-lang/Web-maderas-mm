import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <main className="min-h-screen bg-[#F9F7F2] flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <p className="font-mono-tech text-xs uppercase tracking-[0.3em] text-[#A67C52]">Error 404</p>
        <h1 className="mt-4 font-heading text-5xl font-bold text-[#1F1B18]">Esta página no existe</h1>
        <p className="mt-4 text-[#3E424B]">Volvamos al aserradero antes de que esta ruta se convierta en viruta.</p>
        <Link to="/" className="inline-block mt-8 bg-[#A67C52] text-white px-7 py-3 font-heading font-semibold">
          VOLVER AL INICIO
        </Link>
      </div>
    </main>
  )
}
