import { useConnection } from '@solana/wallet-adapter-react';
import { Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from '@solana/web3.js';
import { FC, useCallback } from 'react';
import { GREETING_SIZE } from 'views/home';
import { notify } from "../utils/notifications";

type Props = {
  secret: string;
  greeterAddress: string;
  setGreeterAddress: (address: string) => void;
}

export const CreateGreeter: FC<Props> = (props: Props) => {
    const { secret, greeterAddress, setGreeterAddress } = props;
    const { connection } = useConnection();

    const onClick = useCallback(async () => {
        try {
          const programId = new PublicKey('3YRmRuUYLWamMER87YZWMqXcsQUMEHkChU9pQDCXqzZg');
          const payer = Keypair.fromSecretKey(new Uint8Array(JSON.parse(secret)));
          const GREETING_SEED = 'seed';
      
          // Are there any methods from PublicKey to derive a public key from a seed?
          const greetedPubkey = await PublicKey.createWithSeed(
            payer.publicKey,
            GREETING_SEED,
            programId,
          );
          
          const lamports = await connection.getMinimumBalanceForRentExemption(
            GREETING_SIZE,
          );
          
          const transaction = new Transaction().add(
            SystemProgram.createAccountWithSeed({
              fromPubkey: payer.publicKey,
              basePubkey: payer.publicKey,
              seed: GREETING_SEED,
              newAccountPubkey: greetedPubkey,
              lamports,
              space: GREETING_SIZE,
              programId,
            }),
          );
          const hash = await sendAndConfirmTransaction(connection, transaction, [payer]);
          console.log(hash);
          const address = greetedPubkey.toBase58();
          console.log(address);
          setGreeterAddress(address);
          localStorage.setItem('solanaGreeterAddress', address);
          notify({ type: 'success', message: 'Create Greeter Account successful!' });
        } catch (error: any) {
            notify({ type: 'error', message: `Create Greeter Account failed!`, description: error?.message });
            console.log('error', `Create Greeter Account failed! ${error?.message}`);
        }
    }, [secret, notify]);

    return (
        <div>
            <p>カウントアップするプログラム用のアカウントを作ります</p>
            <p>作成したアカウント情報は LocalStorage に保存されます</p>
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={onClick} disabled={!!greeterAddress}
            >
                <div className="hidden group-disabled:block">
                    Created Greeter Account
                </div>
                <span className="block group-disabled:hidden" > 
                    Create Greeter Account
                </span>
            </button>
        </div>
    );
};
