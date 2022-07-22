import { Keypair } from '@solana/web3.js';
import { FC, useCallback } from 'react';
import { notify } from "../utils/notifications";

type Props = {
  address: string;
  secret: string;
  setAddress: (address: string) => void;
  setSecret: (secret: string) => void;
}

export const KeypairButton: FC<Props> = (props: Props) => {
    const { address, secret, setAddress, setSecret } = props;

    const onClick = useCallback(async () => {
        try {
          const keypair = Keypair.generate();
          const address = keypair.publicKey.toString();
          setAddress(address);
          localStorage.setItem('solanaAddress', address);
          const secret = JSON.stringify(Array.from(keypair.secretKey));
          setSecret(secret);
          localStorage.setItem('solanaSecret', secret);
        } catch (error: any) {
            notify({ type: 'error', message: `Sign Message failed!`, description: error?.message });
            console.log('error', `Sign Message failed! ${error?.message}`);
        }
    }, [address, secret, notify]);

    return (
        <div>
            <p>残高の追加、取得のためのアカウントを作ります</p>
            <p>作成したアカウント情報は LocalStorage に保存されます</p>
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={onClick} disabled={!!address}
            >
                <div className="hidden group-disabled:block">
                    Created Account
                </div>
                <span className="block group-disabled:hidden" > 
                    Create Account
                </span>
            </button>
        </div>
    );
};
