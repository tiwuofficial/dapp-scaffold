
import { FC, useEffect, useState } from "react";
import { KeypairButton } from "../../components/KeypairButton";
import { GetterBalance } from "../../components/GetterBalance";
import { GetterAirdrop } from "../../components/GetterAirdrop";
import { Connect } from '../../components/Connect';
import { Getter } from '../../components/Getter';
import { Setter } from '../../components/Setter';
import * as borsh from 'borsh';
import { CreateGreeter } from "components/CreateGreeter";

export class GreetingAccount {
  counter = 0;
  constructor(fields: {counter: number} | undefined = undefined) {
    if (fields) {
      this.counter = fields.counter;
    }
  }
}

// Borsh schema definition for greeting accounts
export const GreetingSchema = new Map([
  [GreetingAccount, {kind: 'struct', fields: [['counter', 'u32']]}],
]);

// The expected size of each greeting account.
export const GREETING_SIZE = borsh.serialize(
  GreetingSchema,
  new GreetingAccount(),
).length;

export const HomeView: FC = ({ }) => {
  const [address, setAddress] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [greeterAddress, setGreeterAddress] = useState<string>('');

  useEffect(() => {
    const lsAddress = localStorage.getItem('solanaAddress');
    if (lsAddress) {
      setAddress(lsAddress);
    }
    const lsSecret = localStorage.getItem('solanaSecret');
    if (lsSecret) {
      setSecret(lsSecret);
    }
    const lsGreeterAddress = localStorage.getItem('solanaGreeterAddress');
    if (lsGreeterAddress) {
      setGreeterAddress(lsGreeterAddress);
    }
  }, []);

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Home
        </h1>
        <div className="text-center">
          <Connect />
          <KeypairButton address={address} secret={secret} setAddress={setAddress} setSecret={setSecret} />
          <GetterBalance address={address} />
          <GetterAirdrop address={address} />
          <CreateGreeter secret={secret} greeterAddress={greeterAddress} setGreeterAddress={setGreeterAddress} />
          <Getter greeterAddress={greeterAddress} />
          <Setter greeterAddress={greeterAddress} secret={secret} />
        </div>
      </div>
    </div>
  );
};
