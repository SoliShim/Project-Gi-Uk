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
  Clock3,
  FileAudio,
  FolderOpen,
  HeartHandshake,
  Images,
  LockKeyhole,
  Play,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Video,
} from "lucide-react";
import "./styles.css";

const assetPath = (fileName) => `${import.meta.env.BASE_URL}assets/${fileName}`;

const previewScreens = [
  {
    id: "home",
    label: "홈",
    title: "오늘의 모습, 목소리, 이야기를 기록하세요",
    image: assetPath("home-dashboard.png"),
    text: "가족이 무엇부터 남겨야 하는지 바로 이해하는 첫 화면입니다.",
  },
  {
    id: "record",
    label: "기록하기",
    title: "사진, 인터뷰, 영상 편지를 한 곳에서",
    image: assetPath("record-center.png"),
    text: "흩어진 자료와 새 기록을 부모님 중심으로 정리합니다.",
  },
  {
    id: "consent",
    label: "동의",
    title: "기록의 주인이 공개 범위를 정합니다",
    image: assetPath("consent-settings.png"),
    text: "생전 동의, 가족 권한, 삭제권을 서비스 흐름 안에 넣었습니다.",
  },
  {
    id: "archive",
    label: "아카이브",
    title: "오래 보관하고, 필요할 때 다시 꺼냅니다",
    image: assetPath("family-archive.png"),
    text: "사진, 음성, 영상, 이야기 기록을 가족만의 프라이빗 공간에 보관합니다.",
  },
];

const problemPoints = [
  ["흩어진 기록", "사진첩, 메신저, 휴대폰, 녹음 파일에 가족의 기억이 분산됩니다."],
  ["사라지는 현재", "표정, 말투, 웃음소리, 걸음걸이는 시간이 지나면 다시 촬영할 수 없습니다."],
  ["세대 간 단절", "손주 세대는 조부모의 삶을 몇 장의 사진과 짧은 기억으로만 접하게 됩니다."],
];

const flow = [
  {
    icon: Camera,
    color: "orange",
    title: "1. 입체적인 기록 수집",
    text: "사진, 영상, 회상 인터뷰, 음성 녹음으로 부모님의 지금을 데이터화합니다.",
  },
  {
    icon: Brain,
    color: "green",
    title: "2. AI 기반 정리와 체감",
    text: "AI가 흩어진 기록을 분류하고, 스토리 아카이브와 제한형 대화 경험으로 연결합니다.",
  },
  {
    icon: Sparkles,
    color: "blue",
    title: "3. 미래 대응형 보관",
    text: "3D 초상, XR, MR 등 미래 기술이 보편화되는 시점에 활용할 수 있도록 안전하게 보관합니다.",
  },
  {
    icon: ShieldCheck,
    color: "purple",
    title: "원칙. 당사자 중심 보호",
    text: "기록 당사자의 생전 동의, 공개 범위, 삭제권, 가족 접근권을 가장 먼저 설계합니다.",
  },
];

const businessModels = [
  ["기본형", "회상 인터뷰, 음성 보존, 사진·영상 정리 중심의 시작 패키지"],
  ["프리미엄형", "출장 촬영, 3D 기록, 영상 편지, 입체 초상 제작"],
  ["구독형", "가족 전용 보관함, 기념일 메시지, 주기적 업데이트"],
  ["B2B 제휴", "상조회사, 실버타운, 요양기관과 연결되는 가족 기록 인프라"],
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
        <div className="hero-copy">
          <p className="section-mark">Project Gi-Uk</p>
          <h1>부모님의 오늘을 가족의 미래 자산으로 남깁니다</h1>
          <p className="hero-lead">
            프로젝트 기억은 부모님과 조부모님의 얼굴, 목소리, 삶의 이야기를
            생전 동의 기반으로 기록하고 AI로 정리해 다음 세대까지 안전하게
            전하는 가족 기억 아카이브입니다.
          </p>
          <div className="hero-actions">
            <a href="#service" className="primary-action">
              서비스 구조 보기 <ArrowRight size={18} />
            </a>
            <a href="#ethics" className="secondary-action">
              동의 원칙 확인
            </a>
          </div>
          <div className="hero-proof" aria-label="핵심 가치">
            <span>
              <ShieldCheck size={18} /> 생전 동의
            </span>
            <span>
              <Archive size={18} /> 가족 아카이브
            </span>
            <span>
              <LockKeyhole size={18} /> 비공개 기본값
            </span>
          </div>
        </div>
        <div className="hero-visual" aria-label="프로젝트 기억 화면 미리보기">
          <img src={assetPath("home-dashboard.png")} alt="프로젝트 기억 서비스 홈 화면" />
          <div className="floating-note">
            <Clock3 size={18} />
            <span>오늘이 부모님의 가장 젊고 아름다운 날입니다</span>
          </div>
        </div>
      </section>

      <section className="problem band" id="problem">
        <div className="section-heading">
          <p className="section-mark">Problem</p>
          <h2>사진만으로는 남지 않는 기억이 있습니다</h2>
          <p>
            가족은 기록을 원하지만 무엇을, 어떻게, 어떤 권한으로 남겨야 할지
            몰라 자꾸 미룹니다. 프로젝트 기억은 이 공백을 서비스 흐름으로
            해결합니다.
          </p>
        </div>
        <div className="problem-grid">
          {problemPoints.map(([title, text], index) => (
            <article className="soft-card" key={title}>
              <span className="number">{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="service" id="service">
        <div className="section-heading left">
          <p className="section-mark">Service Flow</p>
          <h2>기록 수집에서 미래 보관까지, 단계적으로 실현합니다</h2>
        </div>
        <div className="timeline">
          {flow.map((item) => {
            const Icon = item.icon;
            return (
              <article className={`flow-card ${item.color}`} key={item.title}>
                <div className="flow-icon">
                  <Icon size={28} />
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="preview band" id="preview">
        <div className="preview-copy">
          <p className="section-mark">Prototype</p>
          <h2>공모전 발표에서 바로 보여줄 수 있는 제품 화면</h2>
          <p>
            참고 이미지의 UI 톤을 유지해 서비스가 실제로 어떻게 작동하는지
            보여줍니다. 따뜻한 가족 사진과 업무형 대시보드를 결합해 감성과
            실현 가능성을 함께 전달합니다.
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
          <p className="section-mark">Technology</p>
          <h2>거대한 재현보다, 안전하게 작동하는 기록 인프라부터</h2>
        </div>
        <div className="tech-layout">
          <div className="process-frame">
            <img src={assetPath("process-infographic.png")} alt="프로젝트 기억의 기록 수집, AI 서비스, 미래 아카이브 단계" />
          </div>
          <div className="tech-list">
            <Feature icon={Images} title="시각 기억" text="사진, 영상, 다각도 촬영으로 표정과 자세를 남깁니다." />
            <Feature icon={FileAudio} title="청각 기억" text="회상 인터뷰와 영상 편지로 말투, 억양, 웃음소리를 보존합니다." />
            <Feature icon={FolderOpen} title="스토리 아카이브" text="AI가 흩어진 자료를 분류하고 삶의 이야기를 검색 가능한 기록으로 정리합니다." />
            <Feature icon={Video} title="미래 확장" text="3D 초상, 제한형 TTS, XR·MR 활용은 동의 범위 안에서 단계적으로 확장합니다." />
          </div>
        </div>
      </section>

      <section className="ethics band" id="ethics">
        <div className="consent-panel">
          <div>
            <p className="section-mark">Consent First</p>
            <h2>가족이 아니라, 기록 당사자가 먼저입니다</h2>
            <p>
              프로젝트 기억은 부모님을 복제하는 서비스가 아닙니다. 스스로 정한
              방식으로 기억될 권리를 지키는 서비스입니다.
            </p>
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
              현재 선택: <strong>{consentMode}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="business" id="business">
        <div className="section-heading left">
          <p className="section-mark">Business Model</p>
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

      <section className="closing">
        <div>
          <h2>나중이 아니라, 지금 남기는 가족의 시간</h2>
          <p>
            프로젝트 기억은 기술 과시보다 기록의 존엄을 먼저 둡니다. 살아 계신
            지금의 목소리와 이야기를 안전하게 남기는 것, 그것이 이 서비스의
            시작입니다.
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
          <Archive size={24} />
        </span>
        프로젝트 기억
      </a>
      <nav aria-label="주요 섹션">
        <a href="#problem">문제</a>
        <a href="#service">서비스</a>
        <a href="#preview">프로토타입</a>
        <a href="#ethics">동의</a>
        <a href="#business">사업성</a>
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
        <Icon size={23} />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}

createRoot(document.getElementById("root")).render(<App />);
