"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Download,
  House,
  Leaf,
  Menu,
  ShieldCheck,
  Sun,
  X,
  Zap,
  PanelTop,
} from "lucide-react";
import { estimateSavings, formatBRL } from "@/lib/domain/savings";

import { links, services, projects, questions } from "@/lib/content";
import { Action, Brand, Eyebrow } from "@/components/ui";

export default function SolerisSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [service, setService] = useState(0);
  const [filter, setFilter] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[number] | null
  >(null);
  const [bill, setBill] = useState(600);
  const [billDraft, setBillDraft] = useState("600");
  const [ratio, setRatio] = useState(80);
  const [prepared, setPrepared] = useState(false);
  const [formError, setFormError] = useState("");
  const [lead, setLead] = useState({
    name: "",
    email: "",
    city: "",
    category: "Residencial",
  });
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [requestText, setRequestText] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const privacyRef = useRef<HTMLDialogElement>(null);
  const projectTrigger = useRef<HTMLButtonElement | null>(null);
  const savings = estimateSavings({
    monthlyBill: bill,
    reductionPercent: ratio,
  });
  const active = services[service];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedProject && dialog && !dialog.open) dialog.showModal();
    if (!selectedProject && dialog?.open) dialog.close();
  }, [selectedProject]);
  useEffect(() => {
    if (privacyOpen) privacyRef.current?.showModal();
    else privacyRef.current?.close();
  }, [privacyOpen]);

  function prepareRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!lead.name.trim() || !lead.city.trim()) {
      setFormError(
        "Preencha seu nome e sua cidade para preparar a solicitação.",
      );
      return;
    }
    setFormError("");
    setRequestText(
      `Solicitação de estudo solar — Soleris\n\nNome: ${lead.name.trim()}\nE-mail: ${lead.email.trim()}\nCidade: ${lead.city.trim()}\nTipo de imóvel: ${lead.category}\nConta mensal: ${formatBRL(bill)}\nCenário de redução: ${ratio}%\nEconomia mensal simulada: ${formatBRL(savings.monthlySavings)}\nEconomia anual simulada: ${formatBRL(savings.yearlySavings)}\n\nSimulação ilustrativa. Não substitui uma avaliação técnica.\nSolicitação preparada localmente; não enviada.`,
    );
    setPrepared(true);
  }
  function downloadRequest() {
    const blob = new Blob([requestText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "soleris-solicitacao.txt";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <div className="topline">
        <span>O futuro é renovável. E começa com você.</span>
        <span>
          <Sun size={12} /> Energia boa, todos os dias.
        </span>
      </div>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Navegação principal">
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <a className="nav-cta" href="#contato">
            Vamos conversar <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Navegação móvel"
          >
            {[...links, { href: "#contato", label: "Vamos conversar" }].map(
              (link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                  <ArrowUpRight size={17} />
                </a>
              ),
            )}
          </nav>
        )}
      </header>
      <main id="conteudo">
        <section className="hero" id="inicio">
          <Image
            src="/images/solar.jpg"
            alt="Painéis solares em uma área verde, sob a luz do sol"
            fill
            preload
            sizes="100vw"
            className="hero-image"
          />
          <div className="hero-shade" />
          <div className="hero-content">
            <div className="hero-kicker">
              MENOS IMPACTO. MAIS POSSIBILIDADES.
            </div>
            <h1>
              Boa energia.
              <br />
              Para a sua vida.
              <br />
              <span>Para o futuro.</span>
            </h1>
            <p>
              Transforme a luz do sol em economia e a sua escolha em um amanhã
              melhor. A Soleris cuida de cada etapa.
            </p>
            <div className="hero-actions">
              <Action href="#economia">Descubra sua economia</Action>
              <a href="#solucoes" className="hero-link">
                Conheça as soluções <ArrowDownRight size={18} />
              </a>
            </div>
            <div className="hero-note">
              <ShieldCheck size={17} /> Planejamento, instalação e
              acompanhamento.
            </div>
          </div>
          <div className="hero-bottom">
            <a href="#sobre">
              EXPLORE A SOLERIS <ArrowDown size={15} />
            </a>
            <span>
              O sol é de todos.
              <br />A energia pode ser sua.
            </span>
          </div>
        </section>
        <section className="value-strip" aria-label="Diferenciais">
          <div>
            <PanelTop />
            <span>
              <strong>Feita para você</strong>
              <small>Um projeto para cada necessidade</small>
            </span>
          </div>
          <div>
            <ShieldCheck />
            <span>
              <strong>Cuidado em cada etapa</strong>
              <small>Da primeira conversa à instalação</small>
            </span>
          </div>
          <div>
            <Leaf />
            <span>
              <strong>Uma escolha consciente</strong>
              <small>Energia renovável para o seu dia a dia</small>
            </span>
          </div>
        </section>

        <section className="section about" id="sobre">
          <div className="about-visual">
            <Image
              src="/images/roof.jpg"
              alt="Profissional trabalhando em uma instalação elétrica"
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
            />
            <div className="about-image-label">COMPROMISSO EM CADA DETALHE</div>
            <div className="about-stamp">
              <Sun size={32} />
              <strong>
                O futuro
                <br />
                se constrói
                <br />
                agora.
              </strong>
              <ArrowUpRight size={23} />
            </div>
          </div>
          <div className="about-copy">
            <Eyebrow>A SOLERIS</Eyebrow>
            <h2>
              Uma energia melhor.
              <br />
              Uma relação
              <br />
              <span>mais próxima.</span>
            </h2>
            <p>
              Acreditamos que mudar a forma de consumir energia deve ser
              simples. Com informação clara, um projeto bem pensado e pessoas
              que acompanham você.
            </p>
            <p>
              Da sua casa ao seu negócio, conectamos tecnologia e cuidado para
              transformar potencial em possibilidades.
            </p>
            <ul className="check-list">
              <li>
                <Check size={16} /> Soluções pensadas para o seu consumo
              </li>
              <li>
                <Check size={16} /> Clareza para decidir com confiança
              </li>
              <li>
                <Check size={16} /> Acompanhamento além da instalação
              </li>
            </ul>
            <a className="text-link" href="#contato">
              Vamos planejar seu próximo passo <ArrowUpRight size={19} />
            </a>
          </div>
        </section>

        <section className="solutions-wrap" id="solucoes">
          <div className="section">
            <div className="section-heading">
              <div>
                <Eyebrow>NOSSAS SOLUÇÕES</Eyebrow>
                <h2>
                  Onde tem sol,
                  <br />
                  <span>tem possibilidade.</span>
                </h2>
              </div>
              <p>
                Projetos diferentes. O mesmo compromisso:
                <br />
                encontrar a melhor energia para você.
              </p>
            </div>
            <div
              className="service-tabs"
              role="tablist"
              aria-label="Tipos de solução"
            >
              {services.map((item, index) => (
                <button
                  key={item.type}
                  id={`service-tab-${index}`}
                  role="tab"
                  aria-selected={service === index}
                  aria-controls="service-panel"
                  tabIndex={service === index ? 0 : -1}
                  onClick={() => setService(index)}
                  onKeyDown={(event) => {
                    if (
                      ["ArrowRight", "ArrowLeft", "Home", "End"].includes(
                        event.key,
                      )
                    ) {
                      event.preventDefault();
                      const next =
                        event.key === "Home"
                          ? 0
                          : event.key === "End"
                            ? 2
                            : (index + (event.key === "ArrowRight" ? 1 : 2)) %
                              3;
                      setService(next);
                      document.getElementById(`service-tab-${next}`)?.focus();
                    }
                  }}
                  className={service === index ? "active" : ""}
                >
                  <item.icon size={20} />
                  {item.type}
                  <ArrowUpRight size={17} />
                </button>
              ))}
            </div>
            <div
              id="service-panel"
              className="service-panel"
              role="tabpanel"
              aria-labelledby={`service-tab-${service}`}
            >
              <div className="service-copy">
                <span className="service-number">
                  SOLUÇÃO {active.type.toUpperCase()}
                </span>
                <h3>
                  {active.name}
                  <span>.</span>
                </h3>
                <p>{active.text}</p>
                <ul>
                  {active.benefits.map((item) => (
                    <li key={item}>
                      <Check size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
                <Action href="#contato">Conheça suas possibilidades</Action>
              </div>
              <div className="service-image">
                <Image
                  src={active.image}
                  alt={`Referência visual de energia renovável para uma solução ${active.type.toLowerCase()}`}
                  fill
                  sizes="(max-width: 800px) 100vw, 55vw"
                />
                <span className="image-pill">
                  <Sun size={15} /> ENERGIA PARA IR ALÉM
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section projects-section" id="projetos">
          <div className="section-heading">
            <div>
              <Eyebrow>POSSIBILIDADES NA PRÁTICA</Eyebrow>
              <h2>
                Imagine o sol
                <br />
                <span>trabalhando por você.</span>
              </h2>
            </div>
            <div className="project-intro">
              <p>
                Da vida em casa à produção no campo.
                <br />
                Explore aplicações da energia solar.
              </p>
              <span className="small-note">
                Galeria conceitual · imagens ilustrativas
              </span>
            </div>
          </div>
          <div className="project-filters" aria-label="Filtrar aplicações">
            {["Todos", "Residencial", "Comercial", "Rural"].map((item) => (
              <button
                key={item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
              >
                {item}
              </button>
            ))}
          </div>
          <div
            className={`project-grid ${filter !== "Todos" ? "project-grid-filtered" : ""}`}
          >
            {projects
              .filter((item) => filter === "Todos" || item.category === filter)
              .map((item, index) => (
                <button
                  className={`project-card ${index === 0 ? "project-featured" : ""}`}
                  key={item.name}
                  onClick={(event) => {
                    projectTrigger.current = event.currentTarget;
                    setSelectedProject(item);
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 700px) 100vw, 60vw"
                  />
                  <div className="project-overlay" />
                  <span className="project-category">{item.category}</span>
                  <div className="project-caption">
                    <div>
                      <small>{item.label}</small>
                      <h3>{item.name}</h3>
                    </div>
                    <span className="round-arrow">
                      <ArrowUpRight size={21} />
                    </span>
                  </div>
                </button>
              ))}
          </div>
          <div className="project-band">
            <span>
              <Sun size={21} /> Sua próxima conquista pode começar com o sol.
            </span>
            <a href="#contato">
              Vamos desenhar seu projeto <ArrowUpRight size={19} />
            </a>
          </div>
        </section>

        <section className="calculator-wrap" id="economia">
          <div className="section calculator">
            <div className="calculator-copy">
              <Eyebrow>MENOS CONTA. MAIS VIDA.</Eyebrow>
              <h2>
                O sol rende.
                <br />
                <span>Faça as contas.</span>
              </h2>
              <p>
                Veja o potencial de economia para o seu dia a dia. Ajuste o
                valor da conta e explore diferentes cenários.
              </p>
              <span className="small-note">
                Simulação ilustrativa, sem compromisso.
              </span>
            </div>
            <div className="calculator-card">
              <div className="calculator-label">
                <label htmlFor="bill">Quanto você paga de luz por mês?</label>
                <Zap size={18} />
              </div>
              <div className="bill-input">
                <span>R$</span>
                <input
                  id="bill"
                  type="number"
                  min="100"
                  max="10000"
                  step="50"
                  value={billDraft}
                  onChange={(event) => {
                    setBillDraft(event.target.value);
                    const value = Number(event.target.value);
                    if (value >= 100 && value <= 10000) setBill(value);
                  }}
                  onBlur={() => {
                    const value = Math.max(
                      100,
                      Math.min(10000, Number(billDraft) || 100),
                    );
                    setBill(value);
                    setBillDraft(String(value));
                  }}
                  aria-describedby="simulation-note"
                />
              </div>
              <input
                className="bill-range"
                aria-label="Ajustar conta mensal"
                type="range"
                min="100"
                max="10000"
                step="50"
                value={bill}
                onChange={(event) => {
                  setBill(Number(event.target.value));
                  setBillDraft(event.target.value);
                }}
                style={{
                  background: `linear-gradient(to right, #7db9e7 ${((bill - 100) / 9900) * 100}%, #dce4eb ${((bill - 100) / 9900) * 100}%)`,
                }}
              />
              <div className="range-labels">
                <span>R$ 100</span>
                <span>R$ 10.000</span>
              </div>
              <div className="scenario">
                <label htmlFor="scenario">Cenário de redução</label>
                <select
                  id="scenario"
                  value={ratio}
                  onChange={(event) => setRatio(Number(event.target.value))}
                >
                  <option value="60">60% · conservador</option>
                  <option value="80">80% · intermediário</option>
                  <option value="90">90% · otimista</option>
                </select>
              </div>
              <div
                className="simulation-results"
                aria-live="polite"
                aria-atomic="true"
              >
                <div>
                  <span>Economia estimada / mês</span>
                  <strong>{formatBRL(savings.monthlySavings)}</strong>
                </div>
                <div>
                  <span>Em um ano, até</span>
                  <strong>
                    {formatBRL(savings.yearlySavings)}
                    <ArrowUpRight size={23} />
                  </strong>
                </div>
              </div>
              <Action href="#contato">Quero um estudo personalizado</Action>
              <p id="simulation-note" className="simulation-note">
                O resultado depende da tarifa, do consumo, da geração e dos
                custos aplicáveis. Os percentuais são cenários de simulação, não
                uma garantia de economia.
              </p>
            </div>
          </div>
        </section>

        <section
          className="section process-section"
          id="como-funciona"
          aria-labelledby="process-title"
        >
          <div className="process-photo">
            <Image
              src="/images/panels.jpg"
              alt="Luz do fim de tarde sobre uma instalação de painéis solares"
              fill
              sizes="(max-width: 800px) 100vw, 42vw"
            />
            <p>Uma nova relação com a energia começa aqui.</p>
          </div>
          <div className="process-content">
            <Eyebrow>COMO ACONTECE</Eyebrow>
            <h2 id="process-title">
              Do seu plano
              <br />à sua própria energia.
            </h2>
            <p className="process-intro">
              Você participa das decisões. Nós conectamos cada detalhe, do
              estudo do imóvel ao acompanhamento da geração.
            </p>
            <div className="process-grid">
              {[
                {
                  title: "Uma conversa sobre você",
                  text: "Entendemos seu consumo, seu espaço e o que você espera do projeto.",
                },
                {
                  title: "Um projeto que faz sentido",
                  text: "Avaliamos o imóvel e dimensionamos uma solução para a sua realidade.",
                },
                {
                  title: "Tudo pronto para gerar",
                  text: "Cuidamos da instalação, dos testes e das orientações para usar o sistema.",
                },
                {
                  title: "Cuidado que continua",
                  text: "Acompanhamos a geração e orientamos você sobre os cuidados com os equipamentos.",
                },
              ].map((item) => (
                <article className="process-step" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
            <a className="text-link" href="#contato">
              Vamos planejar o seu projeto <ArrowUpRight size={18} />
            </a>
          </div>
        </section>

        <section className="manifesto">
          <Image
            src="/images/landscape.jpg"
            alt="Paisagem verde com estruturas de geração de energia renovável"
            fill
            sizes="100vw"
          />
          <div className="manifesto-shade" />
          <div className="section manifesto-inner">
            <Eyebrow>UMA ESCOLHA QUE VAI ALÉM DA CONTA</Eyebrow>
            <h2>
              Bom para você.
              <br />
              <span>Melhor para o amanhã.</span>
            </h2>
            <p>
              Mais do que gerar energia, queremos gerar possibilidades.
              <br />
              Para a sua vida, o seu negócio e o mundo que vem depois.
            </p>
            <Action href="#contato">Faça parte dessa mudança</Action>
          </div>
        </section>

        <section
          className="section solar-guide"
          id="faq"
          aria-labelledby="guide-title"
        >
          <div className="guide-heading">
            <Eyebrow>ENTENDA A ENERGIA SOLAR</Eyebrow>
            <h2 id="guide-title">O que você precisa saber.</h2>
            <p>
              Informação clara para decidir com tranquilidade. Aqui estão as
              dúvidas que costumam aparecer antes de um projeto.
            </p>
            <a className="text-link" href="#contato">
              Converse sobre o seu caso <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="guide-layout">
            {questions.map(([question, answer]) => (
              <article className="guide-article" key={question}>
                <h3>{question}</h3>
                <p>{answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-wrap" id="contato">
          <div className="section contact">
            <div className="contact-copy">
              <Eyebrow>O SEU PRÓXIMO PASSO</Eyebrow>
              <h2>
                Vamos fazer
                <br />
                <span>o sol acontecer?</span>
              </h2>
              <p>
                Conte um pouco sobre você e prepare sua solicitação de estudo.
                Uma nova relação com a energia começa por aqui.
              </p>
              <div className="contact-points">
                <span>
                  <Check size={17} /> Pensado para a sua realidade
                </span>
                <span>
                  <Check size={17} /> Sem compromisso
                </span>
                <span>
                  <Check size={17} /> Informação para decidir melhor
                </span>
              </div>
            </div>
            <div className="contact-card">
              {prepared ? (
                <div className="prepared" role="status">
                  <span className="prepared-icon">
                    <Check size={28} />
                  </span>
                  <h3>Sua solicitação está pronta.</h3>
                  <p>
                    Você pode baixar os dados para compartilhar com uma empresa
                    ou profissional de sua escolha.
                  </p>
                  <p className="demo-note">
                    Este projeto é demonstrativo. Nenhum dado foi enviado ou
                    armazenado em um servidor.
                  </p>
                  <button className="action" onClick={downloadRequest}>
                    Baixar solicitação <Download size={18} />
                  </button>
                  <button
                    className="text-link"
                    onClick={() => setPrepared(false)}
                  >
                    Voltar e editar <ArrowRight size={17} />
                  </button>
                </div>
              ) : (
                <form onSubmit={prepareRequest}>
                  <h3>Comece sua transformação.</h3>
                  <p className="form-intro">
                    Seu projeto começa com algumas informações.
                  </p>
                  <label htmlFor="lead-name">Seu nome</label>
                  <input
                    id="lead-name"
                    name="name"
                    autoComplete="name"
                    placeholder="Como podemos chamar você?"
                    required
                    maxLength={120}
                    value={lead.name}
                    onChange={(event) =>
                      setLead({ ...lead, name: event.target.value })
                    }
                  />
                  <label htmlFor="lead-email">E-mail</label>
                  <input
                    id="lead-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="voce@exemplo.com"
                    required
                    maxLength={180}
                    value={lead.email}
                    onChange={(event) =>
                      setLead({ ...lead, email: event.target.value })
                    }
                  />
                  <div className="form-row">
                    <div>
                      <label htmlFor="lead-city">Cidade / UF</label>
                      <input
                        id="lead-city"
                        autoComplete="address-level2"
                        placeholder="Sua cidade"
                        required
                        maxLength={120}
                        value={lead.city}
                        onChange={(event) =>
                          setLead({ ...lead, city: event.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="lead-category">Tipo de imóvel</label>
                      <select
                        id="lead-category"
                        value={lead.category}
                        onChange={(event) =>
                          setLead({ ...lead, category: event.target.value })
                        }
                      >
                        {services.map((item) => (
                          <option key={item.type}>{item.type}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-summary">
                    <span>Conta mensal simulada</span>
                    <a href="#economia">
                      {formatBRL(bill)} <ArrowUpRight size={14} />
                    </a>
                  </div>
                  <label className="consent">
                    <input type="checkbox" required />
                    <span>
                      Entendo que esta é uma demonstração e que minha
                      solicitação será preparada neste dispositivo.
                    </span>
                  </label>
                  {formError && (
                    <p className="form-error" role="alert">
                      {formError}
                    </p>
                  )}
                  <button className="action" type="submit">
                    Preparar meu estudo <ArrowUpRight size={18} />
                  </button>
                  <p className="form-note">
                    <ShieldCheck size={13} /> Seus dados permanecem nesta
                    página.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="section footer-inner">
          <div className="footer-top">
            <div>
              <Brand light />
              <p>
                Boa energia para viver.
                <br />
                Novas possibilidades para o futuro.
              </p>
            </div>
            <div className="footer-links">
              <span>Conheça a Soleris</span>
              {links.map((link) => (
                <a href={link.href} key={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
            <div className="footer-links">
              <span>Podemos ajudar</span>
              <a href="#contato">
                Prepare seu projeto <ArrowUpRight size={15} />
              </a>
              <a href="#faq">Dúvidas frequentes</a>
              <button onClick={() => setPrivacyOpen(true)}>Privacidade</button>
            </div>
            <div className="footer-invitation">
              <h3>
                Um novo projeto.
                <br />
                Uma boa conversa.
              </h3>
              <p>Descubra as possibilidades da energia solar para você.</p>
              <Action href="#contato">Vamos conversar</Action>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} Soleris. Energia para ir além.
            </span>
            <span>Projeto conceitual · empresa e aplicações ilustrativas.</span>
            <span>
              FEITO PARA UM NOVO AMANHÃ <Sun size={14} />
            </span>
          </div>
        </div>
      </footer>
      <dialog
        ref={dialogRef}
        className="project-dialog"
        onCancel={() => setSelectedProject(null)}
        onClose={() => {
          setSelectedProject(null);
          projectTrigger.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelectedProject(null);
        }}
        aria-labelledby="project-dialog-title"
      >
        {selectedProject && (
          <>
            <button
              className="dialog-close"
              aria-label="Fechar projeto"
              onClick={() => setSelectedProject(null)}
            >
              <X size={22} />
            </button>
            <div className="dialog-image">
              <Image
                src={selectedProject.image}
                alt={selectedProject.name}
                fill
                sizes="800px"
              />
            </div>
            <div
              className="dialog-copy"
              onClick={(event) => {
                if ((event.target as HTMLElement).closest("a"))
                  setSelectedProject(null);
              }}
            >
              <Eyebrow>{selectedProject.category}</Eyebrow>
              <h2 id="project-dialog-title">{selectedProject.name}</h2>
              <p>{selectedProject.description}</p>
              <p className="small-note">
                Aplicação conceitual, com fotografia ilustrativa. Não representa
                uma instalação realizada pela Soleris.
              </p>
              <Action href="#contato">Quero planejar algo assim</Action>
            </div>
          </>
        )}
      </dialog>
      <dialog
        ref={privacyRef}
        className="privacy-dialog"
        aria-labelledby="privacy-title"
        onCancel={() => setPrivacyOpen(false)}
        onClose={() => setPrivacyOpen(false)}
      >
        <button
          className="dialog-close"
          aria-label="Fechar privacidade"
          onClick={() => setPrivacyOpen(false)}
        >
          <X size={22} />
        </button>
        <Eyebrow>PRIVACIDADE</Eyebrow>
        <h2 id="privacy-title">Seus dados, com clareza.</h2>
        <p>
          Este site é um projeto demonstrativo. O formulário prepara um arquivo
          local e não transmite os dados preenchidos a um servidor. Os dados
          ficam na memória da página e desaparecem ao recarregá-la.
        </p>
        <p>
          Se você baixar a solicitação, o arquivo conterá as informações que
          preencheu. Você decide onde guardar e com quem compartilhar. Não
          usamos ferramentas de análise ou cookies de publicidade neste projeto.
        </p>
        <button className="action" onClick={() => setPrivacyOpen(false)}>
          Entendi <Check size={17} />
        </button>
      </dialog>
    </>
  );
}
