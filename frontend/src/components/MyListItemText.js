import React from 'react';
import { styled } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText'

const MyListItemText = styled(ListItemText)({
  background: '#F2F2F3',
  color: 'black',
  padding: '12px 30px'
});

export default function StyledListItemText(props) {
  return <MyListItemText primary={props.primary} />;
}