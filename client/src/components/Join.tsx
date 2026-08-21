import React from "react";
import { ArrowRight, Cpu, Eye, Compass, Wrench, CheckCircle2, Sparkles, Code2, Users, Rocket } from "lucide-react";
import SectionHeading from "./design-system/SectionHeading";
import Badge from "./design-system/Badge";
import Card from "./design-system/Card";
import Button from "./design-system/Button";
import TechCard from "./design-system/TechCard";
import TechGridBackground from "./design-system/TechGridBackground";
import "../stylesheets/Join.css";

export const Join: React.FC = () => {
  return (
    <TechGridBackground variant="both" glowColor="both" className="ds-join-root">
      <div className="ds-join-container">
        
        {/* Header */}
        <SectionHeading
          badge="JOIN OUR CREW"
          title="Build Autonomous Vehicles with"
          titleGradient="Western AutoPilot"
          subtitle="Gain production-grade engineering experience in ROS 2, computer vision, embedded RTOS, and mechanical vehicle design."
        />

        {/* Why Join Benefits */}
        <div className="ds-join-benefits-grid">
          <Card variant="glass" padding="lg" className="ds-join-benefit-card">
            <div className="ds-benefit-icon ds-icon-purple">
              <Rocket size={22} />
            </div>
            <h4>Real Hardware, Real Code</h4>
            <p>Deploy code directly to physical drive-by-wire vehicles, Jetson compute clusters, and multi-beam LiDAR sensors.</p>
          </Card>

          <Card variant="glass" padding="lg" className="ds-join-benefit-card">
            <div className="ds-benefit-icon ds-icon-cyan">
              <Code2 size={22} />
            </div>
            <h4>Industry-Standard Tooling</h4>
            <p>Master ROS 2, PyTorch, C++20, Gazebo Harmonic, BlackBerry QNX RTOS, and CAD workflows used across the automotive tech sector.</p>
          </Card>

          <Card variant="glass" padding="lg" className="ds-join-benefit-card">
            <div className="ds-benefit-icon ds-icon-emerald">
              <Users size={22} />
            </div>
            <h4>Mentorship & Community</h4>
            <p>Collaborate in a supportive, multidisciplinary team of driven engineers, co-op peers, and alumni working in top tech companies.</p>
          </Card>
        </div>

        {/* Sub-teams Openings */}
        <div className="ds-join-openings-section">
          <SectionHeading
            badge="AVAILABLE DIVISIONS"
            title="Explore Our Engineering"
            titleGradient="Sub-teams"
            subtitle="Find the division that aligns with your passions and technical skills."
          />

          <div className="ds-join-subteams-grid">
            <TechCard
              title="Planning & Control"
              subtitle="// SOFTWARE & CONTROL"
              description="Seeking students interested in state machines, trajectory generation, C++20, Model Predictive Control (MPC), and physics simulations."
              badge="Recruiting"
              badgeVariant="planning"
              accentColor="planning"
              tags={["C++20", "ROS 2", "MPC", "Control Theory"]}
              icon={<Cpu size={22} />}
              to="/teams/planning-and-control"
            />

            <TechCard
              title="Perception"
              subtitle="// AI & COMPUTER VISION"
              description="Seeking students interested in deep learning vision models (YOLO), LiDAR 3D point cloud segmentation, and CUDA edge inference."
              badge="Recruiting"
              badgeVariant="perception"
              accentColor="perception"
              tags={["PyTorch", "LiDAR", "YOLO", "OpenCV"]}
              icon={<Eye size={22} />}
              to="/teams/perception"
            />

            <TechCard
              title="Localization & Mapping"
              subtitle="// STATE ESTIMATION"
              description="Seeking students interested in SLAM, Extended Kalman Filters (EKF), RTK-GPS integration, and HD vector mapping."
              badge="Recruiting"
              badgeVariant="localization"
              accentColor="localization"
              tags={["SLAM", "EKF", "RTK-GPS", "Cartographer"]}
              icon={<Compass size={22} />}
              to="/teams/localization"
            />

            <TechCard
              title="Build & Mechanical"
              subtitle="// HARDWARE & MECHATRONICS"
              description="Seeking students interested in drive-by-wire steering actuators, power distribution boards, CAN bus, and SolidWorks CAD design."
              badge="Recruiting"
              badgeVariant="build"
              accentColor="build"
              tags={["SolidWorks", "CAN Bus", "Mechatronics", "Power"]}
              icon={<Wrench size={22} />}
              to="/teams/build"
            />
          </div>
        </div>

        {/* Application CTA Card */}
        <div className="ds-join-application-cta">
          <Card variant="glass" padding="xl" className="ds-join-cta-box">
            <div className="ds-join-cta-text">
              <Badge variant="purple" size="sm" dot pulse>APPLICATIONS OPEN</Badge>
              <h3>Ready to Submit Your Application?</h3>
              <p>Applications are reviewed on a rolling basis. All engineering years and disciplines are welcome to apply.</p>
            </div>
            <div className="ds-join-cta-action">
              <Button to="/contact" variant="glow" size="lg" rightIcon={<ArrowRight size={18} />}>
                Start Application Form
              </Button>
            </div>
          </Card>
        </div>

      </div>
    </TechGridBackground>
  );
};

export default Join;
