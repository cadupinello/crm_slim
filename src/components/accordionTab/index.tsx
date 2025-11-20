import { useGetTab } from "@/api/queries/query";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography
} from "@mui/material";
import { motion } from "framer-motion";
import { ArrowDown, X } from "lucide-react";
import { useMemo } from "react";

interface ITabModalProps {
  open: boolean;
  onClose: () => void;
  departmentId?: string;
  setValue?: any;
  tabsSelected: Record<string, any>;
  setTabsSelected: (fn: any) => void;
}

/**
 * Normaliza o formato da API:
 * - cada nó de grupo terá: { id, name, type: 'group', children: [...] }
 * - cada tab vira: { id, name, type: 'tab' }
 */
function normalizeApi(nodesFromApi: any[] = []) {
  const normalizeNode = (node: any): any => {
    // groups (child) and tabs (tab) are arrays in API
    const groups = (node.child || []).map((g: any) => normalizeNode(g));
    const tabs = (node.tab || []).map((t: any) => ({
      id: t.id,
      name: t.name,
      type: "tab",
      raw: t,
    }));

    // children = first groups, then tabs (keeps groups before tabs)
    const children = [...groups, ...tabs];

    return {
      id: node.id,
      name: node.name,
      type: node.tipo === "group" || node.child?.length > 0 || node.category === false ? "group" : "group",
      children,
      raw: node,
    };
  };

  return nodesFromApi.map(normalizeNode);
}

const AccordionTab = ({
  open,
  onClose,
  departmentId,
  setValue,
  tabsSelected,
  setTabsSelected,
}: ITabModalProps) => {
  const { tabs: tabulationsApi, isLoading } = useGetTab();

  // Normaliza o dado da API para uma árvore consistente
  const tabulations = useMemo(() => normalizeApi(tabulationsApi || []), [tabulationsApi]);

  const toggleSelect = (node: any) => {
    setTabsSelected((prev: Record<string, any>) => {
      const copy = { ...(prev || {}) };
      if (copy[node.id]) delete copy[node.id];
      else copy[node.id] = { id: node.id, name: node.name };
      return copy;
    });
  };

  const removeSelected = (id: string) => {
    setTabsSelected((prev: Record<string, any>) => {
      const c = { ...(prev || {}) };
      delete c[id];
      return c;
    });
  };

  return (
    <Dialog open={!!open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <span>Configurar Tabulações</span>
        <IconButton onClick={onClose}>
          <X />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Selecionados
        </Typography>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {Object.values(tabsSelected || {}).map((tab: any) => (
            <div
              key={tab.id}
              style={{
                display: "flex",
                alignItems: "center",
                background: "#eee",
                padding: "4px 8px",
                borderRadius: 8,
              }}
            >
              <span>{tab.name}</span>
              <IconButton size="small" onClick={() => removeSelected(tab.id)}>
                <X />
              </IconButton>
            </div>
          ))}
        </div>

        <Typography variant="subtitle2" sx={{ mt: 3 }}>
          Escolher Tabulações
        </Typography>

        {isLoading && <div style={{ padding: 12 }}>Carregando...</div>}

        {/* Renderiza a árvore normalizada */}
        {tabulations?.map((node) => (
          <TabNode
            key={node.id}
            node={node}
            tabsSelected={tabsSelected || {}}
            toggleSelect={toggleSelect}
          />
        ))}
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            // Exemplo: setValue no form com array de ids
            if (setValue) setValue("recurrenceConfig.excludeTabulations", Object.keys(tabsSelected || {}));
            onClose?.();
          }}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

/**
 * Renderiza grupo ou tab recursivamente.
 * - Se node.type === 'tab' => checkbox simples
 * - Se group => Accordion com defaultExpanded quando tiver children
 */
const TabNode = ({ node, tabsSelected, toggleSelect }: any) => {
  const isSelected = Boolean(tabsSelected[node?.id]);

  // É um TAB simples (sem accordion)
  if (node.type === "tab") {
    return (
      <motion.div
        layout
        whileHover={{ backgroundColor: "rgba(0,0,0,0.04)" }}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "6px 10px",
          borderRadius: 8,
          marginLeft: 12,
        }}
      >
        <Checkbox
          checked={isSelected}
          onChange={() => toggleSelect(node)}
        />
        <span>{node.name}</span>
      </motion.div>
    );
  }

  // GRUPO COM CHILDREN → Accordion
  return (
    <motion.div layout>
      <Accordion
        disableGutters
        elevation={0}
        sx={{
          background: "#fafafa",
          borderRadius: "10px !important",
          border: "1px solid #e5e5e5",
          mb: 1,
        }}
      >
        <AccordionSummary
          expandIcon={
            <motion.div
              animate={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowDown size={18} />
            </motion.div>
          }
          sx={{
            "& .MuiAccordionSummary-content": {
              alignItems: "center",
            },
            fontWeight: 600,
          }}
        >
          {node.name}
        </AccordionSummary>

        <AccordionDetails
          sx={{
            ml: 2,
            pl: 1,
            borderLeft: "2px solid #ddd",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {/* animação suave ao expandir */}
          <motion.div
            layout
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {node.children?.map((child: any) => (
              <TabNode
                key={child.id}
                node={child}
                tabsSelected={tabsSelected}
                toggleSelect={toggleSelect}
              />
            ))}
          </motion.div>
        </AccordionDetails>
      </Accordion>
    </motion.div>
  );
};

export default AccordionTab;
