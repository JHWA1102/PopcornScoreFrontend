import React from "react";
import FallbackComponent from "./FallbackComponent"

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }
  
    static getDerivedStateFromError(error) {
      // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
      return { hasError: true, error };
    }
  
    componentDidCatch(error, info) {
      // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    //   logErrorToMyService(error, errorInfo);
        console.error("ErrorBoundary caught an error:", error, info);
    }
  
    render() {
        const { hasError, error } = this.state;
        const { fallback: FallbackComponent, onReset } = this.props;

      if (hasError) {
        // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
        return (
          <FallbackComponent
            error={error}
            resetErrorBoundary={() => {
                this.setState({ hasError: false, error: null });
                onReset?.();
            }}
          />)
      }
      return this.props.children;
    }
  }

  export default ErrorBoundary;