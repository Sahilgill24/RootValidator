import { DataTable } from "@/components/ui/data-table";
import { DKGSampleData } from "@/lib/sample-data";
import { DKG, DkgOperator } from "@/lib/types";
import React, { useState } from "react";
import { columns } from "./operator-columns";
import { Button } from "@/components/ui/button";
import { useDKGStore } from "@/stores/dkg";
import { useAccount } from "wagmi";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const DKGCeremonyDashboard = () => {
  const [operators, setOperators] = useState<DkgOperator[]>(
    DKGSampleData.operators
  );
  const { selectedOperators } = useDKGStore();
  const { address } = useAccount();
  const { toast } = useToast();

  const handleInitiate = async () => {
    // console.log(selectedOperators);
    const data: DKG = {
      validators: 10,
      operatorIDs: selectedOperators.map((operator) => operator.id),
      withdrawAddress: "0x8F26D683822E60d522b58f7DB63D352CB7FAe6e4",
      owner: "0x8F26D683822E60d522b58f7DB63D352CB7FAe6e4",
      nonce: 0,
      network: "holesky",
      operators: selectedOperators,
    };
    console.log(data)
    console.log(data.operatorIDs)

    const response = await axios.post(
      import.meta.env.VITE_BACKEND_URI + "/create_config",
      {
        data: data,
      }
    );
    toast({
      description: "init.yaml created :)",
    });

    if (response.data) {
      const res = await axios.get(import.meta.env.VITE_BACKEND_URI);
      toast({
        description:
          "Successfully configured system and recieved keyshares.json",
      });
    }
  };
  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight">
        DKG Ceremony Dashboard
      </h1>
      <div className="flex flex-row border-b py-2 justify-between">
        <h2 className="text-2xl">Operators</h2>
        <Button
          variant={"default"}
          onClick={() => {
            console.log(selectedOperators);
            handleInitiate();
          }}
        >
          Initiate
        </Button>
      </div>
      <DataTable columns={columns} data={operators} />
    </>
  );
};

export default DKGCeremonyDashboard;
