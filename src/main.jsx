import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Archive,
  ArrowRight,
  AudioLines,
  Brain,
  Camera,
  Check,
  ChevronRight,
  FileAudio,
  FolderOpen,
  HeartHandshake,
  Images,
  LockKeyhole,
  Play,
  ShieldCheck,
  Sparkles,
  Video,
} from "lucide-react";
import "./styles.css";

const assetPath = (fileName) => `${import.meta.env.BASE_URL}assets/${fileName}`;

const navItems = [
  ["문제", "#problem"],
  ["흐름", "#service"],
  ["화면", "#preview"],
  ["원칙", "#ethics"],
  ["사업성", "#business"],
];

const proofStats = [
  ["기록", "얼굴과 목소리, 삶의 이야기"],
  ["동의", "공개 범위와 삭제권 우선"],
  ["아카이브", "가족만 여는 비공개 보관함"],
];

const problemPoints = [
  {
    icon: Images,
    title: "자료는 많지만 기억은 흩어집니다",
    text: "사진첩, 휴대폰, 메신저, 녹음 파일에 부모님의 오늘이 조각난 채 남습니다.",
  },
  {
    icon: AudioLines,
    title: "목소리와 말투는 다시 촬영할 수 없습니다",
    text: "표정, 억양, 웃음소리, 이야기의 맥락은 시간이 지나면 복원하기 어렵습니다.",
  },
  {
    icon: LockKeyhole,
    title: "기술 활용에는 동의와 권한이 필요합니다",
    text: "가족의 마음만으로는 부족합니다. 기록 당사자의 선택권이 먼저 설계되어야 합니다.",
  },
];

const serviceFlow = [
  {
    icon: HeartHandshake,
    title: "초대와 동의",
    text: "기록 목적, 공개 범위, AI 활용 가능 여부를 부모님이 먼저 선택합니다.",
  },
  {
    icon: Camera,
    title: "입체 기록 수집",
    text: "사진, 영상, 인터뷰, 음성, 영상 편지를 하나의 기록 여정으로 모읍니다.",
  },
  {
    icon: Brain,
    title: "AI 정리와 스토리화",
    text: "흩어진 자료를 인물, 시기, 사건, 감정 단서별로 정리해 가족이 이해하기 쉽게 만듭니다.",
  },
  {
    icon: Archive,
    title: "가족 아카이브",
    text: "권한이 있는 가족만 열람하고, 기념일이나 대화 주제별로 다시 꺼내 봅니다.",
  },
  {
    icon: Sparkles,
    title: "미래 확장",
    text: "3D 초상, 제한형 음성, XR·MR 경험은 동의 범위 안에서 단계적으로 연결합니다.",
  },
];

const previewScreens = [
  {
    id: "home",
    label: "홈",
    title: "가족이 바로 이해하는 기록 대시보드",
    image: assetPath("home-dashboard.png"),
    text: "오늘 남겨야 할 기록, 최근 업로드, 가족 공유 상태를 한 화면에서 확인합니다.",
  },
  {
    id: "record",
    label: "기록 센터",
    title: "사진, 인터뷰, 영상 편지를 한 곳에서",
    image: assetPath("record-center.png"),
    text: "부모님의 현재 모습과 이야기를 여러 방식으로 수집하고 진행 상태를 관리합니다.",
  },
  {
    id: "consent",
    label: "동의",
    title: "공개 범위는 기록 당사자가 정합니다",
    image: assetPath("consent-settings.png"),
    text: "생전 동의, 가족 권한, AI 활용 여부, 삭제권을 서비스 흐름 안에 넣었습니다.",
  },
  {
    id: "archive",
    label: "아카이브",
    title: "오래 보관하고, 필요할 때 다시 꺼냅니다",
    image: assetPath("family-archive.png"),
    text: "사진, 음성, 영상, 이야기 기록을 가족만의 프라이빗 공간에 보관합니다.",
  },
];

const principles = [
  ["명확한 동의", "수집 목적과 활용 범위를 기록 당사자가 직접 선택합니다."],
  ["권한별 열람", "가족 구성원마다 볼 수 있는 자료와 기능을 다르게 설정합니다."],
  ["AI 표시", "AI가 정리하거나 생성한 결과는 원본과 구분해 표시합니다."],
  ["철회와 삭제", "마음이 바뀌면 언제든 범위를 줄이거나 기록을 삭제할 수 있습니다."],
];

const businessModels = [
  ["기본 패키지", "회상 인터뷰, 음성 보존, 사진·영상 정리로 시작하는 가족 기록 상품"],
  ["프리미엄 기록", "출장 촬영, 영상 편지, 3D 초상, 스토리북 제작까지 포함한 고급형"],
  ["구독 보관함", "가족 전용 클라우드, 기념일 메시지, 주기적 업데이트를 제공"],
  ["기관 제휴", "상조회사, 실버타운, 요양기관과 연결되는 가족 기록 인프라"],
];

function App() {
  const [activePreview, setActivePreview] = useState(previewScreens[0]);
  const [consentMode, setConsentMode] = useState("가족 공유");

  const activeIndex = useMemo(
    () => previewScreens.findIndex((screen) => screen.id === activePreview.id) + 1,
    [activePreview]
  );

  return (
    <main className="site-shell">
      <Header />

      <section className="hero" id="intro">
        <img
          className="hero-image"
          src={assetPath("giuk-hero-archive.png")}
          alt="가족 사진, 편지, 가죽 아카이브 앨범으로 구성된 프로젝트 기억 히어로 이미지"
        />
        <div className="hero-content">
          <h1>
            <span>프로젝트</span>
            <span>기억</span>
          </h1>
          <p className="hero-lead">
            부모님의 오늘을 가족의 미래 자산으로 남기는 AI 아카이브입니다.
            얼굴, 목소리, 이야기와 기록 권한까지 생전 동의로 보존합니다.
          </p>
          <div className="hero-actions">
            <a href="#service" className="primary-action">
              서비스 흐름 보기 <ArrowRight size={18} />
            </a>
            <a href="#preview" className="ghost-action">
              제품 화면 보기 <Play size={17} />
            </a>
          </div>
          <div className="hero-proof" aria-label="핵심 가치">
            {proofStats.map(([title, text]) => (
              <span key={title}>
                <strong>{title}</strong>
                {text}
              </span>
            ))}
          </div>
        </div>
        <div className="hero-rail" aria-hidden="true">
          <span>기록</span>
          <span>연결</span>
          <span className="active">영원</span>
        </div>
      </section>

      <section className="problem band-light" id="problem">
        <div className="split-heading">
          <span className="section-label">Problem</span>
          <h2>사진만으로는 남지 않는 기억이 있습니다</h2>
          <p>
            가족은 기록을 원하지만 무엇을, 어떻게, 어떤 권한으로 남겨야 할지 몰라 자꾸 미룹니다.
            프로젝트 기억은 이 공백을 제품 흐름으로 해결합니다.
          </p>
        </div>
        <div className="problem-grid">
          {problemPoints.map((item) => {
            const Icon = item.icon;
            return (
              <article className="problem-item" key={item.title}>
                <Icon size={28} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="service" id="service">
        <div className="section-heading">
          <span className="section-label">Service Flow</span>
          <h2>기록에서 연결까지, 단계마다 안전하게</h2>
        </div>
        <div className="flow-line">
          {serviceFlow.map((item, index) => {
            const Icon = item.icon;
            return (
              <article className="flow-step" key={item.title}>
                <span className="flow-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="flow-icon">
                  <Icon size={25} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="preview band-dark" id="preview">
        <div className="preview-copy">
          <span className="section-label">Product Preview</span>
          <h2>감성은 아카이브처럼, 사용성은 제품처럼</h2>
          <p>
            발표용 콘셉트가 아니라 실제 서비스처럼 보이도록 기록 수집, 권한 관리,
            가족 열람 화면을 하나의 흐름으로 연결했습니다.
          </p>
          <div className="preview-tabs" role="tablist" aria-label="제품 화면 선택">
            {previewScreens.map((screen) => (
              <button
                type="button"
                className={activePreview.id === screen.id ? "active" : ""}
                onClick={() => setActivePreview(screen)}
                key={screen.id}
              >
                {screen.label}
              </button>
            ))}
          </div>
        </div>
        <div className="screen-stage">
          <div className="screen-caption">
            <span>{String(activeIndex).padStart(2, "0")}</span>
            <div>
              <h3>{activePreview.title}</h3>
              <p>{activePreview.text}</p>
            </div>
          </div>
          <img src={activePreview.image} alt={`${activePreview.label} 화면 미리보기`} />
        </div>
      </section>

      <section className="technology" id="technology">
        <div className="section-heading">
          <span className="section-label">Archive System</span>
          <h2>기억을 모으고, 정리하고, 다시 꺼내는 구조</h2>
        </div>
        <div className="tech-layout">
          <div className="process-frame">
            <img
              src={assetPath("process-infographic.png")}
              alt="프로젝트 기억의 기록 수집, AI 서비스, 미래 아카이브 단계"
            />
          </div>
          <div className="tech-list">
            <Feature icon={Images} title="시각 기억" text="사진, 영상, 다각도 촬영으로 표정과 자세를 남깁니다." />
            <Feature icon={FileAudio} title="청각 기억" text="회상 인터뷰와 영상 편지로 말투, 억양, 웃음소리를 보존합니다." />
            <Feature icon={FolderOpen} title="스토리 아카이브" text="AI가 흩어진 자료를 분류하고 삶의 이야기를 검색 가능한 기록으로 정리합니다." />
            <Feature icon={Video} title="미래 확장" text="3D 초상, 제한형 음성, XR·MR 활용은 동의 범위 안에서 단계적으로 확장합니다." />
          </div>
        </div>
      </section>

      <section className="ethics band-light" id="ethics">
        <div className="consent-panel">
          <div className="consent-copy">
            <span className="section-label">Consent First</span>
            <h2>가족이 아니라, 기록 당사자가 먼저입니다</h2>
            <p>
              프로젝트 기억은 누군가를 복제하는 서비스가 아닙니다. 스스로 정한 방식으로
              기억될 권리를 지키는 서비스입니다.
            </p>
            <div className="principle-grid">
              {principles.map(([title, text]) => (
                <article className="principle-item" key={title}>
                  <Check size={18} />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="consent-widget">
            <div className="widget-header">
              <ShieldCheck size={22} />
              <strong>공개 범위 설정</strong>
            </div>
            <div className="segmented">
              {["본인만", "가족 공유", "선택 가족"].map((mode) => (
                <button
                  type="button"
                  className={consentMode === mode ? "selected" : ""}
                  onClick={() => setConsentMode(mode)}
                  key={mode}
                >
                  {mode}
                </button>
              ))}
            </div>
            <ul className="check-list">
              <li>
                <Check size={17} /> 언제든 수정·철회 가능
              </li>
              <li>
                <Check size={17} /> AI 생성 여부 명확히 표시
              </li>
              <li>
                <Check size={17} /> 원본 암호화와 접근 로그 관리
              </li>
            </ul>
            <div className="mode-result">
              현재 선택 <strong>{consentMode}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="business" id="business">
        <div className="section-heading align-left">
          <span className="section-label">Business Model</span>
          <h2>B2C 패키지에서 가족 기록 인프라로 확장합니다</h2>
        </div>
        <div className="business-grid">
          {businessModels.map(([title, text]) => (
            <article className="business-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
              <ChevronRight size={20} />
            </article>
          ))}
        </div>
      </section>

      <section className="closing band-dark">
        <div>
          <h2>오늘의 목소리를, 내일의 가족에게.</h2>
          <p>
            기술보다 먼저 남겨야 할 것은 사람의 선택입니다. 프로젝트 기억은 그 선택을
            존중하며 가족의 시간을 오래 보관합니다.
          </p>
        </div>
        <a href="#intro" className="primary-action">
          처음으로 돌아가기 <ArrowRight size={18} />
        </a>
      </section>
    </main>
  );
}

function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="#intro" aria-label="프로젝트 기억 홈">
        <span className="brand-mark">
          <Archive size={22} />
        </span>
        프로젝트 기억
      </a>
      <nav aria-label="주요 섹션">
        {navItems.map(([label, href]) => (
          <a href={href} key={href}>
            {label}
          </a>
        ))}
      </nav>
      <a className="top-action" href="#preview">
        화면 보기
      </a>
    </header>
  );
}

function Feature({ icon: Icon, title, text }) {
  return (
    <article className="feature">
      <div className="feature-icon">
        <Icon size={22} />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}

createRoot(document.getElementById("root")).render(<App />);
