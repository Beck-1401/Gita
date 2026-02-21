import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="border-b border-earth-200 bg-ivory/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <span className="text-saffron-500 text-2xl select-none">ॐ</span>
          <div>
            <div className="font-serif font-semibold text-xl text-ink leading-tight">
              Bhagavad Gita
            </div>
            <div className="font-sans text-xs text-earth-600 leading-tight tracking-wide uppercase">
              An Interactive Study
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="font-sans text-sm text-earth-700 hover:text-saffron-600 transition-colors"
          >
            Chapters
          </Link>
          <Link
            href="/about"
            className="font-sans text-sm text-earth-700 hover:text-saffron-600 transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
