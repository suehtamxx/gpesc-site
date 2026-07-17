export function Footer() {
  return (
    <footer id="contato" className="mx-auto max-w-7xl px-6 py-14">
      <div className="grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="text-lg font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>ObsESP</div>
          <p className="text-[var(--ink)]/60">Observatório de Epidemiologia e Saúde Pública.</p>
        </div>
        <div>
          <div className="font-medium mb-2">Endereço</div>
          <p className="text-[var(--ink)]/60">Rua Cícero Duarte, 905 - Junco<br />Campus Senador Helvídio Nunes de Barros<br />CEP 64.607-670<br />Picos, PI</p>
        </div>
        <div>
          <div className="font-medium mb-2">Contato</div>
          <a href="mailto:obsesp@ufpi.edu.br" className="text-[var(--ink)]/60 hover:text-[var(--ink)] underline">
            obsesp@ufpi.edu.br
          </a>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-[var(--ink)]/10 flex justify-between text-xs font-mono text-[var(--ink)]/50">
        <span>© {new Date().getFullYear()} ObsESP · UFPI</span>
        <span>Picos · Piauí · Brasil</span>
      </div>
    </footer>
  );
}
