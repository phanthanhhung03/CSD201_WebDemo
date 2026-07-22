import React from 'react';
import { DSA_TYPES } from '../../types/dsaTypes';
import SinglyListCanvas from './SinglyListCanvas';
import DoublyListCanvas from './DoublyListCanvas';
import CircularListCanvas from './CircularListCanvas';
import StackCanvas from './StackCanvas';
import QueueCanvas from './QueueCanvas';
import BSTCanvas from './BSTCanvas';

export default function VisualizationCanvas({ activeType, snapshot }) {
  switch (activeType) {
    case DSA_TYPES.SLL:
      return <SinglyListCanvas snapshot={snapshot} />;
    case DSA_TYPES.DLL:
      return <DoublyListCanvas snapshot={snapshot} />;
    case DSA_TYPES.CLL:
      return <CircularListCanvas snapshot={snapshot} />;
    case DSA_TYPES.STACK:
      return <StackCanvas snapshot={snapshot} />;
    case DSA_TYPES.QUEUE:
      return <QueueCanvas snapshot={snapshot} />;
    case DSA_TYPES.BST:
      return <BSTCanvas snapshot={snapshot} />;
    default:
      return <SinglyListCanvas snapshot={snapshot} />;
  }
}
