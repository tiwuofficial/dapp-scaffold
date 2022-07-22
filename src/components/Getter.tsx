import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { FC, useCallback, useState } from 'react';
import { notify } from "../utils/notifications";
import * as borsh from 'borsh';
import { GreetingAccount, GreetingSchema } from 'views/home';

type Props = {
  greeterAddress: string;
}

export const Getter: FC<Props> = (props: Props) => {
    const { greeterAddress } = props;
    const { connection } = useConnection();
    const [counter, setCounter] = useState<number>(0);

    const onClick = useCallback(async () => {
        try {
          const greeterPublicKey = new PublicKey(greeterAddress);
          const accountInfo = await connection.getAccountInfo(greeterPublicKey);
          if (accountInfo === null) {
            throw new Error('Error: cannot find the greeted account');
          }
      
          // Find the expected parameters.
          const greeting = borsh.deserialize(
            GreetingSchema,
            GreetingAccount,
            accountInfo.data,
          );
          setCounter(greeting.counter);
        } catch (error: any) {
            notify({ type: 'error', message: `Sign Message failed!`, description: error?.message });
            console.log('error', `Sign Message failed! ${error?.message}`);
        }
    }, [greeterAddress, connection, notify]);

    return (
        <div>
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={onClick} disabled={!greeterAddress}
            >
                <div className="hidden group-disabled:block">
                    Wallet not connected
                </div>
                <span className="block group-disabled:hidden" > 
                    Getter
                </span>
            </button>
            <p>Counter : {counter}</p>
        </div>
    );
};
