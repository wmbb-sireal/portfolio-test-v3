import './index.css';

/**
 * 전시진 노코드 자동화 컨설턴트 포트폴리오
 * Core Interactive Client-Side Logic (No-React Pure HTML/CSS/TS)
 * Trigger Update: 2026-05-25 (Dummy Trigger)
 */

function init() {
  init3DTilt();
  initCopyToClipboard();
  initFlowSimulator();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/**
 * 1. 3D Glassmorphism Card Tilt & Light Reflection Effect
 * Applies realistic 3D perspective tilt and light reflections matching cursor hover
 */
function init3DTilt() {
  const cards = document.querySelectorAll('.glass-card');
  
  cards.forEach((element) => {
    const card = element as HTMLElement;
    
    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x coordinate inside the card
      const y = e.clientY - rect.top;  // y coordinate inside the card
      
      // Pass coordinate styles for gloss shimmer highlight
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      
      // Calculate angular rotaton (max 10 degrees limits)
      const width = rect.width;
      const height = rect.height;
      const rotateX = ((height / 2 - y) / (height / 2)) * 8; // Tilt up/down
      const rotateY = ((x - width / 2) / (width / 2)) * 8;  // Tilt left/right
      
      // Render 3D transformation matrix smoothly
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    });
    
    card.addEventListener('mouseleave', () => {
      // Return cards to rest smoothly
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/**
 * 2. Contact Details Click To Copy Functionality
 * Automatically copies text, triggering a sleek responsive green success Toast
 */
function initCopyToClipboard() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  const toast = document.getElementById('copy-toast');
  let toastTimer: ReturnType<typeof setTimeout> | null = null;
  
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        if (!toast) return;
        
        // Show success animation
        toast.classList.remove('opacity-0', 'scale-90');
        toast.classList.add('opacity-100', 'scale-100');
        
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
          toast.classList.remove('opacity-100', 'scale-100');
          toast.classList.add('opacity-0', 'scale-90');
        }, 1800);
      }).catch(err => {
        console.error('클립보드 복사 실패:', err);
      });
    });
  });
}

/**
 * 3. Interactive No-Code Automation Flow Simulator
 * Hand-coded sequentially-animated pipeline canvas that renders simulated logic
 */
interface NodeConfig {
  icon: string;
  title: string;
  subtitle: string;
}

interface FlowScenario {
  indicator: string;
  logColor: string;
  nodes: {
    1: NodeConfig;
    2: NodeConfig;
    3: NodeConfig;
    4: NodeConfig;
  };
  logs: string[];
}

function initFlowSimulator() {
  const btn1 = document.getElementById('btn-flow-1');
  const btn2 = document.getElementById('btn-flow-2');
  const btn3 = document.getElementById('btn-flow-3');
  const terminal = document.getElementById('simulator-terminal-logs');
  const statusIndicator = document.getElementById('sim-status-indicator');
  
  if (!btn1 || !btn2 || !btn3 || !terminal) return;

  // Set default state
  let isExecuting = false;

  // SVG representation templates
  const SVG_ICONS = {
    webflow: `<svg class="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z"/></svg>`,
    payments: `<svg class="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>`,
    facebook: `<svg class="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>`,
    
    make: `<svg class="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>`,
    zapier: `<svg class="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4M8 12h8"/></svg>`,
    
    notion: `<svg class="w-5 h-5 text-slate-100" viewBox="0 0 24 24" fill="currentColor"><path d="M0 2.8A2.8 2.8 0 012.8 0h18.4A2.8 2.8 0 0124 2.8v18.4a2.8 2.8 0 01-2.8 2.8H2.8A2.8 2.8 0 010 21.2V2.8zm5.1 2.3v13.8l5.2-1V5.1L5.1 5.1zm13.8 0l-5.3 1v12.8l5.3-1V5.1z" /></svg>`,
    sheets: `<svg class="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" /></svg>`,
    sms: `<svg class="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>`,
    
    slack: `<svg class="w-5 h-5 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="2"/><rect x="8" y="8" width="8" height="8" rx="1"/></svg>`,
    gmail: `<svg class="w-5 h-5 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 6l9 6 9-6" /></svg>`
  };

  // Defining Scenarios Configuration
  const scenarios: Record<string, FlowScenario> = {
    flow1: {
      indicator: "SCENARIO_1: INQUIRY_ROUTING",
      logColor: "text-cyan-400",
      nodes: {
        1: { icon: SVG_ICONS.webflow, title: "Webflow Form", subtitle: "고객 문의 제출" },
        2: { icon: SVG_ICONS.make, title: "Make.com Router", subtitle: "조건별 라우팅" },
        3: { icon: SVG_ICONS.notion, title: "Notion CRM", subtitle: "문의 리스트 DB 기록" },
        4: { icon: SVG_ICONS.slack, title: "Slack Channel", subtitle: "개발/영업 전용 알림" }
      },
      logs: [
        "[Webflow] 📥 신규 상담 신청서 수집 완료 - 이름: [홍길동], 이메일: [gildong@example.com] (0.00s)",
        "[System] ⚙️ 웹훅 트리거 작동! Make.com 라이브 인스턴스로 암호화 페이로드 전송 완료 (0.15s)",
        "[Make.com] 🔍 데이터 스파이더 필터 개시: 중복 확인 후 사내 영업 담당 프로세스 배정 라우터 동작 (0.32s)",
        "[Notion] 📝 Notion CRM 데이터베이스 API 연동 성공. 신규 페이지 인덱싱 & 담당자 배정 처리 완료 (0.64s)",
        "[Slack] 💬 #sales-leads 채널 알림 포맷 완료: @홍길동 문의가 Notion DB #1024에 등록되었습니다. (0.95s)",
        "[System] ✅ [전체 자동화 정상 작동 완료] 소요 시간: 0.95s / 수동 입력 대비 업무 시간 100% 절감"
      ]
    },
    flow2: {
      indicator: "SCENARIO_2: FIN_REVENUE_REPORT",
      logColor: "text-emerald-400",
      nodes: {
        1: { icon: SVG_ICONS.payments, title: "Toss Payments", subtitle: "매출 결제 완료" },
        2: { icon: SVG_ICONS.zapier, title: "Zapier Integrator", subtitle: "매출 합산 가공" },
        3: { icon: SVG_ICONS.sheets, title: "Google Sheets", subtitle: "회계 결산 대장 기록" },
        4: { icon: SVG_ICONS.gmail, title: "Gmail Automailer", subtitle: "경영 본부 전결 보고" }
      },
      logs: [
        "[TossPay] 💰 가상계좌 실시간 실결제 잡 완료: 결제금액 12,500,000 KRW 입금 확인 (0.00s)",
        "[System] ⚡ Toss API Poller 구동 완료. 결제 내역 추출 및 Zapier 통합 파이프라인 전송 (0.12s)",
        "[Zapier] 🧮 결제 아이디 및 부가가치세 자동 변환 집계 모듈 순차 필터링 연동 성공 (0.40s)",
        "[Sheets] 📊 구글 스프레드시트 2026 회계 시트 즉시 행 추가 완료 (추가 위치: Row 875) (0.75s)",
        "[Gmail] 📧 경영지원팀 및 임원 전용 자동 결산 보고서 발송 완료 - [일일 회계 리포트 #2026-05] (1.10s)",
        "[System] ✅ [회계 자동화 수행 완료] 소요 시간: 1.10s / 수동 장부 취합 리소스 1.5시간 완전 해소"
      ]
    },
    flow3: {
      indicator: "SCENARIO_3: MARKETING_CRM_SOL",
      logColor: "text-purple-400",
      nodes: {
        1: { icon: SVG_ICONS.facebook, title: "Meta Lead Ads", subtitle: "신규 광고 리드 유입" },
        2: { icon: SVG_ICONS.make, title: "Make Integrator", subtitle: "유효성 즉시 체크" },
        3: { icon: SVG_ICONS.sms, title: "Solapi API", subtitle: "환영 알림톡 즉시 발송" },
        4: { icon: SVG_ICONS.slack, title: "Sales Slack", subtitle: "영업 전담 담당자 지정" }
      },
      logs: [
        "[Facebook] 🚀 Meta 픽셀 광고 전환 유입 수집 완료: 리드 유입 성명 [김철수] (0.00s)",
        "[System] ⚙️ 가상 웹훅 실시간 수신 수립에 따른 API 파이프 분배 및 JSON 파싱 완료 (0.20s)",
        "[Make.com] 🎯 휴대폰 번호 유효 자릿수 패턴 대조식 부합 여부 탐색 - [정상 상태] 판정 (0.42s)",
        "[Solapi] 💬 알림톡 브랜드 전용 API 커넥터 호출: [김철수님, 시리얼 컨설팅을 찾아주셔서 감사합니다...] (0.78s)",
        "[Slack] 🤝 #sales-operations 전용 채널 리드 입수 실시간 콜백 @김철수 영업 배정 인덱스 전송 (1.05s)",
        "[System] ✅ [마케팅 오토메이션 완료] 소요 시간: 1.05s / 고객 리드 대응 지연률 0%"
      ]
    }
  };

  function displayNodes(scenarioKey: string) {
    const data = scenarios[scenarioKey];
    for (let i = 1; i <= 4; i++) {
      const nodeData = data.nodes[i as 1 | 2 | 3 | 4];
      const nodeBox = document.getElementById(`node-${i}`);
      const titleElem = document.getElementById(`node-${i}-title`);
      const subtitleElem = document.getElementById(`node-${i}-subtitle`);
      
      if (!nodeBox || !titleElem || !subtitleElem) continue;
      
      // Update Title & Subtitle
      titleElem.textContent = nodeData.title;
      subtitleElem.textContent = nodeData.subtitle;
      
      // Update Icon Container
      const iconContainer = nodeBox.querySelector('div');
      if (iconContainer) {
        iconContainer.innerHTML = nodeData.icon;
      }
    }
  }

  async function runSimulation(scenarioKey: string) {
    if (isExecuting) return;
    isExecuting = true;

    const data = scenarios[scenarioKey];
    if (statusIndicator) {
      statusIndicator.textContent = data.indicator;
      statusIndicator.className = "text-[9px] font-mono text-cyan-400 animate-pulse";
    }

    // Reset styles on nodes and connectors first
    resetConnectorStyles();
    
    // Clear log and print initial loading state
    terminal.innerHTML = `<span class="text-slate-500">[SYSTEM]</span> 가상 파이프라인 구동 작업을 진행합니다. 시뮬레이션을 분석하는 중입니다...<br>`;

    // Step-by-step sequential animation running logic
    try {
      // Step 1: Trigger Node 1
      activeNode(1, true, scenarioKey);
      await printLog(data.logs[0], data.logColor, 0);
      
      // Connection 1
      await animateConnector(1, true);
      
      // Step 2: Trigger Node 2
      activeNode(2, true, scenarioKey);
      await printLog(data.logs[1], data.logColor, 400);
      await printLog(data.logs[2], data.logColor, 400);

      // Connection 2
      await animateConnector(2, true);

      // Step 3: Trigger Node 3
      activeNode(3, true, scenarioKey);
      await printLog(data.logs[3], data.logColor, 600);

      // Connection 3
      await animateConnector(3, true);

      // Step 4: Trigger Node 4
      activeNode(4, true, scenarioKey);
      await printLog(data.logs[4], data.logColor, 500);
      await printLog(data.logs[5], "text-emerald-400 font-bold", 600);

    } catch (e) {
      console.error(e);
    } finally {
      isExecuting = false;
      if (statusIndicator) {
        statusIndicator.textContent = "SIMULATION IDLE";
        statusIndicator.className = "text-[9px] font-mono text-slate-500";
      }
    }
  }

  // Helper functions
  function resetConnectorStyles() {
    for (let i = 1; i <= 4; i++) {
      const node = document.getElementById(`node-${i}`);
      if (node) {
        node.className = "w-40 p-4 rounded-xl bg-slate-900/80 border border-white/10 text-center relative shadow-lg transition-all duration-300";
      }
    }
    for (let i = 1; i <= 3; i++) {
      const wire = document.getElementById(`wire-${i}`);
      const wireV = document.getElementById(`wire-${i}-v`);
      const pulse = document.getElementById(`flow-pulse-${i}`);
      
      if (wire) wire.style.width = '0%';
      if (wireV) wireV.style.height = '0%';
      if (pulse) pulse.classList.add('hidden');
    }
  }

  function activeNode(id: number, active: boolean, scenarioKey: string) {
    const node = document.getElementById(`node-${id}`);
    if (!node) return;
    
    if (active) {
      let glowClass = "border-cyan-400 bg-cyan-950/20 shadow-[0_0_15px_rgba(34,211,238,0.25)] scale-105";
      if (scenarioKey === 'flow2') {
        glowClass = "border-emerald-400 bg-emerald-950/20 shadow-[0_0_15px_rgba(52,211,153,0.25)] scale-105";
      } else if (scenarioKey === 'flow3') {
        glowClass = "border-purple-400 bg-purple-950/20 shadow-[0_0_15px_rgba(167,139,250,0.25)] scale-105";
      }
      node.className = `w-40 p-4 rounded-xl border text-center relative shadow-lg transition-all duration-350 ${glowClass}`;
    } else {
      node.className = "w-40 p-4 rounded-xl bg-slate-900/80 border border-white/10 text-center relative shadow-lg transition-all duration-300";
    }
  }

  function animateConnector(id: number, active: boolean): Promise<void> {
    return new Promise((resolve) => {
      const wire = document.getElementById(`wire-${id}`);
      const wireV = document.getElementById(`wire-${id}-v`);
      const pulse = document.getElementById(`flow-pulse-${id}`);
      
      if (active) {
        if (wire) wire.style.width = '100%';
        if (wireV) wireV.style.height = '100%';
        if (pulse) {
          pulse.classList.remove('hidden');
          pulse.style.left = '0%';
          // custom pulse travel
          let pos = 0;
          const interval = setInterval(() => {
            pos += 5;
            if (pulse) pulse.style.left = `${pos}%`;
            if (pos >= 100) {
              clearInterval(interval);
              pulse.classList.add('hidden');
            }
          }, 45);
        }
      }
      setTimeout(resolve, 1000); // 1s sync wire visual completion
    });
  }

  function printLog(text: string, colorClass: string, delay: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = `${colorClass} py-0.5 leading-relaxed overflow-hidden whitespace-nowrap border-r-2 border-transparent animate-pulse`;
        line.textContent = text;
        
        terminal.appendChild(line);
        // auto-scroll
        terminal.scrollTop = terminal.scrollHeight;
        resolve();
      }, delay);
    });
  }

  // Event bindings
  btn1.addEventListener('click', () => {
    if (isExecuting) return;
    displayNodes('flow1');
    runSimulation('flow1');
  });

  btn2.addEventListener('click', () => {
    if (isExecuting) return;
    displayNodes('flow2');
    runSimulation('flow2');
  });

  btn3.addEventListener('click', () => {
    if (isExecuting) return;
    displayNodes('flow3');
    runSimulation('flow3');
  });

  // Run flow 1 immediately on mount representing beautiful loading simulation
  setTimeout(() => {
    displayNodes('flow1');
    runSimulation('flow1');
  }, 1000);
}
