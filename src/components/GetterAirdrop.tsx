import { useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { FC, useCallback } from 'react';
import { notify } from "../utils/notifications";

type Props = {
  address: string;
}

export const GetterAirdrop: FC<Props> = (props: Props) => {
    const { address } = props;
    const { connection } = useConnection();

    const onClick = useCallback(async () => {
        try {
          const publicKey = new PublicKey(address);
          const hash = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
          await connection.confirmTransaction(hash);
          notify({ type: 'success', message: 'Airdrop successful!' });
        } catch (error: any) {
            notify({ type: 'error', message: `Sign Message failed!`, description: error?.message });
            console.log('error', `Sign Message failed! ${error?.message}`);
        }
    }, [address, notify]);

    return (
        <div>
            <p>残高を追加します</p>
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={onClick} disabled={!address}
            >
                <div className="hidden group-disabled:block">
                    No Account
                </div>
                <span className="block group-disabled:hidden" > 
                    Get Airdrop
                </span>
            </button>
        </div>
    );
};
