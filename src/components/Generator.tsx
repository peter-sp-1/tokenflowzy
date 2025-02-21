import { useState } from "react";
import TokenInfoForm from "./TokenInfoForm";
import TokenExtensions, { TokenExtension } from "./TokenExtensions";
import { Howto } from "./Howto";
import { createCustomToken, TokenConfig } from "@/solactions/createToken";
import { toast } from "react-hot-toast"; // For error notifications
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

export default function TokenCreator() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState(6);
  const [supply, setSupply] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [activeExtensions, setActiveExtensions] = useState<TokenExtension[]>(
    []
  );

  const handleExtensionsChange = (extensions: TokenExtension[]) => {
    setActiveExtensions(extensions.filter((ext) => ext.isConnected));
  };

  // Inside your component
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  console.log(wallet?.publicKey);

  // Validation function
  const validateTokenConfig = (config: TokenConfig): boolean => {
    if (!config.name || config.name.trim() === "") {
      throw new Error("Token name is required");
    }
    if (!config.symbol || config.symbol.trim() === "") {
      throw new Error("Token symbol is required");
    }
    if (!config.supply || Number(config.supply) <= 0) {
      throw new Error("Token supply must be greater than 0");
    }
    if (config.decimals < 0 || config.decimals > 9) {
      throw new Error("Decimals must be between 0 and 9");
    }
    return true;
  };

  const handleCreateToken = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // if (!wallet.connected) {
      //   throw new Error("Please connect your wallet first");
      // }
      if (!wallet) {
        toast.error("Please connect your wallet first");
        return;
      }

      const tokenConfig: TokenConfig = {
        name,
        symbol,
        decimals,
        supply,
        description,
        image,
        extensions: activeExtensions.reduce(
          (acc, ext) => ({
            ...acc,
            [ext.id]: ext.isConnected,
          }),
          {}
        ),
      };

      validateTokenConfig(tokenConfig);

      toast.loading("Creating token...", { id: "create-token" });
      const tokenDetails = await createCustomToken({
        config: tokenConfig,
        wallet,
      });

      toast.success("Token created successfully!", { id: "create-token" });
      console.log("Token created:", tokenDetails);

      console.log("Token created successfully:", tokenDetails);
    } catch (error) {
      console.error("Failed to create token:", error);
      toast.error("Failed to create token");
      // Handle error in UI
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white p-6 flex">
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Sol Token Creator</h1>
        <p className="text-gray-300 mt-2">spl flows for you!</p>
        <div className="flex gap-8">
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
            onSubmit={handleCreateToken}
          />
          <TokenExtensions onExtensionChange={handleExtensionsChange} />
          <Howto />
        </div>
      </div>
    </div>
  );
}
