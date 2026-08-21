import React from "react";
import { ArrowRight, Cpu, Eye, Compass, Wrench, Code2, Users, Rocket } from "lucide-react";
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
          badge="JOIN THE CLUB"
          title="Build Self-Driving Projects at"
          titleGradient="Western"
          subtitle="Get hands-on experience in ROS 2, computer vision, robotics hardware, and mechanical CAD."
        />

        {/* Why Join Benefits */}
        <div className="ds-join-benefits-grid">
          <Card variant="glass" padding="lg" className="ds-join-benefit-card">
            <div className="ds-benefit-icon ds-icon-purple">
              <Rocket size={22} />
            </div>
            <h4>Hands-On Projects</h4>
            <p>Work directly on physical vehicle hardware, LiDAR sensors, stereo cameras, and onboard microcontrollers.</p>
          </Card>

          <Card variant="glass" padding="lg" className="ds-join-benefit-card">
            <div className="ds-benefit-icon ds-icon-cyan">
              <Code2 size={22} />
            </div>
            <h4>Practical Robotics Tools</h4>
            <p>Learn ROS 2, PyTorch, C++, Gazebo simulation, and CAD modeling used in real-world robotics engineering.</p>
          </Card>

          <Card variant="glass" padding="lg" className="ds-join-benefit-card">
            <div className="ds-benefit-icon ds-icon-emerald">
              <Users size={22} />
            </div>
            <h4>Teamwork & Learning</h4>
            <p>Collaborate with fellow Western undergrads across software, electrical, mechatronics, and mechanical engineering.</p>
          </Card>
        </div>

        {/* Sub-teams Openings */}
        <div className="ds-join-openings-section">
          <SectionHeading
            badge="SUB-TEAMS"
            title="Choose Your"
            titleGradient="Engineering Division"
            subtitle="Find the sub-team that matches what you're excited to learn and build."
          />

          <div className="ds-join-subteams-grid">
            <TechCard
              title="Planning & Control"
              subtitle="// SOFTWARE"
              description="Open to students interested in path planning, state machines, and writing C++ / ROS 2 nodes for navigation."
              badge="Open"
              badgeVariant="planning"
              accentColor="planning"
              tags={["C++", "ROS 2", "Control", "Path Planning"]}
              icon={<Cpu size={22} />}
              to="/teams/planning-and-control"
            />

            <TechCard
              title="Perception"
              subtitle="// VISION & AI"
              description="Open to students interested in computer vision, training object detection models (YOLO), and processing LiDAR scans."
              badge="Open"
              badgeVariant="perception"
              accentColor="perception"
              tags={["PyTorch", "LiDAR", "YOLO", "OpenCV"]}
              icon={<Eye size={22} />}
              to="/teams/perception"
            />

            <TechCard
              title="Localization & Mapping"
              subtitle="// STATE ESTIMATION"
              description="Open to students interested in sensor fusion (EKF), GPS/IMU telemetry, and track mapping algorithms."
              badge="Open"
              badgeVariant="localization"
              accentColor="localization"
              tags={["SLAM", "EKF", "GPS", "IMU"]}
              icon={<Compass size={22} />}
              to="/teams/localization"
            />

            <TechCard
              title="Build & Mechanical"
              subtitle="// HARDWARE & MECHATRONICS"
              description="Open to students interested in CAD modeling, 3D printing sensor mounts, steering actuation, and power wiring."
              badge="Open"
              badgeVariant="build"
              accentColor="build"
              tags={["SolidWorks", "CAN Bus", "Wiring", "Actuators"]}
              icon={<Wrench size={22} />}
              to="/teams/build"
            />
          </div>
        </div>

        {/* Application CTA Card */}
        <div className="ds-join-application-cta">
          <Card variant="glass" padding="xl" className="ds-join-cta-box">
            <div className="ds-join-cta-text">
              <Badge variant="purple" size="sm" dot>APPLICATIONS</Badge>
              <h3>Ready to Join the Team?</h3>
              <p>Applications are reviewed each semester. All engineering years and backgrounds are welcome.</p>
            </div>
            <div className="ds-join-cta-action">
              <Button to="/contact" variant="glow" size="lg" rightIcon={<ArrowRight size={18} />}>
                Go to Application Form
              </Button>
            </div>
          </Card>
        </div>

      </div>
    </TechGridBackground>
  );
};

export default Join;
