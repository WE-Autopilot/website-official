import React from "react";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./design-system/SectionHeading";
import Card from "./design-system/Card";
import Button from "./design-system/Button";
import TechGridBackground from "./design-system/TechGridBackground";
import "../stylesheets/Join.css";

const DISCORD_INVITE_URL = "https://discord.com/invite/HuJCHCSVB2";

export const Join: React.FC = () => {
  return (
    <TechGridBackground variant="both" glowColor="both" className="ds-join-root">
      <div className="ds-join-container">
        
        {/* Header */}
        <SectionHeading
          title="Build Self-Driving Projects at"
          titleGradient="Western"
          subtitle="Get hands-on experience in ROS 2, computer vision, robotics hardware, and autonomous systems."
        />

        {/* Why Join Benefits */}
        <div className="ds-join-benefits-grid">
          <Card variant="glass" padding="lg" className="ds-join-benefit-card">
            <h4>Hands-On Projects</h4>
            <p>Work directly on physical vehicle hardware, LiDAR sensors, stereo cameras, and onboard compute systems.</p>
          </Card>

          <Card variant="glass" padding="lg" className="ds-join-benefit-card">
            <h4>Practical Robotics Tools</h4>
            <p>Learn ROS 2, PyTorch, C++, Gazebo simulation, and CAD modeling used in real-world robotics engineering.</p>
          </Card>

          <Card variant="glass" padding="lg" className="ds-join-benefit-card">
            <h4>Collaborative Community</h4>
            <p>Collaborate with fellow Western students across software, electrical, mechatronics, and mechanical engineering.</p>
          </Card>
        </div>

        {/* Discord CTA Card */}
        <div className="ds-join-application-cta">
          <Card variant="glass" padding="xl" className="ds-join-cta-box">
            <div className="ds-join-cta-text">
              <h3>Ready to Join the Team?</h3>
              <p>Join our Discord community to connect with team leads, get onboarding instructions, and start collaborating on our autonomous vehicle projects.</p>
            </div>
            <div className="ds-join-cta-action">
              <Button
                href={DISCORD_INVITE_URL}
                variant="glow"
                size="lg"
                leftIcon={
                  <img
                    src="/socials/discord.svg"
                    alt="Discord Logo"
                    width="20"
                    height="20"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                }
                rightIcon={<ArrowRight size={18} />}
              >
                Join Our Discord Server
              </Button>
            </div>
          </Card>
        </div>

      </div>
    </TechGridBackground>
  );
};

export default Join;
