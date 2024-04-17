import React from 'react';
import EquipmentCard from '@/components/EquipmentCard';
import { Input } from '@nextui-org/react';
import { SearchIcon } from '@nextui-org/shared-icons';

export default function Hashboard() {
  return (
    <main className='flex flex-col items-center'>
      <div>
        <Input
          label='Search'
          isClearable
          radius='lg'
          classNames={{
            label: 'text-black/50 dark:text-white/90',
            input: [
              'bg-transparent',
              'text-black/90 dark:text-white/90',
              'placeholder:text-default-700/50 dark:placeholder:text-white/60',
            ],
            innerWrapper: 'bg-transparent',
            inputWrapper: [
              'border-black',
              'bg-default-200/50',
              'dark:bg-default/60',
              'backdrop-blur-xl',
              'backdrop-saturate-200',
              'hover:bg-default-200/70',
              'dark:hover:bg-default/70',
              'group-data-[focused=true]:bg-default-200/50',
              'dark:group-data-[focused=true]:bg-default/60',
              '!cursor-text',
            ],
          }}
          placeholder='Type to search...'
          startContent={
            <SearchIcon className='pointer-events-none mb-0.5 flex-shrink-0 text-black/50 text-slate-400 dark:text-white/90' />
          }
        />
      </div>
      <div className='m-5 grid grid-cols-1 gap-5 md:grid-cols-4'>
        <EquipmentCard
          image='https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvam9iNjgwLTA4MS1sMWRidDZxMy5qcGc.jpg'
          model='ECJ112'
          evidenceId='9714003683'
          isDisabled={false}
          maxLoad={1400}
        />
        <EquipmentCard
          image='https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvam9iNjgwLTA4MS1sMWRidDZxMy5qcGc.jpg'
          model='M3'
          evidenceId='12334523'
          isDisabled={true}
          maxLoad={1200}
          issueDescription='Wystąpiła awaria wózka widłowego - nie podnosi ładunku. No i nie działa poprostu co mam zrobic'
        />
        <EquipmentCard
          image='https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvam9iNjgwLTA4MS1sMWRidDZxMy5qcGc.jpg'
          model='ECJ112'
          evidenceId='9714003683'
          isDisabled={false}
          maxLoad={1400}
        />
        <EquipmentCard
          image='https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvam9iNjgwLTA4MS1sMWRidDZxMy5qcGc.jpg'
          model='ECJ112'
          evidenceId='9714003683'
          isDisabled={false}
          maxLoad={1400}
        />
        <EquipmentCard
          image='https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvam9iNjgwLTA4MS1sMWRidDZxMy5qcGc.jpg'
          model='M3'
          evidenceId='12334523'
          isDisabled={true}
          maxLoad={1200}
          issueDescription='Wystąpiła awaria wózka widłowego - nie podnosi ładunku. No i nie działa poprostu co mam zrobic'
        />
        <EquipmentCard
          image='https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvam9iNjgwLTA4MS1sMWRidDZxMy5qcGc.jpg'
          model='ECJ112'
          evidenceId='9714003683'
          isDisabled={false}
          maxLoad={1400}
        />
        <EquipmentCard
          image='https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvam9iNjgwLTA4MS1sMWRidDZxMy5qcGc.jpg'
          model='ECJ112'
          evidenceId='9714003683'
          isDisabled={false}
          maxLoad={1400}
        />
        <EquipmentCard
          image='https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvam9iNjgwLTA4MS1sMWRidDZxMy5qcGc.jpg'
          model='M3'
          evidenceId='12334523'
          isDisabled={true}
          maxLoad={1200}
          issueDescription='Wystąpiła awaria wózka widłowego - nie podnosi ładunku. No i nie działa poprostu co mam zrobic'
        />
        <EquipmentCard
          image='https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvam9iNjgwLTA4MS1sMWRidDZxMy5qcGc.jpg'
          model='ECJ112'
          evidenceId='9714003683'
          isDisabled={false}
          maxLoad={1400}
        />
        <EquipmentCard
          image='https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvam9iNjgwLTA4MS1sMWRidDZxMy5qcGc.jpg'
          model='ECJ112'
          evidenceId='9714003683'
          isDisabled={false}
          maxLoad={1400}
        />
        <EquipmentCard
          image='https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvam9iNjgwLTA4MS1sMWRidDZxMy5qcGc.jpg'
          model='M3'
          evidenceId='12334523'
          isDisabled={true}
          maxLoad={1200}
          issueDescription='Wystąpiła awaria wózka widłowego - nie podnosi ładunku. No i nie działa poprostu co mam zrobic'
        />
        <EquipmentCard
          image='https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvam9iNjgwLTA4MS1sMWRidDZxMy5qcGc.jpg'
          model='ECJ112'
          evidenceId='9714003683'
          isDisabled={false}
          maxLoad={1400}
        />
      </div>
    </main>
  );
}
