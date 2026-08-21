/**
 * Internationalization configuration using i18next
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Resources for different languages
const resources = {
  en: {
    translation: {
      // Navigation
      "nav.home": "Home",
      "nav.about": "About",
      "nav.sponsors": "Sponsors",
      "nav.join": "Join",
      "nav.contact": "Contact",

      // Join page
      "join.why": "Why Join?",
      "join.teams": "Our Sub-teams",
      "join.ready": "Ready to Apply?",
      "join.apply": "Apply Now",
      "join.readyDescription":
        "Submit your application through our online form to join one of our engineering sub-teams.",

      // Team descriptions
      "team.perception.title": "Perception",
      "team.perception.description":
        "Processes camera feeds and 3D LiDAR point clouds using computer vision and YOLO models to detect lanes, signs, and obstacles.",

      "team.m&l.title": "Mapping and Localization",
      "team.m&l.description":
        "Implements SLAM, Extended Kalman Filters, and GPS/IMU sensor fusion so the vehicle can accurately track its position.",

      "team.p&c.title": "Planning and Control",
      "team.p&c.description":
        "Designs decision state machines, path planning trajectories, and closed-loop feedback controllers (MPC / PID) in ROS 2.",

      "team.build.title": "Build and Mechanical",
      "team.build.description":
        "Designs CAD mounts, 3D prints sensor brackets, integrates drive-by-wire steering actuators, and wires vehicle power distribution.",

      // Application form
      "application.title": "Join WE Autopilot",
      "application.personal": "Personal Information",
      "application.teamSelection": "Select Sub-team(s)",
      "application.teamDesc":
        "Choose which sub-team(s) you're interested in joining. You can select more than one.",
      "application.name": "Full Name",
      "application.schoolEmail": "UWO School Email (@uwo.ca)",
      "application.studentId": "Student Number",
      "application.program": "Program & Year of Study",
      "application.discordUsername": "Discord Username",
      "application.interest": "Why are you interested in joining WE Autopilot?",
      "application.interestPlaceholder": "Tell us briefly about your interests, relevant courses, or projects you've worked on...",
      "application.resume": "Resume or Portfolio Link (Optional)",
      "application.resumeUrl": "Resume / Portfolio / GitHub URL",
      "application.submit": "Submit Application",
      "application.submitting": "Submitting Application...",
      "application.savedData": "Would you like to restore your previously entered form details?",
      "application.restore": "Restore",
      "application.discard": "Discard",

      // Success messages
      "success.title": "Application Received!",
      "success.message":
        "Thanks for applying to WE Autopilot. Our team will review your application and reach out via your UWO email / Discord.",

      // Error messages
      "error.title": "Submission Failed",
      "error.message":
        "There was a problem submitting your application. Please check your information and try again.",
      "error.required": "This field is required",
      "error.schoolEmail": "Please enter a valid @uwo.ca email address",
      "error.studentId": "Please enter a valid student number (8-10 digits)",
      "error.teamRequired": "Please select at least one sub-team",
      "error.discordUsernameLength": "Discord username must be between 2 and 32 characters", 
      "error.discordUsernameInvalid": "Please enter a valid Discord username",
      "error.validUrl": "Please enter a valid URL (e.g. https://linkedin.com/... or https://github.com/...)",
    },
  },
};

// Language detection
const getUserLanguage = () => "en";

// Initialize i18next
i18n.use(initReactI18next).init({
  resources,
  lng: getUserLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
