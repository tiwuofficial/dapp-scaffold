
import { FC } from "react";
import { KeypairButton } from "../../components/KeypairButton";
import { GetterBalance } from "../../components/GetterBalance";
import { GetterAirdrop } from "../../components/GetterAirdrop";
import { Connect } from '../../components/Connect';
import { Getter } from '../../components/Getter';
import { Setter } from '../../components/Setter';

export const HomeView: FC = ({ }) => {
  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Home
        </h1>
        <div className="text-center">
          <Connect/>
          <KeypairButton/>
          <GetterBalance/>
          <GetterAirdrop/>
          {/* <Getter/>
          <Setter/> */}
        </div>
      </div>
    </div>
  );
};
