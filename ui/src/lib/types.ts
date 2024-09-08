export type NavItem = {
  label: string;
  component: React.ReactNode;
};

export type DkgOperator = {
  id: number;
  public_key: string;
  ip: string;
};

export type DKG = {
  validators: number;
  operatorIDs: number[];
  withdrawAddress: string;
  owner: string;
  nonce: number;
  network: string;
  operators: DkgOperator[];
}