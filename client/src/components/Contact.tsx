import React, { useState, useRef, useEffect, FC, ReactElement } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Cpu, Eye, Compass, Wrench, Check, ArrowRight, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import Badge from "./design-system/Badge";
import Button from "./design-system/Button";
import Card from "./design-system/Card";
import SectionHeading from "./design-system/SectionHeading";
import TechGridBackground from "./design-system/TechGridBackground";
import { trackEvent, trackFormInteraction } from "../utils/analytics";
import {
  saveFormData,
  getSavedFormData,
  clearSavedFormData,
  debounce,
} from "../utils/persistence";
import {
  ApplicationFormData,
  Team,
  TFunction,
} from "../types";
import "../stylesheets/Contact.css";

const FORM_ID = "weap-application-form";

interface TeamOption {
  id: string;
  name: string;
  badge: string;
  description: string;
  icon: React.ReactNode;
  accentClass: string;
}

const Contact: FC = (): ReactElement => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [hasSavedData, setHasSavedData] = useState<boolean>(false);

  const teamOptions: TeamOption[] = [
    {
      id: "planning",
      name: "Planning & Control",
      badge: "SOFTWARE",
      description: "Designs decision state machines, path planning trajectories, and closed-loop feedback controllers (MPC / PID) in ROS 2.",
      icon: <Cpu size={22} />,
      accentClass: "ds-team-planning",
    },
    {
      id: "perception",
      name: "Perception",
      badge: "VISION & AI",
      description: "Processes camera feeds and 3D LiDAR point clouds using computer vision and YOLO models to detect lanes, signs, and obstacles.",
      icon: <Eye size={22} />,
      accentClass: "ds-team-perception",
    },
    {
      id: "localization",
      name: "Mapping and Localization",
      badge: "STATE ESTIMATION",
      description: "Implements SLAM, Extended Kalman Filters, and GPS/IMU sensor fusion so the vehicle can accurately track its position.",
      icon: <Compass size={22} />,
      accentClass: "ds-team-localization",
    },
    {
      id: "build",
      name: "Build and Mechanical",
      badge: "HARDWARE",
      description: "Designs CAD mounts, 3D prints sensor brackets, integrates drive-by-wire steering actuators, and wires vehicle power distribution.",
      icon: <Wrench size={22} />,
      accentClass: "ds-team-build",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ApplicationFormData>({
    mode: "onBlur",
    defaultValues: {
      team: [],
    },
  });

  const selectedTeams = watch("team") || [];
  const formValues = watch();

  // Check for saved form data
  useEffect(() => {
    const savedData = getSavedFormData(FORM_ID);
    if (savedData && Object.keys(savedData).length > 0) {
      setHasSavedData(true);
    }
    trackEvent("Page View", "view", "Application Form");
  }, []);

  // Autosave form progress
  useEffect(() => {
    const debouncedSave = debounce(() => {
      if (Object.keys(formValues).some((key) => formValues[key as keyof ApplicationFormData])) {
        saveFormData(FORM_ID, formValues);
      }
    }, 800);

    debouncedSave();
  }, [formValues]);

  const loadSavedData = () => {
    const savedData = getSavedFormData(FORM_ID);
    if (savedData) {
      Object.keys(savedData).forEach((key) => {
        setValue(key as keyof ApplicationFormData, savedData[key]);
      });
      setHasSavedData(false);
      trackEvent("Form", "restore_saved_data", "Application Form");
    }
  };

  const discardSavedData = () => {
    clearSavedFormData(FORM_ID);
    setHasSavedData(false);
    trackEvent("Form", "discard_saved_data", "Application Form");
  };

  const toggleTeam = (teamId: string) => {
    const current = Array.isArray(selectedTeams) ? [...selectedTeams] : [];
    const index = current.indexOf(teamId);
    let updated: string[];
    if (index > -1) {
      updated = current.filter((id) => id !== teamId);
    } else {
      updated = [...current, teamId];
    }
    setValue("team", updated, { shouldValidate: true });
    trackFormInteraction("Application Form", "team", teamId);
  };

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      // Simulate form submission or call backend API
      await new Promise((resolve) => setTimeout(resolve, 1200));
      clearSavedFormData(FORM_ID);
      setSubmitStatus("success");
      reset();
      trackEvent("Form", "submit_success", "Application Form");
    } catch (err) {
      setSubmitStatus("error");
      trackEvent("Form", "submit_error", "Application Form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TechGridBackground variant="both" glowColor="both" className="ds-contact-page-root">
      <div className="ds-contact-container">
        
        {/* Header */}
        <SectionHeading
          badge="RECRUITMENT APPLICATION"
          title="Apply to Join"
          titleGradient="autopilot/"
          subtitle="Submit your details below to apply for our technical sub-teams. No prior autonomous vehicle experience is required."
        />

        {/* Saved Data Notice */}
        {hasSavedData && (
          <div className="ds-saved-notice-banner">
            <div className="ds-saved-notice-text">
              <Sparkles size={18} className="ds-saved-icon" />
              <span>Would you like to restore your previously entered application draft?</span>
            </div>
            <div className="ds-saved-notice-actions">
              <button type="button" className="ds-restore-btn" onClick={loadSavedData}>
                Restore Draft
              </button>
              <button type="button" className="ds-discard-btn" onClick={discardSavedData}>
                Discard
              </button>
            </div>
          </div>
        )}

        {/* Success Alert */}
        {submitStatus === "success" && (
          <Card variant="glass" padding="xl" className="ds-submission-status-card ds-status-success">
            <CheckCircle2 size={48} className="ds-status-icon-success" />
            <h3 className="ds-status-title">Application Submitted!</h3>
            <p className="ds-status-desc">
              Thank you for applying to Western AutoPilot! We've received your application and will contact you through your UWO email and Discord.
            </p>
            <Button to="/" variant="secondary" size="md">
              Return to Home
            </Button>
          </Card>
        )}

        {/* Error Alert */}
        {submitStatus === "error" && (
          <div className="ds-submission-error-banner">
            <AlertCircle size={20} />
            <span>There was an issue submitting your application. Please verify your details and try again.</span>
          </div>
        )}

        {submitStatus !== "success" && (
          <form className="ds-application-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            
            {/* 1. PERSONAL INFORMATION */}
            <div className="ds-form-card">
              <div className="ds-form-card-header">
                <span className="ds-mono ds-step-pill">01</span>
                <h3 className="ds-form-section-title">Personal Information</h3>
              </div>

              <div className="ds-form-grid">
                {/* Full Name */}
                <div className="ds-input-group ds-col-full">
                  <label htmlFor="name" className="ds-field-label">
                    Full Name <span className="ds-required">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    className={`ds-text-input ${errors.name ? "ds-input-error" : ""}`}
                    {...register("name", {
                      required: "Please enter your full name",
                      maxLength: { value: 100, message: "Name is too long" },
                    })}
                  />
                  {errors.name && <span className="ds-error-text">{errors.name.message}</span>}
                </div>

                {/* School Email */}
                <div className="ds-input-group ds-col-half">
                  <label htmlFor="schoolEmail" className="ds-field-label">
                    Western Email (@uwo.ca) <span className="ds-required">*</span>
                  </label>
                  <input
                    id="schoolEmail"
                    type="email"
                    placeholder="e.g. amorgan@uwo.ca"
                    className={`ds-text-input ${errors.schoolEmail ? "ds-input-error" : ""}`}
                    {...register("schoolEmail", {
                      required: "UWO school email is required",
                      pattern: {
                        value: /^[^\s@]+@(?:[\w-]+\.)*uwo\.ca$/i,
                        message: "Must be a valid @uwo.ca email address",
                      },
                    })}
                  />
                  {errors.schoolEmail && <span className="ds-error-text">{errors.schoolEmail.message}</span>}
                </div>

                {/* Student Number */}
                <div className="ds-input-group ds-col-half">
                  <label htmlFor="studentId" className="ds-field-label">
                    Student Number <span className="ds-required">*</span>
                  </label>
                  <input
                    id="studentId"
                    type="text"
                    placeholder="e.g. 251234567"
                    className={`ds-text-input ${errors.studentId ? "ds-input-error" : ""}`}
                    {...register("studentId", {
                      required: "Student number is required",
                      pattern: {
                        value: /^[0-9]{8,10}$/,
                        message: "Enter a valid 8-10 digit student number",
                      },
                    })}
                  />
                  {errors.studentId && <span className="ds-error-text">{errors.studentId.message}</span>}
                </div>

                {/* Program & Year */}
                <div className="ds-input-group ds-col-half">
                  <label htmlFor="program" className="ds-field-label">
                    Program & Year <span className="ds-required">*</span>
                  </label>
                  <input
                    id="program"
                    type="text"
                    placeholder="e.g. Software Engineering, Year 2"
                    className={`ds-text-input ${errors.program ? "ds-input-error" : ""}`}
                    {...register("program", {
                      required: "Please state your academic program and year",
                    })}
                  />
                  {errors.program && <span className="ds-error-text">{errors.program.message}</span>}
                </div>

                {/* Discord Username */}
                <div className="ds-input-group ds-col-half">
                  <label htmlFor="discordUsername" className="ds-field-label">
                    Discord Username <span className="ds-required">*</span>
                  </label>
                  <input
                    id="discordUsername"
                    type="text"
                    placeholder="e.g. alex_dev"
                    className={`ds-text-input ${errors.discordUsername ? "ds-input-error" : ""}`}
                    {...register("discordUsername", {
                      required: "Discord username is required for club communications",
                      minLength: { value: 2, message: "Username too short" },
                      maxLength: { value: 32, message: "Username too long" },
                    })}
                  />
                  {errors.discordUsername && <span className="ds-error-text">{errors.discordUsername.message}</span>}
                </div>
              </div>
            </div>

            {/* 2. SUB-TEAM SELECTION */}
            <div className="ds-form-card">
              <div className="ds-form-card-header">
                <span className="ds-mono ds-step-pill">02</span>
                <div className="ds-form-title-group">
                  <h3 className="ds-form-section-title">
                    Select Sub-team(s) <span className="ds-required">*</span>
                  </h3>
                  <p className="ds-form-section-sub">
                    Select which sub-team(s) you're interested in joining. You can select more than one.
                  </p>
                </div>
              </div>

              {/* Hidden input to register validation */}
              <input
                type="hidden"
                {...register("team", {
                  validate: (val) => (val && val.length > 0) || "Please select at least one sub-team",
                })}
              />

              <div className="ds-team-selector-grid">
                {teamOptions.map((team) => {
                  const isChecked = selectedTeams.includes(team.id);

                  return (
                    <div
                      key={team.id}
                      className={`ds-team-choice-card ${team.accentClass} ${isChecked ? "ds-team-selected" : ""}`}
                      onClick={() => toggleTeam(team.id)}
                      role="checkbox"
                      aria-checked={isChecked}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                          e.preventDefault();
                          toggleTeam(team.id);
                        }
                      }}
                    >
                      <div className="ds-team-card-topbar">
                        <div className="ds-team-card-icon-tag">
                          <span className="ds-team-icon-bubble">{team.icon}</span>
                          <span className="ds-team-tag-badge">{team.badge}</span>
                        </div>

                        {/* Large custom checkbox */}
                        <div className={`ds-custom-checkbox ${isChecked ? "ds-checkbox-checked" : ""}`}>
                          {isChecked && <Check size={14} strokeWidth={3} />}
                        </div>
                      </div>

                      <div className="ds-team-card-body">
                        <h4 className="ds-team-card-heading">{team.name}</h4>
                        <p className="ds-team-card-description">{team.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {errors.team && <span className="ds-error-text ds-mt-2">{errors.team.message}</span>}
            </div>

            {/* 3. EXPERIENCE & INTEREST */}
            <div className="ds-form-card">
              <div className="ds-form-card-header">
                <span className="ds-mono ds-step-pill">03</span>
                <h3 className="ds-form-section-title">Experience & Links (Optional)</h3>
              </div>

              <div className="ds-form-grid">
                {/* Interest statement */}
                <div className="ds-input-group ds-col-full">
                  <label htmlFor="interest" className="ds-field-label">
                    Why are you interested in joining WE Autopilot?
                  </label>
                  <textarea
                    id="interest"
                    rows={4}
                    placeholder="Tell us briefly about what you'd like to learn or any relevant projects/courses you've taken..."
                    className="ds-text-textarea"
                    {...register("interest")}
                  />
                </div>

                {/* Resume / Portfolio / GitHub Link */}
                <div className="ds-input-group ds-col-full">
                  <label htmlFor="resumeUrl" className="ds-field-label">
                    Resume / GitHub / Portfolio Link
                  </label>
                  <input
                    id="resumeUrl"
                    type="url"
                    placeholder="https://github.com/your-username or Google Drive link"
                    className={`ds-text-input ${errors.resumeUrl ? "ds-input-error" : ""}`}
                    {...register("resumeUrl", {
                      pattern: {
                        value: /^(https?:\/\/)?([\w\d.-]+)\.([a-z.]{2,6})([/\w\d.-]*)*\/?$/i,
                        message: "Please enter a valid URL",
                      },
                    })}
                  />
                  {errors.resumeUrl && <span className="ds-error-text">{errors.resumeUrl.message}</span>}
                  <span className="ds-field-hint">Share a link to your resume, portfolio, or GitHub profile.</span>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="ds-form-submit-container">
              <Button
                type="submit"
                variant="glow"
                size="lg"
                disabled={isSubmitting}
                rightIcon={!isSubmitting ? <ArrowRight size={18} /> : undefined}
              >
                {isSubmitting ? "Submitting Application..." : "Submit Application"}
              </Button>
              <p className="ds-submit-disclaimer">
                Applications are reviewed on a rolling basis by our executive and sub-team leads.
              </p>
            </div>

          </form>
        )}

      </div>
    </TechGridBackground>
  );
};

export default Contact;
