'use client';

import React from 'react';

import { withRef } from '@udecode/cn';
import {
  useListToolbarButton,
  useListToolbarButtonState,
} from '@udecode/plate-list/react';
import { 
  FormatListBulleted as BulletListIcon, 
  FormatListNumbered as NumberedListIcon 
} from '@mui/icons-material';
import { ToolbarButton } from './toolbar';

 const ListToolbarButton = withRef(
  ({ nodeType, editor, isActive, onClick, ...rest }, ref) => {
    
    const state = useListToolbarButtonState({ nodeType });
    const { props } = useListToolbarButton(state);

    const Icon = nodeType === "ul" ? BulletListIcon : NumberedListIcon;
    return (
      <ToolbarButton
        className="slate-btn"
        ref={ref}
        tooltip={
          nodeType === "ul" ? 'Bulleted List' : 'Numbered List'
        }
        isActive={props.pressed}
        onClick={props.onClick}
        {...rest}
      >
        <Icon className="h-5 w-5" />
      </ToolbarButton>
    );
  }
);
export default ListToolbarButton;