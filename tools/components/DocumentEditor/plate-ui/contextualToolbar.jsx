// contextual-toolbar.jsx
import React, { useState, useEffect } from 'react';
import { EditorToolbar  } from './toolbar';

const ContextualToolbar = () => {
    const [selection, setSelection] = useState(null);
    const [toolbarVisible, setToolbarVisible] = useState(false);
    const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });
  
    useEffect(() => {
      const handleSelectionChange = () => {
        console.log("Selection Changed!");
        const selection = window.getSelection();
        
        if (!selection.rangeCount) return;
    console.log('selection', selection);
    

        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

 // If the selection is collapsed (cursor is in one place), set the toolbar above the cursor
 const toolbarX = rect.left + rect.width / 2 - 75;  // Center toolbar based on selection width
 const toolbarY = rect.top - 40;  // Position toolbar above selection


        console.log("Range Rect:", rect);
console.log("Top:", rect.top, "Left:", rect.left);

        let anchorNode = range.startContainer;
        let focusNode = range.endContainer;
    
        console.log("Anchor Node:", anchorNode);
        console.log("Focus Node:", focusNode);
    
        // Ensure we get the parent element if the node is a text node
        const getElement = (node) => {
          if (!node) return null;
  return node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
        };
    
        const anchorElement = getElement(anchorNode);
        const focusElement = getElement(focusNode);
    
        console.log("Anchor Element:", anchorElement);
        console.log("Focus Element:", focusElement);
    
        if (anchorElement && focusElement) {
          const anchorRect = anchorElement.getBoundingClientRect();
          const focusRect = focusElement.getBoundingClientRect();
    
          console.log("Anchor Rect:", anchorRect);
          console.log("Focus Rect:", focusRect);
    
          const toolbarX = (anchorRect.left + focusRect.left) / 2;
          const toolbarY = Math.min(anchorRect.top, focusRect.top) - 40;
    
          // Ensure the toolbar stays within the screen width
        const screenWidth = window.innerWidth;
        const toolbarWidth = 150; // Adjust this based on toolbar width
        if (toolbarX + toolbarWidth > screenWidth) {
          setToolbarPosition({ x: screenWidth - toolbarWidth - 10, y: toolbarY }); // Move it left if it's off-screen
        }

          console.log("Rendering Toolbar at:", toolbarPosition);
          // console.log("Toolbar Position:", { x: toolbarX, y: toolbarY });
          console.log("Setting Toolbar Position...");


          setToolbarPosition({ x: toolbarX, y: toolbarY });
          console.log("Previous Position:", toolbarPosition);
          console.log("Updated Position:", { x: rect.left, y: rect.top - 40 });
          setToolbarVisible(true);
          console.log("Toolbar Visible:", toolbarVisible);
        } else {
          console.error("Invalid elements for selection, hiding toolbar.");
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
        position: 'absolute', // Ensure it’s positioned relative to the screen
        top: `${toolbarPosition.y}px`,
        left: `${toolbarPosition.x}px`,
        // visibility: toolbarVisible ? 'visible' : 'hidden',
        display: toolbarVisible ? 'block' : 'none',
        // visibility: 'visible', 
         // Force visibility for testing
        background: 'white', // Optional for debugging
        border: '1px solid #decdff',
        padding: '8px',
        borderRadius: '5px',
        boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
        zIndex: 1000, // Make sure it's above other elements
        transition: "opacity 0.2s ease-in-out",
        opacity: toolbarVisible ? 1 : 0,
      }}
      >
        <EditorToolbar />
      </div>
    );
  };
export default ContextualToolbar;