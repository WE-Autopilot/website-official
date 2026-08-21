import React from "react";
import { ArrowLeft } from "lucide-react";
import Button from "./design-system/Button";
import LogoLoader from "./design-system/LogoLoader";
import TechGridBackground from "./design-system/TechGridBackground";

export const UnderConstruction: React.FC = () => {
  return (
    <TechGridBackground variant="both" glowColor="both" className="ds-construction-page">
      <div className="ds-construction-container" style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '60px 24px',
        gap: '24px'
      }}>
        <LogoLoader
          size="xl"
          message="FEATURE UNDER ACTIVE ENGINEERING // COMING SOON"
        />
        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: 0, fontSize: '1rem', lineHeight: '1.6' }}>
          Our engineering teams are currently building and testing this section. Check back soon for vehicle telemetry, live cameras, and technical documentation!
        </p>
        <Button to="/" variant="primary" size="md" leftIcon={<ArrowLeft size={16} />}>
          Back to Home
        </Button>
      </div>
    </TechGridBackground>
  );
};

export default UnderConstruction;
