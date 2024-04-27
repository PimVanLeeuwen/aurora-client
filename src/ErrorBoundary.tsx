import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  fallback?: React.ReactNode;
}

interface State {
  error?: Error;
  stack?: string;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, stack: errorInfo.componentStack });
    console.error(error, errorInfo.componentStack);
  }

  render() {
    if (this.state.error && this.props.fallback) {
      return this.props.fallback;
    } else if (this.state.error) {
      return (
        <div className="flex flex-col gap-4 justify-center items-center p-32">
          <h1 className="text-4xl">💀💀💀 Something went wrong</h1>
          <p>
            {this.state.error.name}: {this.state.error.message}
          </p>
          {this.state.stack && <p>{this.state.stack}</p>}
        </div>
      );
    }

    return this.props.children;
  }
}
