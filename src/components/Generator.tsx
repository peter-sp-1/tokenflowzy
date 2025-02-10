import { useState } from "react";
import TokenInfoForm from "./TokenInfoForm";

export default function TokenCreator() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState(6);
  const [supply, setSupply] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-[#000000] text-white p-6 flex">
      <div className="w-1/4 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold">Orion Tools</h2>
        <nav className="mt-6 space-y-2">
          <button className="w-full py-2 bg-blue-500 rounded-lg">
            Token Creator
          </button>
          <button className="w-full py-2 bg-gray-700 rounded-lg">
            Create Liquidity
          </button>
        </nav>
      </div>
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Solana Token Creator</h1>
        <p className="text-gray-300 mt-2">
          The perfect tool to create Solana SPL tokens.
        </p>
        <TokenInfoForm
          name={name}
          symbol={symbol}
          decimals={decimals}
          supply={supply}
          description={description}
          image={image}
          onNameChange={setName}
          onSymbolChange={setSymbol}
          onDecimalsChange={setDecimals}
          onSupplyChange={setSupply}
          onDescriptionChange={setDescription}
          onImageChange={setImage}
        />
      </div>
    </div>
  );
}
