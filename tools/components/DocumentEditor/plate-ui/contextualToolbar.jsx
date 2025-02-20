// contextual-toolbar.jsx
import React, { useState, useEffect } from 'react';
import { EditorToolbar  } from './toolbar';

const ContextualToolbar = () => {
    const [selection, setSelection] = useState(null);
    const [toolbarVisible, setToolbarVisible] = useState(false);
    const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });
  
    useEffect(() => {
      const handleSelectionChange = () => {
        const selection = window.getSelection();
        
        if (selection && !selection.isCollapsed && selection.rangeCount > 0) {
          try {
            // Get the selection range
            const range = selection.getRangeAt(0);
            const rects = range.getClientRects();
            
            if (rects.length > 0) {
              const rect = rects[0];
              setSelection(selection);
              setToolbarPosition({
                x: rect.left + (rect.width / 2),
                y: rect.top - 10
              });
              setToolbarVisible(true);
            } else {
              setToolbarVisible(false);
            }
          } catch (error) {
            console.error('Error measuring selection:', error);
            setToolbarVisible(false);
          }
        } else {
          setToolbarVisible(false);
        }
      };
  
      document.addEventListener('selectionchange', handleSelectionChange);
      return () => {
        document.removeEventListener('selectionchange', handleSelectionChange);
      };
    }, []);
  
    return (
      <div
        style={{
          position: 'absolute',
          top: toolbarPosition.y,
          left: toolbarPosition.x,
          visibility: toolbarVisible ? 'visible' : 'hidden',
          background: 'white',
          padding: '5px',
          borderRadius: '5px',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
        }}
      >
        <EditorToolbar />
      </div>
    );
  };
export default ContextualToolbar;