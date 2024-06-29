import EquipmentRegistration from '@/app/dashboard/editEquipment/[id]/EquipmentEdit';
import { db } from '@/db';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { technicianOrAdminChecker } from '@/loginChecker';

export default async function RegisterEquipmentPage({
  params,
}: {
  params: { id: string };
}) {
  await technicianOrAdminChecker();
  function formatDate(dateString: any) {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd', { locale: pl });
  }

  let equipment;
  let permissionIds;
  console.log(params);

  try {
    equipment = await db.equipment.findFirst({
      where: {
        id: Number(params.id),
      },
      include: {
        permissions: true,
      },
    });
    if (!equipment) return notFound();
    console.log(formatDate(equipment.validityDate));
    console.log(equipment.permissions);
    permissionIds = equipment.permissions.map((permission) =>
      String(permission.id),
    );
    console.log(permissionIds);
  } catch (e) {
    console.error('Error fetching equipment:', e);
    return notFound();
  }

  return (
    <EquipmentRegistration
      id={String(equipment.id)}
      registrationNumber={equipment.registrationNumber}
      serialNumber={equipment.serialNumber}
      liftingCapacityKg={String(equipment.liftingCapacityKg)}
      model={equipment.model}
      constructionYear={String(equipment.constructionYear)}
      validityDate={formatDate(equipment.validityDate)}
      protocolFilePath={equipment.protocolFilePath}
      decisionFilePath={equipment.decisionFilePath}
      manualFilePath={equipment.manualFilePath}
      deviceSchematics={equipment.deviceSchematics}
      image={equipment.image}
      perms={permissionIds}
    />
  );
}
