export function SiteFooter() {
  return (
    <footer className="border-t border-earth-200 bg-earth-50 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-serif text-earth-700 text-sm">
              Translations and commentaries are presented for educational study.
            </p>
            <p className="font-sans text-earth-500 text-xs mt-1">
              Translations by Gambhirananda, Adidevananda, Zaehner, Sivananda, Bhaktivedanta, Radhakrishnan.
            </p>
          </div>
          <div className="text-saffron-400 text-2xl select-none">॥ श्रीमद्भगवद्गीता ॥</div>
        </div>
      </div>
    </footer>
  );
}
