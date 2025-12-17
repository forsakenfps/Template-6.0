import { IInputs, IOutputs } from "./generated/ManifestTypes";
import "../styles/custom.css";
import * as React from "react";
import { ReactWrapper } from "../component/ReactWrapper";
import { App } from "../component/App";
import { ErrorBoundary } from "../component/ErrorBoundary";
import { ViewStore } from "../store/ViewStore";

export class UserInterface implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _container: HTMLDivElement | null = null;
    private _reactWrapper: ReactWrapper | null = null;
    private _store: ViewStore;

    constructor() {
        try {
            this._store = new ViewStore();
        } catch (error) {
            console.error("Error creating ViewStore:", error);
            this._store = {
                currentView: "grid",
                selectedApplicationId: null,
                navItems: [],
                userMenu: { name: "User", email: "user@example.com" },
                setCurrentView: () => {},
                setSelectedApplication: () => {},
                goBack: () => {},
                setNavItems: () => {},
                setUserMenu: () => {},
            } as ViewStore;
        }
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        try {
            console.log("PCF: init called, container:", container);
            this._container = container;
            
            container.style.width = "100%";
            container.style.height = "100%";
            container.style.minWidth = "400px";
            container.style.minHeight = "400px";
            container.style.display = "flex";
            container.style.flexDirection = "column";
            container.style.backgroundColor = "#ffffff";
            container.className = "pcf-container";
            
            try {
                console.log("PCF: Creating ReactWrapper");
                this._reactWrapper = new ReactWrapper(container);
                console.log("PCF: ReactWrapper created successfully");
            } catch (error) {
                console.error("Error setting up React:", error);
                container.innerHTML = `<div style="padding: 20px; color: red; background: #ffe0e0;">React setup error: ${error instanceof Error ? error.message : String(error)}</div>`;
            }
        } catch (error) {
            console.error("Error in init:", error);
            container.innerHTML = `<div style="padding: 20px; color: red; background: #ffe0e0;">Initialization error: ${error instanceof Error ? error.message : String(error)}</div>`;
        }
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        console.log("PCF: updateView called");
        if (!this._container) {
            console.error("PCF: Container is null in updateView");
            return;
        }
        
        if (!this._reactWrapper) {
            console.log("PCF: ReactWrapper not ready yet, waiting for init to complete");
            return;
        }
        
        try {
            const width = context.mode.allocatedWidth || 800;
            const height = context.mode.allocatedHeight || 600;
            
            console.log("PCF: Rendering component, container dimensions:", width, height);
            
            this._container.style.width = `${width}px`;
            this._container.style.height = `${height}px`;
            this._container.style.minWidth = "400px";
            this._container.style.minHeight = "400px";
            this._container.style.backgroundColor = "#ffffff";
            
            console.log("PCF: Rendering App component with NavigationBar");
            try {
                const appElement = React.createElement(
                    ErrorBoundary,
                    { key: "outer-error-boundary" },
                    React.createElement(
                        ErrorBoundary,
                        { key: "inner-error-boundary" },
                        React.createElement(App, { store: this._store })
                    )
                );
                
                console.log("PCF: App element created, rendering...");
                this._reactWrapper.render(appElement);
                console.log("PCF: App component rendered successfully");
            } catch (renderError) {
                console.error("PCF: Error rendering App component:", renderError);
                if (this._container) {
                    let errorMsg = "Unknown error occurred";
                    try {
                        if (renderError instanceof Error) {
                            errorMsg = renderError.message || String(renderError);
                        } else {
                            errorMsg = String(renderError);
                        }
                    } catch (e) {
                        errorMsg = "Error converting error message to string";
                    }
                    this._container.innerHTML = `
                        <div style="padding: 20px; background: #ffcccc; color: #000; border: 2px solid red;">
                            <h2 style="margin: 0 0 10px 0;">Render Error</h2>
                            <p style="margin: 0;">${errorMsg}</p>
                        </div>
                    `;
                }
            }
        } catch (error) {
            console.error("Error in updateView:", error);
            if (this._container) {
                this._container.innerHTML = `
                    <div style="padding: 20px; color: red; background-color: #ffe0e0;">
                        <p><strong>Error rendering component:</strong></p>
                        <p>${error instanceof Error ? error.message : String(error)}</p>
                        <pre>${error instanceof Error ? error.stack : ''}</pre>
                    </div>
                `;
            }
        }
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        if (this._reactWrapper) {
            this._reactWrapper.unmount();
            this._reactWrapper = null;
        }
    }
}

