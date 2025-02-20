import React, { useEffect, useRef, useState } from "react";

import { cn, withRef } from "@udecode/cn";

import {
  flip,
  offset,
  useFloatingToolbar,
  useFloatingToolbarState,
} from "@udecode/plate-floating";

import {
  useEditorId,
  useEventEditorValue,
  usePluginOption,
  usePlateEditorRef,
} from "@udecode/plate/react";

import { EditorToolbar } from "./toolbar";

export const FloatingToolbar = withRef(
  ({ children, state, ...props }, componentRef) => {
    const editorId = useEditorId();
    const focusedEditorId = useEventEditorValue("focus");
    const editor = usePlateEditorRef(); // Get Plate Editor instance

    // State to track toolbar visibility & position
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const toolbarRef = useRef(null);

    // Check for plugin options (if you're not using AI or Links, this can be ignored)
    const isFloatingLinkOpen = Boolean(usePluginOption({ key: "a" }, "mode"));
    const isAIChatOpen = Boolean(usePluginOption({ key: "aiChat" }, "open"));

    const floatingToolbarState = useFloatingToolbarState({
      editorId,
      focusedEditorId,
      hideToolbar: isFloatingLinkOpen || isAIChatOpen,
      ...state,
      floatingOptions: {
        middleware: [
          offset(12),
          flip({
            fallbackPlacements: [
              "top-start",
              "top-end",
              "bottom-start",
              "bottom-end",
            ],
            padding: 12,
          }),
        ],
        placement: "top",
        ...(state ? state.floatingOptions : {}),
      },
    });

    const {
      clickOutsideRef,
      hidden,
      props: rootProps,
      ref: floatingRef,
    } = useFloatingToolbar(floatingToolbarState);
    const ref = withRef(componentRef, floatingRef);

    // Detect text selection and position toolbar
    useEffect(() => {
      const handleSelectionChange = () => {
        if (!editor) return;

        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) {
          setVisible(false);
          return;
        }

        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        // Adjust position of the toolbar relative to the selection
        setPosition({
          top: window.scrollY + rect.top - 50, // 50px above selection
          left: window.scrollX + rect.left + rect.width / 2,
        });

        setVisible(true);
      };

      document.addEventListener("selectionchange", handleSelectionChange);
      return () =>
        document.removeEventListener("selectionchange", handleSelectionChange);
    }, [editor]);

    // Hide toolbar if selection is removed
    if (!visible || hidden) return null;

    return (
      <div ref={clickOutsideRef}>
        <EditorToolbar
          ref={ref}
          className={cn(
            "absolute z-50 scrollbar-hide overflow-x-auto rounded-md border bg-popover p-1 whitespace-nowrap opacity-100 shadow-md print:hidden",
            "max-w-[80vw]"
          )}
          style={{
            top: position.top,
            left: position.left,
            transform: "translate(-50%, -100%)",
          }}
          {...rootProps}
          {...props}
        >
          {children}
        </EditorToolbar>
      </div>
    );
  }
);
