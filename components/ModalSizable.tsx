'use client';
import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';

export default function ModalSizable({
  children,
  size,
  title,
  className,
}: Readonly<{
  children: React.ReactNode;
  size: string;
  title: string;
  className?: string;
}>) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <>
      <Button className={className} fullWidth={true} onClick={onOpen}>
        {title}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        // @ts-ignore
        size={size}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button color='danger' variant='light' onClick={onClose}>
              Zamknij
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
