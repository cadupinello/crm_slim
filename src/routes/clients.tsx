import AccordionTab from '@/components/accordionTab';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/clients')({
  component: RouteComponent,
})

function RouteComponent() {
  const [open, setOpen] = useState(true); // ou false, se quiser iniciar fechado
  const [tabsSelected, setTabsSelected] = useState({});
  const [departmentId] = useState("123"); // exemplo
  
  // se vier de um form, SetValue deve vir de react-hook-form
  const setValue = () => {};

  return (
    <div>
      <p>Hello "/clients"!</p>

      <AccordionTab
        open={open}
        onClose={() => setOpen(false)}
        departmentId={departmentId}
        setValue={setValue}
        tabsSelected={tabsSelected}
        setTabsSelected={setTabsSelected}
      />
    </div>
  );
}
