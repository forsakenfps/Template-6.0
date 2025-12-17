import * as React from "react";
import { createRoot, Root } from "react-dom/client";

export interface ReactWrapperProps {
  container: HTMLDivElement;
}

export class ReactWrapper {
  private root: Root | null = null;
  private container: HTMLDivElement;

  constructor(container: HTMLDivElement) {
    this.container = container;
    try {
      this.root = createRoot(container);
    } catch (error) {
      console.error("Error creating React root:", error);
      container.innerHTML = '<div style="padding: 20px; color: red;">Error initializing React</div>';
    }
  }

  render(component: React.ReactElement) {
    try {
      if (this.root) {
        this.root.render(component);
      } else {
        console.error("React root is null, cannot render component");
        if (this.container) {
          this.container.innerHTML = '<div style="padding: 20px; color: red;">React root is null</div>';
        }
      }
    } catch (error) {
      console.error("Error rendering React component:", error);
      if (this.container) {
        this.container.innerHTML = `<div style="padding: 20px; color: red;">Error rendering: ${error instanceof Error ? error.message : String(error)}</div>`;
      }
    }
  }

  unmount() {
    try {
      if (this.root) {
        this.root.unmount();
        this.root = null;
      }
    } catch (error) {
      console.error("Error unmounting React root:", error);
    }
  }
}

