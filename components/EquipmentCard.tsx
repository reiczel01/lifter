'use client';
import React from 'react';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import QRCode from 'qrcode.react';
import Link from 'next/link';

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength) + '...';
  }
};

interface EquipmentCardProps {
  image: string;
  model: string;
  evidenceId: string;
  isDisabled: boolean;
  maxLoad: number;
  issueDescription?: string;
  validityDate?: boolean;
  id: number;
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({
  image,
  model,
  evidenceId,
  isDisabled,
  maxLoad,
  issueDescription,
  validityDate,
  id,
}) => {
  const truncatedIssueDescription = issueDescription
    ? truncateText(issueDescription, 45)
    : '';
  return (
    <Link href={`/dashboard/equipment/${id}`}>
      <Card shadow='sm' isPressable>
        <CardBody
          className={`overflow-visible p-0 ${isDisabled ? 'bg-red-500' : 'bg-green-500'} ${validityDate ? 'bg-orange-500' : ''}`}
          style={{ height: '100%' }}
        >
          <Image
            shadow='sm'
            radius='lg'
            height='200px'
            width='100%'
            alt={`Equipment image of ${model}`}
            className='aspect-w-3 aspect-h-3 bg-white object-cover'
            src={image}
          />
        </CardBody>
        <CardFooter
          className={`flex items-center justify-between text-small ${isDisabled ? 'bg-red-500' : 'bg-green-500'} ${validityDate ? 'bg-orange-500' : ''}`}
          style={{ height: 'fit-content' }}
        >
          <div>
            <b>Model: {model}</b>
            <p className='text-default-700'>NR: {evidenceId}</p>
            <p className='text-default-700'>Udźwig: {maxLoad}KG</p>
          </div>
          <div
            className={`${!isDisabled ? 'hidden' : 'hidden w-2/5 md:block'}`}
          >
            <b>Usterka:</b>
            <p className='text-xs text-black'>{truncatedIssueDescription}</p>
          </div>
          <QRCode value={evidenceId} bgColor='transparent' size={75} />
        </CardFooter>
      </Card>
    </Link>
  );
};

export default EquipmentCard;
