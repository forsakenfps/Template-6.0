import * as React from "react";
import { Application } from "../types/Application";
import { Button } from "./ui/button";

export type DetailTab = "factsheet" | "people" | "document" | "history" | "collaboration";

interface DetailPageProps {
  application: Application;
  onBack: () => void;
}

export function DetailPage({ application, onBack }: DetailPageProps) {
  const [activeTab, setActiveTab] = React.useState<DetailTab>("factsheet");

  const tabs: Array<{ id: DetailTab; label: string }> = [
    { id: "factsheet", label: "Factsheet" },
    { id: "people", label: "People" },
    { id: "document", label: "Document" },
    { id: "history", label: "History" },
    { id: "collaboration", label: "Collaboration" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "factsheet":
        return React.createElement(
          "div",
          { className: "detail-tab-content" },
          React.createElement("div", { className: "detail-section" },
            React.createElement("h3", { className: "detail-section-title" }, "Basic Information"),
            React.createElement("div", { className: "detail-grid" },
              React.createElement("div", { className: "detail-field" },
                React.createElement("label", { className: "detail-label" }, "Name"),
                React.createElement("div", { className: "detail-value" }, application.Name)
              ),
              React.createElement("div", { className: "detail-field" },
                React.createElement("label", { className: "detail-label" }, "ID"),
                React.createElement("div", { className: "detail-value" }, application.ID)
              ),
              React.createElement("div", { className: "detail-field" },
                React.createElement("label", { className: "detail-label" }, "Alias"),
                React.createElement("div", { className: "detail-value" }, application.Alias || "—")
              ),
              React.createElement("div", { className: "detail-field" },
                React.createElement("label", { className: "detail-label" }, "Release"),
                React.createElement("div", { className: "detail-value" }, application.Release)
              ),
              React.createElement("div", { className: "detail-field detail-field-full" },
                React.createElement("label", { className: "detail-label" }, "Description"),
                React.createElement("div", { className: "detail-value" }, application.Description || "—")
              )
            )
          ),
          React.createElement("div", { className: "detail-section" },
            React.createElement("h3", { className: "detail-section-title" }, "Classification"),
            React.createElement("div", { className: "detail-grid" },
              React.createElement("div", { className: "detail-field" },
                React.createElement("label", { className: "detail-label" }, "Subtype"),
                React.createElement("div", { className: "detail-value" }, application.Subtype)
              ),
              React.createElement("div", { className: "detail-field" },
                React.createElement("label", { className: "detail-label" }, "TIME"),
                React.createElement("div", { className: "detail-value" }, application.TIME)
              ),
              React.createElement("div", { className: "detail-field detail-field-full" },
                React.createElement("label", { className: "detail-label" }, "TIME Description"),
                React.createElement("div", { className: "detail-value" }, application.TIMEDescription || "—")
              ),
              React.createElement("div", { className: "detail-field" },
                React.createElement("label", { className: "detail-label" }, "Business Criticality"),
                React.createElement("div", { className: "detail-value" }, application.BusinessCriticality)
              ),
              React.createElement("div", { className: "detail-field detail-field-full" },
                React.createElement("label", { className: "detail-label" }, "Business Criticality Description"),
                React.createElement("div", { className: "detail-value" }, application.BusinessCriticalityDescription || "—")
              )
            )
          ),
          React.createElement("div", { className: "detail-section" },
            React.createElement("h3", { className: "detail-section-title" }, "Fit Assessment"),
            React.createElement("div", { className: "detail-grid" },
              React.createElement("div", { className: "detail-field" },
                React.createElement("label", { className: "detail-label" }, "Functional Fit"),
                React.createElement("div", { className: "detail-value" }, application.FunctionalFit)
              ),
              React.createElement("div", { className: "detail-field detail-field-full" },
                React.createElement("label", { className: "detail-label" }, "Functional Fit Description"),
                React.createElement("div", { className: "detail-value" }, application.FunctionalFitDescription || "—")
              ),
              React.createElement("div", { className: "detail-field" },
                React.createElement("label", { className: "detail-label" }, "Technical Fit"),
                React.createElement("div", { className: "detail-value" }, application.TechnicalFit)
              ),
              React.createElement("div", { className: "detail-field detail-field-full" },
                React.createElement("label", { className: "detail-label" }, "Technical Fit Description"),
                React.createElement("div", { className: "detail-value" }, application.TechnicalFitDescription || "—")
              )
            )
          ),
          React.createElement("div", { className: "detail-section" },
            React.createElement("h3", { className: "detail-section-title" }, "Security & Hosting"),
            React.createElement("div", { className: "detail-grid" },
              React.createElement("div", { className: "detail-field" },
                React.createElement("label", { className: "detail-label" }, "Single Sign-On"),
                React.createElement("div", { className: "detail-value" }, application.SingleSignOn)
              ),
              React.createElement("div", { className: "detail-field" },
                React.createElement("label", { className: "detail-label" }, "SSO Provider"),
                React.createElement("div", { className: "detail-value" }, application.SSOProvider || "—")
              ),
              React.createElement("div", { className: "detail-field" },
                React.createElement("label", { className: "detail-label" }, "Hosting Type"),
                React.createElement("div", { className: "detail-value" }, application.HostingType)
              ),
              React.createElement("div", { className: "detail-field detail-field-full" },
                React.createElement("label", { className: "detail-label" }, "Hosting Type Description"),
                React.createElement("div", { className: "detail-value" }, application.HostingTypeDescription || "—")
              )
            )
          ),
          React.createElement("div", { className: "detail-section" },
            React.createElement("h3", { className: "detail-section-title" }, "Lifecycle Dates"),
            React.createElement("div", { className: "detail-grid" },
              React.createElement("div", { className: "detail-field" },
                React.createElement("label", { className: "detail-label" }, "Plan"),
                React.createElement("div", { className: "detail-value" }, application.Plan || "—")
              ),
              React.createElement("div", { className: "detail-field" },
                React.createElement("label", { className: "detail-label" }, "Phase In"),
                React.createElement("div", { className: "detail-value" }, application.PhaseIn || "—")
              ),
              React.createElement("div", { className: "detail-field" },
                React.createElement("label", { className: "detail-label" }, "Active"),
                React.createElement("div", { className: "detail-value" }, application.Active || "—")
              ),
              React.createElement("div", { className: "detail-field" },
                React.createElement("label", { className: "detail-label" }, "Phase Out"),
                React.createElement("div", { className: "detail-value" }, application.PhaseOut || "—")
              ),
              React.createElement("div", { className: "detail-field" },
                React.createElement("label", { className: "detail-label" }, "End of Life"),
                React.createElement("div", { className: "detail-value" }, application.EndOfLife || "—")
              )
            )
          )
        );
      case "people":
        return React.createElement(
          "div",
          { className: "detail-tab-content" },
          React.createElement("div", { className: "detail-section" },
            React.createElement("h3", { className: "detail-section-title" }, "Stakeholders"),
            React.createElement("div", { className: "detail-value" },
              application.Stakeholders && application.Stakeholders.length > 0
                ? application.Stakeholders.join(", ")
                : "No stakeholders assigned"
            )
          ),
          React.createElement("div", { className: "detail-section" },
            React.createElement("h3", { className: "detail-section-title" }, "Team"),
            React.createElement("div", { className: "detail-value" },
              application.Team && application.Team.length > 0
                ? application.Team.join(", ")
                : "No team assigned"
            )
          ),
          React.createElement("div", { className: "detail-section" },
            React.createElement("h3", { className: "detail-section-title" }, "Organisation"),
            React.createElement("div", { className: "detail-value" },
              application.Organisation && application.Organisation.length > 0
                ? application.Organisation.join(", ")
                : "No organisation assigned"
            )
          )
        );
      case "document":
        return React.createElement(
          "div",
          { className: "detail-tab-content" },
          React.createElement("div", { className: "detail-section" },
            React.createElement("h3", { className: "detail-section-title" }, "Documents"),
            React.createElement("div", { className: "detail-value" }, "No documents available")
          )
        );
      case "history":
        return React.createElement(
          "div",
          { className: "detail-tab-content" },
          React.createElement("div", { className: "detail-section" },
            React.createElement("h3", { className: "detail-section-title" }, "Change History"),
            React.createElement("div", { className: "detail-value" }, "No history records available")
          )
        );
      case "collaboration":
        return React.createElement(
          "div",
          { className: "detail-tab-content" },
          React.createElement("div", { className: "detail-section" },
            React.createElement("h3", { className: "detail-section-title" }, "Collaboration"),
            React.createElement("div", { className: "detail-value" }, "Collaboration features coming soon")
          )
        );
      default:
        return null;
    }
  };

  return React.createElement(
    "div",
    { className: "detail-page" },
    React.createElement(
      "div",
      { className: "detail-header" },
      React.createElement(
        "div",
        { className: "detail-header-left" },
        React.createElement(
          Button,
          {
            variant: "ghost",
            onClick: onBack,
            className: "detail-back-btn",
          },
          "← Back"
        ),
        React.createElement("h2", { className: "detail-title" }, application.Name)
      )
    ),
    React.createElement(
      "div",
      { className: "detail-tabs" },
      tabs.map((tab) =>
        React.createElement(
          "button",
          {
            key: tab.id,
            className: `detail-tab ${activeTab === tab.id ? "active" : ""}`,
            onClick: () => setActiveTab(tab.id),
          },
          tab.label
        )
      )
    ),
    React.createElement("div", { className: "detail-content" }, renderTabContent())
  );
}

