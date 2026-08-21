import React, { useState } from 'react';
import {
  Cpu,
  Eye,
  Compass,
  Wrench,
  Sparkles,
  Zap,
  Activity,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Search,
  ArrowRight,
  ShieldCheck,
  Radio,
  Sliders,
  Terminal,
  ExternalLink,
  Code2,
  Layers
} from 'lucide-react';
import Logo from './Logo';
import Badge from './Badge';
import Button from './Button';
import Card from './Card';
import TechCard from './TechCard';
import MetricCard from './MetricCard';
import SectionHeading from './SectionHeading';
import Tabs from './Tabs';
import Input from './Input';
import TechGridBackground from './TechGridBackground';
import './DesignSystemShowcase.css';

export const DesignSystemShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [customPunctuation, setCustomPunctuation] = useState('/');

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const navTabs = [
    { id: 'overview', label: '1. Overview & Tokens' },
    { id: 'logo', label: '2. Club Logo (Righteous)' },
    { id: 'subteams', label: '3. Sub-team Cards' },
    { id: 'telemetry', label: '4. Code & Telemetry HUD' },
    { id: 'typography', label: '5. Typography' },
    { id: 'buttons', label: '6. Buttons & Actions' },
    { id: 'badges', label: '7. Badges & Status' },
    { id: 'cards', label: '8. Metric Cards' },
    { id: 'inputs', label: '9. Form Controls' },
  ];

  return (
    <TechGridBackground variant="both" glowColor="both" className="ds-showcase-page">
      <div className="ds-showcase-container">
        
        {/* Header Hero */}
        <div className="ds-showcase-hero">
          <div className="ds-hero-badge-row">
            <Badge variant="purple" size="sm" dot pulse>
              DESIGN SYSTEM V1.1 • SILICON VALLEY MINIMALIST
            </Badge>
            <Badge variant="cyan" size="sm">
              BRANCH: theme-1
            </Badge>
          </div>

          <div className="ds-hero-logo-banner">
            <Logo size="xl" punctuation="/" linkToHome={false} />
          </div>

          <p className="ds-showcase-lead">
            The updated visual language for Western Engineering AutoPilot. Featuring Righteous branding typography,
            high-contrast Fira Code telemetry, dark slate surfaces, and clean non-wrapping sub-team cards.
          </p>

          <div className="ds-showcase-quick-stats">
            <div className="ds-stat-pill">
              <Sparkles size={14} className="ds-stat-icon-purple" />
              <span>Righteous Club Logo</span>
            </div>
            <div className="ds-stat-pill">
              <Code2 size={14} className="ds-stat-icon-cyan" />
              <span>High-Contrast Fira Code Telemetry</span>
            </div>
            <div className="ds-stat-pill">
              <Layers size={14} className="ds-stat-icon-emerald" />
              <span>Clean Sub-team Architecture</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="ds-showcase-tabs-sticky">
          <Tabs
            tabs={navTabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* TAB 1: OVERVIEW & COLOR PALETTE */}
        {activeTab === 'overview' && (
          <section className="ds-showcase-section">
            <SectionHeading
              badge="COLOR SYSTEM"
              title="Color Tokens &"
              titleGradient="Surface Hierarchy"
              subtitle="Precision dark palette calibrated for high contrast, clean separation, and reduced eye strain."
              align="left"
            />

            <div className="ds-tokens-grid">
              {/* Brand Purple */}
              <div className="ds-color-group">
                <h4 className="ds-color-group-title">Western Heritage Purple (Brand)</h4>
                <div className="ds-swatches-row">
                  {[
                    { name: 'Purple 400', hex: '#a78bfa', var: '--purple-400' },
                    { name: 'Purple 500', hex: '#8b5cf6', var: '--purple-500' },
                    { name: 'Purple 600', hex: '#7c3aed', var: '--purple-600' },
                    { name: 'Purple 700', hex: '#6d28d9', var: '--purple-700' },
                  ].map((color) => (
                    <div
                      key={color.hex}
                      className="ds-color-swatch"
                      onClick={() => copyToClipboard(color.hex)}
                    >
                      <div className="ds-swatch-color" style={{ backgroundColor: color.hex }} />
                      <div className="ds-swatch-info">
                        <span className="ds-swatch-name">{color.name}</span>
                        <span className="ds-swatch-hex">
                          {copiedHex === color.hex ? <Check size={12} /> : color.hex}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Cyan */}
              <div className="ds-color-group">
                <h4 className="ds-color-group-title">Autonomous Lidar Cyan (Telemetry)</h4>
                <div className="ds-swatches-row">
                  {[
                    { name: 'Cyan 300', hex: '#7dd3fc', var: '--cyan-300' },
                    { name: 'Cyan 400', hex: '#38bdf8', var: '--cyan-400' },
                    { name: 'Cyan 500', hex: '#06b6d4', var: '--cyan-500' },
                    { name: 'Cyan 600', hex: '#0284c7', var: '--cyan-600' },
                  ].map((color) => (
                    <div
                      key={color.hex}
                      className="ds-color-swatch"
                      onClick={() => copyToClipboard(color.hex)}
                    >
                      <div className="ds-swatch-color" style={{ backgroundColor: color.hex }} />
                      <div className="ds-swatch-info">
                        <span className="ds-swatch-name">{color.name}</span>
                        <span className="ds-swatch-hex">
                          {copiedHex === color.hex ? <Check size={12} /> : color.hex}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slate & Obsidian Surfaces */}
              <div className="ds-color-group">
                <h4 className="ds-color-group-title">Slate & Obsidian Surfaces</h4>
                <div className="ds-swatches-row">
                  {[
                    { name: 'Base Dark', hex: '#06070a', var: '--bg-base' },
                    { name: 'Primary Slate', hex: '#0a0c12', var: '--bg-primary' },
                    { name: 'Secondary Slate', hex: '#0f121d', var: '--bg-secondary' },
                    { name: 'Elevated Glass', hex: '#161a29', var: '--bg-tertiary' },
                  ].map((color) => (
                    <div
                      key={color.hex}
                      className="ds-color-swatch"
                      onClick={() => copyToClipboard(color.hex)}
                    >
                      <div className="ds-swatch-color" style={{ backgroundColor: color.hex }} />
                      <div className="ds-swatch-info">
                        <span className="ds-swatch-name">{color.name}</span>
                        <span className="ds-swatch-hex">
                          {copiedHex === color.hex ? <Check size={12} /> : color.hex}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-team Signatures */}
              <div className="ds-color-group">
                <h4 className="ds-color-group-title">Sub-team Signature Accents</h4>
                <div className="ds-swatches-row">
                  {[
                    { name: 'Planning & Control', hex: '#a855f7', var: '--team-planning' },
                    { name: 'Perception', hex: '#06b6d4', var: '--team-perception' },
                    { name: 'Localization', hex: '#3b82f6', var: '--team-localization' },
                    { name: 'Build & Hardware', hex: '#10b981', var: '--team-build' },
                  ].map((color) => (
                    <div
                      key={color.hex}
                      className="ds-color-swatch"
                      onClick={() => copyToClipboard(color.hex)}
                    >
                      <div className="ds-swatch-color" style={{ backgroundColor: color.hex }} />
                      <div className="ds-swatch-info">
                        <span className="ds-swatch-name">{color.name}</span>
                        <span className="ds-swatch-hex">
                          {copiedHex === color.hex ? <Check size={12} /> : color.hex}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: CLUB LOGO (RIGHTEOUS FONT) */}
        {activeTab === 'logo' && (
          <section className="ds-showcase-section">
            <SectionHeading
              badge="BRAND IDENTITY"
              title="Club Logo with"
              titleGradient="Righteous Font & Stylized Punctuation"
              subtitle="Printed in Righteous font with electric glowing punctuation mark accents."
              align="left"
            />

            <div className="ds-logo-showcase-grid">
              {/* Interactive Punctuation Tester */}
              <Card variant="glass" padding="lg">
                <div className="ds-logo-tester-box">
                  <span className="ds-type-label">OFFICIAL LOGO PREVIEW (Righteous Font)</span>
                  <div className="ds-logo-live-preview">
                    <Logo size="xl" punctuation={customPunctuation} linkToHome={false} />
                  </div>

                  <div className="ds-logo-controls">
                    <label className="ds-input-label">Punctuation Selector (Default: '/' | Preparing for animation):</label>
                    <div className="ds-logo-button-presets">
                      {['/', '.,^*/', './*', '.*', '.^', '_', '///', '->', '::*'].map((punct) => (
                        <Button
                          key={punct}
                          variant={customPunctuation === punct ? 'glow' : 'outline'}
                          size="sm"
                          onClick={() => setCustomPunctuation(punct)}
                        >
                          {punct}
                        </Button>
                      ))}
                    </div>
                    <Input
                      placeholder="Or type custom punctuation here..."
                      value={customPunctuation}
                      onChange={(e) => setCustomPunctuation(e.target.value)}
                      containerClassName="ds-custom-punct-input"
                    />
                  </div>
                </div>
              </Card>

              {/* Logo Sizes Matrix */}
              <div className="ds-logo-sizes-grid">
                <Card variant="glass" padding="md">
                  <span className="ds-type-label">HEADER NAVBAR SIZE (SM / MD)</span>
                  <div className="ds-logo-sample-row">
                    <Logo size="sm" punctuation="/" linkToHome={false} />
                    <Logo size="md" punctuation="/" linkToHome={false} />
                  </div>
                </Card>

                <Card variant="glass" padding="md">
                  <span className="ds-type-label">LARGE HERO SIZES (LG / XL)</span>
                  <div className="ds-logo-sample-row">
                    <Logo size="lg" punctuation="/" linkToHome={false} />
                  </div>
                </Card>

                <Card variant="glass" padding="md">
                  <span className="ds-type-label">WITH SUBTITLE BADGE</span>
                  <div className="ds-logo-sample-row">
                    <Logo size="md" punctuation="/" showSubtitle linkToHome={false} />
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* TAB 3: SUB-TEAM CARDS (FIXED NON-WRAPPING LAYOUT) */}
        {activeTab === 'subteams' && (
          <section className="ds-showcase-section">
            <SectionHeading
              badge="AUTONOMOUS DIVISIONS"
              title="Specialized Engineering"
              titleGradient="Sub-team Cards"
              subtitle="Clean, full-width headers without awkward line breaks. Hover to test the lift micro-interaction."
              align="left"
            />

            <div className="ds-subteams-grid">
              <TechCard
                title="Planning & Control"
                subtitle="// SUB-TEAM 01"
                description="Designs state machines, path planning trajectories, model predictive controllers (MPC), and drive-by-wire actuations."
                badge="Active"
                badgeVariant="planning"
                accentColor="planning"
                tags={['ROS 2', 'MPC', 'C++', 'Motion Control']}
                icon={<Cpu size={22} />}
                to="/teams/planning-and-control"
              />

              <TechCard
                title="Perception"
                subtitle="// SUB-TEAM 02"
                description="Extracts 3D spatial features using multi-beam LiDAR point clouds, YOLOv8 object detection cameras, and sensor fusion."
                badge="Active"
                badgeVariant="perception"
                accentColor="perception"
                tags={['LiDAR 3D', 'YOLOv8', 'PyTorch', 'Point Clouds']}
                icon={<Eye size={22} />}
                to="/teams/perception"
              />

              <TechCard
                title="Localization & Mapping"
                subtitle="// SUB-TEAM 03"
                description="Estimates vehicle pose and maps environments utilizing Extended Kalman Filters (EKF), SLAM, RTK-GPS, and IMU telemetry."
                badge="Active"
                badgeVariant="localization"
                accentColor="localization"
                tags={['SLAM', 'EKF Fusion', 'RTK-GPS', 'State Estimation']}
                icon={<Compass size={22} />}
                to="/teams/localization"
              />

              <TechCard
                title="Build & Mechanical"
                subtitle="// SUB-TEAM 04"
                description="Engineers mechanical chassis, custom mounting rigs, thermal cooling systems, wiring harnesses, and battery power distro."
                badge="Active"
                badgeVariant="build"
                accentColor="build"
                tags={['CAD / SolidWorks', 'CAN Bus', 'Power Distro', 'Chassis Rig']}
                icon={<Wrench size={22} />}
                to="/teams/build"
              />
            </div>
          </section>
        )}

        {/* TAB 4: HIGH-CONTRAST TELEMETRY & CODE */}
        {activeTab === 'telemetry' && (
          <section className="ds-showcase-section">
            <SectionHeading
              badge="HIGH CONTRAST MONOSPACE"
              title="Fira Code Telemetry &"
              titleGradient="Terminal Window HUD"
              subtitle="Ultra-crisp, high-legibility telemetry logs and mission control telemetry readouts."
              align="left"
            />

            {/* Terminal Window */}
            <div className="ds-terminal-window">
              <div className="ds-terminal-topbar">
                <div className="ds-terminal-dots">
                  <span className="ds-term-dot ds-dot-red" />
                  <span className="ds-term-dot ds-dot-yellow" />
                  <span className="ds-term-dot ds-dot-green" />
                </div>
                <span className="ds-terminal-title">weap-autonomous-node :: mission_control.py</span>
                <span className="ds-terminal-status"><Badge variant="success" size="sm" dot pulse>LIVE 50Hz</Badge></span>
              </div>

              <div className="ds-terminal-body">
                <div className="ds-code-line">
                  <span className="ds-code-ln">01</span>
                  <span className="ds-code-comment"># Western Engineering AutoPilot - Telemetry Stream v2.4</span>
                </div>
                <div className="ds-code-line">
                  <span className="ds-code-ln">02</span>
                  <span className="ds-code-purple">from</span> weap_core.sensors <span className="ds-code-purple">import</span> Lidar128, StereoCamera, RTK_GPS
                </div>
                <div className="ds-code-line">
                  <span className="ds-code-ln">03</span>
                  <span className="ds-code-purple">from</span> weap_control.planner <span className="ds-code-purple">import</span> ModelPredictiveController
                </div>
                <div className="ds-code-line">
                  <span className="ds-code-ln">04</span>
                  <span className="ds-code-dim">------------------------------------------------------------------------</span>
                </div>
                <div className="ds-code-line">
                  <span className="ds-code-ln">05</span>
                  <span className="ds-code-time">[19:24:02.108]</span> <span className="ds-code-cyan">LIDAR:</span> <span className="ds-code-val">128 Channels ACTIVE</span> | <span className="ds-code-key">Rate:</span> <span className="ds-code-emerald">1.34M pts/sec</span>
                </div>
                <div className="ds-code-line">
                  <span className="ds-code-ln">06</span>
                  <span className="ds-code-time">[19:24:02.114]</span> <span className="ds-code-cyan">EKF_POSE:</span> <span className="ds-code-key">X=</span><span className="ds-code-val">43.0092m</span> <span className="ds-code-key">Y=</span><span className="ds-code-val">-81.2736m</span> <span className="ds-code-key">Yaw=</span><span className="ds-code-val">+14.2°</span>
                </div>
                <div className="ds-code-line">
                  <span className="ds-code-ln">07</span>
                  <span className="ds-code-time">[19:24:02.120]</span> <span className="ds-code-cyan">OBJECTS:</span> <span className="ds-code-val">3 Pedestrians, 1 Vehicle</span> | <span className="ds-code-key">Inference:</span> <span className="ds-code-emerald">11.8ms</span>
                </div>
                <div className="ds-code-line">
                  <span className="ds-code-ln">08</span>
                  <span className="ds-code-time">[19:24:02.128]</span> <span className="ds-code-cyan">CONTROLLER:</span> <span className="ds-code-purple">STATE_AUTONOMOUS_NAV</span> | <span className="ds-code-key">Throttle:</span> <span className="ds-code-val">28%</span> <span className="ds-code-key">Steer:</span> <span className="ds-code-val">-1.4°</span>
                </div>
                <div className="ds-code-line">
                  <span className="ds-code-ln">09</span>
                  <span className="ds-code-prompt">weap@vehicle-node:~$</span> <span className="ds-code-cursor">_</span>
                </div>
              </div>
            </div>

            {/* Telemetry Metric HUD */}
            <div className="ds-telemetry-panel">
              <div className="ds-telemetry-header">
                <div className="ds-telemetry-header-left">
                  <Radio size={16} className="ds-icon-pulse-cyan" />
                  <span className="ds-mono ds-telemetry-title">AUTONOMOUS TELEMETRY CONSOLE // REAL-TIME HUD</span>
                </div>
                <div className="ds-telemetry-header-right">
                  <Badge variant="success" size="sm" dot pulse>LATENCY: 11ms</Badge>
                  <Badge variant="cyan" size="sm">BANDWIDTH: 4.2 MB/s</Badge>
                </div>
              </div>

              <div className="ds-telemetry-grid">
                <div className="ds-telemetry-card">
                  <span className="ds-telemetry-label">CURRENT SPEED</span>
                  <span className="ds-telemetry-num">24.6 <small>km/h</small></span>
                  <div className="ds-telemetry-bar"><div style={{ width: '60%' }} /></div>
                </div>

                <div className="ds-telemetry-card">
                  <span className="ds-telemetry-label">STEERING ANGLE</span>
                  <span className="ds-telemetry-num">+4.2° <small>RAD</small></span>
                  <div className="ds-telemetry-bar"><div style={{ width: '45%' }} /></div>
                </div>

                <div className="ds-telemetry-card">
                  <span className="ds-telemetry-label">POINT CLOUD RATE</span>
                  <span className="ds-telemetry-num">1,240 <small>kpts/s</small></span>
                  <div className="ds-telemetry-bar"><div style={{ width: '85%' }} /></div>
                </div>

                <div className="ds-telemetry-card">
                  <span className="ds-telemetry-label">HEADING CONFIDENCE</span>
                  <span className="ds-telemetry-num">99.4% <small>EKF</small></span>
                  <div className="ds-telemetry-bar"><div style={{ width: '99%' }} /></div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 5: TYPOGRAPHY */}
        {activeTab === 'typography' && (
          <section className="ds-showcase-section">
            <SectionHeading
              badge="TYPOGRAPHY"
              title="Font Hierarchy &"
              titleGradient="Readability Scale"
              subtitle="Clean geometric modern sans paired with Righteous brand headers and technical Fira Code."
              align="left"
            />

            <div className="ds-typography-demo-grid">
              <Card variant="glass" padding="lg">
                <span className="ds-type-label">BRAND / LOGO FONT (Righteous)</span>
                <div className="ds-type-logo-sample">
                  <span style={{ fontFamily: 'Righteous', fontSize: '2.5rem', color: '#ffffff' }}>
                    autopilot<span style={{ color: '#38bdf8', fontFamily: 'Righteous' }}>/</span>
                  </span>
                </div>
                <p className="ds-type-desc">Font-family: 'Righteous', sans-serif • Stylized with punctuation '/'</p>
              </Card>

              <Card variant="glass" padding="lg">
                <span className="ds-type-label">DISPLAY / HERO (Space Grotesk / Plus Jakarta Sans)</span>
                <h1 className="ds-type-h1">Autonomous Mobility, Engineered.</h1>
                <p className="ds-type-desc">Font-size: clamp(2.5rem, 5vw, 3.75rem) • Weight: 800 • Tracking: -0.03em</p>
              </Card>

              <Card variant="glass" padding="lg">
                <span className="ds-type-label">SECTION HEADING (H2)</span>
                <h2 className="ds-type-h2">Next-Generation Autonomous Vehicle Platform</h2>
                <p className="ds-type-desc">Font-size: 2.25rem • Weight: 700 • Tracking: -0.02em</p>
              </Card>

              <Card variant="glass" padding="lg">
                <span className="ds-type-label">BODY TEXT & PARAGRAPH</span>
                <p className="ds-type-body">
                  The Western Engineering AutoPilot Club empowers students to research, architect,
                  and manufacture full-scale Level 2+ autonomous vehicles through hands-on multidisciplinary engineering.
                </p>
                <p className="ds-type-desc">Font-size: 1rem (16px) • Line-height: 1.6 • Color: #cbd5e1</p>
              </Card>
            </div>
          </section>
        )}

        {/* TAB 6: BUTTONS */}
        {activeTab === 'buttons' && (
          <section className="ds-showcase-section">
            <SectionHeading
              badge="INTERACTIVE"
              title="Button Styles &"
              titleGradient="State Matrix"
              subtitle="Precision micro-interactions, gradient glow CTAs, glass outlines, and active feedback."
              align="left"
            />

            <div className="ds-buttons-matrix">
              {/* Primary Buttons */}
              <div className="ds-component-card">
                <h4>Primary White CTA (Linear Style)</h4>
                <div className="ds-flex-row">
                  <Button variant="primary" size="sm">Small Action</Button>
                  <Button variant="primary" size="md">Explore Roadmap</Button>
                  <Button variant="primary" size="lg" rightIcon={<ArrowRight size={18} />}>
                    Get Started
                  </Button>
                </div>
              </div>

              {/* Radiant Western Purple Glow */}
              <div className="ds-component-card">
                <h4>Radiant Glow CTA (Western Purple)</h4>
                <div className="ds-flex-row">
                  <Button variant="glow" size="sm" leftIcon={<Sparkles size={14} />}>
                    Join Sub-team
                  </Button>
                  <Button variant="glow" size="md" rightIcon={<ArrowRight size={16} />}>
                    Sponsor Our Team
                  </Button>
                  <Button variant="glow" size="lg">
                    Launch Telemetry
                  </Button>
                </div>
              </div>

              {/* Autonomous Lidar Cyan */}
              <div className="ds-component-card">
                <h4>Autonomous Cyan CTA (Tech Glow)</h4>
                <div className="ds-flex-row">
                  <Button variant="cyan" size="sm" leftIcon={<Activity size={14} />}>
                    Live Stream
                  </Button>
                  <Button variant="cyan" size="md" rightIcon={<Zap size={16} />}>
                    LiDAR Viewer
                  </Button>
                  <Button variant="cyan" size="lg">
                    Sensor Specs
                  </Button>
                </div>
              </div>

              {/* Secondary Glass & Outline */}
              <div className="ds-component-card">
                <h4>Secondary Slate Glass & Outline</h4>
                <div className="ds-flex-row">
                  <Button variant="secondary" size="md">View Documentation</Button>
                  <Button variant="outline" size="md">GitHub Repository</Button>
                  <Button variant="ghost" size="md">Learn More →</Button>
                </div>
              </div>

              {/* Interactive Loading States */}
              <div className="ds-component-card">
                <h4>Live State Toggler</h4>
                <div className="ds-flex-row">
                  <Button
                    variant="glow"
                    isLoading={buttonLoading}
                    onClick={() => {
                      setButtonLoading(true);
                      setTimeout(() => setButtonLoading(false), 2000);
                    }}
                  >
                    {buttonLoading ? 'Processing...' : 'Click To Test Loading State'}
                  </Button>

                  <Button variant="primary" disabled>
                    Disabled Button
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 7: BADGES */}
        {activeTab === 'badges' && (
          <section className="ds-showcase-section">
            <SectionHeading
              badge="STATUS & PILLS"
              title="Badges & Sub-team"
              titleGradient="Pill Indicators"
              subtitle="Compact status tags, live pulsing telemetry beacons, and sub-team indicators."
              align="left"
            />

            <div className="ds-badges-grid">
              <div className="ds-component-card">
                <h4>Sub-team Badges</h4>
                <div className="ds-badges-row">
                  <Badge variant="planning" icon={<Cpu size={12} />}>Planning & Control</Badge>
                  <Badge variant="perception" icon={<Eye size={12} />}>Perception (LiDAR)</Badge>
                  <Badge variant="localization" icon={<Compass size={12} />}>Localization (EKF)</Badge>
                  <Badge variant="build" icon={<Wrench size={12} />}>Build & Chassis</Badge>
                </div>
              </div>

              <div className="ds-component-card">
                <h4>Telemetry & System Status</h4>
                <div className="ds-badges-row">
                  <Badge variant="success" dot pulse>SYSTEM OPERATIONAL</Badge>
                  <Badge variant="cyan" dot pulse>AUTONOMOUS MODE L2</Badge>
                  <Badge variant="warning" dot>CALIBRATION REQUIRED</Badge>
                  <Badge variant="error" dot>ESTOP ACTIVE</Badge>
                </div>
              </div>

              <div className="ds-component-card">
                <h4>Brand & Theme Badges</h4>
                <div className="ds-badges-row">
                  <Badge variant="purple" size="sm">WESTERN ENGINEERING</Badge>
                  <Badge variant="purple" size="md">WEAP OFFICIAL</Badge>
                  <Badge variant="purple" size="lg">2026 COMPETITION TEAM</Badge>
                  <Badge variant="outline">OPEN SOURCE</Badge>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 8: METRIC CARDS */}
        {activeTab === 'cards' && (
          <section className="ds-showcase-section">
            <SectionHeading
              badge="CONTAINERS"
              title="Modern Metric Cards &"
              titleGradient="Elevation Layers"
              subtitle="Minimalist stat counters and frosted glass cards."
              align="left"
            />

            <div className="ds-cards-demo-grid">
              <MetricCard
                value="45+"
                label="Student Engineers"
                sublabel="Multidisciplinary team"
                trend="+30% this term"
                icon={<Cpu size={20} />}
              />

              <MetricCard
                value="4"
                label="Specialized Subteams"
                sublabel="Software, Hardware & Systems"
                icon={<Zap size={20} />}
              />

              <MetricCard
                value="Level 2+"
                label="Autonomy Target"
                sublabel="Real-time waypoint navigation"
                icon={<Activity size={20} />}
              />

              <MetricCard
                value="100%"
                label="Student Designed"
                sublabel="From CAD to control algorithms"
                icon={<ShieldCheck size={20} />}
              />
            </div>
          </section>
        )}

        {/* TAB 9: FORM CONTROLS */}
        {activeTab === 'inputs' && (
          <section className="ds-showcase-section">
            <SectionHeading
              badge="FORM CONTROLS"
              title="Inputs, Search &"
              titleGradient="Interactive Fields"
              subtitle="Dark frosted input fields with luminous purple focus rings and clear error handling."
              align="left"
            />

            <div className="ds-inputs-grid">
              <Card variant="glass" padding="lg">
                <div className="ds-inputs-col">
                  <Input
                    label="Search Components or Docs"
                    placeholder="Type to filter..."
                    leftIcon={<Search size={16} />}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    helperText="Try typing to see the active luminous focus ring"
                  />

                  <Input
                    label="Student Email Address"
                    placeholder="student@uwo.ca"
                    type="email"
                  />

                  <Input
                    label="Validation Error State Example"
                    defaultValue="invalid_email_format"
                    error="Please enter a valid Western University email address."
                  />
                </div>
              </Card>
            </div>
          </section>
        )}

      </div>
    </TechGridBackground>
  );
};

export default DesignSystemShowcase;
