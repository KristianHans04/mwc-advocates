/**
 * Error Boundary Component
 * Catches React rendering errors and displays them
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-red-600 mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600">
                We encountered an error while rendering this page.
              </p>
            </div>

            {this.state.error && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Details:</h2>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 font-mono text-sm whitespace-pre-wrap">
                    {this.state.error.toString()}
                  </p>
                </div>
              </div>
            )}

            {this.state.errorInfo && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Component Stack:</h2>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                  <pre className="text-gray-700 text-xs whitespace-pre-wrap">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
              >
                Reload Page
              </button>
              <a
                href="/"
                className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
              >
                Go Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
