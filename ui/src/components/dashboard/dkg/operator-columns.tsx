import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DkgOperator } from "@/lib/types";
import { useDKGStore } from "@/stores/dkg";
import CopyAddress from "@/components/ui/copy-address";

export const columns: ColumnDef<DkgOperator>[] = [
  {
    accessorKey: "id",
    header: () => <div className="">ID</div>,
    cell: ({ row }) => {
      const { selectedOperators, setSelectedOperators } = useDKGStore();
      return (
        <>
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value);
              if (value) {
                selectedOperators.push(row.original);
              } else {
                const updatedOperators = selectedOperators.filter(
                  (operator) => operator != row.original
                );
                setSelectedOperators(updatedOperators);
              }
            }}
            aria-label="Select row"
            className="mr-4"
          />
          {row.getValue("id")}
        </>
      );
    },
  },
  {
    accessorKey: "public_key",
    header: "Public Key",
    cell: ({ row }) => {
      const publicKey = row.original.public_key;
      return (
        <CopyAddress className="text-secondary-foreground tracking-tight text-sm" address={publicKey} description="Public key copied!" />
      );
    },
  },
  {
    accessorKey: "ip",
    header: "IP",
  },
];
