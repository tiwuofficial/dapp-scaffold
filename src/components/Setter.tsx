import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, PublicKey, sendAndConfirmTransaction, Transaction, TransactionInstruction } from '@solana/web3.js';
import { FC, useCallback } from 'react';
import { notify } from "../utils/notifications";

type Props = {
  secret: string;
  greeterAddress: string;
}

export const Setter: FC<Props> = (props: Props) => {
    const { secret, greeterAddress } = props;
    const { connection } = useConnection();

    const onClick = useCallback(async () => {
        try {
          const greeterPublicKey = new PublicKey(greeterAddress);
          const programKey = new PublicKey('3YRmRuUYLWamMER87YZWMqXcsQUMEHkChU9pQDCXqzZg');
          const payerKeypair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(secret)));
          const instruction = new TransactionInstruction({
            keys: [{pubkey: greeterPublicKey, isSigner: false, isWritable: true}],
            programId: programKey,
            data: Buffer.alloc(0),
          });
          const transaction = new Transaction().add(instruction);
          await sendAndConfirmTransaction(
            connection,
            transaction,
            [payerKeypair],
          );

          notify({ type: 'success', message: 'Success!' });
        } catch (error: any) {
            notify({ type: 'error', message: `Setter failed!`, description: error?.message });
            console.log('error', `Setter failed! ${error?.message}`);
        }
    }, [greeterAddress, secret, connection, notify]);

    return (
        <div>
            <p>カウントを1アップします</p>
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={onClick} disabled={!greeterAddress}
            >
                <div className="hidden group-disabled:block">
                    Wallet not connected
                </div>
                <span className="block group-disabled:hidden" > 
                    Count Up
                </span>
            </button>
        </div>
    );
};
