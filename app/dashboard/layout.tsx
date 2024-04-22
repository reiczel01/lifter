import React from 'react';

// @ts-ignore
function LayoutPage({ children }) {
  return (
    <main className='flex flex-col'>
      {children} {/* Content area */}
    </main>
  );
}

export default LayoutPage;
