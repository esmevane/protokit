declare type Props<GivenProps> = React.PropsWithChildren<GivenProps>;

declare type ScreenKind = 'list' | 'view';
declare type ScreenNames = `${keyof Payloads}-${ScreenKind}`;
declare interface Payloads {}

declare type PayloadKind = keyof Payloads;
declare type PayloadDefinition = Payloads[PayloadKind];

declare interface Payload<GivenModel extends PayloadKind> {
  type: GivenModel;
  attributes: Payloads[GivenModel];
}

interface AppCommand {
  name: string;
  exec: () => void;
  sequence: React.ReactNode;
  mapping: string | null;
}
