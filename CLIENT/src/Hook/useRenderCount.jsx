import { useRef } from 'react';

const useRenderCount = (componentName) => {
    const renderCount = useRef(0);
    renderCount.current += 1;
    console.log(`${componentName} rendered ${renderCount.current} times`);
};

export default useRenderCount;