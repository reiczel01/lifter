'use client';
import React from 'react';
import { Select, SelectItem } from '@nextui-org/react';

export default function MultiSelectDeviceType({}) {
  const equipmentType = [
    { label: 'Wózek', value: 'forklift', description: 'Wózek widłowy' },
    { label: 'Suwnica', value: 'slider', description: 'Suwnica podnośnikowa' },
  ];
  return (
    <Select
      label='Typ strzętu'
      placeholder='Select an animal'
      selectionMode='multiple'
      className='max-w-xs'
    >
      {equipmentType.map((equipmentType) => (
        <SelectItem key={equipmentType.value} value={equipmentType.value}>
          {equipmentType.label}
        </SelectItem>
      ))}
    </Select>
  );
}
