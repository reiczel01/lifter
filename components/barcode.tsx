'use client';
import React from 'react';
import { useBarcode } from 'next-barcode';

interface BarcodeProps {
  value: string;
  displayValue?: boolean;
  height?: number;
}
export default function Barcode(props: BarcodeProps) {
  const { inputRef } = useBarcode({
    value: props.value,
    options: {
      background: '#00000000',
      displayValue: props.displayValue || false,
      height: props.height || 30,
      format: 'CODE128',
    },
  });

  return <svg ref={inputRef} />;
}
