from pathlib import Path
import re

path = Path("index.html")
text = path.read_text(encoding="utf-8")

new_footer = '''  <footer class="footer-wrap">
    <div class="container site-footer">
      <div class="footer-grid footer-grid--expanded">
        <div class="footer-brand-col">
          <a class="brand brand--footer" href="#topo" aria-label="Rafael Martins Eletricista — voltar ao início">
            <span class="brand__mark">RM</span>
            <span class="brand__text"><strong>Rafael Martins</strong><small>Eletricista</small></span>
          </a>
          <p>Serviços elétricos para residências e pequenos comércios em Palhoça e região.</p>

          <div class="footer-socials" aria-label="Redes sociais demonstrativas">
            <span class="footer-socials__label">Redes sociais</span>
            <div class="footer-socials__icons">
              <button class="footer-social footer-social--instagram" type="button" data-demo-cta aria-label="Instagram demonstrativo">
                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
              </button>
              <button class="footer-social footer-social--facebook" type="button" data-demo-cta aria-label="Facebook demonstrativo">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 8H17V4.5h-2.8c-3.1 0-5.2 1.9-5.2 5.5v2H6v3.5h3V22h4v-6.5h3.2L17 12h-4v-1.8C13 8.7 13.5 8 14.5 8Z"/></svg>
              </button>
              <button class="footer-social footer-social--whatsapp" type="button" data-demo-cta aria-label="WhatsApp demonstrativo">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.7a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.7Z"/><path d="M9 8.2c.3-.5.6-.5.9-.5h.6c.2 0 .4.1.5.4l.7 1.7c.1.3.1.5-.1.7l-.6.8c-.2.2-.1.4 0 .6.6 1.1 1.5 2 2.6 2.6.2.1.4.2.6 0l.9-1c.2-.2.4-.3.7-.1l1.7.8c.3.1.4.3.4.5 0 .5-.2 1.5-.9 2-.6.5-1.4.8-2.3.6-1.5-.3-3.5-1.1-5.2-2.8-1.4-1.4-2.4-3.1-2.6-4.6-.2-.9 0-1.7.5-2.3.4-.5.9-.6 1.6-.4Z"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div class="footer-service-col">
          <section class="footer-block">
            <h2>Atendimento</h2>
            <p>Palhoça</p>
            <p>São José</p>
            <p>Florianópolis continental</p>
          </section>
          <section class="footer-block footer-block--hours">
            <h2>Horários</h2>
            <p>Seg–sex 08:00–18:00</p>
            <p>Sáb 08:00–13:00</p>
            <p>Domingos e feriados: não atende</p>
          </section>
        </div>

        <div class="footer-nav-col">
          <h2>Navegação</h2>
          <nav class="footer-nav" aria-label="Navegação do rodapé">
            <a href="#servicos">Serviços</a>
            <a href="#trabalhos">Trabalhos</a>
            <a href="#sobre">Sobre</a>
            <a href="#avaliacoes">Avaliações</a>
            <a href="#area-atendida">Área atendida</a>
            <a href="#faq">Dúvidas</a>
          </nav>
        </div>

        <div class="footer-contact-col">
          <div class="footer-contact__head">
            <h2>Contato</h2>
            <span>Dados demonstrativos</span>
          </div>
          <div class="footer-contact-list">
            <p>
              <span class="footer-contact__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3"/><path d="M5 21c.9-4 3.2-6 7-6s6.1 2 7 6"/></svg></span>
              <span><strong>Rafael Martins</strong><small>Eletricista</small></span>
            </p>
            <p>
              <span class="footer-contact__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z"/><circle cx="12" cy="10" r="2"/></svg></span>
              <span>Rua Exemplo, 123<small>Centro • Palhoça/SC</small></span>
            </p>
            <p>
              <span class="footer-contact__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-3 2a15 15 0 0 0 5 5l2-3 5 2v4c0 1.1-.9 2-2 2C10.3 21 3 13.7 3 6c0-1.1.9-2 2-2Z"/></svg></span>
              <span>(48) 99999-0000</span>
            </p>
            <p>
              <span class="footer-contact__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg></span>
              <span>contato@rafaelmartins.example</span>
            </p>
            <p>
              <span class="footer-contact__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg></span>
              <span>www.rafaelmartins.example</span>
            </p>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© 2026 Rafael Martins Eletricista</span>
        <span class="footer-demo">SITE DEMONSTRATIVO • MODELO LUMEN • DESTAQUE LOCAL</span>
        <a href="#topo" data-back-top>VOLTAR AO TOPO ↑</a>
      </div>
    </div>
  </footer>'''

updated, count = re.subn(r'  <footer class="footer-wrap">.*?</footer>', new_footer, text, count=1, flags=re.S)
if count != 1:
    raise SystemExit(f"Expected one footer block, replaced {count}")

path.write_text(updated, encoding="utf-8")
print("Footer replaced successfully")
